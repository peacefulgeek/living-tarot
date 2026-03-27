#!/usr/bin/env node
/**
 * cron-worker.mjs — Runs article generation on a schedule
 * Mon-Fri 12:00 UTC, 600s timeout
 * AUTO_GEN_ENABLED must be true to run
 */

import { generateNewArticles } from "./generate-articles.mjs";

const AUTO_GEN_ENABLED = false;

const SCHEDULE_DAYS = [1, 2, 3, 4, 5]; // Mon-Fri
const SCHEDULE_HOUR = 12; // UTC
const ARTICLES_PER_RUN = 5;
const TIMEOUT_MS = 600_000; // 600 seconds

function getNextRunTime() {
  const now = new Date();
  let next = new Date(now);
  next.setUTCHours(SCHEDULE_HOUR, 0, 0, 0);

  // If today's run time has passed, move to next day
  if (next <= now) {
    next.setUTCDate(next.getUTCDate() + 1);
  }

  // Find next scheduled day (Mon-Fri)
  while (!SCHEDULE_DAYS.includes(next.getUTCDay())) {
    next.setUTCDate(next.getUTCDate() + 1);
  }

  return next;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runWithTimeout(fn, timeoutMs) {
  return Promise.race([
    fn(),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Generation timeout")), timeoutMs)
    ),
  ]);
}

export async function startCronLoop() {
  if (!AUTO_GEN_ENABLED) {
    console.log("[cron] AUTO_GEN_ENABLED is false. Cron worker idle.");
    // Keep process alive but do nothing
    setInterval(() => {}, 60_000);
    return;
  }

  console.log("[cron] Auto-gen cron worker started.");

  while (true) {
    const nextRun = getNextRunTime();
    const waitMs = nextRun.getTime() - Date.now();

    console.log(`[cron] Next run: ${nextRun.toISOString()} (in ${Math.round(waitMs / 60000)}m)`);
    await sleep(waitMs);

    console.log(`[cron] Running article generation at ${new Date().toISOString()}`);
    try {
      const count = await runWithTimeout(
        () => generateNewArticles(ARTICLES_PER_RUN),
        TIMEOUT_MS
      );
      console.log(`[cron] Generated ${count} articles successfully.`);
    } catch (err) {
      console.error("[cron] Generation failed:", err.message);
    }

    // Wait 1 minute to avoid double-run
    await sleep(60_000);
  }
}

// Run directly
startCronLoop().catch((err) => {
  console.error("[cron] Fatal:", err);
  process.exit(1);
});
