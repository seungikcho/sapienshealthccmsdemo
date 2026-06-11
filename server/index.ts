import "dotenv/config";
import express from "express";
import session from "express-session";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import type { Auth } from "googleapis";
import { COOKIE_NAME } from "../shared/const";
import { profileIdFromName } from "../shared/patient-profile";
import {
  generateConsentUrl,
  exchangeCodeForTokens,
  getGmailClient,
} from "./services/googleAuthService";
import { searchPatientEmails } from "./services/gmailService";
import {
  listProfiles,
  getProfile,
  upsertProfile,
  resetStore,
  buildProfileFromSearch,
  simulatePatientReply,
} from "./db";

declare module "express-session" {
  interface SessionData {
    googleTokens?: Auth.Credentials;
    userEmail?: string;
    loggedIn?: boolean;
  }
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CLIENT_POST_AUTH_URL =
  process.env.CLIENT_POST_AUTH_URL || "http://localhost:3000/patients";

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Trust EB/ALB load balancer so secure cookies work behind HTTPS termination
  app.set("trust proxy", 1);

  app.use(express.json());
  app.use(
    session({
      name: COOKIE_NAME,
      secret: process.env.SESSION_SECRET || "dev-insecure-secret",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24,
      },
    }),
  );

  // Trailing-slash tolerance: rewrite /api/foo/ → /api/foo before routing so the
  // OAuth redirect (or any browser-appended slash) never 404s. Query string and
  // request method/body are preserved (no redirect).
  app.use((req, _res, next) => {
    if (req.path.length > 1 && req.path.endsWith("/")) {
      req.url = req.path.replace(/\/+$/, "") + req.url.slice(req.path.length);
    }
    next();
  });

  // ─── Auth ──────────────────────────────────────────────────────────────────
  const isDevMode =
    process.env.NODE_ENV !== "production" &&
    (!process.env.GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID === "placeholder");

  app.get("/api/auth/status", (req, res) => {
    res.json({
      authenticated: Boolean(req.session.googleTokens) || Boolean(req.session.loggedIn),
      email: req.session.userEmail ?? null,
    });
  });

  app.get("/api/auth/google", (_req, res) => {
    if (isDevMode) {
      res.redirect(process.env.CLIENT_POST_AUTH_URL || "http://localhost:3000/patients");
      return;
    }
    try {
      res.redirect(generateConsentUrl());
    } catch (err) {
      res.status(500).json({ error: (err as Error).message });
    }
  });

  app.get("/api/auth/callback", async (req, res) => {
    const code = req.query.code;
    if (typeof code !== "string") {
      res.status(400).send("Missing authorization code");
      return;
    }
    try {
      const tokens = await exchangeCodeForTokens(code);
      req.session.googleTokens = tokens;
      // Best-effort: capture the signed-in address (in-scope via gmail.readonly).
      try {
        const gmail = getGmailClient(tokens);
        const profile = await gmail.users.getProfile({ userId: "me" });
        req.session.userEmail = profile.data.emailAddress ?? undefined;
      } catch {
        /* non-fatal — login still succeeds without the email */
      }
      res.redirect(CLIENT_POST_AUTH_URL);
    } catch (err) {
      res.status(500).send(`OAuth callback failed: ${(err as Error).message}`);
    }
  });

  // ─── Referral Generator ────────────────────────────────────────────────────
  const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 20 * 1024 * 1024 } });

  app.post("/api/referral/generate", upload.fields([{ name: "labReport" }, { name: "notes" }]), (req, res) => {
    const files = req.files as Record<string, Express.Multer.File[]> | undefined;
    if (!files?.labReport?.[0] || !files?.notes?.[0]) {
      res.status(400).json({ error: "Both labReport and notes PDFs are required." });
      return;
    }
    const lab = files.labReport[0];
    const notes = files.notes[0];
    const date = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

    const content = `%PDF-1.4
1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj
2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj
3 0 obj<</Type/Page/MediaBox[0 0 612 792]/Parent 2 0 R/Contents 4 0 R/Resources<</Font<</F1 5 0 R>>>>>>endobj
4 0 obj<</Length 800>>
stream
BT
/F1 18 Tf
50 740 Td
(REFERRAL LETTER) Tj
/F1 11 Tf
0 -40 Td
(Date: ${date}) Tj
0 -25 Td
(From: Archway Family Medicine) Tj
0 -25 Td
(Re: Patient Referral) Tj
0 -40 Td
/F1 12 Tf
(To Whom It May Concern,) Tj
0 -25 Td
/F1 11 Tf
(This referral has been generated based on the following documents:) Tj
0 -25 Td
(  - Lab Report: ${lab.originalname}) Tj
0 -22 Td
(  - Clinical Notes: ${notes.originalname}) Tj
0 -40 Td
(Based on the submitted lab report and clinical notes, this patient is being referred) Tj
0 -22 Td
(for further evaluation and specialist consultation as clinically indicated.) Tj
0 -40 Td
(Please do not hesitate to contact our office with any questions.) Tj
0 -40 Td
(Sincerely,) Tj
0 -25 Td
(Archway Family Medicine) Tj
ET
endstream
endobj
5 0 obj<</Type/Font/Subtype/Type1/BaseFont/Helvetica>>endobj
xref
0 6
0000000000 65535 f
0000000009 00000 n
0000000058 00000 n
0000000115 00000 n
0000000274 00000 n
0000001126 00000 n
trailer<</Size 6/Root 1 0 R>>
startxref
1213
%%EOF`;

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", `attachment; filename="referral-${Date.now()}.pdf"`);
    res.send(Buffer.from(content));
  });

  // ─── Lab Test Search ──────────────────────────────────────────────────────
  const LAB_TESTS = [
    { name: "Complete Blood Count (CBC)", code: "85025", keywords: ["blood", "cbc", "anemia", "infection", "white blood cell", "red blood cell", "hemoglobin", "platelet", "count", "complete"], description: "Measures red and white blood cells, hemoglobin, hematocrit, and platelets to evaluate overall health and detect disorders.", indication: "Anemia, infection, inflammation, hematologic disorders", price: "$10 – $29", turnaround: "Same day" },
    { name: "Comprehensive Metabolic Panel (CMP)", code: "80053", keywords: ["metabolic", "cmp", "kidney", "liver", "glucose", "electrolyte", "bmp", "chemistry", "renal", "hepatic", "sodium", "potassium", "calcium", "comprehensive"], description: "14-test panel covering kidney function, liver enzymes, electrolytes, glucose, and protein levels.", indication: "Routine health screening, kidney/liver disease monitoring", price: "$14 – $40", turnaround: "Same day" },
    { name: "Lipid Panel", code: "80061", keywords: ["lipid", "cholesterol", "ldl", "hdl", "triglyceride", "cardiovascular", "heart", "coronary", "dyslipidemia", "statin"], description: "Measures total cholesterol, LDL, HDL, and triglycerides to assess cardiovascular risk.", indication: "Cardiovascular risk assessment, dyslipidemia monitoring", price: "$15 – $45", turnaround: "Same day" },
    { name: "Hemoglobin A1c (HbA1c)", code: "83036", keywords: ["a1c", "hba1c", "diabetes", "glucose", "glycated", "blood sugar", "diabetic", "insulin", "hemoglobin a1c", "glycemic"], description: "Reflects average blood glucose over the past 2–3 months, used to diagnose and monitor diabetes.", indication: "Diabetes diagnosis and management", price: "$20 – $50", turnaround: "Same day" },
    { name: "Thyroid Stimulating Hormone (TSH)", code: "84443", keywords: ["thyroid", "tsh", "hypothyroid", "hyperthyroid", "t3", "t4", "thyroid function", "fatigue", "weight", "thyroxine"], description: "Primary screening test for thyroid dysfunction. Elevated TSH indicates hypothyroidism; suppressed TSH suggests hyperthyroidism.", indication: "Thyroid disorder screening and monitoring", price: "$20 – $60", turnaround: "Same day" },
    { name: "Basic Metabolic Panel (BMP)", code: "80048", keywords: ["bmp", "basic metabolic", "kidney", "electrolyte", "glucose", "sodium", "potassium", "creatinine", "bun", "chloride"], description: "8-test panel covering glucose, calcium, electrolytes, and kidney function markers.", indication: "Kidney function, electrolyte balance, glucose monitoring", price: "$10 – $30", turnaround: "Same day" },
    { name: "Urinalysis (UA)", code: "81003", keywords: ["urine", "ua", "urinalysis", "uti", "kidney", "bladder", "infection", "protein", "glucose", "nitrite"], description: "Examines urine for color, clarity, pH, protein, glucose, and signs of infection or kidney disease.", indication: "UTI, kidney disease, diabetes screening", price: "$5 – $20", turnaround: "Same day" },
    { name: "Prothrombin Time (PT/INR)", code: "85610", keywords: ["pt", "inr", "prothrombin", "coagulation", "warfarin", "bleeding", "clotting", "anticoagulant", "blood clot", "coag"], description: "Measures how long blood takes to clot. Used to monitor warfarin therapy and evaluate bleeding disorders.", indication: "Anticoagulation monitoring, coagulation disorders", price: "$10 – $35", turnaround: "Same day" },
    { name: "Vitamin D (25-OH)", code: "82306", keywords: ["vitamin d", "vit d", "bone", "calcium", "deficiency", "osteoporosis", "fatigue", "immune", "25-oh", "cholecalciferol"], description: "Measures 25-hydroxyvitamin D to assess vitamin D status and deficiency.", indication: "Vitamin D deficiency, bone health, immune function", price: "$30 – $80", turnaround: "1–2 days" },
    { name: "C-Reactive Protein (CRP)", code: "86140", keywords: ["crp", "c-reactive", "inflammation", "infection", "inflammatory", "acute phase", "cardiovascular", "autoimmune"], description: "Sensitive marker of systemic inflammation. Elevated in infection, autoimmune disease, and cardiovascular risk.", indication: "Infection, inflammation, cardiovascular risk stratification", price: "$15 – $40", turnaround: "Same day" },
    { name: "Ferritin", code: "82728", keywords: ["ferritin", "iron", "anemia", "iron deficiency", "hemoglobin", "storage", "iron store"], description: "Measures iron stores in the body. Low ferritin is the earliest indicator of iron deficiency anemia.", indication: "Iron deficiency anemia, iron overload", price: "$20 – $55", turnaround: "Same day" },
    { name: "Urine Culture", code: "87086", keywords: ["urine culture", "culture", "uti", "bacteria", "sensitivity", "antibiotic", "infection", "bladder", "urinary tract"], description: "Identifies bacterial species causing a urinary tract infection and determines antibiotic sensitivity.", indication: "Suspected urinary tract infection, recurrent UTI", price: "$25 – $65", turnaround: "2–3 days" },
    { name: "Liver Function Tests (LFT)", code: "80076", keywords: ["liver", "lft", "hepatic", "ast", "alt", "bilirubin", "alkaline phosphatase", "hepatitis", "alcohol", "cirrhosis", "jaundice"], description: "Panel measuring AST, ALT, alkaline phosphatase, bilirubin, and albumin to assess liver health.", indication: "Liver disease, hepatitis, medication monitoring", price: "$15 – $45", turnaround: "Same day" },
    { name: "Prostate-Specific Antigen (PSA)", code: "86316", keywords: ["psa", "prostate", "cancer", "screening", "prostate cancer", "male"], description: "Blood test used to screen for prostate cancer and monitor treatment response.", indication: "Prostate cancer screening in men 50+", price: "$25 – $60", turnaround: "Same day" },
    { name: "Blood Culture", code: "87040", keywords: ["blood culture", "bacteremia", "sepsis", "bacteria", "infection", "fever", "culture", "bloodstream"], description: "Detects bacteria or fungi in the bloodstream, used to diagnose sepsis and bacteremia.", indication: "Suspected bacteremia, sepsis, high fever of unknown origin", price: "$30 – $80", turnaround: "1–5 days" },
  ];

  app.post("/api/lab-test/search", (req, res) => {
    const raw = typeof req.body?.query === "string" ? req.body.query.toLowerCase().trim() : "";
    if (!raw) { res.status(400).json({ error: "query is required" }); return; }

    const tokens = raw.split(/\s+/);
    const scored = LAB_TESTS.map((t) => {
      const score = tokens.reduce((acc, tok) => {
        if (t.keywords.some((k) => k.includes(tok) || tok.includes(k))) return acc + 2;
        if (t.name.toLowerCase().includes(tok)) return acc + 3;
        if (t.indication.toLowerCase().includes(tok)) return acc + 1;
        return acc;
      }, 0);
      return { ...t, score };
    }).filter((t) => t.score > 0).sort((a, b) => b.score - a.score).slice(0, 3);

    res.json({ results: scored });
  });

  // ─── Meeting Note Generator ────────────────────────────────────────────────
  app.post("/api/notes/generate", (req, res) => {
    const { patientName, transcript } = req.body ?? {};
    if (!patientName || !transcript) {
      res.status(400).json({ error: "patientName and transcript are required." });
      return;
    }

    const date = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    const time = new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

    const words = String(transcript).toLowerCase().split(/\s+/);

    const hasSymptom = (kws: string[]) => kws.some((k) => words.includes(k));
    const chief = hasSymptom(["pain", "ache", "hurts", "hurt", "sore"])
      ? "Patient presents with pain/discomfort."
      : hasSymptom(["cough", "cold", "fever", "chills", "sneez"])
      ? "Patient presents with respiratory symptoms."
      : hasSymptom(["tired", "fatigue", "exhausted", "weakness"])
      ? "Patient presents with fatigue and low energy."
      : "Patient presents for routine visit and evaluation.";

    const vitals = "BP: 120/78 mmHg  |  HR: 72 bpm  |  Temp: 98.6°F  |  SpO₂: 98%  |  Wt: per chart";

    const exam = hasSymptom(["pain", "tender", "swelling", "swollen"])
      ? "General: Alert and oriented ×3, in mild distress.\nAffected area: tenderness noted on palpation; no obvious deformity."
      : "General: Alert and oriented ×3, in no acute distress.\nCardiovascular: RRR, no murmurs. Respiratory: CTAB.";

    const assessment = hasSymptom(["pain", "ache", "sore"])
      ? "1. Acute pain — further workup pending.\n2. Monitor for progression of symptoms."
      : hasSymptom(["cough", "cold", "fever"])
      ? "1. Upper respiratory infection — likely viral etiology.\n2. Monitor for secondary bacterial infection."
      : "1. Routine evaluation — no acute findings at this time.\n2. Continue current management plan.";

    const plan = hasSymptom(["pain", "ache"])
      ? "- Analgesics as needed (OTC NSAIDs if no contraindications).\n- Ice/rest to affected area.\n- Follow-up in 2 weeks or sooner if symptoms worsen.\n- Labs ordered: CBC, CMP."
      : hasSymptom(["cough", "cold", "fever"])
      ? "- Supportive care: rest, hydration, antipyretics PRN.\n- No antibiotics indicated at this time.\n- Return precautions discussed.\n- Follow-up in 5-7 days if no improvement."
      : "- Continue healthy lifestyle modifications.\n- Annual labs ordered: CBC, lipid panel, HbA1c.\n- Schedule follow-up in 12 months or as needed.";

    const note = `SOAP NOTE — ${date} at ${time}
Patient: ${patientName}
Provider: Archway Family Medicine
────────────────────────────────────────

SUBJECTIVE
Chief Complaint: ${chief}

Visit Summary (from recording):
${String(transcript).trim()}

OBJECTIVE
Vital Signs: ${vitals}

Physical Exam:
${exam}

ASSESSMENT
${assessment}

PLAN
${plan}

────────────────────────────────────────
Electronically generated by Sapiens Health Meeting Note Generator.
This note requires provider review and signature before finalizing.`;

    res.json({ note });
  });

  app.post("/api/auth/login", (req, res) => {
    const { username, password } = req.body ?? {};
    const validUser = process.env.PORTAL_USERNAME || "admin";
    const validPass = process.env.PORTAL_PASSWORD || "sapiens2026";
    if (username === validUser && password === validPass) {
      req.session.loggedIn = true;
      req.session.userEmail = username;
      res.json({ ok: true });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  });

  app.post("/api/auth/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        res.status(500).json({ error: "Failed to destroy session" });
        return;
      }
      res.clearCookie(COOKIE_NAME);
      res.json({ ok: true });
    });
  });

  // ─── Profiles (live backend store) ──────────────────────────────────────────
  app.get("/api/profiles", (_req, res) => {
    res.json({ profiles: listProfiles() });
  });

  // ─── Search: return existing, else enrich from Gmail + persist a fresh one ──
  app.post("/api/gmail/search", async (req, res) => {
    const name = typeof req.body?.patientName === "string" ? req.body.patientName.trim() : "";
    if (!name) {
      res.status(400).json({ error: "patientName is required" });
      return;
    }

    const existing = getProfile(profileIdFromName(name));
    if (existing) {
      res.json({ profile: existing, rawText: null, found: true, created: false });
      return;
    }

    let rawText = "";
    const tokens = req.session.googleTokens;
    if (tokens) {
      try {
        rawText = await searchPatientEmails(tokens, name);
      } catch {
        rawText = "";
      }
    }
    const profile = upsertProfile(buildProfileFromSearch(name, rawText));
    res.json({ profile, rawText, found: rawText.length > 0, created: true });
  });

  // ─── Demo pipeline ──────────────────────────────────────────────────────────
  app.post("/api/demo/reset", (_req, res) => {
    res.json({ profiles: resetStore() });
  });

  app.post("/api/demo/simulate-reply", (req, res) => {
    const patientId = typeof req.body?.patientId === "string" ? req.body.patientId : "";
    if (!patientId) {
      res.status(400).json({ error: "patientId is required" });
      return;
    }
    const updated = simulatePatientReply(patientId);
    if (!updated) {
      res.status(404).json({ error: "Patient not found" });
      return;
    }
    res.json({ profile: updated });
  });

  // ─── Static client (production) + SPA fallback ──────────────────────────────
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.get("/manus-storage/*", async (req, res) => {
    const key = req.path.replace(/^\//, "");
    const forgeBaseUrl = (process.env.BUILT_IN_FORGE_API_URL || "").replace(/\/+$/, "");
    const forgeKey = process.env.BUILT_IN_FORGE_API_KEY;

    if (!key) {
      res.status(400).type("text/plain").send("Missing storage key");
      return;
    }

    if (!forgeBaseUrl || !forgeKey) {
      res.status(500).type("text/plain").send("Storage proxy not configured");
      return;
    }

    try {
      const forgeUrl = new URL("v1/storage/presign/get", `${forgeBaseUrl}/`);
      forgeUrl.searchParams.set("path", key);

      const forgeResp = await fetch(forgeUrl, {
        headers: { Authorization: `Bearer ${forgeKey}` },
      });

      if (!forgeResp.ok) {
        res.status(502).type("text/plain").send("Storage backend error");
        return;
      }

      const { url } = (await forgeResp.json()) as { url?: string };
      if (!url) {
        res.status(502).type("text/plain").send("Empty signed URL");
        return;
      }

      res.redirect(307, url);
    } catch {
      res.status(502).type("text/plain").send("Storage proxy error");
    }
  });

  app.use(express.static(staticPath));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || process.env.API_PORT || 3001;
  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
