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
        env:    { type: "string", description: "Prefixo do ambiente (opcional, ex: DEV)" },
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
        env:    { type: "string", description: "Prefixo do ambiente (opcional, ex: DEV)" },
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
        env:           { type: "string", description: "Prefixo do ambiente (opcional, ex: DEV)" },
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
        env:         { type: "string", description: "Prefixo do ambiente (opcional, ex: DEV)" },
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
        env:         { type: "string", description: "Prefixo do ambiente (opcional, ex: DEV)" },
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
        env:         { type: "string", description: "Prefixo do ambiente (opcional, ex: DEV)" },
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

import { ServiceNowEnv } from "../types.js";

export async function handleFlowTool(name: string, args: any) {
  switch (name) {

    case "sn_get_flow": {
      if (args.sys_id) {
        const data = await snGet(`/api/now/table/sys_hub_flow/${args.sys_id}`, {}, args.env);
        return data.result;
      }
      const data = await snGet("/api/now/table/sys_hub_flow", {
        sysparm_query:  `nameLIKE${args.name || ""}`,
        sysparm_fields: "sys_id,name,description,active,sys_scope,trigger_type",
        sysparm_limit:  10,
      }, args.env);
      return data.result;
    }

    case "sn_activate_flow": {
      const data = await snPatch(`/api/now/table/sys_hub_flow/${args.sys_id}`, { active: args.active }, args.env);
      return { sys_id: data.result.sys_id, name: data.result.name, active: data.result.active };
    }

    case "sn_trigger_flow": {
      const body = { inputs: args.inputs || {} };
      if (args.table && args.record_sys_id) {
        body.inputs.table  = args.table;
        body.inputs.sys_id = args.record_sys_id;
      }
      const data = await snPost(`/api/now/v1/flow_api/flow/${args.flow_sys_id}/run`, body, args.env);
      return data.result || data;
    }

    case "sn_list_flow_executions": {
      // FIX: ordenação correta via query ^ORDERBYDESCsys_created_on
      const statusFilter = args.status ? `^status=${args.status}` : "";
      const data = await snGet("/api/now/table/sys_flow_context", {
        sysparm_limit:  args.limit || 10,
        sysparm_query:  `flow=${args.flow_sys_id}${statusFilter}^ORDERBYDESCsys_created_on`,
        sysparm_fields: "sys_id,flow,status,start_time,end_time,error,sys_created_on",
      }, args.env);
      return data.result;
    }

    case "sn_create_subflow": {
      const data = await snPost("/api/now/table/sys_hub_flow", {
        name:        args.name,
        description: args.description || "",
        active:      args.active !== false,
        flow_type:   "subflow",
        category:    args.category || "",
      }, args.env);
      return { sys_id: data.result.sys_id, name: data.result.name };
    }

    case "sn_create_flow_action": {
      const data = await snPost("/api/now/table/sys_hub_action_type_definition", {
        name:        args.name,
        description: args.description || "",
        script:      args.script,
        active:      args.active !== false,
      }, args.env);
      return { sys_id: data.result.sys_id, name: data.result.name };
    }

    default: return null;
  }
}
