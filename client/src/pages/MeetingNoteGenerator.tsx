import { useRef, useState, useEffect } from "react";
import {
  ArrowLeft,
  Mic,
  MicOff,
  FileText,
  Copy,
  Check,
  Loader2,
  RotateCcw,
} from "lucide-react";

type Step = "idle" | "recording" | "recorded" | "generating" | "done";

interface TokenResponse {
  token: string;
}

type CortiMessage = {
  type?: string;
  data?: {
    text?: string;
    rawTranscriptText?: string;
    isFinal?: boolean;
    [key: string]: unknown;
  };
  error?:
  | string
  | {
    title?: string;
    details?: string;
    status?: number;
  };
  reason?: string;
  credits?: number;
};

const CORTI_ENVIRONMENT = "us";
const CORTI_TENANT_NAME = "base";

const MEDIA_RECORDER_MIME_TYPES = [
  "audio/webm;codecs=opus",
  "audio/webm",
  "audio/ogg;codecs=opus",
  "audio/ogg",
  "audio/mp4",
];

function getBestSupportedMimeType() {
  if (typeof MediaRecorder === "undefined") {
    return "";
  }

  return (
    MEDIA_RECORDER_MIME_TYPES.find(mimeType =>
      MediaRecorder.isTypeSupported(mimeType)
    ) ?? ""
  );
}

function toCortiAudioFormat(mimeType: string) {
  return mimeType.split(";")[0] || undefined;
}

function joinTranscriptParts(finalText: string, interimText: string) {
  return [finalText.trim(), interimText.trim()].filter(Boolean).join(" ");
}

function appendTranscriptText(current: string, next: string) {
  return [current.trim(), next.trim()].filter(Boolean).join(" ");
}

function getErrorMessage(err: unknown) {
  return err instanceof Error ? err.message : "Unknown error";
}

function getTodayDateInputValue() {
  const now = new Date();
  const localDate = new Date(now.getTime() - now.getTimezoneOffset() * 60_000);

  return localDate.toISOString().slice(0, 10);
}

function getCurrentDateTimeLabel() {
  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date());
}

