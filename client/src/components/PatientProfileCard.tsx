import type { ElementType, ReactNode } from "react";
import {
  AlertCircle,
  CheckCircle2,
  FileText,
  HeartPulse,
  Hospital,
  Pill,
  Stethoscope,
  User,
} from "lucide-react";
import {
  type PatientProfile,
  type ProfileContext,
  isProfileComplete,
  missingFields,
} from "@shared/patient-profile";

const CONTEXT_LABEL: Record<ProfileContext, string> = {
  intro_call: "Intro Call",
  personal_symptoms: "Symptom Report",
  medical_test_review: "Test Review",
  follow_up: "Follow-up",
  other: "Other",
};

function initials(name: string | null): string {
  if (!name) return "–";
  return name.split(/\s+/).map((p) => p[0]).slice(0, 2).join("").toUpperCase();
}

/** One labeled field section — renders the value(s) or a follow-up flag when missing. */
function Field({
  icon: Icon,
  label,
  missing,
  children,
}: {
  icon: ElementType;
  label: string;
  missing: boolean;
  children?: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
      <div className="mb-2 flex items-center gap-1.5">
        <Icon className="h-3 w-3 text-[#cdbcff]" />
        <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          {label}
        </span>
        {missing && (
          <span className="ml-auto inline-flex items-center gap-1 rounded-full border border-rose-500/30 bg-rose-500/10 px-2 py-0.5 text-[10px] font-semibold text-rose-300">
            <AlertCircle className="h-2.5 w-2.5" />
            Needs follow-up
          </span>
        )}
      </div>
      {missing ? (
        <p className="text-sm italic text-muted-foreground/70">Not yet provided</p>
      ) : (
        <div className="text-sm leading-relaxed text-foreground/90">{children}</div>
      )}
    </section>
  );
}

function Chips({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((item, i) => (
        <span
          key={i}
          className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-foreground/85"
        >
          {item}
        </span>
      ))}
    </div>
  );
}

export interface PatientProfileCardProps {
  profile: PatientProfile;
  /** Wired to the Corti follow-up-draft endpoint in a later prompt. */
  onDraftFollowUp?: (profile: PatientProfile) => void;
}

export function PatientProfileCard({ profile, onDraftFollowUp }: PatientProfileCardProps) {
  const complete = isProfileComplete(profile);
  const missing = missingFields(profile);

  return (
    <article className="overflow-hidden rounded-[1.6rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] shadow-[0_24px_60px_rgba(0,0,0,0.22)]">
      {/* Header */}
      <header className="flex items-start justify-between gap-3 border-b border-white/10 px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#9c8cff,#7e5cff)] text-sm font-bold text-white shadow-lg shadow-violet-600/25">
            {initials(profile.patientName)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-semibold tracking-[-0.02em] text-white">
                {profile.patientName ?? "Unidentified patient"}
              </h2>
              {profile.context && (
                <span className="rounded-full border border-violet-500/25 bg-violet-500/15 px-2 py-0.5 text-[10px] font-semibold text-violet-200">
                  {CONTEXT_LABEL[profile.context]}
                </span>
              )}
            </div>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {profile.id}
              {profile.lastExtractedAt &&
                ` · extracted ${new Date(profile.lastExtractedAt).toLocaleDateString()}`}
            </p>
          </div>
        </div>
        {complete ? (
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold text-emerald-300">
            <CheckCircle2 className="h-3 w-3" /> Complete
          </span>
        ) : (
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-1 text-[11px] font-semibold text-amber-300">
            <AlertCircle className="h-3 w-3" /> {missing.length} missing
          </span>
        )}
      </header>

      {/* Seven-field body */}
      <div className="grid gap-3 p-6 sm:grid-cols-2">
        <Field icon={User} label="Patient Name" missing={!profile.patientName}>
          {profile.patientName}
        </Field>
        <Field icon={FileText} label="Context of Situation" missing={!profile.context}>
          {profile.context && CONTEXT_LABEL[profile.context]}
        </Field>
        <Field icon={Stethoscope} label="Symptoms" missing={!profile.symptoms?.length}>
          {profile.symptoms && <Chips items={profile.symptoms} />}
        </Field>
        <Field icon={HeartPulse} label="Past Diseases" missing={!profile.pastDiseases?.length}>
          {profile.pastDiseases && <Chips items={profile.pastDiseases} />}
        </Field>
        <Field icon={FileText} label="Past Medical Tests" missing={!profile.pastMedicalTests?.length}>
          {profile.pastMedicalTests && <Chips items={profile.pastMedicalTests} />}
        </Field>
        <Field icon={Pill} label="Allergies" missing={!profile.allergies?.length}>
          {profile.allergies && <Chips items={profile.allergies} />}
        </Field>
        <Field icon={Hospital} label="Visited Hospitals" missing={!profile.visitedHospitals?.length}>
          {profile.visitedHospitals && <Chips items={profile.visitedHospitals} />}
        </Field>
      </div>

      {/* Follow-up action (handler wired to backend later) */}
      <footer className="flex items-center justify-between gap-3 border-t border-white/10 px-6 py-4">
        <p className="text-xs text-muted-foreground">
          {complete
            ? "All seven fields satisfied — ready for the thank-you draft."
            : `Needs follow-up: ${missing.join(", ")}.`}
        </p>
        {onDraftFollowUp && !complete && (
          <button
            onClick={() => onDraftFollowUp(profile)}
            className="inline-flex shrink-0 items-center gap-2 rounded-2xl bg-[linear-gradient(135deg,#d8b1ff_0%,#9c8cff_56%,#81ddff_100%)] px-4 py-2 text-sm font-semibold text-[#080612] shadow-[0_14px_34px_rgba(145,118,255,0.34)] transition hover:-translate-y-0.5"
          >
            Draft follow-up
          </button>
        )}
      </footer>
    </article>
  );
}
