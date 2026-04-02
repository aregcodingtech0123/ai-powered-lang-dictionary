/** Max length for dictionary headword / query (after trim). */
export const MAX_WORD_LENGTH = 80;

/**
 * Disallows C0/C1 control characters and other non-printable garbage in a headword.
 * Allows normal Unicode letters, numbers, punctuation, ZWJ, etc.
 */
const SUSPICIOUS_CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F-\u009F]/;

export type WordValidationResult =
  | { ok: true; word: string }
  | { ok: false; error: string };

export type ValidateWordOptions = {
  /** Message when input is empty after trim (e.g. query vs JSON body). */
  emptyMessage?: string;
};

/**
 * Trims input, enforces max length, and rejects suspicious control characters.
 */
export function validateWordInput(
  raw: string,
  opts?: ValidateWordOptions
): WordValidationResult {
  const trimmed = raw.trim();
  if (!trimmed) {
    return {
      ok: false,
      error: opts?.emptyMessage ?? "Missing or empty word parameter.",
    };
  }
  if (trimmed.length > MAX_WORD_LENGTH) {
    return {
      ok: false,
      error: `Word must be at most ${MAX_WORD_LENGTH} characters.`,
    };
  }
  if (SUSPICIOUS_CONTROL_CHARS.test(trimmed)) {
    return { ok: false, error: "Word contains invalid or disallowed characters." };
  }
  return { ok: true, word: trimmed };
}
