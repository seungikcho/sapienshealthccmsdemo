import { google, type Auth, type gmail_v1 } from "googleapis";

/** Gmail read-only scope — minimum needed to search and read patient threads. */
export const GMAIL_SCOPES = ["https://www.googleapis.com/auth/gmail.readonly"];

function required(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

/** Build a fresh OAuth2 client from environment configuration. */
export function createOAuthClient() {
  return new google.auth.OAuth2(
    required("GOOGLE_CLIENT_ID"),
    required("GOOGLE_CLIENT_SECRET"),
    required("GOOGLE_REDIRECT_URI"),
  );
}

/**
 * Generate the Google consent URL. `access_type: "offline"` requests a refresh
 * token; `prompt: "consent"` forces the screen so one is issued on repeat logins.
 */
export function generateConsentUrl(): string {
  return createOAuthClient().generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: GMAIL_SCOPES,
  });
}

/** Exchange an authorization code (from the callback) for OAuth tokens. */
export async function exchangeCodeForTokens(code: string): Promise<Auth.Credentials> {
  const { tokens } = await createOAuthClient().getToken(code);
  return tokens;
}

/** Rebuild an authenticated OAuth2 client from previously stored tokens. */
export function createClientFromTokens(tokens: Auth.Credentials) {
  const client = createOAuthClient();
  client.setCredentials(tokens);
  return client;
}

/** Initialize an authenticated Gmail API instance from stored tokens. */
export function getGmailClient(tokens: Auth.Credentials): gmail_v1.Gmail {
  return google.gmail({ version: "v1", auth: createClientFromTokens(tokens) });
}
