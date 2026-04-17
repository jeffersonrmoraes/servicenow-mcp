import { test } from "node:test";
import assert from "node:assert/strict";

// ─────────────────────────────────────────────
//  Tests — governance.ts / sn_check_update_set (v6.0)
//  Strategy: test the static analysis (linting) functions
//  in isolation without calling ServiceNow APIs.
// ─────────────────────────────────────────────

// ── Inline copies of linter functions for pure unit testing ──────────────────

const SYSID_REGEX = /['"][0-9a-f]{32}['"]/gi;

function checkTryCatch(script: string, label: string, table: string) {
  const issues: any[] = [];
  if (!script || script.trim().length < 30) return issues;
  const hasGlide = /GlideRecord|GlideAggregate|GlideSystem|gs\./i.test(script);
  if (!hasGlide) return issues;
  const hasTryCatch = /try\s*\{/i.test(script);
  if (!hasTryCatch) {
    issues.push({ severity: "warning", check: "try_catch", record: label, table });
  }
  return issues;
}

function checkComments(script: string, label: string, table: string) {
  const issues: any[] = [];
  if (!script || script.trim().length < 50) return issues;
  const hasComments = /\/\/|\/\*|\*\//.test(script);
  const lineCount   = script.split("\n").length;
  if (!hasComments && lineCount > 5) {
    issues.push({ severity: "info", check: "comments", record: label, table });
  }
  return issues;
}

function checkHardcodedSysIds(script: string, label: string, table: string) {
  const issues: any[] = [];
  if (!script) return issues;
  const matches = [...script.matchAll(SYSID_REGEX)];
  if (matches.length > 0) {
    issues.push({ severity: "error", check: "hardcoded_sysids", record: label, table, count: matches.length });
  }
  return issues;
}

function checkDuplicateMethods(script: string, label: string, table: string) {
  const issues: any[] = [];
  if (!script) return issues;
  const seen  = new Map<string, number>();
  const re    = /function\s+(\w+)\s*\(/g;
  let m;
  while ((m = re.exec(script)) !== null) {
    const n = m[1];
    seen.set(n, (seen.get(n) || 0) + 1);
  }
  const duplicates = [...seen.entries()].filter(([, c]) => c > 1);
  if (duplicates.length > 0) {
    issues.push({ severity: "error", check: "duplicate_methods", record: label, table, duplicates });
  }
  return issues;
}

// ── checkTryCatch ─────────────────────────────────────────────────────────────

test("checkTryCatch: script with GlideRecord and no try/catch → warning", () => {
  const script = `var gr = new GlideRecord('incident');\ngr.addQuery('active', true);\ngr.query();\nwhile(gr.next()) { gs.log(gr.number); }`;
  const issues = checkTryCatch(script, "Test Rule", "sys_script");
  assert.equal(issues.length, 1);
  assert.equal(issues[0].severity, "warning");
  assert.equal(issues[0].check, "try_catch");
});

test("checkTryCatch: script with try/catch → no issues", () => {
  const script = `try { var gr = new GlideRecord('incident'); gr.query(); } catch(e) { gs.logError(e); }`;
  const issues = checkTryCatch(script, "Test Rule", "sys_script");
  assert.equal(issues.length, 0);
});

test("checkTryCatch: very short script → no issues (skip)", () => {
  const issues = checkTryCatch("gs.log(1);", "Short", "sys_script");
  assert.equal(issues.length, 0);
});

test("checkTryCatch: script without GlideRecord → no issues", () => {
  const script = `var x = current.number; answer = x.startsWith('INC');`;
  const issues = checkTryCatch(script + "  ".repeat(20), "Condition", "sys_script");
  assert.equal(issues.length, 0);
});

// ── checkComments ─────────────────────────────────────────────────────────────

test("checkComments: long script without comments → info issue", () => {
  const script = Array(7).fill("var gr = new GlideRecord('incident');").join("\n");
  const issues = checkComments(script, "Rule", "sys_script");
  assert.equal(issues.length, 1);
  assert.equal(issues[0].severity, "info");
  assert.equal(issues[0].check, "comments");
});

test("checkComments: script with // comment → no issues", () => {
  const script = Array(7).fill("var gr = new GlideRecord('incident');").join("\n") + "\n// This does X";
  const issues = checkComments(script, "Rule", "sys_script");
  assert.equal(issues.length, 0);
});

test("checkComments: script with /* block comment */ → no issues", () => {
  const script = Array(7).fill("var x = 1;").join("\n") + "\n/* Block comment */";
  const issues = checkComments(script, "Rule", "sys_script");
  assert.equal(issues.length, 0);
});

test("checkComments: short script → skip check", () => {
  const issues = checkComments("var x = 1;", "Short", "sys_script");
  assert.equal(issues.length, 0);
});

// ── checkHardcodedSysIds ──────────────────────────────────────────────────────

test("checkHardcodedSysIds: detects hardcoded 32-char hex string", () => {
  const script = `var gr = new GlideRecord('sys_user'); gr.get('1234567890abcdef1234567890abcdef');`;
  const issues = checkHardcodedSysIds(script, "Rule", "sys_script");
  assert.equal(issues.length, 1);
  assert.equal(issues[0].severity, "error");
  assert.equal(issues[0].check, "hardcoded_sysids");
  assert.equal(issues[0].count, 1);
});

test("checkHardcodedSysIds: multiple hardcoded sys_ids → single issue with count", () => {
  const id1 = "1234567890abcdef1234567890abcdef";
  const id2 = "abcdef1234567890abcdef1234567890";
  const script = `gr.get('${id1}'); gr2.get('${id2}');`;
  const issues = checkHardcodedSysIds(script, "Rule", "sys_script");
  assert.equal(issues.length, 1);
  assert.equal(issues[0].count, 2);
});

test("checkHardcodedSysIds: short hex string (not sys_id length) → no issues", () => {
  const script = `var x = 'abc123'; // not a sys_id`;
  const issues = checkHardcodedSysIds(script, "Rule", "sys_script");
  assert.equal(issues.length, 0);
});

test("checkHardcodedSysIds: empty script → no issues", () => {
  const issues = checkHardcodedSysIds("", "Rule", "sys_script");
  assert.equal(issues.length, 0);
});

// ── checkDuplicateMethods ─────────────────────────────────────────────────────

test("checkDuplicateMethods: duplicate function → error issue", () => {
  const script = `function doSomething() { return 1; }\nfunction helper() { return 2; }\nfunction doSomething() { return 3; }`;
  const issues = checkDuplicateMethods(script, "SI", "sys_script_include");
  assert.equal(issues.length, 1);
  assert.equal(issues[0].severity, "error");
  assert.equal(issues[0].check, "duplicate_methods");
  assert.ok(issues[0].duplicates.some(([n]: [string, number]) => n === "doSomething"));
});

test("checkDuplicateMethods: unique functions → no issues", () => {
  const script = `function alpha() {}\nfunction beta() {}\nfunction gamma() {}`;
  const issues = checkDuplicateMethods(script, "SI", "sys_script_include");
  assert.equal(issues.length, 0);
});

test("checkDuplicateMethods: empty script → no issues", () => {
  const issues = checkDuplicateMethods("", "SI", "sys_script_include");
  assert.equal(issues.length, 0);
});

// ── Tool definition structure ─────────────────────────────────────────────────

test("governanceTools: sn_check_update_set is exported", async () => {
  const { governanceTools } = await import("../src/tools/governance.js");
  assert.equal(governanceTools.length, 1);
  assert.equal(governanceTools[0].name, "sn_check_update_set");
});

test("sn_check_update_set: has correct input schema", async () => {
  const { governanceTools } = await import("../src/tools/governance.js");
  const tool = governanceTools[0];
  assert.equal(tool.inputSchema.type, "object");
  assert.ok("update_set_id" in tool.inputSchema.properties);
  assert.ok("name" in tool.inputSchema.properties);
  assert.ok("checks" in tool.inputSchema.properties);
});

test("handleGovernanceTool: throws if no update_set_id or name", async () => {
  const { handleGovernanceTool } = await import("../src/tools/governance.js");
  await assert.rejects(
    () => handleGovernanceTool("sn_check_update_set", {}),
    /update_set_id.*name|name.*update_set_id/i
  );
});

test("handleGovernanceTool: unknown name returns null", async () => {
  const { handleGovernanceTool } = await import("../src/tools/governance.js");
  const result = await handleGovernanceTool("sn_unknown", {});
  assert.equal(result, null);
});
