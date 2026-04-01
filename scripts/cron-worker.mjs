#!/usr/bin/env node
/**
 * cron-worker.mjs — Dual-schedule article generation
 * 
 * Phase 1 (first 30 days): 5 articles/day, Mon-Fri at 12:00 UTC
 * Phase 2 (after 30 days): 5 articles/week, Saturday at 12:00 UTC
 * 
 * Also runs weekly Saturday product spotlight article generation.
 * 
 * AUTO_GEN_ENABLED must be true to run.
 * Set LAUNCH_DATE to the actual launch date.
 */

import { generateNewArticles } from "./generate-articles.mjs";

// ─── Configuration ───────────────────────────────────────────
const AUTO_GEN_ENABLED = process.env.AUTO_GEN_ENABLED === "true";
const LAUNCH_DATE = new Date(process.env.LAUNCH_DATE || "2026-04-01");
const PHASE_1_DAYS = 30; // Days of daily publishing
const ARTICLES_PER_RUN = 5;
const SCHEDULE_HOUR = 12; // UTC
const TIMEOUT_MS = 600_000; // 10 minutes

// Phase 1: Mon-Fri daily
const PHASE_1_DAYS_OF_WEEK = [1, 2, 3, 4, 5];
// Phase 2: Saturday only
const PHASE_2_DAYS_OF_WEEK = [6];
// Product spotlight: Saturday
const PRODUCT_SPOTLIGHT_DAY = 6;

// ─── Helpers ─────────────────────────────────────────────────
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function daysSinceLaunch() {
  return Math.floor((Date.now() - LAUNCH_DATE.getTime()) / (1000 * 60 * 60 * 24));
}

function isPhase1() {
  return daysSinceLaunch() < PHASE_1_DAYS;
}

function getScheduleDays() {
  return isPhase1() ? PHASE_1_DAYS_OF_WEEK : PHASE_2_DAYS_OF_WEEK;
}

function getNextRunTime() {
  const now = new Date();
  const scheduleDays = getScheduleDays();
  let next = new Date(now);
  next.setUTCHours(SCHEDULE_HOUR, 0, 0, 0);

  // If today's run time has passed, move to next day
  if (next <= now) {
    next.setUTCDate(next.getUTCDate() + 1);
  }

  // Find next scheduled day
  let safety = 0;
  while (!scheduleDays.includes(next.getUTCDay()) && safety < 10) {
    next.setUTCDate(next.getUTCDate() + 1);
    safety++;
  }

  return next;
}

async function runWithTimeout(fn, timeoutMs) {
  return Promise.race([
    fn(),
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Generation timeout")), timeoutMs)
    ),
  ]);
}

// ─── Main Loop ───────────────────────────────────────────────
export async function startCronLoop() {
  if (!AUTO_GEN_ENABLED) {
    console.log("[cron] AUTO_GEN_ENABLED is false. Cron worker idle.");
    console.log("[cron] Set AUTO_GEN_ENABLED=true in environment to activate.");
    // Keep process alive but do nothing
    setInterval(() => {}, 60_000);
    return;
  }

  const phase = isPhase1() ? "Phase 1 (daily Mon-Fri)" : "Phase 2 (weekly Saturday)";
  console.log(`[cron] Auto-gen cron worker started. Current: ${phase}`);
  console.log(`[cron] Launch date: ${LAUNCH_DATE.toISOString()}`);
  console.log(`[cron] Days since launch: ${daysSinceLaunch()}`);

  while (true) {
    const currentPhase = isPhase1() ? 1 : 2;
    const nextRun = getNextRunTime();
    const waitMs = nextRun.getTime() - Date.now();

    console.log(`[cron] Phase ${currentPhase} | Next run: ${nextRun.toISOString()} (in ${Math.round(waitMs / 60000)}m)`);
    await sleep(waitMs);

    const isSaturday = new Date().getUTCDay() === PRODUCT_SPOTLIGHT_DAY;

    // Regular article generation
    console.log(`[cron] Running article generation at ${new Date().toISOString()}`);
    try {
      const count = await runWithTimeout(
        () => generateNewArticles(ARTICLES_PER_RUN),
        TIMEOUT_MS
      );
      console.log(`[cron] Generated ${count} articles successfully.`);
    } catch (err) {
      console.error("[cron] Article generation failed:", err.message);
    }

    // Saturday product spotlight (in addition to regular articles)
    if (isSaturday) {
      console.log(`[cron] Saturday — generating product spotlight article`);
      try {
        const count = await runWithTimeout(
          () => generateNewArticles(1, { type: "product-spotlight" }),
          TIMEOUT_MS
        );
        console.log(`[cron] Product spotlight generated: ${count}`);
      } catch (err) {
        console.error("[cron] Product spotlight failed:", err.message);
      }
    }

    // Wait 1 minute to avoid double-run
    await sleep(60_000);

    // Check if phase changed
    const newPhase = isPhase1() ? 1 : 2;
    if (newPhase !== currentPhase) {
      console.log(`[cron] Phase transition: ${currentPhase} → ${newPhase}`);
    }
  }
}

// Run directly
startCronLoop().catch((err) => {
  console.error("[cron] Fatal:", err);
  process.exit(1);
});
