import { apiUrl } from "@/lib/api";

const ACCESS_TOKEN_STORAGE_KEY = "sapienshealth.accessToken";

export type AuthCredentials = {
  email: string;
  password: string;
};

export type SignupCredentials = AuthCredentials & {
  first_name: string;
  last_name: string;
  organization_name: string;
};

type AuthLoginResponse = {
  access_token: string;
  token_type?: string;
};

export type CurrentUser = {
  email: string;
  first_name: string;
  last_name: string;
  organization_name?: string;
};

type FastApiValidationError = {
  detail?: string | Array<{ msg?: string }> | unknown;
  message?: string;
};

function getStorageItem(key: string) {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(key);
}

function setStorageItem(key: string, value: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, value);
}

function removeStorageItem(key: string) {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(key);
}

function decodeJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const [, payload] = token.split(".");
    if (!payload) return null;

    const normalizedPayload = payload.replace(/-/g, "+").replace(/_/g, "/");
    const paddingLength = (4 - (normalizedPayload.length % 4)) % 4;
    const paddedPayload = normalizedPayload.padEnd(
      normalizedPayload.length + paddingLength,
      "="
    );
    const decodedPayload = window.atob(paddedPayload);
    const payloadJson = decodeURIComponent(
      Array.from(decodedPayload, char => {
        return `%${char.charCodeAt(0).toString(16).padStart(2, "0")}`;
      }).join("")
    );

    return JSON.parse(payloadJson) as Record<string, unknown>;
  } catch {
    return null;
  }
}

function isTokenExpired(token: string) {
  const payload = decodeJwtPayload(token);
  const exp = payload?.exp;
  const expirySeconds =
    typeof exp === "number" ? exp : typeof exp === "string" ? Number(exp) : 0;

  return Number.isFinite(expirySeconds) && expirySeconds > 0
    ? expirySeconds * 1000 <= Date.now()
    : false;
}

function saveAuthSession(accessToken: string) {
  setStorageItem(ACCESS_TOKEN_STORAGE_KEY, accessToken);
}

export function clearAuthSession() {
  removeStorageItem(ACCESS_TOKEN_STORAGE_KEY);
}

export function getAuthToken() {
  const token = getStorageItem(ACCESS_TOKEN_STORAGE_KEY);
  if (!token) return null;

  if (isTokenExpired(token)) {
    clearAuthSession();
    return null;
  }

  return token;
}

export function isAuthenticated() {
  return Boolean(getAuthToken());
}

export function getAuthorizationHeader(): Record<string, string> {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function readErrorMessage(response: Response) {
  const fallbackMessage =
    response.status === 401
      ? "Incorrect email or password."
      : `Request failed with status ${response.status}.`;

  try {
    const payload = (await response.json()) as FastApiValidationError;

    if (typeof payload.detail === "string") return payload.detail;
    if (Array.isArray(payload.detail)) {
      const validationMessage = payload.detail
        .map(item => item?.msg)
        .filter(Boolean)
        .join(" ");

      if (validationMessage) return validationMessage;
    }
    if (typeof payload.message === "string") return payload.message;
  } catch {
    return fallbackMessage;
  }

  return fallbackMessage;
}

async function requestJson<T>(
  path: string,
  init: Omit<RequestInit, "body"> & { body?: unknown } = {}
) {
  const headers = new Headers(init.headers);
  const hasJsonBody = init.body !== undefined;

  if (hasJsonBody && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(apiUrl(path), {
    ...init,
    headers,
    body: hasJsonBody ? JSON.stringify(init.body) : undefined,
  });

  if (!response.ok) {
    throw new Error(await readErrorMessage(response));
  }

  const responseText = await response.text();
  return (responseText ? JSON.parse(responseText) : {}) as T;
}

export async function signup(credentials: SignupCredentials) {
  return requestJson<Record<string, boolean>>("/auth/signup", {
    method: "POST",
    body: credentials,
  });
}

export async function login(credentials: AuthCredentials) {
  const response = await requestJson<AuthLoginResponse>("/auth/login", {
    method: "POST",
    body: credentials,
  });

  if (!response.access_token) {
    throw new Error("Login response did not include an access token.");
  }

  saveAuthSession(response.access_token);
  return response;
}

export async function getCurrentUser() {
  return requestJson<CurrentUser>("/auth/me", {
    method: "GET",
    headers: getAuthorizationHeader(),
  });
}

export async function logout() {
  const headers = getAuthorizationHeader();

  try {
    await fetch(apiUrl("/auth/logout"), {
      method: "POST",
      headers,
    });
  } catch {
    // Local logout should still succeed if the backend is unavailable.
  } finally {
    clearAuthSession();
  }
}
