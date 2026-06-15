export type ProfileContext =
  | "intro_call"
  | "personal_symptoms"
  | "medical_test_review"
  | "follow_up"
  | "other";

export interface PatientProfile {
  /** Stable patient profile id from the API or local demo data. */
  id: string;
  /** Field 1 — Patient Name. */
  patientName: string | null;
  /** Field 2 — Patient Symptoms. */
  symptoms: string[] | null;
  /** Field 3 — Context of the Situation. */
  context: ProfileContext | null;
  /** Field 4 — Past Medical Test Records. */
  pastMedicalTests: string[] | null;
  /** Field 5 — Past Diseases. */
  pastDiseases: string[] | null;
  /** Field 6 — Allergies. */
  allergies: string[] | null;
  /** Field 7 — Names of hospitals the patient has visited. */
  visitedHospitals: string[] | null;
  /** Provenance — which Gmail thread populated this profile. */
  sourceThreadId?: string;
  /** ISO timestamp of the last Corti extraction pass. */
  lastExtractedAt?: string;
}

/** The seven schema fields, in canonical order, with human labels. */
export const PROFILE_FIELDS = [
  { key: "patientName", label: "Patient Name" },
  { key: "symptoms", label: "Symptoms" },
  { key: "context", label: "Context of Situation" },
  { key: "pastMedicalTests", label: "Past Medical Tests" },
  { key: "pastDiseases", label: "Past Diseases" },
  { key: "allergies", label: "Allergies" },
  { key: "visitedHospitals", label: "Visited Hospitals" },
] as const satisfies ReadonlyArray<{
  key: keyof PatientProfile;
  label: string;
}>;

/** A field is "missing" when null, empty string, or empty array — drives follow-up. */
export function isFieldMissing(
  value: PatientProfile[keyof PatientProfile]
): boolean {
  if (value == null) return true;
  if (Array.isArray(value)) return value.length === 0;
  return value === "";
}

/** Labels of the seven fields that still need data from the patient. */
export function missingFields(profile: PatientProfile): string[] {
  return PROFILE_FIELDS.filter(f => isFieldMissing(profile[f.key])).map(
    f => f.label
  );
}

/** True when all seven fields are satisfied. */
export function isProfileComplete(profile: PatientProfile): boolean {
  return missingFields(profile).length === 0;
}

/** Deterministic id slug from a patient name. */
export function profileIdFromName(name: string): string {
  return name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** A fresh profile with only the name populated — all clinical fields await extraction. */
export function createEmptyProfile(name: string): PatientProfile {
  return {
    id: profileIdFromName(name),
    patientName: name.trim(),
    symptoms: null,
    context: null,
    pastMedicalTests: null,
    pastDiseases: null,
    allergies: null,
    visitedHospitals: null,
    sourceThreadId: "gmail-live",
    lastExtractedAt: new Date().toISOString(),
  };
}

export const MOCK_PROFILES: PatientProfile[] = [
  {
    id: "emily-parker",
    patientName: "Emily Parker",
    symptoms: ["Persistent fatigue", "Intermittent chest tightness"],
    context: "intro_call",
    pastMedicalTests: ["Lipid panel (2024-11)", "ECG (2024-11)"],
    pastDiseases: ["Hypertension"],
    allergies: null, // not extracted → follow-up
    visitedHospitals: ["Houston Methodist"],
    sourceThreadId: "thread-001",
    lastExtractedAt: "2026-06-07T14:10:00Z",
  },
  {
    id: "marcus-lee",
    patientName: "Marcus Lee",
    symptoms: ["Lower back pain"],
    context: "personal_symptoms",
    pastMedicalTests: null, // follow-up
    pastDiseases: null, // follow-up
    allergies: ["Penicillin"],
    visitedHospitals: null, // follow-up
    sourceThreadId: "thread-002",
    lastExtractedAt: "2026-06-07T13:40:00Z",
  },
  {
    id: "sofia-ramirez",
    patientName: "Sofia Ramirez",
    symptoms: ["Knee swelling"],
    context: "medical_test_review",
    pastMedicalTests: ["MRI lumbar spine (2025-02)"],
    pastDiseases: ["Type 2 Diabetes", "Asthma"],
    allergies: ["No known drug allergies"],
    visitedHospitals: ["MD Anderson", "Memorial Hermann"],
    sourceThreadId: "thread-003",
    lastExtractedAt: "2026-06-07T12:05:00Z",
  },
];
