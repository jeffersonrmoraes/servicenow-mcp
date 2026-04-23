import { snGet, snPost, snPatch, getEnvUser } from "../lib/client.js";
import { validateSysId, validateLimit } from "../lib/validate.js";

// ─────────────────────────────────────────────
//  TOOLS — Deploy (Update Sets)
// ─────────────────────────────────────────────

export const deployTools = [
  {
    name: "sn_create_update_set",
    description: "Cria um Update Set no ServiceNow.",
    inputSchema: {
      type: "object",
      properties: {
        env:         { type: "string", description: "Prefixo do ambiente (opcional, ex: DEV)" },
        name:        { type: "string" },
        description: { type: "string" },
      },
      required: ["name"],
    },
  },
  {
    name: "sn_set_current_update_set",
    description: "Define o Update Set atual para capturar as próximas mudanças. DEVE ser chamado imediatamente após sn_create_update_set, antes de qualquer criação de artefato — caso contrário as mudanças irão para o Update Set default.",
    inputSchema: {
      type: "object",
      properties: {
        env:    { type: "string", description: "Prefixo do ambiente (opcional, ex: DEV)" },
        sys_id: { type: "string" },
      },
      required: ["sys_id"],
    },
  },
  {
    name: "sn_list_update_sets",
    description: "Lista os Update Sets disponíveis na instância.",
    inputSchema: {
      type: "object",
      properties: {
        env:   { type: "string", description: "Prefixo do ambiente (opcional, ex: DEV)" },
        state: { type: "string", enum: ["in progress", "complete", "ignore"], description: "Filtrar por estado (opcional)" },
        limit: { type: "number" },
      },
    },
  },
  {
    name: "sn_complete_update_set",
    description: "Marca um Update Set como completo (pronto para exportação).",
    inputSchema: {
      type: "object",
      properties: {
        env:    { type: "string", description: "Prefixo do ambiente (opcional, ex: DEV)" },
        sys_id: { type: "string" },
      },
      required: ["sys_id"],
    },
  },
];

// ─────────────────────────────────────────────
//  HANDLERS — Deploy
// ─────────────────────────────────────────────

import { ServiceNowEnv } from "../types.js";

export async function handleDeployTool(name: string, args: any) {
  switch (name) {

    case "sn_create_update_set": {
      const data = await snPost("/api/now/table/sys_update_set", {
        name:        args.name,
        description: args.description || "",
        state:       "in progress",
      }, args.env);
      return { sys_id: data.result.sys_id, name: data.result.name };
    }

    case "sn_set_current_update_set": {
      validateSysId(args.sys_id);
      const env: ServiceNowEnv = args.env || null;
      const username = getEnvUser(env);

      // 1. Resolve sys_id do usuário autenticado
      const { result: userRows } = await snGet("/api/now/table/sys_user", {
        sysparm_query:  `user_name=${username}`,
        sysparm_fields: "sys_id",
        sysparm_limit:  1,
      }, env);
      if (!userRows?.length) throw new Error(`Usuário '${username}' não encontrado na instância.`);
      const userSysId = userRows[0].sys_id;

      // 2. Verifica se a preferência já existe — upsert para não criar duplicata
      const { result: prefRows } = await snGet("/api/now/table/sys_user_preference", {
        sysparm_query:  `name=sys_update_set^user=${userSysId}`,
        sysparm_fields: "sys_id",
        sysparm_limit:  1,
      }, env);

      if (prefRows?.length) {
        await snPatch(`/api/now/table/sys_user_preference/${prefRows[0].sys_id}`, {
          value: args.sys_id,
        }, env);
      } else {
        await snPost("/api/now/table/sys_user_preference", {
          name:  "sys_update_set",
          value: args.sys_id,
          user:  userSysId,
        }, env);
      }

      return { message: "Update Set definido como atual", sys_id: args.sys_id };
    }

    case "sn_list_update_sets": {
      const limit = args.limit ? validateLimit(args.limit) : 20;
      const query = args.state ? `state=${args.state}` : "stateINin progress,complete";
      const data = await snGet("/api/now/table/sys_update_set", {
        sysparm_query:             query,
        sysparm_fields:            "sys_id,name,state,description,sys_created_by,sys_created_on",
        sysparm_limit:             limit,
        sysparm_orderby:           "sys_created_on",
        sysparm_orderby_direction: "desc",
      }, args.env);
      return data.result;
    }

    case "sn_complete_update_set": {
      validateSysId(args.sys_id);
      const data = await snPatch(`/api/now/table/sys_update_set/${args.sys_id}`, {
        state: "complete",
      }, args.env);
      return { sys_id: data.result.sys_id, name: data.result.name, state: data.result.state };
    }

    default: return null;
  }
}
