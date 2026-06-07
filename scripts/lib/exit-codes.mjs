/**
 * Process exit codes for scripts and CI wrappers.
 *
 * | Code | Meaning                                      | CI treatment        |
 * |------|----------------------------------------------|---------------------|
 * | 0    | Success                                      | Pass                |
 * | 1    | Unexpected failure                             | Fail                |
 * | 10   | Intentional service stop (planned, not crash)  | Pass / continue     |
 *
 * Not used here: 130 (SIGINT) — reserved by shell/Node for Ctrl+C.
 */
export const EXIT_OK = 0;
export const EXIT_FAIL = 1;
export const EXIT_INTENTIONAL_STOP = 10;

export function isIntentionalStop(code) {
  return code === EXIT_INTENTIONAL_STOP;
}

export function isSuccessOrIntentionalStop(code) {
  return code === EXIT_OK || code === EXIT_INTENTIONAL_STOP;
}

export function describeExitCode(code) {
  switch (code) {
    case EXIT_OK:
      return "success";
    case EXIT_FAIL:
      return "failure";
    case EXIT_INTENTIONAL_STOP:
      return "intentional service termination (expected, not a test failure)";
    default:
      return `unknown exit code ${code}`;
  }
}

export function logIntentionalStopContext(serviceLabel, port, pids) {
  const pidList = pids.length > 0 ? pids.join(", ") : "none";
  console.log(
    `[INFO] Service ${serviceLabel} on port ${port} was intentionally stopped for clean rebuild (exit code ${EXIT_INTENTIONAL_STOP}). PIDs: ${pidList}`
  );
}
