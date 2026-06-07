#!/usr/bin/env node
/**
 * Pre-test frontend clean rebuild (TEST-PREP).
 * Stops ONLY frontend ports 3000/3005 — never backend 3001/3002.
 *
 * Exit codes:
 *   0  — success (no services were running, or nothing stopped)
 *   10 — success after intentional frontend stops (not a failure; CI should continue)
 *   1  — build or restart failure
 *
 * Flags:
 *   --restart   — restart frontend-dev after build (optional)
 */
import { spawnSync } from "node:child_process";
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  EXIT_FAIL,
  EXIT_INTENTIONAL_STOP,
  EXIT_OK,
  logIntentionalStopContext,
} from "./lib/exit-codes.mjs";
import { TAG, log, logError } from "./lib/log.mjs";
import { FRONTEND_SERVICE_IDS, getService } from "./lib/ports.mjs";
import { stopPort, waitForHttpOk } from "./lib/process-manager.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const FRONTEND_DIR = path.join(ROOT, "frontend");
const NEXT_DIR = path.join(FRONTEND_DIR, ".next");
const shouldRestart = process.argv.includes("--restart");

async function main() {
  log(TAG.CLEAN_REBUILD, "Starting frontend clean rebuild (backend on 3001/3002 will NOT be stopped).");

  let totalStopped = 0;
  const stoppedServices = [];

  for (const id of FRONTEND_SERVICE_IDS) {
    const svc = getService(id);
    const result = stopPort(svc.port, {
      reason: "clean .next rebuild as planned",
      label: svc.label,
      logTag: TAG.CLEAN_REBUILD,
    });
    if (result.stopped > 0) {
      totalStopped += result.stopped;
      stoppedServices.push({ ...result, id });
    }
  }

  if (fs.existsSync(NEXT_DIR)) {
    log(TAG.CLEAN_REBUILD, "Removing frontend/.next ...");
    fs.rmSync(NEXT_DIR, { recursive: true, force: true });
  } else {
    log(TAG.CLEAN_REBUILD, "frontend/.next not present — skipping removal.");
  }

  log(TAG.CLEAN_REBUILD, "Running next build ...");
  try {
    execSync("npm run build", {
      cwd: FRONTEND_DIR,
      stdio: "inherit",
      env: { ...process.env },
    });
  } catch {
    logError(TAG.CLEAN_REBUILD, "next build failed.");
    process.exit(EXIT_FAIL);
  }

  if (shouldRestart) {
    log(TAG.CLEAN_REBUILD, "Restarting frontend-dev on port 3000 ...");
    const restart = spawnSync(process.execPath, [path.join(ROOT, "scripts/restart-service.mjs"), "frontend-dev"], {
      cwd: ROOT,
      stdio: "inherit",
      env: process.env,
    });
    const restartCode = restart.status ?? EXIT_FAIL;
    if (restartCode !== EXIT_OK && restartCode !== EXIT_INTENTIONAL_STOP) {
      logError(TAG.CLEAN_REBUILD, `frontend-dev restart failed with exit ${restartCode}`);
      process.exit(EXIT_FAIL);
    }
    const healthy = await waitForHttpOk("http://localhost:3000/", { timeoutMs: 45_000 });
    if (!healthy) {
      logError(TAG.CLEAN_REBUILD, "frontend-dev did not become healthy after restart.");
      process.exit(EXIT_FAIL);
    }
    log(TAG.CLEAN_REBUILD, "frontend-dev is healthy at http://localhost:3000/");
  }

  if (totalStopped > 0) {
    for (const svc of stoppedServices) {
      logIntentionalStopContext(svc.label, svc.port, svc.pids);
    }
    log(
      TAG.CLEAN_REBUILD,
      `Completed successfully with ${totalStopped} intentional stop(s) — exiting with code ${EXIT_INTENTIONAL_STOP} (expected, not a failure).`
    );
    process.exit(EXIT_INTENTIONAL_STOP);
  }

  log(TAG.CLEAN_REBUILD, "Completed successfully — no services were stopped (exit 0).");
  process.exit(EXIT_OK);
}

main().catch((err) => {
  logError(TAG.CLEAN_REBUILD, err instanceof Error ? err.message : String(err));
  process.exit(EXIT_FAIL);
});
