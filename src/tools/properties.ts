import { snGet, snPost, snPatch } from "../lib/client.js";
import { ServiceNowEnv } from "../types.js";

// ─────────────────────────────────────────────
//  TOOLS — System Properties
// ─────────────────────────────────────────────

export const propertyTools = [
  {
    name: "sn_manage_sys_property",
    description:
      "Gerencia System Properties (sys_properties). " +
      "action=get: busca pelo nome exato. " +
      "action=set: cria ou atualiza (upsert) com suporte a mascaramento (private=true). " +
      "action=list: lista por prefixo de nome.",
    inputSchema: {
      type: "object",
      properties: {
        env:         { type: "string",  description: "Prefixo do ambiente (opcional, ex: DEV)" },
        action:      { type: "string",  enum: ["get", "set", "list"], description: "Operação a executar" },
        name:        { type: "string",  description: "Nome da property — obrigatório para get/set" },
        value:       { type: "string",  description: "Valor — obrigatório para set" },
        description: { type: "string",  description: "Descrição (usada ao criar com set)" },
        type:        { type: "string",  description: "Tipo: string, boolean, integer, choice (ao criar)" },
        private:     { type: "boolean", description: "Se true, valor mascarado na UI (senhas/tokens)" },
        prefix:      { type: "string",  description: "Prefixo de nome para filtrar — usado em list" },
        limit:       { type: "number",  description: "Máximo de resultados para list (default: 20)" },
      },
      required: ["action"],
    },
  },
];

// ─────────────────────────────────────────────
//  HANDLER
// ─────────────────────────────────────────────

export async function handlePropertyTool(name: string, args: any) {
  const env: ServiceNowEnv = args.env || null;

  if (name !== "sn_manage_sys_property") return null;

  switch (args.action) {
    case "get": {
      if (!args.name) throw new Error("Parâmetro 'name' obrigatório para action=get.");
      const { result } = await snGet("/api/now/table/sys_properties", {
        sysparm_query:  `name=${args.name}`,
        sysparm_fields: "sys_id,name,value,description,type,private",
        sysparm_limit:  "1",
      }, env);
      if (!result?.length) return { found: false, name: args.name };
      const p = result[0];
      return { found: true, sys_id: p.sys_id, name: p.name, value: p.value, description: p.description, type: p.type, private: p.private };
    }

    case "set": {
      if (!args.name)  throw new Error("Parâmetro 'name' obrigatório para action=set.");
      if (args.value === undefined) throw new Error("Parâmetro 'value' obrigatório para action=set.");
      const { result: existing } = await snGet("/api/now/table/sys_properties", {
        sysparm_query:  `name=${args.name}`,
        sysparm_fields: "sys_id,name,value",
        sysparm_limit:  "1",
      }, env);
      if (existing?.length) {
        const { result: updated } = await snPatch(`/api/now/table/sys_properties/${existing[0].sys_id}`, { value: args.value }, env);
        return { action: "updated", sys_id: updated.sys_id, name: updated.name, value: updated.value };
      } else {
        const { result: created } = await snPost("/api/now/table/sys_properties", {
          name:        args.name,
          value:       args.value,
          description: args.description || "",
          type:        args.type || "string",
          private:     args.private || false,
        }, env);
        return { action: "created", sys_id: created.sys_id, name: created.name, value: created.value };
      }
    }

    case "list": {
      const query = args.prefix ? `nameLIKE${args.prefix}` : "active=true";
      const { result } = await snGet("/api/now/table/sys_properties", {
        sysparm_query:   query,
        sysparm_fields:  "sys_id,name,value,description,type,private",
        sysparm_limit:   String(args.limit || 20),
        sysparm_orderby: "name",
      }, env);
      return result;
    }

    default:
      throw new Error(`action inválida: '${args.action}'. Use: get, set, list.`);
  }
}
