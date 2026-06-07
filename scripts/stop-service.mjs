#!/usr/bin/env node
/**
 * Stop one service or group by port — never kills unrelated Node processes.
 *
 * Exit codes:
 *   0  — nothing was listening / no stop needed
 *   10 — intentional stop completed (expected, not an application crash)
 *   1  — invalid usage
 */
import {
  EXIT_FAIL,
  EXIT_INTENTIONAL_STOP,
  EXIT_OK,
  logIntentionalStopContext,
} from "./lib/exit-codes.mjs";
import { TAG, log } from "./lib/log.mjs";
import { getService, getServicesByGroup } from "./lib/ports.mjs";
import { stopPort } from "./lib/process-manager.mjs";

const target = process.argv[2];
const reason = process.argv[3] ?? "planned stop";

if (!target) {
  console.error("Usage: node scripts/stop-service.mjs <service-id|frontend|backend> [reason]");
  process.exit(EXIT_FAIL);
}

let serviceIds = [];

if (target === "frontend" || target === "backend") {
  serviceIds = getServicesByGroup(target).map((s) => s.id);
} else {
  serviceIds = [target];
}

let totalStopped = 0;
const stopped = [];

for (const id of serviceIds) {
  const svc = getService(id);
  const result = stopPort(svc.port, {
    reason,
    label: svc.label,
    logTag: TAG.CLEANUP,
  });
  if (result.stopped > 0) {
    totalStopped += result.stopped;
    stopped.push(result);
  }
}

if (totalStopped === 0) {
  log(TAG.CLEANUP, `Stop complete (${target}): no processes were running (exit 0).`);
  process.exit(EXIT_OK);
}

for (const svc of stopped) {
  logIntentionalStopContext(svc.label, svc.port, svc.pids);
}

log(
  TAG.CLEANUP,
  `Stop complete (${target}): ${totalStopped} process(es) terminated intentionally (exit ${EXIT_INTENTIONAL_STOP}).`
);
process.exit(EXIT_INTENTIONAL_STOP);
