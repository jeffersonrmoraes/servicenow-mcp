import { snGet, snPost, snPatch, SN_USER } from "../lib/client.js";

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
        name:        { type: "string" },
        description: { type: "string" },
      },
      required: ["name"],
    },
  },
  {
    name: "sn_set_current_update_set",
    description: "Define o Update Set atual para capturar as próximas mudanças.",
    inputSchema: {
      type: "object",
      properties: {
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
        sys_id: { type: "string" },
      },
      required: ["sys_id"],
    },
  },
];

// ─────────────────────────────────────────────
//  HANDLERS — Deploy
// ─────────────────────────────────────────────

export async function handleDeployTool(name, args) {
  switch (name) {

    case "sn_create_update_set": {
      const data = await snPost("/api/now/table/sys_update_set", {
        name:        args.name,
        description: args.description || "",
        state:       "in progress",
      });
      return { sys_id: data.result.sys_id, name: data.result.name };
    }

    case "sn_set_current_update_set": {
      await snPost("/api/now/table/sys_user_preference", {
        name:  "sys_update_set",
        value: args.sys_id,
        user:  SN_USER,
      });
      return { message: "Update Set definido como atual", sys_id: args.sys_id };
    }

    case "sn_list_update_sets": {
      const query = args.state ? `state=${args.state}` : "stateINin progress,complete";
      const data = await snGet("/api/now/table/sys_update_set", {
        sysparm_query:  query,
        sysparm_fields: "sys_id,name,state,description,sys_created_by,sys_created_on",
        sysparm_limit:  args.limit || 20,
        sysparm_orderby: "sys_created_on",
        sysparm_orderby_direction: "desc",
      });
      return data.result;
    }

    case "sn_complete_update_set": {
      const data = await snPatch(`/api/now/table/sys_update_set/${args.sys_id}`, {
        state: "complete",
      });
      return { sys_id: data.result.sys_id, name: data.result.name, state: data.result.state };
    }

    default: return null;
  }
}
