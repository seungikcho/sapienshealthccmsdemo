import {
  MOCK_PROFILES,
  createEmptyProfile,
  type PatientProfile,
} from "../shared/patient-profile";

/** Build the factory dataset — a deep copy so runtime edits never mutate the seed. */
function factory(): PatientProfile[] {
  return MOCK_PROFILES.map(p => structuredClone(p));
}

let profiles: PatientProfile[] = factory();

export function listProfiles(): PatientProfile[] {
  return profiles;
}

export function getProfile(id: string): PatientProfile | undefined {
  return profiles.find(p => p.id === id);
}

/** Insert a new profile at the top, or replace an existing one with the same id. */
export function upsertProfile(profile: PatientProfile): PatientProfile {
  const idx = profiles.findIndex(p => p.id === profile.id);
  if (idx >= 0) profiles[idx] = profile;
  else profiles.unshift(profile);
  return profile;
}

/** Restore the store to its factory layout, dropping all runtime additions. */
export function resetStore(): PatientProfile[] {
  profiles = factory();
  return profiles;
}

// ─── Demo heuristics (placeholders until Corti extraction) ───────────────────

const SYMPTOM_KEYWORDS = [
  "fatigue",
  "tired",
  "pain",
  "ache",
  "headache",
  "migraine",
  "nausea",
  "dizzy",
  "dizziness",
  "fever",
  "cough",
  "shortness of breath",
  "chest tightness",
  "chest pain",
  "swelling",
  "rash",
  "anxiety",
  "insomnia",
  "cramp",
  "numbness",
  "weakness",
  "bleeding",
  "vomiting",
  "diarrhea",
];

/** Turn raw email text into a first-pass profile (name + scraped symptoms). */
export function buildProfileFromSearch(
  name: string,
  rawText: string
): PatientProfile {
  const lower = rawText.toLowerCase();
  const symptoms = Array.from(
    new Set(
      SYMPTOM_KEYWORDS.filter(kw => lower.includes(kw)).map(
        kw => kw.charAt(0).toUpperCase() + kw.slice(1)
      )
    )
  );
  const profile = createEmptyProfile(name);
  profile.context = "personal_symptoms";
  if (symptoms.length) profile.symptoms = symptoms;
  return profile;
}

/** Simulated patient reply — fills any still-missing fields with canned data. */
export function simulatePatientReply(id: string): PatientProfile | undefined {
  const p = getProfile(id);
  if (!p) return undefined;
  if (!p.symptoms?.length)
    p.symptoms = ["Mild recurring headache", "Occasional fatigue"];
  if (p.context == null) p.context = "follow_up";
  if (!p.pastMedicalTests?.length)
    p.pastMedicalTests = ["CBC (2026-03)", "Basic metabolic panel (2026-03)"];
  if (!p.pastDiseases?.length) p.pastDiseases = ["Seasonal allergic rhinitis"];
  if (!p.allergies?.length) p.allergies = ["No known drug allergies"];
  if (!p.visitedHospitals?.length) p.visitedHospitals = ["Houston Methodist"];
  p.lastExtractedAt = new Date().toISOString();
  return p;
}
