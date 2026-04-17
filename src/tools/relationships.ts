import { snGet } from "../lib/client.js";
import { validateTableName } from "../lib/validate.js";
import { encodeQueryParam } from "../lib/helpers.js";
import { ServiceNowEnv } from "../types.js";

// ─────────────────────────────────────────────
//  TOOLS — Relationship Mapping (v6.0 — Deep Discovery)
// ─────────────────────────────────────────────

export const relationshipTools = [
  {
    name: "sn_get_dependencies",
    description: "Busca tabelas referenciadas por uma tabela específica (Outbound Relationships).",
    inputSchema: {
      type: "object",
      properties: {
        env:   { type: "string" },
        table: { type: "string", description: "Tabela de origem" },
      },
      required: ["table"],
    },
  },
  {
    name: "sn_analyze_impact",
    description:
      "Analisa quais tabelas referenciam a tabela informada (Inbound Relationships). " +
      "v6.0: inclui Deep Discovery — busca referências de string em scripts ServiceNow " +
      "(Business Rules, Script Includes, Client Scripts) via GlideRecord/GlideAggregate.",
    inputSchema: {
      type: "object",
      properties: {
        env:            { type: "string" },
        table:          { type: "string", description: "Tabela alvo" },
        deep_discovery: {
          type:        "boolean",
          description: "Inclui análise de scripts para referências dinâmicas (default: true)",
          default:     true,
        },
      },
      required: ["table"],
    },
  },
];

// ─────────────────────────────────────────────
//  Deep Discovery — script sources
// ─────────────────────────────────────────────

interface ScriptSource {
  table:      string;
  nameField:  string;
  label:      string;
}

const SCRIPT_SOURCES: ScriptSource[] = [
  { table: "sys_script",          nameField: "name",  label: "Business Rule"    },
  { table: "sys_script_include",  nameField: "name",  label: "Script Include"   },
  { table: "sys_script_client",   nameField: "name",  label: "Client Script"    },
  { table: "sys_variable_value",  nameField: "name",  label: "Variable Value"   },
  { table: "sys_ui_action",       nameField: "name",  label: "UI Action"        },
  { table: "scheduled_job",       nameField: "name",  label: "Scheduled Job"    },
];

// Patterns that reference a table name as a string argument
// Matches: new GlideRecord('table'), GlideAggregate('table'), getTable('table')
function buildScriptPatterns(table: string): RegExp[] {
  const escaped = table.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return [
    // new GlideRecord('table') or new GlideAggregate('table')
    new RegExp(`new\\s+(?:GlideRecord|GlideAggregate)\\s*\\(\\s*['"]${escaped}['"]`, "g"),
    // .initialize('table') or getTable('table')
    new RegExp(`\\.(?:initialize|getTable)\\s*\\(\\s*['"]${escaped}['"]`, "g"),
    // gs.getTable('table') patterns
    new RegExp(`gs\\.(?:getTable)\\s*\\(\\s*['"]${escaped}['"]`, "g"),
    // GlideQuery('table')
    new RegExp(`GlideQuery\\s*\\(\\s*['"]${escaped}['"]`, "g"),
  ];
}

interface ScriptReference {
  source_type:   string;
  source_name:   string;
  source_table:  string;
  match_pattern: string;
  match_count:   number;
}

async function deepDiscovery(table: string, env: ServiceNowEnv): Promise<ScriptReference[]> {
  const patterns = buildScriptPatterns(table);
  const refs: ScriptReference[] = [];

  // Build a query that the ServiceNow REST API can use: scriptLIKE'table'
  // We search for the table name substring in script field — ServiceNow will return candidates
  // then we apply precise regex locally
  const likeQuery = `scriptLIKE${encodeQueryParam(table)}`;

  for (const source of SCRIPT_SOURCES) {
    let scriptField = "script";
    // sys_variable_value uses a different field
    if (source.table === "sys_variable_value") scriptField = "value";

    try {
      const { result } = await snGet(`/api/now/table/${source.table}`, {
        sysparm_query:  likeQuery,
        sysparm_fields: `sys_id,${source.nameField},${scriptField},active`,
        sysparm_limit:  200,
      }, env);

      for (const record of result) {
        const script = record[scriptField] || "";
        if (!script) continue;

        let totalMatches = 0;
        let firstPattern = "";

        for (const pattern of patterns) {
          pattern.lastIndex = 0;
          const matches = [...script.matchAll(pattern)];
          if (matches.length > 0) {
            if (!firstPattern) firstPattern = pattern.source;
            totalMatches += matches.length;
          }
        }

        if (totalMatches > 0) {
          refs.push({
            source_type:   source.label,
            source_name:   record[source.nameField] || record.sys_id,
            source_table:  source.table,
            match_pattern: firstPattern,
            match_count:   totalMatches,
          });
        }
      }
    } catch {
      // Skip sources that aren't accessible (permissions or non-existent table)
    }
  }

  return refs;
}

// ─────────────────────────────────────────────
//  HANDLERS
// ─────────────────────────────────────────────

export async function handleRelationshipTool(name: string, args: any) {
  const env: ServiceNowEnv = args.env || null;

  switch (name) {
    case "sn_get_dependencies": {
      const { table } = args;
      validateTableName(table);

      const { result: deps } = await snGet("/api/now/table/sys_dictionary", {
        sysparm_query:  `name=${table}^internal_type=reference^referenceISNOTEMPTY^active=true`,
        sysparm_fields: "element,reference,column_label",
      }, env);

      return {
        table,
        outbound_dependencies: deps.map((d: any) => ({
          field:      d.element,
          label:      d.column_label,
          references: d.reference.display_value || d.reference.value || d.reference,
        })),
      };
    }

    case "sn_analyze_impact": {
      const { table } = args;
      validateTableName(table);
      const runDeepDiscovery = args.deep_discovery !== false;

      // 1. Dictionary-level inbound references (existing behaviour)
      const { result: impact } = await snGet("/api/now/table/sys_dictionary", {
        sysparm_query:  `reference=${table}^active=true`,
        sysparm_fields: "name,element,column_label",
      }, env);

      const inboundRefs = impact.map((i: any) => ({
        referencing_table: i.name,
        field:             i.element,
        label:             i.column_label,
      }));

      // 2. Deep Discovery — script string analysis
      let scriptRefs: ScriptReference[] = [];
      if (runDeepDiscovery) {
        scriptRefs = await deepDiscovery(table, env);
      }

      return {
        table,
        inbound_references:    inboundRefs,
        script_references:     scriptRefs,
        deep_discovery_ran:    runDeepDiscovery,
        summary: {
          dictionary_refs: inboundRefs.length,
          script_refs:     scriptRefs.length,
          total:           inboundRefs.length + scriptRefs.length,
        },
      };
    }

    default: return null;
  }
}
