import { snGet } from "../lib/client.js";
import { ServiceNowEnv } from "../types.js";

// ─────────────────────────────────────────────
//  TOOLS — Relationship Mapping (v4.0)
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
    description: "Analisa quais tabelas referenciam a tabela informada (Inbound Relationships). Útil para análise de impacto.",
    inputSchema: {
      type: "object",
      properties: {
        env:   { type: "string" },
        table: { type: "string", description: "Tabela alvo" },
      },
      required: ["table"],
    },
  },
];

// ─────────────────────────────────────────────
//  HANDLERS
// ─────────────────────────────────────────────

export async function handleRelationshipTool(name: string, args: any) {
  const env: ServiceNowEnv = args.env || null;

  switch (name) {
    case "sn_get_dependencies": {
      const { table } = args;
      // Busca dicionário onde a tabela informada tem campos do tipo 'reference'
      const { result: deps } = await snGet("/api/now/table/sys_dictionary", {
        sysparm_query: `name=${table}^internal_type=reference^referenceISNOTEMPTY^active=true`,
        sysparm_fields: "element,reference,column_label"
      }, env);

      return {
        table,
        outbound_dependencies: deps.map((d: any) => ({
          field: d.element,
          label: d.column_label,
          references: d.reference.display_value || d.reference.value || d.reference
        }))
      };
    }

    case "sn_analyze_impact": {
      const { table } = args;
      // Busca dicionário onde outras tabelas referenciam a tabela informada
      const { result: impact } = await snGet("/api/now/table/sys_dictionary", {
        sysparm_query: `reference=${table}^active=true`,
        sysparm_fields: "name,element,column_label"
      }, env);

      return {
        table,
        inbound_references: impact.map((i: any) => ({
          referencing_table: i.name,
          field: i.element,
          label: i.column_label
        }))
      };
    }

    default: return null;
  }
}
