import { useRef, useState, useEffect, type FormEvent } from "react";
import {
  ArrowLeft,
  Mic,
  MicOff,
  FileText,
  Copy,
  Check,
  Ellipsis,
  Loader2,
  Pencil,
  RotateCcw,
  Trash2,
} from "lucide-react";
import { apiUrl } from "@/lib/api";
import { getAuthorizationHeader } from "@/lib/auth";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Step = "idle" | "recording" | "recorded" | "generating" | "done";

interface TokenResponse {
  token: string;
}

type CreateNoteResponse = {
  id: string;
};

type GenerateSoapResponse = {
  soap_text: string;
};

type SavedNote = {
  id: string;
  patient_name: string;
  date: string;
};

type SavedNoteDetails = SavedNote & {
  provider: string | null;
  corti_interaction_id: string | null;
  recording_start_time: string | null;
  transcript: string | null;
  comments?: string | null;
  soap_document: string | null;
  created_at: string;
  updated_at: string;
};

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

// FIXME: This shouldn't be in the FE.
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

function getCurrentDateTimeLabel(date = new Date()) {
  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

function formatRecordingStartTime(dateValue: string | null) {
  if (!dateValue) {
    return "";
  }

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return getCurrentDateTimeLabel(date);
}

function formatSavedNoteDate(dateValue: string) {
  const [year, month, day] = dateValue.split("-").map(Number);

  if (!year || !month || !day) {
    return dateValue;
  }

  return new Intl.DateTimeFormat(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  }).format(new Date(year, month - 1, day));
}

