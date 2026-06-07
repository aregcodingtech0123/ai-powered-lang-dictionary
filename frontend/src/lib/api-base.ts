const DEFAULT_API_URL = "http://localhost:3001";

/** Base URL for server-side fetches (SSR). Prefer API_URL in Docker; falls back to public URL. */
export function getServerApiBaseUrl(): string {
  return (
    process.env.API_URL?.replace(/\/$/, "") ??
    process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ??
    DEFAULT_API_URL
  );
}

/** Base URL for browser/client fetches. */
export function getClientApiBaseUrl(): string {
  return process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ?? DEFAULT_API_URL;
}
