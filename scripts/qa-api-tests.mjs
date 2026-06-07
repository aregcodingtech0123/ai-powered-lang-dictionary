#!/usr/bin/env node
/**
 * API QA checks — rate limiting, headers, and core health.
 * Requires backend dev on http://localhost:3001 (does not start/stop services).
 */
import { DEFAULT_API_URL } from "./lib/ports.mjs";
import { TAG, log, logError } from "./lib/log.mjs";

const BASE = process.env.API_URL ?? DEFAULT_API_URL;

const results = [];

function record(id, name, pass, detail) {
  results.push({ id, name, pass, detail });
  const tag = pass ? "PASS" : "FAIL";
  console.log(`${id} ${tag} — ${name}${detail ? `: ${detail}` : ""}`);
}

function testLog(message) {
  log(TAG.TEST_RUN, message);
}

async function fetchStatus(url, init) {
  const res = await fetch(url, init);
  const text = await res.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    json = null;
  }
  return { status: res.status, text, json, headers: res.headers };
}

function hasRateLimitHeaders(headers) {
  const limit = headers.get("x-ratelimit-limit") ?? headers.get("ratelimit-limit");
  const remaining = headers.get("x-ratelimit-remaining") ?? headers.get("ratelimit-remaining");
  const reset = headers.get("x-ratelimit-reset") ?? headers.get("ratelimit-reset");
  return Boolean(limit && remaining !== null && reset);
}

async function waitForRateLimitResetIfNeeded() {
  const probe = await fetchStatus(`${BASE}/health`);
  if (probe.status !== 429) return;
  testLog("Rate limit window active — waiting 61s before running QA checks...");
  await new Promise((r) => setTimeout(r, 61_000));
}

async function main() {
  testLog(`API QA against ${BASE}`);

  await waitForRateLimitResetIfNeeded();

  // Health
  try {
    const h = await fetchStatus(`${BASE}/health`);
    record("4.1.1", "GET /health", h.status === 200 && h.json?.ok === true, `status=${h.status}`);
  } catch (e) {
    record("4.1.1", "GET /health", false, e instanceof Error ? e.message : String(e));
  }

  // Validation sample
  try {
    const v = await fetchStatus(`${BASE}/api/translate?from=en&to=tr`);
    record("4.3.1", "Missing word → 400", v.status === 400, `status=${v.status}`);
  } catch (e) {
    record("4.3.1", "Missing word → 400", false, e instanceof Error ? e.message : String(e));
  }

  // Rate limit headers on 200
  try {
    const ok = await fetchStatus(
      `${BASE}/api/translate?word=hello&from=en&to=tr&uiLang=en&difficulty=B1`
    );
    record(
      "4.6-headers-200",
      "RateLimit headers on 200 response",
      ok.status === 200 && hasRateLimitHeaders(ok.headers),
      `limit=${ok.headers.get("x-ratelimit-limit") ?? ok.headers.get("ratelimit-limit")}`
    );
  } catch (e) {
    record("4.6-headers-200", "RateLimit headers on 200 response", false, String(e));
  }

  // Rate limit headers on application 404 (not_found)
  try {
    const nf = await fetchStatus(
      `${BASE}/api/translate?word=xyzznotfoundqa&from=en&to=tr&uiLang=en&difficulty=B1`
    );
    record(
      "4.6-headers-404-app",
      "RateLimit headers on not_found 404",
      nf.status === 404 && hasRateLimitHeaders(nf.headers),
      `status=${nf.status}`
    );
  } catch (e) {
    record("4.6-headers-404-app", "RateLimit headers on not_found 404", false, String(e));
  }

  // Rate limit headers on unknown route 404
  try {
    const unknown = await fetchStatus(`${BASE}/api/unknown-path-probe`);
    record(
      "4.6-headers-404-route",
      "RateLimit headers on unknown route 404",
      unknown.status === 404 && hasRateLimitHeaders(unknown.headers),
      `status=${unknown.status}`
    );
  } catch (e) {
    record("4.6-headers-404-route", "RateLimit headers on unknown route 404", false, String(e));
  }

  // Parallel gibberish burst (404 not_found) should also hit 429
  const gibberishBurst = await Promise.all(
    Array.from({ length: 31 }, (_, i) =>
      fetchStatus(
        `${BASE}/api/translate?word=burst404_${i}&from=en&to=tr&uiLang=en&difficulty=B1`
      )
    )
  );
  const gibCodes = gibberishBurst.map((b) => b.status);
  const gib429 = gibCodes.filter((c) => c === 429).length;
  record(
    "4.6-gibberish-burst",
    "Burst gibberish not_found requests trigger 429",
    gib429 > 0,
    `404=${gibCodes.filter((c) => c === 404).length} 429=${gib429}`
  );

  if (gib429 > 0) {
    testLog("Waiting 61s after gibberish burst before hello tests...");
    await new Promise((r) => setTimeout(r, 61_000));
  }

  // Sequential cached hello (moderate pace — should not 429 within translate limit)
  let saw429Sequential = false;
  for (let i = 1; i <= 31; i++) {
    const r = await fetchStatus(
      `${BASE}/api/translate?word=hello&from=en&to=tr&uiLang=en&difficulty=B1`
    );
    if (r.status === 429) saw429Sequential = true;
  }
  record(
    "4.6-seq",
    "Sequential cached hello (no false 429 at moderate pace)",
    !saw429Sequential,
    saw429Sequential ? "unexpected 429" : "31 requests without 429"
  );

  // Burst parallel GET rate limit on cached hello
  const burst = await Promise.all(
    Array.from({ length: 31 }, () =>
      fetchStatus(`${BASE}/api/translate?word=hello&from=en&to=tr&uiLang=en&difficulty=B1`)
    )
  );
  const codes = burst.map((b) => b.status);
  const count429 = codes.filter((c) => c === 429).length;
  const count200 = codes.filter((c) => c === 200).length;
  record(
    "4.6-burst",
    "Burst GET rate limit on /hello (expect some 429)",
    count429 > 0,
    `200=${count200} 429=${count429}`
  );

  if (count429 > 0) {
    testLog("Waiting 61s before regenerate POST tests...");
    await new Promise((r) => setTimeout(r, 61_000));
  }

  // POST regenerate rate limit
  const postBody = JSON.stringify({ word: "hello", from: "en", to: "tr", difficulty: "B1" });
  const postCodes = [];
  for (let i = 0; i < 7; i++) {
    const r = await fetchStatus(`${BASE}/api/translate/regenerate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: postBody,
    });
    postCodes.push(r.status);
  }
  const post429 = postCodes.filter((c) => c === 429).length;
  record(
    "4.6-post",
    "POST regenerate rate limit (expect 429 after 5/min)",
    post429 > 0,
    `codes=${postCodes.join(",")}`
  );

  const failed = results.filter((r) => !r.pass);
  testLog(`${results.length - failed.length}/${results.length} checks passed`);

  if (failed.length > 0) {
    logError(TAG.TEST_RUN, "Failures:");
    for (const f of failed) logError(TAG.TEST_RUN, `  - ${f.id} ${f.name}: ${f.detail ?? ""}`);
    process.exit(1);
  }

  process.exit(0);
}

main().catch((err) => {
  logError(TAG.TEST_RUN, err instanceof Error ? err.message : String(err));
  process.exit(1);
});
