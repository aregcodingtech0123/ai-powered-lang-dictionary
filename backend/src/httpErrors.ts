/**
 * Avoid leaking stack traces and internal error strings to clients in production.
 */
export function internalServerErrorMessage(
  e: unknown,
  fallback: string
): string {
  if (process.env.NODE_ENV === "production") {
    return "Internal Server Error";
  }
  return e instanceof Error ? e.message : fallback;
}
