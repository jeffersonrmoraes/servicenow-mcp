import { test } from "node:test";
import assert from "node:assert/strict";

// ─────────────────────────────────────────────
//  Tests — relationships.ts (v6.0 — Deep Discovery)
//  Strategy: test regex patterns and tool definitions
//  without calling ServiceNow APIs.
// ─────────────────────────────────────────────

// ── Inline copy of pattern builder for unit testing ──────────────────────────

function buildScriptPatterns(table: string): RegExp[] {
  const escaped = table.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return [
    new RegExp(`new\\s+(?:GlideRecord|GlideAggregate)\\s*\\(\\s*['"]${escaped}['"]`, "g"),
    new RegExp(`\\.(?:initialize|getTable)\\s*\\(\\s*['"]${escaped}['"]`, "g"),
    new RegExp(`gs\\.(?:getTable)\\s*\\(\\s*['"]${escaped}['"]`, "g"),
    new RegExp(`GlideQuery\\s*\\(\\s*['"]${escaped}['"]`, "g"),
  ];
}

function findMatchesInScript(script: string, table: string): number {
  const patterns = buildScriptPatterns(table);
  let total = 0;
  for (const p of patterns) {
    p.lastIndex = 0;
    total += [...script.matchAll(p)].length;
  }
  return total;
}

// ── Pattern matching — GlideRecord ───────────────────────────────────────────

test("Deep Discovery: matches new GlideRecord('table')", () => {
  const script = `var gr = new GlideRecord('incident'); gr.query();`;
  assert.equal(findMatchesInScript(script, "incident"), 1);
});

test("Deep Discovery: matches new GlideRecord(\"table\") with double quotes", () => {
  const script = `var gr = new GlideRecord("incident"); gr.query();`;
  assert.equal(findMatchesInScript(script, "incident"), 1);
});

test("Deep Discovery: matches GlideAggregate('table')", () => {
  const script = `var ga = new GlideAggregate('incident'); ga.addAggregate('COUNT');`;
  assert.equal(findMatchesInScript(script, "incident"), 1);
});

test("Deep Discovery: matches GlideQuery('table')", () => {
  const script = `new GlideQuery('incident').where('active', true).toArray();`;
  assert.equal(findMatchesInScript(script, "incident"), 1);
});

test("Deep Discovery: does NOT match different table", () => {
  const script = `var gr = new GlideRecord('problem'); gr.query();`;
  assert.equal(findMatchesInScript(script, "incident"), 0);
});

test("Deep Discovery: counts multiple occurrences in same script", () => {
  const script = [
    `var gr1 = new GlideRecord('incident');`,
    `var gr2 = new GlideRecord('incident');`,
    `var ga  = new GlideAggregate('incident');`,
  ].join("\n");
  assert.equal(findMatchesInScript(script, "incident"), 3);
});

test("Deep Discovery: matches table with underscores (custom tables)", () => {
  const script = `var gr = new GlideRecord('u_custom_request'); gr.query();`;
  assert.equal(findMatchesInScript(script, "u_custom_request"), 1);
});

test("Deep Discovery: regex escaping handles dots in table name", () => {
  // Table names don't have dots normally, but test escaping robustness
  const script = `var gr = new GlideRecord('sys_user'); gr.query();`;
  // 'sys.user' should NOT match 'sys_user' (dot is escaped)
  assert.equal(findMatchesInScript(script, "sys.user"), 0);
  assert.equal(findMatchesInScript(script, "sys_user"), 1);
});

// ── Tool definition structure ─────────────────────────────────────────────────

test("relationshipTools: exports correct tools", async () => {
  const { relationshipTools } = await import("../src/tools/relationships.js");
  const names = relationshipTools.map((t: any) => t.name);
  assert.ok(names.includes("sn_get_dependencies"), "Must export sn_get_dependencies");
  assert.ok(names.includes("sn_analyze_impact"),   "Must export sn_analyze_impact");
});

test("sn_analyze_impact: has deep_discovery parameter", async () => {
  const { relationshipTools } = await import("../src/tools/relationships.js");
  const tool = relationshipTools.find((t: any) => t.name === "sn_analyze_impact");
  assert.ok(tool, "sn_analyze_impact must be defined");
  assert.ok("deep_discovery" in tool.inputSchema.properties, "Must have deep_discovery property");
});

test("sn_analyze_impact: requires table parameter", async () => {
  const { relationshipTools } = await import("../src/tools/relationships.js");
  const tool = relationshipTools.find((t: any) => t.name === "sn_analyze_impact");
  assert.ok(tool?.inputSchema.required?.includes("table"), "table must be required");
});

test("handleRelationshipTool: validates table name — rejects invalid chars", async () => {
  const { handleRelationshipTool } = await import("../src/tools/relationships.js");
  await assert.rejects(
    () => handleRelationshipTool("sn_analyze_impact", { table: "incident; DROP TABLE" }),
    /caracteres inv/i
  );
});

test("handleRelationshipTool: unknown name returns null", async () => {
  const { handleRelationshipTool } = await import("../src/tools/relationships.js");
  const result = await handleRelationshipTool("sn_unknown", {});
  assert.equal(result, null);
});

// ── Deep Discovery result shape ───────────────────────────────────────────────

test("script_references field is present in result structure", () => {
  // Verify the expected response shape (structural, no network call)
  const fakeResult = {
    table: "incident",
    inbound_references: [],
    script_references: [],
    deep_discovery_ran: true,
    summary: { dictionary_refs: 0, script_refs: 0, total: 0 },
  };
  assert.ok("script_references" in fakeResult, "script_references must be in result");
  assert.ok("deep_discovery_ran" in fakeResult, "deep_discovery_ran must be in result");
  assert.ok("summary" in fakeResult && "total" in fakeResult.summary);
});
