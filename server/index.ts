import "dotenv/config";
import express from "express";
import session from "express-session";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
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
  }
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CLIENT_POST_AUTH_URL =
  process.env.CLIENT_POST_AUTH_URL || "http://localhost:3000/patients";

async function startServer() {
  const app = express();
  const server = createServer(app);

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

  // ─── Auth ──────────────────────────────────────────────────────────────────
  app.get("/api/auth/status", (req, res) => {
    res.json({
      authenticated: Boolean(req.session.googleTokens),
      email: req.session.userEmail ?? null,
    });
  });

  app.get("/api/auth/google", (_req, res) => {
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

  app.use(express.static(staticPath));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || process.env.API_PORT || 3000;
  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
