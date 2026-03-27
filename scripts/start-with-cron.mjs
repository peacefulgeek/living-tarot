#!/usr/bin/env node
/**
 * start-with-cron.mjs — Spawns web server + cron worker together
 * Used as Render start command: NODE_ENV=production node scripts/start-with-cron.mjs
 */

import { spawn } from "node:child_process";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = resolve(__dirname, "..");

// Start the web server
const server = spawn("node", [resolve(PROJECT_ROOT, "dist", "index.js")], {
  stdio: "inherit",
  env: { ...process.env, NODE_ENV: "production" },
});

server.on("error", (err) => {
  console.error("[start] Web server failed to start:", err);
  process.exit(1);
});

server.on("exit", (code) => {
  console.error(`[start] Web server exited with code ${code}`);
  process.exit(code || 1);
});

// Start the cron worker (runs in same process)
console.log("[start] Starting cron worker...");
import("./cron-worker.mjs").catch((err) => {
  console.error("[start] Cron worker failed:", err);
});

// Handle graceful shutdown
process.on("SIGTERM", () => {
  console.log("[start] SIGTERM received. Shutting down...");
  server.kill("SIGTERM");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("[start] SIGINT received. Shutting down...");
  server.kill("SIGINT");
  process.exit(0);
});

console.log("[start] Web server + cron worker running.");
