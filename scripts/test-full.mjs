#!/usr/bin/env node
/**
 * Full pipeline: optional TEST-PREP (clean rebuild) then TEST-RUN (HTTP QA only).
 *
 * Flags:
 *   --skip-prep   — skip clean rebuild; run tests only (no service kills)
 *   --with-prep   — force clean rebuild before tests (default unless --skip-prep)
 *   --restart     — passed to clean-rebuild (restart frontend-dev after build)
 *
 * Prep phase exit code 10 (intentional frontend stops) is treated as success.
 */
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  EXIT_FAIL,
  EXIT_INTENTIONAL_STOP,
  EXIT_OK,
  describeExitCode,
  isSuccessOrIntentionalStop,
} from "./lib/exit-codes.mjs";
import { TAG, log, logError } from "./lib/log.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const node = process.execPath;

const skipPrep = process.argv.includes("--skip-prep");
const withPrep = !skipPrep;
const restartFlag = process.argv.includes("--restart");

function runScript(relPath, args = []) {
  return spawnSync(node, [path.join(ROOT, relPath), ...args], {
    cwd: ROOT,
    stdio: "inherit",
    env: process.env,
  });
}

function main() {
  if (withPrep) {
    log(TAG.TEST_PREP, "Running clean frontend rebuild (stops frontend only, not backend) ...");
    const prepArgs = restartFlag ? ["--restart"] : [];
    const prep = runScript("scripts/clean-rebuild.mjs", prepArgs);
    const prepCode = prep.status ?? EXIT_FAIL;

    if (isSuccessOrIntentionalStop(prepCode)) {
      if (prepCode === EXIT_INTENTIONAL_STOP) {
        log(
          TAG.TEST_PREP,
          `Prep phase completed: ${describeExitCode(prepCode)} — continuing to tests (not a failure).`
        );
      } else {
        log(TAG.TEST_PREP, "Prep phase completed successfully (exit 0).");
      }
    } else {
      logError(TAG.TEST_PREP, `Prep phase failed: ${describeExitCode(prepCode)} (exit ${prepCode}).`);
      process.exit(prepCode);
    }
  } else {
    log(TAG.TEST_PREP, "Skipped (--skip-prep). No services will be stopped during this run.");
  }

  log(TAG.TEST_RUN, "Starting test phase ...");
  const run = runScript("scripts/test-run.mjs");
  const runCode = run.status ?? EXIT_FAIL;

  if (runCode === EXIT_OK) {
    log(TAG.TEST_RUN, "Full pipeline completed successfully (exit 0).");
    process.exit(EXIT_OK);
  }

  logError(TAG.TEST_RUN, `Test phase failed: ${describeExitCode(runCode)} (exit ${runCode}).`);
  process.exit(runCode);
}

main();
