import { type Auth, type gmail_v1 } from "googleapis";
import { getGmailClient } from "./googleAuthService";

/** How many of the most recent matching messages to pull bodies for. */
const MAX_MESSAGES = 10;

/** Recursively walk a message payload and decode all text/plain parts. */
function extractPlainText(payload?: gmail_v1.Schema$MessagePart): string {
  if (!payload) return "";
  const parts: string[] = [];
  const data = payload.body?.data;
  if (data && (payload.mimeType === "text/plain" || !payload.parts)) {
    parts.push(Buffer.from(data, "base64").toString("utf-8"));
  }
  if (payload.parts)
    for (const part of payload.parts) parts.push(extractPlainText(part));
  return parts.join("\n");
}

/** Pull a header value (Subject, From, Date) from a message. */
function header(message: gmail_v1.Schema$Message, name: string): string {
  const found = message.payload?.headers?.find(
    h => h.name?.toLowerCase() === name.toLowerCase()
  );
  return found?.value ?? "";
}

/**
 * Search the authenticated user's mailbox for messages mentioning `patientName`,
 * fetch the most recent message bodies, and concatenate them into a single raw
 * string suitable for downstream Corti extraction.
 */
export async function searchPatientEmails(
  auth: Auth.Credentials,
  patientName: string
): Promise<string> {
  const trimmed = patientName.trim();
  if (!trimmed) return "";

  const gmail = getGmailClient(auth);
  const list = await gmail.users.messages.list({
    userId: "me",
    q: `"${trimmed}"`,
    maxResults: MAX_MESSAGES,
  });

  const messages = list.data.messages ?? [];
  if (messages.length === 0) return "";

  const bodies: string[] = [];
  for (const ref of messages) {
    if (!ref.id) continue;
    const full = await gmail.users.messages.get({
      userId: "me",
      id: ref.id,
      format: "full",
    });
    const msg = full.data;
    bodies.push(
      [
        `From: ${header(msg, "From")}`,
        `Date: ${header(msg, "Date")}`,
        `Subject: ${header(msg, "Subject")}`,
        "",
        extractPlainText(msg.payload).trim(),
      ].join("\n")
    );
  }

  return bodies.join("\n\n---\n\n");
}
