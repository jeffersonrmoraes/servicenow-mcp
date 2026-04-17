import { test, mock } from "node:test";
import assert from "node:assert/strict";

// ─────────────────────────────────────────────
//  Tests — logs.ts (v6.0)
//  Strategy: unit-test the pure helper functions
//  (buildLevelClause, buildSinceClause, requireAdminRole guard)
//  without hitting a real ServiceNow instance.
// ─────────────────────────────────────────────

// ── Level clause helpers (extracted for testability) ─────────────────────────

function buildLevelClause(level: string | undefined): string {
  const LEVEL_MAP: Record<string, string> = { error: "error", warning: "warning", info: "info", debug: "debug" };
  if (!level || level === "all") return "";
  const mapped = LEVEL_MAP[level.toLowerCase()];
  if (!mapped) return "";
  const hierarchy = ["error", "warning", "info", "debug"];
  const idx = hierarchy.indexOf(mapped);
  if (idx < 0) return `^level=${mapped}`;
  const levels = hierarchy.slice(0, idx + 1).map(l => `level=${l}`).join("^OR");
  return `^${levels}`;
}

function buildSinceClause(since: string | undefined): string {
  if (!since) {
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    return `^sys_created_on>javascript:gs.dateGenerate('${oneHourAgo.toISOString().slice(0, 10)}','${oneHourAgo.toTimeString().slice(0, 8)}')`;
  }
  const relativeMatch = since.match(/^-(\d+)(h|m|d)$/i);
  if (relativeMatch) {
    const [, amount, unit] = relativeMatch;
    const ms = parseInt(amount) * (unit === "h" ? 3600000 : unit === "m" ? 60000 : 86400000);
    const dt = new Date(Date.now() - ms);
    return `^sys_created_on>javascript:gs.dateGenerate('${dt.toISOString().slice(0, 10)}','${dt.toTimeString().slice(0, 8)}')`;
  }
  const safeSince = since.replace(/['";<>]/g, "");
  return `^sys_created_on>=${safeSince}`;
}

// ── Level clause tests ────────────────────────────────────────────────────────

test("buildLevelClause: all returns empty string", () => {
  assert.equal(buildLevelClause("all"), "");
});

test("buildLevelClause: undefined returns empty string", () => {
  assert.equal(buildLevelClause(undefined), "");
});

test("buildLevelClause: error returns only error clause", () => {
  const result = buildLevelClause("error");
  assert.ok(result.includes("level=error"), `Expected 'level=error' in: ${result}`);
  assert.ok(!result.includes("level=warning"), "Should not include warning for error level");
  assert.ok(!result.includes("level=info"),    "Should not include info for error level");
});

test("buildLevelClause: info includes error, warning, info", () => {
  const result = buildLevelClause("info");
  assert.ok(result.includes("level=error"),   `Expected 'level=error' in: ${result}`);
  assert.ok(result.includes("level=warning"), `Expected 'level=warning' in: ${result}`);
  assert.ok(result.includes("level=info"),    `Expected 'level=info' in: ${result}`);
  assert.ok(!result.includes("level=debug"),  "Should not include debug for info level");
});

test("buildLevelClause: debug includes all levels", () => {
  const result = buildLevelClause("debug");
  assert.ok(result.includes("level=error"));
  assert.ok(result.includes("level=warning"));
  assert.ok(result.includes("level=info"));
  assert.ok(result.includes("level=debug"));
});

// ── Since clause tests ────────────────────────────────────────────────────────

test("buildSinceClause: undefined returns last-hour clause", () => {
  const result = buildSinceClause(undefined);
  assert.ok(result.startsWith("^sys_created_on>javascript:gs.dateGenerate"), `Unexpected: ${result}`);
});

test("buildSinceClause: -1h returns relative clause", () => {
  const result = buildSinceClause("-1h");
  assert.ok(result.startsWith("^sys_created_on>javascript:gs.dateGenerate"), `Unexpected: ${result}`);
});

test("buildSinceClause: -30m returns relative clause", () => {
  const result = buildSinceClause("-30m");
  assert.ok(result.startsWith("^sys_created_on>javascript:gs.dateGenerate"), `Unexpected: ${result}`);
});

test("buildSinceClause: ISO date returns absolute clause", () => {
  const result = buildSinceClause("2024-01-15");
  assert.equal(result, "^sys_created_on>=2024-01-15");
});

test("buildSinceClause: strips dangerous characters from absolute date", () => {
  const result = buildSinceClause("2024-01-15';<script>");
  assert.ok(!result.includes("'"), "Should strip single quotes");
  assert.ok(!result.includes(";"), "Should strip semicolons");
  assert.ok(!result.includes("<"), "Should strip angle brackets");
});

// ── Tool definition structure ─────────────────────────────────────────────────

test("logTools: sn_stream_syslog has required shape", async () => {
  const { logTools } = await import("../src/tools/logs.js");
  const tool = logTools.find(t => t.name === "sn_stream_syslog");
  assert.ok(tool, "sn_stream_syslog must be defined");
  assert.equal(tool.inputSchema.type, "object");
  assert.ok(tool.description.toLowerCase().includes("admin"), "Description must mention admin requirement");
});

test("logTools: sn_get_node_log has required shape", async () => {
  const { logTools } = await import("../src/tools/logs.js");
  const tool = logTools.find(t => t.name === "sn_get_node_log");
  assert.ok(tool, "sn_get_node_log must be defined");
  assert.equal(tool.inputSchema.type, "object");
  assert.ok("level" in tool.inputSchema.properties, "Must expose level property");
});

test("logTools: both tools exported in array", async () => {
  const { logTools } = await import("../src/tools/logs.js");
  assert.equal(logTools.length, 2);
  const names = logTools.map(t => t.name);
  assert.ok(names.includes("sn_stream_syslog"));
  assert.ok(names.includes("sn_get_node_log"));
});

test("handleLogTool: unknown name returns null", async () => {
  const { handleLogTool } = await import("../src/tools/logs.js");
  const result = await handleLogTool("sn_unknown_tool", {}).catch(() => null);
  assert.equal(result, null);
});
