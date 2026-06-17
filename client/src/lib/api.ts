const DEFAULT_API_BASE_URL = "/api";

export function getApiBaseUrl() {
  const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL?.replace(
    /\/+$/,
    ""
  );

  return configuredBaseUrl || DEFAULT_API_BASE_URL;
}

export function apiUrl(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${getApiBaseUrl()}${normalizedPath}`;
}
