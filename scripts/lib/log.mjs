export function log(tag, message) {
  console.log(`[${tag}] ${message}`);
}

export function logError(tag, message) {
  console.error(`[${tag}] ${message}`);
}

export const TAG = {
  CLEAN_REBUILD: "CLEAN-REBUILD",
  TEST_PREP: "TEST-PREP",
  TEST_RUN: "TEST-RUN",
  CLEANUP: "CLEANUP",
  BUILD: "BUILD",
};
