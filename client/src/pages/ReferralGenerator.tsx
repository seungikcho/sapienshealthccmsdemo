import { useRef, useState } from "react";
import { ArrowLeft, Upload, FileText, X, CheckCircle, Loader2, Download } from "lucide-react";

type UploadedFile = { file: File; url: string };
type Step = "upload" | "preview" | "generating" | "done";

function DropZone({
  label,
  sublabel,
  value,
  onChange,
}: {
  label: string;
  sublabel: string;
  value: UploadedFile | null;
  onChange: (f: UploadedFile | null) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  function accept(file: File) {
    if (file.type !== "application/pdf") return;
    onChange({ file, url: URL.createObjectURL(file) });
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="text-sm font-semibold text-white/80">{label}</div>
      {!value ? (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setDragging(false);
            const f = e.dataTransfer.files[0];
            if (f) accept(f);
          }}
          className={`flex h-44 w-full flex-col items-center justify-center gap-3 rounded-[1.3rem] border-2 border-dashed transition duration-200 ${
            dragging
              ? "border-[#c8b7ff]/60 bg-[#c8b7ff]/8"
              : "border-white/14 bg-white/[0.03] hover:border-[#c8b7ff]/40 hover:bg-white/[0.06]"
          }`}
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-[#c8b7ff]/10 text-[#c8b7ff]">
            <Upload className="h-5 w-5" strokeWidth={1.6} />
          </div>
          <div className="text-center">
            <div className="text-sm font-medium text-white/70">Drop PDF here or <span className="text-[#c8b7ff]">browse</span></div>
            <div className="mt-1 text-xs text-white/36">{sublabel}</div>
          </div>
          <input ref={inputRef} type="file" accept="application/pdf" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) accept(f); }} />
        </button>
      ) : (
        <div className="flex items-center gap-3 rounded-[1.3rem] border border-[#c8b7ff]/30 bg-[#c8b7ff]/6 px-4 py-4">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#c8b7ff]/14 text-[#c8b7ff]">
            <FileText className="h-5 w-5" strokeWidth={1.6} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-medium text-white">{value.file.name}</div>
            <div className="text-xs text-white/40">{(value.file.size / 1024).toFixed(0)} KB</div>
          </div>
          <button onClick={() => onChange(null)} className="shrink-0 text-white/30 transition hover:text-white/70">
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}

