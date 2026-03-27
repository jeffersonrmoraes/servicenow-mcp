import { snGet, snPost, snPatch } from "../lib/client.js";

// ─────────────────────────────────────────────
//  TOOLS — Flow Designer
// ─────────────────────────────────────────────

export const flowTools = [
  {
    name: "sn_get_flow",
    description: "Busca um Flow pelo nome ou sys_id.",
    inputSchema: {
      type: "object",
      properties: {
        name:   { type: "string", description: "Busca parcial por nome" },
        sys_id: { type: "string" },
      },
    },
  },
  {
    name: "sn_activate_flow",
    description: "Ativa ou desativa um Flow no Flow Designer.",
    inputSchema: {
      type: "object",
      properties: {
        sys_id: { type: "string" },
        active: { type: "boolean" },
      },
      required: ["sys_id", "active"],
    },
  },
  {
    name: "sn_trigger_flow",
    description: "Dispara um Flow manualmente via API.",
    inputSchema: {
      type: "object",
      properties: {
        flow_sys_id:   { type: "string" },
        inputs:        { type: "object", description: "Inputs do flow (chave/valor)" },
        table:         { type: "string", description: "Tabela do registro alvo (trigger de record)" },
        record_sys_id: { type: "string", description: "sys_id do registro alvo" },
      },
      required: ["flow_sys_id"],
    },
  },
  {
    name: "sn_list_flow_executions",
    description: "Lista execuções recentes de um Flow para monitoramento e debug.",
    inputSchema: {
      type: "object",
      properties: {
        flow_sys_id: { type: "string" },
        limit:       { type: "number" },
        status:      { type: "string", enum: ["complete", "error", "running", "cancelled"] },
      },
      required: ["flow_sys_id"],
    },
  },
  {
    name: "sn_create_subflow",
    description: "Cria um Subflow reutilizável no Flow Designer.",
    inputSchema: {
      type: "object",
      properties: {
        name:        { type: "string" },
        description: { type: "string" },
        category:    { type: "string" },
        active:      { type: "boolean" },
      },
      required: ["name"],
    },
  },
  {
    name: "sn_create_flow_action",
    description: "Cria uma Action customizada reutilizável no Flow Designer.",
    inputSchema: {
      type: "object",
      properties: {
        name:        { type: "string" },
        description: { type: "string" },
        script:      { type: "string" },
        active:      { type: "boolean" },
      },
      required: ["name", "script"],
    },
  },
];

// ─────────────────────────────────────────────
//  HANDLERS — Flow Designer
// ─────────────────────────────────────────────

export async function handleFlowTool(name, args) {
  switch (name) {

    case "sn_get_flow": {
      if (args.sys_id) {
        const data = await snGet(`/api/now/table/sys_hub_flow/${args.sys_id}`);
        return data.result;
      }
      const data = await snGet("/api/now/table/sys_hub_flow", {
        sysparm_query:  `nameLIKE${args.name || ""}`,
        sysparm_fields: "sys_id,name,description,active,sys_scope,trigger_type",
        sysparm_limit:  10,
      });
      return data.result;
    }

    case "sn_activate_flow": {
      const data = await snPatch(`/api/now/table/sys_hub_flow/${args.sys_id}`, { active: args.active });
      return { sys_id: data.result.sys_id, name: data.result.name, active: data.result.active };
    }

    case "sn_trigger_flow": {
      const body = { inputs: args.inputs || {} };
      if (args.table && args.record_sys_id) {
        body.inputs.table  = args.table;
        body.inputs.sys_id = args.record_sys_id;
      }
      const data = await snPost(`/api/now/v1/flow_api/flow/${args.flow_sys_id}/run`, body);
      return data.result || data;
    }

    case "sn_list_flow_executions": {
      const data = await snGet("/api/now/table/sys_flow_context", {
        sysparm_limit:             args.limit || 10,
        sysparm_query:             `flow=${args.flow_sys_id}${args.status ? `^status=${args.status}` : ""}`,
        sysparm_fields:            "sys_id,flow,status,start_time,end_time,error",
        sysparm_orderby:           "sys_created_on",
        sysparm_orderby_direction: "desc",
      });
      return data.result;
    }

    case "sn_create_subflow": {
      const data = await snPost("/api/now/table/sys_hub_flow", {
        name:        args.name,
        description: args.description || "",
        active:      args.active !== false,
        flow_type:   "subflow",
        category:    args.category || "",
      });
      return { sys_id: data.result.sys_id, name: data.result.name };
    }

    case "sn_create_flow_action": {
      const data = await snPost("/api/now/table/sys_hub_action_type_definition", {
        name:        args.name,
        description: args.description || "",
        script:      args.script,
        active:      args.active !== false,
      });
      return { sys_id: data.result.sys_id, name: data.result.name };
    }

    default: return null;
  }
}
