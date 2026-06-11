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

declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition;
    webkitSpeechRecognition: typeof SpeechRecognition;
  }
}

export default function MeetingNoteGenerator() {
  const [patientName, setPatientName] = useState("");
  const [step, setStep] = useState<Step>("idle");
  const [transcript, setTranscript] = useState("");
  const [note, setNote] = useState("");
  const [copied, setCopied] = useState(false);
  const [copiedTranscript, setCopiedTranscript] = useState(false);
  const [error, setError] = useState("");

  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const isRecordingRef = useRef(false);
  // captures everything spoken — final + any interim not yet finalized
  const finalRef = useRef("");
  const interimRef = useRef("");

  const canRecord = !!(
    window.SpeechRecognition || window.webkitSpeechRecognition
  );

  function makeRecognition(): SpeechRecognition {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    const rec = new SR();
    rec.continuous = true;
    rec.interimResults = true;
    rec.lang = "en-US";

    rec.onresult = e => {
      let fin = "";
      let interim = "";
      for (let i = 0; i < e.results.length; i++) {
        if (e.results[i].isFinal) fin += e.results[i][0].transcript + " ";
        else interim += e.results[i][0].transcript;
      }
      finalRef.current = fin;
      interimRef.current = interim;
      setTranscript(fin + interim);
    };

    rec.onerror = e => {
      if ((e as SpeechRecognitionErrorEvent).error === "no-speech") return;
      doStop();
    };

    rec.onend = () => {
      if (!isRecordingRef.current) return;
      try {
        const next = makeRecognition();
        recognitionRef.current = next;
        next.start();
      } catch {
        doStop();
      }
    };

    return rec;
  }

  function doStop() {
    isRecordingRef.current = false;
    recognitionRef.current?.stop();
    recognitionRef.current = null;
    // prefer final; fall back to interim if Chrome hadn't finalized yet
    const full = (finalRef.current + interimRef.current).trim();
    setTranscript(full);
    interimRef.current = "";
    setStep("recorded");
  }

  function startRecording() {
    if (!canRecord) return;
    isRecordingRef.current = true;
    finalRef.current = "";
    interimRef.current = "";
    setTranscript("");
    setNote("");
    setError("");
    const rec = makeRecognition();
    recognitionRef.current = rec;
    rec.start();
    setStep("recording");
  }

  function stopRecording() {
    doStop();
  }

  useEffect(() => {
    return () => {
      isRecordingRef.current = false;
      recognitionRef.current?.stop();
    };
  }, []);

  async function generateNote() {
    if (!patientName.trim()) return;
    setStep("generating");
    setError("");
    try {
      const res = await fetch("/api/notes/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ patientName: patientName.trim(), transcript }),
      });
      if (!res.ok) throw new Error("Generation failed.");
      const data = await res.json();
      setNote(data.note);
      setStep("done");
    } catch (e) {
      setError((e as Error).message);
      setStep("recorded");
    }
  }

  function reset() {
    isRecordingRef.current = false;
    recognitionRef.current?.stop();
    recognitionRef.current = null;
    finalRef.current = "";
    interimRef.current = "";
    setStep("idle");
    setTranscript("");
    setNote("");
    setError("");
    setPatientName("");
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

  const stepLabels = ["Connect", "Organize", "Execute"];
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
          <h1 className="font-display text-[2rem] font-semibold tracking-[-0.04em] text-white sm:text-[2.4rem]">
            Meeting Note Generator
          </h1>
          <p className="mt-2 text-sm text-white/44">
            Record a patient visit and generate a structured SOAP note.
          </p>

          {/* Step indicator */}
          <div className="mt-8 flex items-center gap-2 text-xs text-white/38">
            {stepLabels.map((s, i) => (
              <span key={s} className="flex items-center gap-2">
                {i > 0 && <span className="h-px w-6 bg-white/14" />}
                <span
                  className={
                    i <= currentIdx ? "text-[#c8b7ff] font-medium" : ""
                  }
                >
                  {s}
                </span>
              </span>
            ))}
          </div>

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
                      onClick={
                        step === "recording" ? stopRecording : startRecording
                      }
                      disabled={!canRecord}
                      className={`inline-flex items-center gap-2.5 rounded-full px-6 py-3 text-sm font-semibold transition duration-200 disabled:opacity-40 ${
                        step === "recording"
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
        </div>
      </main>
    </div>
  );
}
