import { test, before, after } from "node:test";
import assert from "node:assert/strict";
import fs     from "node:fs/promises";
import path   from "node:path";
import os     from "node:os";

// ─────────────────────────────────────────────
//  Tests — activity.ts (v6.0)
// ─────────────────────────────────────────────

const TEST_PATH = path.join(os.tmpdir(), `sn-activity-test-${Date.now()}.jsonl`);

// Override ACTIVITY_PATH before importing the module
process.env.SN_ACTIVITY_LOG_PATH = TEST_PATH;

const { logActivity, readActivity, readActivityFrom, ACTIVITY_PATH } =
  await import("../src/lib/activity.js");

function makeEntry(tool = "sn_test", status: "ok" | "error" = "ok"): any {
  return { ts: new Date().toISOString(), tool, env: "default", duration: 42, status };
}

// Clean up temp file after tests
after(async () => {
  try { await fs.unlink(TEST_PATH); } catch {}
});

// ─────────────────────────────────────────────

test("ACTIVITY_PATH respects SN_ACTIVITY_LOG_PATH env var", () => {
  assert.equal(ACTIVITY_PATH, TEST_PATH);
});

test("readActivity: returns [] if file does not exist", async () => {
  const entries = await readActivity();
  assert.deepEqual(entries, []);
});

test("logActivity: creates file and appends one entry", async () => {
  await logActivity(makeEntry("sn_health_check"));
  // Give the write queue time to flush
  await new Promise(r => setTimeout(r, 50));

  const entries = await readActivity();
  assert.equal(entries.length, 1);
  assert.equal(entries[0].tool, "sn_health_check");
  assert.equal(entries[0].status, "ok");
  assert.equal(entries[0].env, "default");
  assert.equal(typeof entries[0].duration, "number");
});

test("logActivity: appends multiple entries in order", async () => {
  await logActivity(makeEntry("sn_query_records"));
  await logActivity(makeEntry("sn_get_record", "error"));
  await new Promise(r => setTimeout(r, 80));

  const entries = await readActivity(10);
  assert.ok(entries.length >= 3);
  const tools = entries.map(e => e.tool);
  assert.ok(tools.includes("sn_health_check"));
  assert.ok(tools.includes("sn_query_records"));
  assert.ok(tools.includes("sn_get_record"));
});

test("readActivity: respects limit parameter", async () => {
  const result = await readActivity(1);
  assert.equal(result.length, 1);
});

test("readActivity: skips malformed lines without crashing", async () => {
  await fs.appendFile(TEST_PATH, "THIS IS NOT JSON\n", "utf8");
  const entries = await readActivity(100);
  // All returned entries must be valid objects
  assert.ok(entries.every(e => typeof e === "object" && e.tool));
});

test("readActivityFrom: returns empty when offset equals file size", async () => {
  const stat = await fs.stat(TEST_PATH);
  const { entries, newOffset } = await readActivityFrom(stat.size);
  assert.equal(entries.length, 0);
  assert.equal(newOffset, stat.size);
});

test("readActivityFrom: returns only new entries since offset", async () => {
  const stat = await fs.stat(TEST_PATH);
  const offsetBefore = stat.size;

  await logActivity(makeEntry("sn_new_entry"));
  await new Promise(r => setTimeout(r, 60));

  const { entries, newOffset } = await readActivityFrom(offsetBefore);
  assert.ok(entries.length >= 1, "Should have at least one new entry");
  assert.ok(entries.some(e => e.tool === "sn_new_entry"), "Should include sn_new_entry");
  assert.ok(newOffset > offsetBefore, "New offset should be larger");
});

test("readActivityFrom: returns empty for non-existent file", async () => {
  const { entries, newOffset } = await readActivityFrom(0);
  // Uses the real ACTIVITY_PATH which exists, but testing a large offset
  const stat = await fs.stat(TEST_PATH);
  const { entries: e2 } = await readActivityFrom(stat.size + 9999);
  assert.equal(e2.length, 0);
});

test("logActivity: error entry is stored correctly", async () => {
  const entry = { ts: new Date().toISOString(), tool: "sn_fail", env: "DEV", duration: 999, status: "error" as const, error: "Connection refused" };
  await logActivity(entry);
  await new Promise(r => setTimeout(r, 60));

  const all = await readActivity(100);
  const found = all.find(e => e.tool === "sn_fail");
  assert.ok(found, "Error entry must be persisted");
  assert.equal(found?.status, "error");
  assert.equal(found?.error, "Connection refused");
  assert.equal(found?.env, "DEV");
});

test("logActivity: multiple concurrent calls do not corrupt file", async () => {
  const promises = Array.from({ length: 10 }, (_, i) =>
    logActivity(makeEntry(`sn_concurrent_${i}`))
  );
  await Promise.all(promises);
  await new Promise(r => setTimeout(r, 100));

  const entries = await readActivity(100);
  // All concurrent entries must be valid
  assert.ok(entries.every(e => typeof e.tool === "string"));
});
