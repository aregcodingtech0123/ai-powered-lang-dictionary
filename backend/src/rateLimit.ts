import rateLimit, { type Options } from "express-rate-limit";
import type { Response } from "express";

/**
 * Rate limit settings (env-driven).
 *
 * RATE_LIMIT_WINDOW_MS — sliding window length in ms (default 60000 = 1 minute).
 * RATE_LIMIT_MAX_REQUESTS — global cap per IP for every request, including 404 paths.
 * RATE_LIMIT_TRANSLATE_GET_MAX — stricter cap for GET /api/translate (default 30).
 * RATE_LIMIT_REGENERATE_POST_MAX — stricter cap for POST /api/translate/regenerate (default 5).
 *
 * See backend/.env.example and README.md for tuning examples (e.g. 100 req / 15s in dev).
 */
function parsePositiveInt(value: string | undefined, fallback: number): number {
  if (!value?.trim()) return fallback;
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

export const rateLimitConfig = {
  windowMs: parsePositiveInt(process.env.RATE_LIMIT_WINDOW_MS, 60_000),
  maxRequests: parsePositiveInt(process.env.RATE_LIMIT_MAX_REQUESTS, 100),
  translateGetMax: parsePositiveInt(process.env.RATE_LIMIT_TRANSLATE_GET_MAX, 30),
  regeneratePostMax: parsePositiveInt(process.env.RATE_LIMIT_REGENERATE_POST_MAX, 5),
} as const;

function sendRateLimitExceeded(res: Response, options: { windowMs: number }): void {
  const retryAfterSec = Math.ceil(options.windowMs / 1000);
  res.setHeader("Retry-After", String(retryAfterSec));
  res.status(429).json({ error: "Too many requests" });
}

function sharedOptions(limit: number): Partial<Options> {
  return {
    windowMs: rateLimitConfig.windowMs,
    limit,
    standardHeaders: true,
    legacyHeaders: true,
    handler: (_req, res, _next, options) => sendRateLimitExceeded(res, options),
  };
}

/** Counts every request (including unknown routes and JSON 404 fallbacks). */
export const globalRateLimiter = rateLimit(sharedOptions(rateLimitConfig.maxRequests));

/** Stricter limit for dictionary lookups (runs after global limiter). */
export const translateGetLimiter = rateLimit(sharedOptions(rateLimitConfig.translateGetMax));

/** Stricter limit for example regeneration (runs after global limiter). */
export const regeneratePostLimiter = rateLimit(sharedOptions(rateLimitConfig.regeneratePostMax));