export default function MeetingNoteGenerator() {
  const [patientName, setPatientName] = useState("");
  const [visitDate, setVisitDate] = useState(() => getTodayDateInputValue());
  const [recordingStartedAt, setRecordingStartedAt] = useState("");
  const [step, setStep] = useState<Step>("idle");
  const [composerOpen, setComposerOpen] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [comments, setComments] = useState("");
  const [note, setNote] = useState("");
  const [copied, setCopied] = useState(false);
  const [copiedTranscript, setCopiedTranscript] = useState(false);
  const [error, setError] = useState("");
  const [noteId, setNoteId] = useState("");
  const [savedNotes, setSavedNotes] = useState<SavedNote[]>([]);
  const [savedNotesLoading, setSavedNotesLoading] = useState(true);
  const [savedNotesError, setSavedNotesError] = useState("");
  const [selectedSavedNoteId, setSelectedSavedNoteId] = useState("");
  const [loadingSavedNoteId, setLoadingSavedNoteId] = useState("");
  const [savedNoteOpenError, setSavedNoteOpenError] = useState("");
  const [editingSavedNote, setEditingSavedNote] = useState<SavedNote | null>(
    null
  );
  const [editedNoteTitle, setEditedNoteTitle] = useState("");
  const [editTitleError, setEditTitleError] = useState("");
  const [savingSavedNoteTitle, setSavingSavedNoteTitle] = useState(false);
  const [deletingSavedNote, setDeletingSavedNote] = useState<SavedNote | null>(
    null
  );
  const [deleteError, setDeleteError] = useState("");
  const [deletingSavedNoteId, setDeletingSavedNoteId] = useState("");

  const wsRef = useRef<WebSocket | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);

  const isStartingRef = useRef(false);
  const configAcceptedRef = useRef(false);
  const shouldSendEndOnRecorderStopRef = useRef(false);
  const noteIdRef = useRef("");

  // const recognitionRef = useRef<SpeechRecognition | null>(null);
  // const isRecordingRef = useRef(false);
  // captures everything spoken — final + any interim not yet finalized
  const finalRef = useRef("");
  const interimRef = useRef("");
  const transcriptLockedRef = useRef(false);

  const canRecord =
    typeof window !== "undefined" &&
    typeof navigator !== "undefined" &&
    !!navigator.mediaDevices?.getUserMedia &&
    typeof MediaRecorder !== "undefined" &&
    typeof WebSocket !== "undefined";

  async function getAccessToken(): Promise<TokenResponse> {
    const res = await fetch(apiUrl("/note/token"), {
      method: "POST",
      headers: getAuthorizationHeader(),
    });
    return res.json() as Promise<TokenResponse>;
  }

  async function getSavedNotes(): Promise<SavedNote[]> {
    const res = await fetch(apiUrl("/note"), {
      headers: getAuthorizationHeader(),
    });

    if (!res.ok) {
      throw new Error(`Failed to load saved notes (${res.status}).`);
    }

    const notes = (await res.json()) as SavedNote[];
    return Array.isArray(notes) ? notes : [];
  }

  async function getSavedNote(noteId: string): Promise<SavedNoteDetails> {
    const res = await fetch(apiUrl(`/note/${noteId}`), {
      headers: getAuthorizationHeader(),
    });

    if (!res.ok) {
      throw new Error(`Failed to load saved note (${res.status}).`);
    }

    return res.json() as Promise<SavedNoteDetails>;
  }

  async function loadSavedNotes({
    showLoading = true,
    isActive = () => true,
  }: {
    showLoading?: boolean;
    isActive?: () => boolean;
  } = {}) {
    if (showLoading) {
      setSavedNotesLoading(true);
    }

    if (showLoading) {
      setSavedNotesError("");
      setSavedNoteOpenError("");
    }

    try {
      const notes = await getSavedNotes();

      if (isActive()) {
        setSavedNotes(notes);
      }
    } catch (err) {
      if (showLoading && isActive()) {
        setSavedNotesError(getErrorMessage(err));
      }
    } finally {
      if (showLoading && isActive()) {
        setSavedNotesLoading(false);
      }
    }
  }

  async function openSavedNote(savedNoteId: string) {
    if (step === "recording" || step === "generating") {
      return;
    }

    cleanupRecordingSession();
    setLoadingSavedNoteId(savedNoteId);
    setError("");
    setSavedNoteOpenError("");

    try {
      const savedNote = await getSavedNote(savedNoteId);
      const savedTranscript = savedNote.transcript ?? "";
      const savedComments = savedNote.comments ?? "";
      const savedSoapDocument = savedNote.soap_document ?? "";

      finalRef.current = savedTranscript;
      interimRef.current = "";
      transcriptLockedRef.current = true;
      noteIdRef.current = savedNote.id;

      setComposerOpen(true);
      setPatientName(savedNote.patient_name);
      setVisitDate(savedNote.date);
      setRecordingStartedAt(
        formatRecordingStartTime(savedNote.recording_start_time)
      );
      setTranscript(savedTranscript);
      setComments(savedComments);
      setNote(savedSoapDocument);
      setNoteId(savedNote.id);
      setSelectedSavedNoteId(savedNote.id);
      setCopied(false);
      setCopiedTranscript(false);
      setStep(savedSoapDocument.trim() ? "done" : "recorded");
    } catch (err) {
      setSavedNoteOpenError(getErrorMessage(err));
    } finally {
      setLoadingSavedNoteId("");
    }
  }

  async function createNote({
    startedAt,
  }: {
    startedAt: string;
  }): Promise<CreateNoteResponse> {
    const res = await fetch(apiUrl("/note"), {
      method: "POST",
      headers: {
        ...getAuthorizationHeader(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        patient_name: patientName.trim(),
        date: visitDate,
        provider: null,
        recording_start_time: startedAt,
        transcript: null,
        soap_document: null,
      }),
    });

    if (!res.ok) {
      throw new Error(`Failed to create note (${res.status}).`);
    }

    return res.json() as Promise<CreateNoteResponse>;
  }

  async function updateNoteTranscript(noteId: string, transcript: string) {
    const res = await fetch(apiUrl(`/note/${noteId}`), {
      method: "PATCH",
      headers: {
        ...getAuthorizationHeader(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ transcript }),
    });

    if (!res.ok) {
      throw new Error(`Failed to update note transcript (${res.status}).`);
    }
  }

  async function updateSavedNoteTitle(noteId: string, patientName: string) {
    const res = await fetch(apiUrl(`/note/${noteId}`), {
      method: "PATCH",
      headers: {
        ...getAuthorizationHeader(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ patient_name: patientName }),
    });

    if (!res.ok) {
      throw new Error(`Failed to update note title (${res.status}).`);
    }
  }

  async function deleteSavedNote(noteId: string) {
    const res = await fetch(apiUrl(`/note/${noteId}`), {
      method: "DELETE",
      headers: getAuthorizationHeader(),
    });

    if (!res.ok) {
      throw new Error(`Failed to delete note (${res.status}).`);
    }
  }

  function startEditingSavedNote(savedNote: SavedNote) {
    setEditingSavedNote(savedNote);
    setEditedNoteTitle(savedNote.patient_name);
    setEditTitleError("");
  }

  function closeEditTitleDialog() {
    if (savingSavedNoteTitle) {
      return;
    }

    setEditingSavedNote(null);
    setEditedNoteTitle("");
    setEditTitleError("");
  }

  async function saveSavedNoteTitle(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!editingSavedNote) {
      return;
    }

    const patientName = editedNoteTitle.trim();

    if (!patientName) {
      setEditTitleError("Enter a note title.");
      return;
    }

    setSavingSavedNoteTitle(true);
    setEditTitleError("");

    try {
      await updateSavedNoteTitle(editingSavedNote.id, patientName);
      setSavedNotes(currentNotes =>
        currentNotes.map(savedNote =>
          savedNote.id === editingSavedNote.id
            ? { ...savedNote, patient_name: patientName }
            : savedNote
        )
      );

      if (selectedSavedNoteId === editingSavedNote.id) {
        setPatientName(patientName);
      }

      setEditingSavedNote(null);
      setEditedNoteTitle("");
    } catch (err) {
      setEditTitleError(getErrorMessage(err));
    } finally {
      setSavingSavedNoteTitle(false);
    }
  }

  function startDeletingSavedNote(savedNote: SavedNote) {
    setDeletingSavedNote(savedNote);
    setDeleteError("");
  }

  function closeDeleteDialog() {
    if (deletingSavedNoteId) {
      return;
    }

    setDeletingSavedNote(null);
    setDeleteError("");
  }

  async function confirmDeleteSavedNote() {
    if (!deletingSavedNote) {
      return;
    }

    const savedNoteId = deletingSavedNote.id;
    setDeletingSavedNoteId(savedNoteId);
    setDeleteError("");

    try {
      await deleteSavedNote(savedNoteId);
      setSavedNotes(currentNotes =>
        currentNotes.filter(savedNote => savedNote.id !== savedNoteId)
      );

      if (selectedSavedNoteId === savedNoteId) {
        reset();
        setComposerOpen(false);
      }

      setDeletingSavedNote(null);
    } catch (err) {
      setDeleteError(getErrorMessage(err));
    } finally {
      setDeletingSavedNoteId("");
    }
  }

  async function generateSoapDocument({
    noteId,
    transcript,
    comments,
  }: {
    noteId: string;
    transcript: string;
    comments: string;
  }): Promise<GenerateSoapResponse> {
    const res = await fetch(apiUrl(`/note/${noteId}/soap`), {
      method: "POST",
      headers: {
        ...getAuthorizationHeader(),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        transcript,
        comments,
      }),
    });

    if (!res.ok) {
      throw new Error(`Failed to generate SOAP note (${res.status}).`);
    }

    return res.json() as Promise<GenerateSoapResponse>;
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
        if (transcriptLockedRef.current) {
          return;
        }

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

    if (!patientName.trim()) {
      setError("Enter a patient name before starting the recording.");
      return;
    }

    const recordingStartedAtDate = new Date();
    const recordingStartedAtIso = recordingStartedAtDate.toISOString();

    isStartingRef.current = true;
    shouldSendEndOnRecorderStopRef.current = false;
    configAcceptedRef.current = false;

    setRecordingStartedAt(getCurrentDateTimeLabel(recordingStartedAtDate));
    setError("");
    setNoteId("");
    noteIdRef.current = "";
    setTranscript("");
    setComments("");
    finalRef.current = "";
    interimRef.current = "";
    transcriptLockedRef.current = false;

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

      const createdNote = await createNote({
        startedAt: recordingStartedAtIso,
      });
      setNoteId(createdNote.id);
      noteIdRef.current = createdNote.id;
      setSavedNotes(currentNotes => [
        {
          id: createdNote.id,
          patient_name: patientName.trim(),
          date: visitDate,
        },
        ...currentNotes,
      ]);
      void loadSavedNotes({ showLoading: false });

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
      setSelectedSavedNoteId(createdNote.id);
    } catch (err) {
      cleanupRecordingSession();
      setStep("idle");
      setRecordingStartedAt("");
      setNoteId("");
      noteIdRef.current = "";
      setError(getErrorMessage(err));
    } finally {
      isStartingRef.current = false;
    }
  }

  async function stopRecording() {
    if (step !== "recording") {
      return;
    }

    const recorder = mediaRecorderRef.current;
    const currentTranscript =
      joinTranscriptParts(finalRef.current, interimRef.current) || transcript;

    setTranscript(currentTranscript);
    setStep("recorded");

    shouldSendEndOnRecorderStopRef.current = true;

    if (!recorder || recorder.state === "inactive") {
      sendEndToCorti();
      stopMicrophoneTracks();
    } else {
      try {
        recorder.requestData();
      } catch {
        // Some browsers throw if requestData is called too close to stop().
      }

      recorder.stop();
    }

    const currentNoteId = noteIdRef.current || noteId;

    if (!currentNoteId) {
      setError("Unable to save transcript because the note was not created.");
      return;
    }

    try {
      await updateNoteTranscript(currentNoteId, currentTranscript);
    } catch (err) {
      setError(getErrorMessage(err));
    }
  }

  useEffect(() => {
    return () => {
      cleanupRecordingSession();
    };
  }, []);

  useEffect(() => {
    let active = true;

    void loadSavedNotes({
      isActive: () => active,
    });

    return () => {
      active = false;
    };
  }, []);

  async function generateNote() {
    const currentNoteId = noteIdRef.current || noteId;

    if (!currentNoteId) {
      setError("Unable to generate note because the note is missing.");
      return;
    }

    const currentTranscript = transcript.trim();
    const currentComments = comments.trim();

    if (!currentTranscript) {
      setError("Add a transcript before generating the note.");
      return;
    }

    setStep("generating");
    setError("");
    finalRef.current = currentTranscript;
    interimRef.current = "";
    transcriptLockedRef.current = true;
    setTranscript(currentTranscript);

    try {
      const responseBody = await generateSoapDocument({
        noteId: currentNoteId,
        transcript: currentTranscript,
        comments: currentComments,
      });

      console.log(responseBody);
      setNote(responseBody.soap_text);
      setStep("done");
    } catch (err) {
      setStep("recorded");
      setError(getErrorMessage(err));
    }
  }

  function reset() {
    cleanupRecordingSession();

    finalRef.current = "";
    interimRef.current = "";
    transcriptLockedRef.current = true;

    setStep("idle");
    setTranscript("");
    setComments("");
    setNote("");
    setError("");
    setNoteId("");
    noteIdRef.current = "";
    setPatientName("");
    setVisitDate(getTodayDateInputValue());
    setRecordingStartedAt("");
    setSelectedSavedNoteId("");
    setLoadingSavedNoteId("");
    setSavedNoteOpenError("");
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
        <div className="mx-auto grid max-w-[1120px] gap-10 lg:grid-cols-[minmax(0,720px)_280px] lg:items-start lg:justify-center">
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
                              void stopRecording();
                            } else {
                              void startRecording();
                            }
                          }}
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

                      {step === "recording" && (
                        <div className="flex flex-col gap-2">
                          <label className="text-sm font-medium text-white/70">
                            Comments
                          </label>
                          <textarea
                            value={comments}
                            onChange={e => setComments(e.target.value)}
                            rows={3}
                            className="rounded-[1.1rem] border border-white/10 bg-white/[0.03] p-4 text-sm leading-6 text-white/70 outline-none transition resize-none focus:border-[#c8b7ff]/40 focus:bg-white/[0.05]"
                            placeholder="Add any context or comments while recording."
                          />
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
                          setComments("");
                          setRecordingStartedAt("");
                          setNoteId("");
                          noteIdRef.current = "";
                          setSelectedSavedNoteId("");
                          setLoadingSavedNoteId("");
                          finalRef.current = "";
                          interimRef.current = "";
                          transcriptLockedRef.current = true;
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
                              <Check className="h-3 w-3 text-green-400" />{" "}
                              Copied
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
                        onChange={e => {
                          const nextTranscript = e.target.value;
                          transcriptLockedRef.current = true;
                          finalRef.current = nextTranscript;
                          interimRef.current = "";
                          setTranscript(nextTranscript);
                        }}
                        rows={6}
                        className="rounded-[1.1rem] border border-white/10 bg-white/[0.03] p-4 text-sm leading-7 text-white/70 outline-none transition resize-none focus:border-[#c8b7ff]/40 focus:bg-white/[0.05]"
                        placeholder="No transcript captured — type manually if needed."
                      />
                      <p className="text-xs text-white/28">
                        You can edit the transcript before generating.
                      </p>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-medium text-white/70">
                        Comments
                      </label>
                      <textarea
                        value={comments}
                        onChange={e => setComments(e.target.value)}
                        rows={4}
                        className="rounded-[1.1rem] border border-white/10 bg-white/[0.03] p-4 text-sm leading-6 text-white/70 outline-none transition resize-none focus:border-[#c8b7ff]/40 focus:bg-white/[0.05]"
                        placeholder="Add any additional context before generating."
                      />
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
                    <p className="text-sm text-white/60">
                      Generating SOAP note…
                    </p>
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
                                <Check className="h-3 w-3 text-green-400" />{" "}
                                Copied
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
                                <Check className="h-3 w-3 text-green-400" />{" "}
                                Copied
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

          <aside className="lg:sticky lg:top-8">
            <div className="rounded-[1.1rem] border border-white/10 bg-white/[0.035] p-3">
              <div className="flex items-center justify-between gap-3 px-2 py-2">
                <h2 className="text-sm font-semibold text-white">
                  Saved Notes
                </h2>
                <button
                  type="button"
                  onClick={() => void loadSavedNotes()}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/12 text-white/45 transition hover:bg-white/[0.06] hover:text-white disabled:opacity-40"
                  disabled={savedNotesLoading}
                  aria-label="Refresh saved notes"
                  title="Refresh saved notes"
                >
                  <RotateCcw
                    className={`h-3.5 w-3.5 ${
                      savedNotesLoading ? "animate-spin" : ""
                    }`}
                  />
                </button>
              </div>

              {savedNoteOpenError && (
                <p className="mx-2 mb-2 rounded-xl border border-rose-500/20 bg-rose-500/10 px-3 py-2 text-xs leading-5 text-rose-200/80">
                  {savedNoteOpenError}
                </p>
              )}

              {savedNotesLoading ? (
                <div className="flex items-center gap-2 px-2 py-4 text-xs text-white/40">
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-[#c8b7ff]" />
                  Loading notes
                </div>
              ) : savedNotesError ? (
                <div className="px-2 py-4">
                  <p className="text-xs leading-5 text-rose-300/80">
                    {savedNotesError}
                  </p>
                  <button
                    type="button"
                    onClick={() => void loadSavedNotes()}
                    className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-white/14 px-3 py-1.5 text-xs text-white/55 transition hover:bg-white/[0.06] hover:text-white"
                  >
                    <RotateCcw className="h-3 w-3" /> Retry
                  </button>
                </div>
              ) : savedNotes.length > 0 ? (
                <ul className="max-h-[calc(100vh-13rem)] space-y-1 overflow-y-auto pr-1">
                  {savedNotes.map(savedNote => (
                    <li
                      key={savedNote.id}
                      className="group relative rounded-xl"
                    >
                      <button
                        type="button"
                        onClick={() => void openSavedNote(savedNote.id)}
                        disabled={
                          step === "recording" ||
                          step === "generating" ||
                          Boolean(loadingSavedNoteId)
                        }
                        className={`w-full rounded-xl px-3 py-2.5 pr-11 text-left transition disabled:cursor-not-allowed disabled:opacity-45 ${
                          selectedSavedNoteId === savedNote.id
                            ? "bg-[#c8b7ff]/12"
                            : "hover:bg-white/[0.055]"
                        }`}
                      >
                        <span className="flex items-center justify-between gap-2">
                          <span className="truncate text-sm font-medium text-white/78">
                            {savedNote.patient_name}
                          </span>
                          {loadingSavedNoteId === savedNote.id && (
                            <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin text-[#c8b7ff]" />
                          )}
                        </span>
                        <time
                          dateTime={savedNote.date}
                          className="mt-1 block text-xs text-white/38"
                        >
                          {formatSavedNoteDate(savedNote.date)}
                        </time>
                      </button>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button
                            type="button"
                            className="pointer-events-none absolute right-2 top-2.5 inline-flex h-7 w-7 items-center justify-center rounded-md text-white/45 opacity-0 transition hover:bg-white/[0.09] hover:text-white focus:pointer-events-auto focus:bg-white/[0.09] focus:text-white focus:opacity-100 group-hover:pointer-events-auto group-hover:opacity-100"
                            aria-label={`Actions for ${savedNote.patient_name}`}
                            title="Note actions"
                          >
                            <Ellipsis className="h-4 w-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="min-w-32 border-white/10 bg-[#211b31] text-white shadow-xl"
                        >
                          <DropdownMenuItem
                            onSelect={() => startEditingSavedNote(savedNote)}
                            className="cursor-pointer text-white/85 focus:bg-white/[0.1] focus:text-white"
                          >
                            <Pencil className="h-3.5 w-3.5" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            variant="destructive"
                            onSelect={() => startDeletingSavedNote(savedNote)}
                            className="cursor-pointer text-rose-400 focus:bg-rose-500/10 focus:text-rose-300"
                          >
                            <Trash2 className="h-3.5 w-3.5 text-rose-400" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="px-2 py-4 text-xs text-white/35">
                  No notes yet.
                </div>
              )}
            </div>
          </aside>
        </div>
      </main>

      <Dialog
        open={Boolean(editingSavedNote)}
        onOpenChange={open => {
          if (!open) {
            closeEditTitleDialog();
          }
        }}
      >
        <DialogContent className="border-white/10 bg-[#211b31] text-white sm:max-w-md">
          <form onSubmit={saveSavedNoteTitle}>
            <DialogHeader>
              <DialogTitle>Edit note title</DialogTitle>
              <DialogDescription className="text-white/55">
                Update the patient name used for this note.
              </DialogDescription>
            </DialogHeader>
            <div className="mt-5">
              <label
                htmlFor="saved-note-title"
                className="mb-2 block text-sm font-medium text-white/70"
              >
                Note title
              </label>
              <input
                id="saved-note-title"
                type="text"
                value={editedNoteTitle}
                onChange={event => setEditedNoteTitle(event.target.value)}
                autoFocus
                disabled={savingSavedNoteTitle}
                className="w-full rounded-xl border border-white/12 bg-white/[0.05] px-3 py-2.5 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-[#c8b7ff]/50 focus:bg-white/[0.07] disabled:opacity-50"
              />
              {editTitleError && (
                <p className="mt-2 text-sm text-rose-300">{editTitleError}</p>
              )}
            </div>
            <DialogFooter className="mt-6">
              <button
                type="button"
                onClick={closeEditTitleDialog}
                disabled={savingSavedNoteTitle}
                className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white/70 transition hover:bg-white/[0.07] hover:text-white disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={savingSavedNoteTitle}
                className="rounded-full bg-[#c8b7ff] px-4 py-2 text-sm font-semibold text-[#17120d] transition hover:bg-[#d6caff] disabled:opacity-50"
              >
                {savingSavedNoteTitle ? "Saving…" : "Save"}
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog
        open={Boolean(deletingSavedNote)}
        onOpenChange={open => {
          if (!open) {
            closeDeleteDialog();
          }
        }}
      >
        <DialogContent className="border-white/10 bg-[#211b31] text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete {deletingSavedNote?.patient_name}?</DialogTitle>
            <DialogDescription className="text-white/55">
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          {deleteError && (
            <p className="text-sm text-rose-300">{deleteError}</p>
          )}
          <DialogFooter className="mt-2">
            <button
              type="button"
              onClick={closeDeleteDialog}
              disabled={Boolean(deletingSavedNoteId)}
              className="rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white/70 transition hover:bg-white/[0.07] hover:text-white disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => void confirmDeleteSavedNote()}
              disabled={Boolean(deletingSavedNoteId)}
              className="rounded-full bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-400 disabled:opacity-50"
            >
              {deletingSavedNoteId ? "Deleting…" : "Delete"}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