export default function ReferralGenerator() {
  const [labReport, setLabReport] = useState<UploadedFile | null>(null);
  const [notes, setNotes] = useState<UploadedFile | null>(null);
  const [step, setStep] = useState<Step>("upload");
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [error, setError] = useState("");

  const bothUploaded = labReport && notes;

  async function generate() {
    if (!labReport || !notes) return;
    setStep("generating");
    setError("");
    try {
      const fd = new FormData();
      fd.append("labReport", labReport.file);
      fd.append("notes", notes.file);
      const res = await fetch("/api/referral/generate", { method: "POST", body: fd });
      if (!res.ok) throw new Error("Generation failed.");
      const blob = await res.blob();
      setDownloadUrl(URL.createObjectURL(blob));
      setStep("done");
    } catch (e) {
      setError((e as Error).message);
      setStep("preview");
    }
  }

  function reset() {
    setLabReport(null);
    setNotes(null);
    setStep("upload");
    setDownloadUrl(null);
    setError("");
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#110d1d_0%,#151124_52%,#0f0b19_100%)] text-foreground">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-[-8rem] top-[-4rem] h-[32rem] w-[32rem] rounded-full bg-[#a88dff]/10 blur-3xl" />
      </div>

      <header className="relative z-20 flex items-center gap-4 px-8 py-5 sm:px-14 lg:px-20">
        <a href="/patients" className="inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-white">
          <ArrowLeft className="h-4 w-4" /> Dashboard
        </a>
      </header>

      <main className="relative z-10 px-8 pb-28 pt-6 sm:px-14 lg:px-20">
        <div className="mx-auto max-w-[720px]">

          <h1 className="font-display text-[2rem] font-semibold tracking-[-0.04em] text-white sm:text-[2.4rem]">
            Referral Generator
          </h1>
          <p className="mt-2 text-sm text-white/44">
            Upload the patient's lab report and clinical notes to generate a referral letter.
          </p>

          {/* Step indicator */}
          <div className="mt-8 flex items-center gap-2 text-xs text-white/38">
            {["Connect", "Organize", "Execute"].map((s, i) => {
              const idx = ["upload", "preview", "generating"].indexOf(step);
              const active = i <= (step === "done" ? 2 : idx);
              return (
                <span key={s} className="flex items-center gap-2">
                  {i > 0 && <span className="h-px w-6 bg-white/14" />}
                  <span className={active ? "text-[#c8b7ff] font-medium" : ""}>{s}</span>
                </span>
              );
            })}
          </div>

          <div className="mt-8">

            {/* Upload step */}
            {(step === "upload" || step === "preview") && (
              <>
                <div className="grid gap-5 sm:grid-cols-2">
                  <DropZone label="Lab Report" sublabel="PDF format" value={labReport} onChange={(f) => { setLabReport(f); if (!f) setStep("upload"); }} />
                  <DropZone label="Clinical Notes" sublabel="PDF format" value={notes} onChange={(f) => { setNotes(f); if (!f) setStep("upload"); }} />
                </div>

                {/* Preview iframes */}
                {bothUploaded && (
                  <>
                    <div className="mt-8 grid gap-5 sm:grid-cols-2">
                      {[{ label: "Lab Report", item: labReport }, { label: "Clinical Notes", item: notes }].map(({ label, item }) => (
                        <div key={label}>
                          <div className="mb-2 text-xs font-medium text-white/46">{label} preview</div>
                          <iframe
                            src={item!.url}
                            className="h-64 w-full rounded-[1.1rem] border border-white/10 bg-white/[0.02]"
                            title={label}
                          />
                        </div>
                      ))}
                    </div>

                    {error && <p className="mt-4 text-sm text-rose-400">{error}</p>}

                    <button
                      onClick={() => { setStep("preview"); generate(); }}
                      className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#c8b7ff] py-3.5 text-base font-semibold text-[#17120d] transition duration-200 hover:-translate-y-0.5 hover:bg-[#d6caff] sm:w-auto sm:px-10"
                    >
                      Generate Referral →
                    </button>
                  </>
                )}

                {!bothUploaded && (
                  <p className="mt-6 text-xs text-white/30">Upload both files to continue.</p>
                )}
              </>
            )}

            {/* Generating */}
            {step === "generating" && (
              <div className="flex flex-col items-center gap-4 py-20 text-center">
                <Loader2 className="h-8 w-8 animate-spin text-[#c8b7ff]" />
                <p className="text-sm text-white/60">Generating your referral letter…</p>
              </div>
            )}

            {/* Done */}
            {step === "done" && downloadUrl && (
              <div className="flex flex-col items-center gap-6 py-16 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full border border-[#c8b7ff]/30 bg-[#c8b7ff]/10">
                  <CheckCircle className="h-8 w-8 text-[#c8b7ff]" strokeWidth={1.5} />
                </div>
                <div>
                  <h2 className="font-display text-[1.4rem] font-semibold text-white">Referral ready</h2>
                  <p className="mt-2 text-sm text-white/46">Your referral letter has been generated.</p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <a
                    href={downloadUrl}
                    download="referral.pdf"
                    className="inline-flex items-center gap-2 rounded-full bg-[#c8b7ff] px-8 py-3 text-sm font-semibold text-[#17120d] transition hover:-translate-y-0.5 hover:bg-[#d6caff]"
                  >
                    <Download className="h-4 w-4" /> Download Referral
                  </a>
                  <button
                    onClick={reset}
                    className="inline-flex items-center gap-2 rounded-full border border-white/14 px-8 py-3 text-sm text-white/60 transition hover:bg-white/[0.06] hover:text-white"
                  >
                    Start over
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}
