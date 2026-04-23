import { snGet } from "../../lib/client.js";
import { validateSysId } from "../../lib/validate.js";
import { encodeQueryParam } from "../../lib/helpers.js";
import { ServiceNowEnv } from "../../types.js";
import {
  LintIssue, SCRIPT_TABLES, ALL_CHECKS,
  checkTryCatch, checkComments, checkHardcodedSysIds, checkDuplicateMethods,
  checkGrInLoop, checkCurrentUpdate, checkEvalUsage, checkClientServerApi,
  checkNoLimitQuery, checkRestNoTimeout, checkEncodedQueryConcat,
  checkHardcodedUrls, checkHardcodedSecrets, checkMissingDescription,
  checkMissingDeps,
} from "./checks.js";

// ─────────────────────────────────────────────
//  Tool Definitions
// ─────────────────────────────────────────────

export const governanceTools = [
  {
    name: "sn_check_update_set",
    description:
      "Linter de qualidade para Update Sets. Analisa os scripts contidos em busca de 15 checks " +
      "de boas práticas ServiceNow: try/catch, comentários, sys_ids hardcoded, dependências, " +
      "métodos duplicados, GlideRecord em loop (N+1), current.update(), eval(), APIs server-only " +
      "em Client Scripts, query sem setLimit(), REST sem timeout, concatenação em addEncodedQuery(), " +
      "URLs hardcoded, segredos hardcoded e description ausente. Retorna relatório estruturado.",
    inputSchema: {
      type: "object",
      properties: {
        env:           { type: "string", description: "Prefixo do ambiente (opcional, ex: DEV)" },
        update_set_id: { type: "string", description: "sys_id do Update Set a analisar" },
        name:          { type: "string", description: "Nome parcial do Update Set (alternativa ao sys_id)" },
        checks: {
          type: "array",
          items: { type: "string", enum: ALL_CHECKS },
          description: "Checks específicos a executar (default: todos os 15)",
        },
      },
    },
  },
];

// ─────────────────────────────────────────────
//  Handler
// ─────────────────────────────────────────────

export async function handleGovernanceTool(name: string, args: any) {
  const env: ServiceNowEnv = args.env || null;

  switch (name) {
    case "sn_check_update_set": {
      if (!args.update_set_id && !args.name) {
        throw new Error("Informe update_set_id (sys_id) ou name do Update Set.");
      }

      const activeChecks: Set<string> = args.checks?.length
        ? new Set(args.checks)
        : new Set(ALL_CHECKS);

      // 1. Resolve Update Set
      let updateSetSysId: string;
      let updateSetName: string;

      if (args.update_set_id) {
        validateSysId(args.update_set_id);
        updateSetSysId = args.update_set_id;
        const { result: us } = await snGet(`/api/now/table/sys_update_set/${updateSetSysId}`, {
          sysparm_fields: "name,state,sys_id",
        }, env);
        updateSetName = us.name;
      } else {
        const { result: found } = await snGet("/api/now/table/sys_update_set", {
          sysparm_query:  `nameLIKE${encodeQueryParam(args.name)}`,
          sysparm_fields: "sys_id,name,state",
          sysparm_limit:  1,
        }, env);
        if (!found?.length) throw new Error(`Update Set '${args.name}' não encontrado.`);
        updateSetSysId = found[0].sys_id;
        updateSetName  = found[0].name;
      }

      // 2. Fetch Update XML entries
      const { result: xmlEntries } = await snGet("/api/now/table/sys_update_xml", {
        sysparm_query:  `update_set=${updateSetSysId}^targetISNOTEMPTY`,
        sysparm_fields: "sys_id,name,target_name,type,payload",
        sysparm_limit:  500,
      }, env);

      if (!xmlEntries?.length) {
        return {
          update_set: updateSetName, update_set_id: updateSetSysId,
          total_records: 0, issues: [],
          summary: { errors: 0, warnings: 0, info: 0 }, status: "clean",
        };
      }

      // 3. Run checks per script-bearing record
      const allIssues: LintIssue[] = [];
      let scriptCount = 0;

      for (const entry of xmlEntries) {
        const table = entry.type?.toLowerCase?.() || "";
        const meta  = SCRIPT_TABLES[table];
        if (!meta) continue;

        const payload  = entry.payload || "";
        const fieldTag = meta.field;

        const scriptMatch = payload.match(
          new RegExp(`<${fieldTag}[^>]*><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></${fieldTag}>`, "i")
        ) || payload.match(
          new RegExp(`<${fieldTag}[^>]*>([^<]*)</${fieldTag}>`, "i")
        );

        const script = scriptMatch ? scriptMatch[1] : "";
        const label  = entry.target_name || entry.name || entry.sys_id;

        if (!script) continue;
        scriptCount++;

        // Sync checks (pure functions)
        if (activeChecks.has("try_catch"))             allIssues.push(...checkTryCatch(script, label, table));
        if (activeChecks.has("comments"))              allIssues.push(...checkComments(script, label, table));
        if (activeChecks.has("hardcoded_sysids"))      allIssues.push(...checkHardcodedSysIds(script, label, table));
        if (activeChecks.has("duplicate_methods"))     allIssues.push(...checkDuplicateMethods(script, label, table));
        if (activeChecks.has("gr_in_loop"))            allIssues.push(...checkGrInLoop(script, label, table));
        if (activeChecks.has("current_update"))        allIssues.push(...checkCurrentUpdate(script, label, table));
        if (activeChecks.has("eval_usage"))            allIssues.push(...checkEvalUsage(script, label, table));
        if (activeChecks.has("client_server_api"))     allIssues.push(...checkClientServerApi(script, label, table));
        if (activeChecks.has("no_limit_query"))        allIssues.push(...checkNoLimitQuery(script, label, table));
        if (activeChecks.has("rest_no_timeout"))       allIssues.push(...checkRestNoTimeout(script, label, table));
        if (activeChecks.has("encoded_query_concat"))  allIssues.push(...checkEncodedQueryConcat(script, label, table));
        if (activeChecks.has("hardcoded_urls"))        allIssues.push(...checkHardcodedUrls(script, label, table));
        if (activeChecks.has("hardcoded_secrets"))     allIssues.push(...checkHardcodedSecrets(script, label, table));
        if (activeChecks.has("missing_description"))   allIssues.push(...checkMissingDescription(payload, label, table));

        // Async check — after all sync checks
        if (activeChecks.has("missing_deps"))
          allIssues.push(...(await checkMissingDeps(script, label, table, env)));
      }

      const summary = {
        errors:   allIssues.filter(i => i.severity === "error").length,
        warnings: allIssues.filter(i => i.severity === "warning").length,
        info:     allIssues.filter(i => i.severity === "info").length,
      };

      return {
        update_set:             updateSetName,
        update_set_id:          updateSetSysId,
        total_records:          xmlEntries.length,
        script_records_analyzed: scriptCount,
        checks_run:             [...activeChecks],
        issues:                 allIssues,
        summary,
        status: summary.errors > 0 ? "fail" : summary.warnings > 0 ? "warn" : "clean",
      };
    }

    default: return null;
  }
}