export default function MeetingNoteGenerator() {
  const [patientName, setPatientName] = useState("");
  const [visitDate, setVisitDate] = useState(() => getTodayDateInputValue());
  const [recordingStartedAt, setRecordingStartedAt] = useState("");
  const [step, setStep] = useState<Step>("idle");
  const [composerOpen, setComposerOpen] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [note, setNote] = useState("");
  const [copied, setCopied] = useState(false);
  const [copiedTranscript, setCopiedTranscript] = useState(false);
  const [error, setError] = useState("");
  const [token, setToken] = useState("");

  const wsRef = useRef<WebSocket | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  const isStartingRef = useRef(false);
  const configAcceptedRef = useRef(false);
  const shouldSendEndOnRecorderStopRef = useRef(false);

  // const recognitionRef = useRef<SpeechRecognition | null>(null);
  // const isRecordingRef = useRef(false);
  // captures everything spoken — final + any interim not yet finalized
  const finalRef = useRef("");
  const interimRef = useRef("");

  const canRecord =
    typeof window !== "undefined" &&
    typeof navigator !== "undefined" &&
    !!navigator.mediaDevices?.getUserMedia &&
    typeof MediaRecorder !== "undefined" &&
    typeof WebSocket !== "undefined";

  async function getAccessToken(): Promise<TokenResponse> {
    const res = await fetch("/api/notes/token", {
      method: "POST",
    });
    return res.json() as Promise<TokenResponse>;
  }

  function stopMicrophoneTracks() {
    mediaStreamRef.current?.getTracks().forEach(track => track.stop());
    mediaStreamRef.current = null;
  }

  function sendEndToCorti() {
    const ws = wsRef.current;

    if (!ws || ws.readyState !== WebSocket.OPEN) {
      return;
    }

    ws.send(JSON.stringify({ type: "end" }));
  }

  function closeCortiSocket() {
    const ws = wsRef.current;

    if (!ws) {
      return;
    }

    if (
      ws.readyState === WebSocket.CONNECTING ||
      ws.readyState === WebSocket.OPEN
    ) {
      ws.close();
    }

    wsRef.current = null;
  }

  function cleanupRecordingSession() {
    shouldSendEndOnRecorderStopRef.current = false;
    configAcceptedRef.current = false;
    isStartingRef.current = false;

    const recorder = mediaRecorderRef.current;

    if (recorder && recorder.state !== "inactive") {
      try {
        recorder.stop();
      } catch {
        // Ignore cleanup-only recorder errors.
      }
    }

    mediaRecorderRef.current = null;
    stopMicrophoneTracks();
    closeCortiSocket();
  }

  function handleCortiMessage(msg: CortiMessage) {
    switch (msg.type) {
      case "transcript": {
        const text = msg.data?.text?.trim();

        if (!text) {
          return;
        }

        if (msg.data?.isFinal) {
          finalRef.current = appendTranscriptText(finalRef.current, text);
          interimRef.current = "";
        } else {
          interimRef.current = text;
        }

        setTranscript(
          joinTranscriptParts(finalRef.current, interimRef.current)
        );
        return;
      }

      case "error": {
        const errorMessage =
          typeof msg.error === "string"
            ? msg.error
            : msg.error?.details ||
            msg.error?.title ||
            "Corti returned an error.";

        setError(errorMessage);
        return;
      }

      case "CONFIG_DENIED":
      case "CONFIG_TIMEOUT":
      case "CONFIG_ALREADY_RECEIVED":
      case "CONFIG_MISSING": {
        setError(msg.reason || `Corti configuration failed: ${msg.type}`);
        return;
      }

      case "ended": {
        configAcceptedRef.current = false;
        closeCortiSocket();
        return;
      }

      default:
        return;
    }
  }

  function parseCortiMessage(event: MessageEvent) {
    if (typeof event.data !== "string") {
      return null;
    }

    try {
      return JSON.parse(event.data) as CortiMessage;
    } catch {
      return null;
    }
  }

  function doStop() {
    cleanupRecordingSession();
  }

  async function startRecording() {
    if (step !== "idle" || isStartingRef.current) {
      return;
    }

    if (!canRecord) {
      setError(
        "Recording is not supported in this browser. Try Chrome or Edge."
      );
      return;
    }

    isStartingRef.current = true;
    shouldSendEndOnRecorderStopRef.current = false;
    configAcceptedRef.current = false;

    setRecordingStartedAt(getCurrentDateTimeLabel());
    setError("");
    setTranscript("");
    finalRef.current = "";
    interimRef.current = "";

    try {
      const mimeType = getBestSupportedMimeType();

      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });

      mediaStreamRef.current = stream;

      const recorder = new MediaRecorder(
        stream,
        mimeType ? { mimeType } : undefined
      );

      mediaRecorderRef.current = recorder;

      const { token } = await getAccessToken();
      setToken(token);

      const wsUrl =
        `wss://api.${CORTI_ENVIRONMENT}.corti.app/audio-bridge/v2/transcribe` +
        `?tenant-name=${encodeURIComponent(CORTI_TENANT_NAME)}` +
        `&token=${encodeURIComponent(`Bearer ${token}`)}`;

      const ws = new WebSocket(wsUrl);
      wsRef.current = ws;

      recorder.addEventListener("dataavailable", event => {
        if (!event.data || event.data.size === 0) {
          return;
        }

        if (ws.readyState !== WebSocket.OPEN || !configAcceptedRef.current) {
          return;
        }

        ws.send(event.data);
      });

      recorder.addEventListener("stop", () => {
        stopMicrophoneTracks();

        if (shouldSendEndOnRecorderStopRef.current) {
          sendEndToCorti();
        }
      });

      const configAcceptedPromise = new Promise<void>((resolve, reject) => {
        let settled = false;

        const timeoutId = window.setTimeout(() => {
          if (settled) {
            return;
          }

          settled = true;
          reject(new Error("Timed out waiting for Corti CONFIG_ACCEPTED."));
        }, 10_000);

        function resolveOnce() {
          if (settled) {
            return;
          }

          settled = true;
          window.clearTimeout(timeoutId);
          resolve();
        }

        function rejectOnce(error: Error) {
          if (settled) {
            return;
          }

          settled = true;
          window.clearTimeout(timeoutId);
          reject(error);
        }

        ws.addEventListener("open", () => {
          const audioFormat = toCortiAudioFormat(recorder.mimeType || mimeType);

          ws.send(
            JSON.stringify({
              type: "config",
              configuration: {
                primaryLanguage: "en",
                interimResults: true,
                spokenPunctuation: false,
                automaticPunctuation: true,
                commands: [],
                ...(audioFormat ? { audioFormat } : {}),
              },
            })
          );
        });

        ws.addEventListener("message", event => {
          const msg = parseCortiMessage(event);

          if (!msg) {
            return;
          }

          handleCortiMessage(msg);

          if (msg.type === "CONFIG_ACCEPTED") {
            resolveOnce();
            return;
          }

          if (
            msg.type === "CONFIG_DENIED" ||
            msg.type === "CONFIG_TIMEOUT" ||
            msg.type === "CONFIG_ALREADY_RECEIVED" ||
            msg.type === "CONFIG_MISSING"
          ) {
            rejectOnce(
              new Error(msg.reason || `Corti configuration failed: ${msg.type}`)
            );
          }
        });

        ws.addEventListener("error", () => {
          rejectOnce(new Error("Corti websocket error."));
        });

        ws.addEventListener("close", () => {
          if (!configAcceptedRef.current) {
            rejectOnce(
              new Error("Corti websocket closed before configuration.")
            );
          }
        });
      });

      await configAcceptedPromise;

      configAcceptedRef.current = true;

      // Corti recommends 250–500 ms audio chunks.
      recorder.start(500);

      setStep("recording");
    } catch (err) {
      cleanupRecordingSession();
      setStep("idle");
      setRecordingStartedAt("");
      setError(getErrorMessage(err));
    } finally {
      isStartingRef.current = false;
    }
  }

  function stopRecording() {
    if (step !== "recording") {
      return;
    }

    setStep("recorded");

    const recorder = mediaRecorderRef.current;

    shouldSendEndOnRecorderStopRef.current = true;

    if (!recorder || recorder.state === "inactive") {
      sendEndToCorti();
      stopMicrophoneTracks();
      return;
    }

    try {
      recorder.requestData();
    } catch {
      // Some browsers throw if requestData is called too close to stop().
    }

    recorder.stop();
  }

  useEffect(() => {
    return () => {
      cleanupRecordingSession();
    };
  }, []);

  async function generateNote() {
    setStep("generating");
    setNote(transcript);
    const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
    await delay(2000);
    setStep("done");
  }

  function reset() {
    cleanupRecordingSession();

    finalRef.current = "";
    interimRef.current = "";

    setStep("idle");
    setTranscript("");
    setNote("");
    setError("");
    setPatientName("");
    setVisitDate(getTodayDateInputValue());
    setRecordingStartedAt("");
  }

  async function copyNote() {
    await navigator.clipboard.writeText(note);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function copyTranscript() {
    await navigator.clipboard.writeText(transcript);
    setCopiedTranscript(true);
    setTimeout(() => setCopiedTranscript(false), 2000);
  }

  const stepIdx = {
    idle: 0,
    recording: 0,
    recorded: 1,
    generating: 1,
    done: 2,
  };
  const currentIdx = stepIdx[step];

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#110d1d_0%,#151124_52%,#0f0b19_100%)] text-foreground">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-[-8rem] top-[-4rem] h-[32rem] w-[32rem] rounded-full bg-[#a88dff]/10 blur-3xl" />
      </div>

      <header className="relative z-20 flex items-center gap-4 px-8 py-5 sm:px-14 lg:px-20">
        <a
          href="/patients"
          className="inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" /> Dashboard
        </a>
      </header>

      <main className="relative z-10 px-8 pb-28 pt-6 sm:px-14 lg:px-20">
        <div className="mx-auto max-w-[720px]">
          <div className="min-h-[62vh]">
            <div className="pt-12">
              <h1 className="font-display text-[2rem] font-semibold tracking-[-0.04em] text-white sm:text-[2.4rem]">
                Meeting Note Generator
              </h1>
              <p className="mt-2 text-sm text-white/44">
                Record a patient visit and generate a structured SOAP note.
              </p>
            </div>

            {!composerOpen ? (
              <div className="mt-8">
                <button
                  onClick={() => setComposerOpen(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#c8b7ff] px-6 py-3.5 text-base font-semibold text-[#17120d] transition duration-200 hover:-translate-y-0.5 hover:bg-[#d6caff]"
                >
                  Create New Note
                </button>
              </div>
            ) : (
              <div className="mt-8 flex flex-col gap-6">
                {/* ── IDLE / RECORDING ── */}
                {(step === "idle" || step === "recording") && (
                  <>
                    {/* Patient name */}
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-white/70">
                        Patient Name
                      </label>
                      <input
                        type="text"
                        value={patientName}
                        onChange={e => setPatientName(e.target.value)}
                        placeholder="e.g. John Doe"
                        disabled={step === "recording"}
                        className="rounded-[1rem] border border-white/12 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-white/28 outline-none transition focus:border-[#c8b7ff]/50 focus:bg-white/[0.06] disabled:opacity-50"
                      />
                    </div>

                    {/* Visit date */}
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-white/70">
                        Date
                      </label>
                      <input
                        type="date"
                        value={visitDate}
                        onChange={e => setVisitDate(e.target.value)}
                        disabled={step === "recording"}
                        className="rounded-[1rem] border border-white/12 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition [color-scheme:dark] focus:border-[#c8b7ff]/50 focus:bg-white/[0.06] disabled:opacity-50"
                      />
                    </div>

                    {!canRecord && (
                      <p className="text-xs text-amber-400/80">
                        Speech recognition not supported. Try Chrome or Edge.
                      </p>
                    )}

                    {/* Record button + status */}
                    <div className="flex flex-col gap-3">
                      <label className="text-sm font-medium text-white/70">
                        Visit Recording
                      </label>

                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => {
                            if (step === "recording") {
                              stopRecording();
                            } else {
                              void startRecording();
                            }
                          }}
                          disabled={!canRecord}
                          className={`inline-flex items-center gap-2.5 rounded-full px-6 py-3 text-sm font-semibold transition duration-200 disabled:opacity-40 ${step === "recording"
                            ? "bg-rose-500/20 border border-rose-500/40 text-rose-300 hover:bg-rose-500/30"
                            : "bg-[#c8b7ff]/14 border border-[#c8b7ff]/30 text-[#c8b7ff] hover:bg-[#c8b7ff]/22"
                            }`}
                        >
                          {step === "recording" ? (
                            <>
                              <MicOff className="h-4 w-4" /> Stop Recording
                            </>
                          ) : (
                            <>
                              <Mic className="h-4 w-4" /> Start Recording
                            </>
                          )}
                        </button>

                        {step === "recording" && (
                          <span className="flex items-center gap-1.5 text-xs text-rose-400">
                            <span className="h-1.5 w-1.5 rounded-full bg-rose-400 animate-pulse" />
                            Recording…
                          </span>
                        )}

                        {recordingStartedAt && (
                          <span className="text-xs text-white/44">
                            Started at {recordingStartedAt}
                          </span>
                        )}
                      </div>

                      {/* Live transcript */}
                      {transcript ? (
                        <div className="rounded-[1.1rem] border border-white/10 bg-white/[0.03] p-4 min-h-[120px] max-h-[200px] overflow-y-auto">
                          <p className="text-sm leading-7 text-white/70 whitespace-pre-wrap">
                            {transcript}
                          </p>
                        </div>
                      ) : (
                        <div className="flex h-[100px] items-center justify-center rounded-[1.1rem] border border-dashed border-white/10 bg-white/[0.02]">
                          <p className="text-xs text-white/28">
                            {step === "recording"
                              ? "Listening…"
                              : "Transcript will appear here while recording"}
                          </p>
                        </div>
                      )}
                    </div>
                  </>
                )}

                {/* ── RECORDED ── show transcript + generate button */}
                {step === "recorded" && (
                  <>
                    <div className="flex items-center justify-between">
                      <h2 className="text-base font-semibold text-white">
                        Review &amp; Generate
                      </h2>
                      <button
                        onClick={() => {
                          setStep("idle");
                          setTranscript("");
                          setRecordingStartedAt("");
                          finalRef.current = "";
                          interimRef.current = "";
                        }}
                        className="inline-flex items-center gap-1.5 rounded-full border border-white/14 px-3 py-1.5 text-xs text-white/50 transition hover:bg-white/[0.06] hover:text-white"
                      >
                        <RotateCcw className="h-3 w-3" /> Re-record
                      </button>
                    </div>

                    {/* Patient name (editable still) */}
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-white/70">
                        Patient Name
                      </label>
                      <input
                        type="text"
                        value={patientName}
                        onChange={e => setPatientName(e.target.value)}
                        placeholder="e.g. John Doe"
                        className="rounded-[1rem] border border-white/12 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-white/28 outline-none transition focus:border-[#c8b7ff]/50 focus:bg-white/[0.06]"
                      />
                    </div>

                    {/* Visit date */}
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-white/70">
                        Date
                      </label>
                      <input
                        type="date"
                        value={visitDate}
                        onChange={e => setVisitDate(e.target.value)}
                        className="rounded-[1rem] border border-white/12 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none transition [color-scheme:dark] focus:border-[#c8b7ff]/50 focus:bg-white/[0.06]"
                      />
                    </div>

                    {/* Raw transcript */}
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center justify-between">
                        <label className="text-sm font-medium text-white/70">
                          Raw Transcript
                        </label>
                        <button
                          onClick={copyTranscript}
                          className="inline-flex items-center gap-1.5 rounded-full border border-white/14 px-3 py-1 text-xs text-white/50 transition hover:bg-white/[0.06] hover:text-white"
                        >
                          {copiedTranscript ? (
                            <>
                              <Check className="h-3 w-3 text-green-400" /> Copied
                            </>
                          ) : (
                            <>
                              <Copy className="h-3 w-3" /> Copy
                            </>
                          )}
                        </button>
                      </div>
                      <textarea
                        value={transcript}
                        onChange={e => setTranscript(e.target.value)}
                        rows={6}
                        className="rounded-[1.1rem] border border-white/10 bg-white/[0.03] p-4 text-sm leading-7 text-white/70 outline-none transition resize-none focus:border-[#c8b7ff]/40 focus:bg-white/[0.05]"
                        placeholder="No transcript captured — type manually if needed."
                      />
                      <p className="text-xs text-white/28">
                        You can edit the transcript before generating.
                      </p>
                    </div>

                    {error && <p className="text-sm text-rose-400">{error}</p>}

                    <button
                      onClick={generateNote}
                      disabled={!patientName.trim()}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#c8b7ff] py-3.5 text-base font-semibold text-[#17120d] transition duration-200 hover:-translate-y-0.5 hover:bg-[#d6caff] disabled:opacity-50 disabled:translate-y-0 sm:w-auto sm:px-10"
                    >
                      <FileText className="h-4 w-4" /> Generate Note →
                    </button>
                  </>
                )}

                {/* ── GENERATING ── */}
                {step === "generating" && (
                  <div className="flex flex-col items-center gap-4 py-16 text-center">
                    <Loader2 className="h-8 w-8 animate-spin text-[#c8b7ff]" />
                    <p className="text-sm text-white/60">Generating SOAP note…</p>
                  </div>
                )}

                {/* ── DONE ── show transcript + note side by side (stacked on mobile) */}
                {step === "done" && (
                  <>
                    <div className="flex items-center justify-between">
                      <h2 className="text-base font-semibold text-white">
                        Visit Note
                      </h2>
                      <button
                        onClick={reset}
                        className="inline-flex items-center gap-1.5 rounded-full border border-white/14 px-3.5 py-1.5 text-xs text-white/60 transition hover:bg-white/[0.06] hover:text-white"
                      >
                        <RotateCcw className="h-3.5 w-3.5" /> Start over
                      </button>
                    </div>

                    <div className="grid gap-5 lg:grid-cols-2">
                      {/* Raw transcript */}
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium uppercase tracking-wider text-white/38">
                            Raw Transcript
                          </span>
                          <button
                            onClick={copyTranscript}
                            className="inline-flex items-center gap-1 rounded-full border border-white/12 px-3 py-1 text-xs text-white/40 transition hover:bg-white/[0.06] hover:text-white"
                          >
                            {copiedTranscript ? (
                              <>
                                <Check className="h-3 w-3 text-green-400" /> Copied
                              </>
                            ) : (
                              <>
                                <Copy className="h-3 w-3" /> Copy
                              </>
                            )}
                          </button>
                        </div>
                        <div className="rounded-[1.2rem] border border-white/10 bg-white/[0.025] p-4 h-full min-h-[260px] overflow-y-auto">
                          <p className="text-sm leading-7 text-white/55 whitespace-pre-wrap">
                            {transcript || "—"}
                          </p>
                        </div>
                      </div>

                      {/* Formatted SOAP note */}
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium uppercase tracking-wider text-white/38">
                            SOAP Note
                          </span>
                          <button
                            onClick={copyNote}
                            className="inline-flex items-center gap-1 rounded-full border border-[#c8b7ff]/20 px-3 py-1 text-xs text-[#c8b7ff]/70 transition hover:bg-[#c8b7ff]/10 hover:text-[#c8b7ff]"
                          >
                            {copied ? (
                              <>
                                <Check className="h-3 w-3 text-green-400" /> Copied
                              </>
                            ) : (
                              <>
                                <Copy className="h-3 w-3" /> Copy
                              </>
                            )}
                          </button>
                        </div>
                        <div className="rounded-[1.2rem] border border-[#c8b7ff]/20 bg-[#c8b7ff]/[0.04] p-4 h-full min-h-[260px] overflow-y-auto">
                          <pre className="whitespace-pre-wrap font-sans text-sm leading-7 text-white/80">
                            {note}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
