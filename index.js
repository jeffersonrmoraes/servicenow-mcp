#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

const SN_INSTANCE = process.env.SN_INSTANCE || "https://your-instance.service-now.com";
const SN_USER     = process.env.SN_USER     || "your-user";
const SN_PASSWORD = process.env.SN_PASSWORD || "your-password";

const AUTH = "Basic " + Buffer.from(`${SN_USER}:${SN_PASSWORD}`).toString("base64");
const HEADERS = {
  "Content-Type": "application/json",
  "Accept": "application/json",
  "Authorization": AUTH,
};

async function snGet(path, params = {}) {
  const url = new URL(`${SN_INSTANCE}${path}`);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const res = await fetch(url.toString(), { headers: HEADERS });
  if (!res.ok) throw new Error(`GET ${path} → ${res.status}: ${await res.text()}`);
  return res.json();
}

async function snPost(path, body) {
  const res = await fetch(`${SN_INSTANCE}${path}`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`POST ${path} → ${res.status}: ${await res.text()}`);
  return res.json();
}

async function snPatch(path, body) {
  const res = await fetch(`${SN_INSTANCE}${path}`, {
    method: "PATCH",
    headers: HEADERS,
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`PATCH ${path} → ${res.status}: ${await res.text()}`);
  return res.json();
}

const server = new Server(
  { name: "servicenow-dev-agent", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "sn_query_records",
      description: "Consulta registros de qualquer tabela do ServiceNow.",
      inputSchema: {
        type: "object",
        properties: {
          table:  { type: "string" },
          query:  { type: "string" },
          fields: { type: "string" },
          limit:  { type: "number" },
        },
        required: ["table"],
      },
    },
    {
      name: "sn_get_record",
      description: "Busca um registro específico pelo sys_id.",
      inputSchema: {
        type: "object",
        properties: {
          table:  { type: "string" },
          sys_id: { type: "string" },
        },
        required: ["table", "sys_id"],
      },
    },
    {
      name: "sn_create_business_rule",
      description: "Cria uma Business Rule no ServiceNow.",
      inputSchema: {
        type: "object",
        properties: {
          name:      { type: "string" },
          table:     { type: "string" },
          when:      { type: "string", enum: ["before", "after", "async", "display"] },
          action:    { type: "string" },
          script:    { type: "string" },
          condition: { type: "string" },
          active:    { type: "boolean" },
          order:     { type: "number" },
        },
        required: ["name", "table", "when", "action", "script"],
      },
    },
    {
      name: "sn_update_business_rule",
      description: "Atualiza o script ou configurações de uma Business Rule existente.",
      inputSchema: {
        type: "object",
        properties: {
          sys_id:    { type: "string" },
          script:    { type: "string" },
          active:    { type: "boolean" },
          condition: { type: "string" },
        },
        required: ["sys_id"],
      },
    },
    {
      name: "sn_create_script_include",
      description: "Cria um Script Include no ServiceNow.",
      inputSchema: {
        type: "object",
        properties: {
          name:            { type: "string" },
          script:          { type: "string" },
          description:     { type: "string" },
          active:          { type: "boolean" },
          client_callable: { type: "boolean" },
        },
        required: ["name", "script"],
      },
    },
    {
      name: "sn_create_client_script",
      description: "Cria um Client Script no ServiceNow.",
      inputSchema: {
        type: "object",
        properties: {
          name:   { type: "string" },
          table:  { type: "string" },
          type:   { type: "string", enum: ["onLoad", "onChange", "onSubmit", "onCellEdit"] },
          script: { type: "string" },
          field:  { type: "string" },
          active: { type: "boolean" },
        },
        required: ["name", "table", "type", "script"],
      },
    },
    {
      name: "sn_create_ui_policy",
      description: "Cria uma UI Policy no ServiceNow.",
      inputSchema: {
        type: "object",
        properties: {
          name:      { type: "string" },
          table:     { type: "string" },
          condition: { type: "string" },
          script:    { type: "string" },
          active:    { type: "boolean" },
        },
        required: ["name", "table"],
      },
    },
    {
      name: "sn_create_field",
      description: "Cria um campo customizado em uma tabela do ServiceNow.",
      inputSchema: {
        type: "object",
        properties: {
          table:      { type: "string" },
          label:      { type: "string" },
          name:       { type: "string" },
          type:       { type: "string" },
          max_length: { type: "number" },
          mandatory:  { type: "boolean" },
        },
        required: ["table", "label", "name", "type"],
      },
    },
    {
      name: "sn_create_table",
      description: "Cria uma tabela customizada no ServiceNow.",
      inputSchema: {
        type: "object",
        properties: {
          label:         { type: "string" },
          name:          { type: "string" },
          extends_table: { type: "string" },
        },
        required: ["label", "name"],
      },
    },
    {
      name: "sn_create_scheduled_job",
      description: "Cria um Scheduled Script Execution.",
      inputSchema: {
        type: "object",
        properties: {
          name:     { type: "string" },
          script:   { type: "string" },
          run_type: { type: "string", enum: ["daily", "weekly", "monthly", "periodically", "once"] },
          active:   { type: "boolean" },
        },
        required: ["name", "script", "run_type"],
      },
    },
    {
      name: "sn_execute_script",
      description: "Executa um script no Background Scripts do ServiceNow.",
      inputSchema: {
        type: "object",
        properties: {
          script: { type: "string" },
          scope:  { type: "string" },
        },
        required: ["script"],
      },
    },
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
      description: "Define o Update Set atual.",
      inputSchema: {
        type: "object",
        properties: {
          sys_id: { type: "string" },
        },
        required: ["sys_id"],
      },
    },
    {
      name: "sn_create_record",
      description: "Cria um registro genérico em qualquer tabela.",
      inputSchema: {
        type: "object",
        properties: {
          table: { type: "string" },
          data:  { type: "object" },
        },
        required: ["table", "data"],
      },
    },
    {
      name: "sn_update_record",
      description: "Atualiza campos de qualquer registro.",
      inputSchema: {
        type: "object",
        properties: {
          table:  { type: "string" },
          sys_id: { type: "string" },
          data:   { type: "object" },
        },
        required: ["table", "sys_id", "data"],
      },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    let result;

    switch (name) {
      case "sn_query_records": {
        const params = {
          sysparm_limit: args.limit || 10,
          ...(args.query  && { sysparm_query: args.query }),
          ...(args.fields && { sysparm_fields: args.fields }),
        };
        const data = await snGet(`/api/now/table/${args.table}`, params);
        result = data.result;
        break;
      }
      case "sn_get_record": {
        const data = await snGet(`/api/now/table/${args.table}/${args.sys_id}`);
        result = data.result;
        break;
      }
      case "sn_create_business_rule": {
        const data = await snPost("/api/now/table/sys_script", {
          name:           args.name,
          collection:     args.table,
          when:           args.when,
          action_insert:  args.action.includes("insert"),
          action_update:  args.action.includes("update"),
          action_delete:  args.action.includes("delete"),
          action_query:   args.action.includes("query"),
          script:         args.script,
          active:         args.active !== false,
          order:          args.order || 100,
          ...(args.condition && { condition: args.condition }),
        });
        result = { sys_id: data.result.sys_id, name: data.result.name };
        break;
      }
      case "sn_update_business_rule": {
        const payload = {};
        if (args.script    !== undefined) payload.script    = args.script;
        if (args.active    !== undefined) payload.active    = args.active;
        if (args.condition !== undefined) payload.condition = args.condition;
        const data = await snPatch(`/api/now/table/sys_script/${args.sys_id}`, payload);
        result = data.result;
        break;
      }
      case "sn_create_script_include": {
        const data = await snPost("/api/now/table/sys_script_include", {
          name:            args.name,
          script:          args.script,
          description:     args.description || "",
          active:          args.active !== false,
          client_callable: args.client_callable || false,
          api_name:        args.name,
        });
        result = { sys_id: data.result.sys_id, name: data.result.name };
        break;
      }
      case "sn_create_client_script": {
        const data = await snPost("/api/now/table/sys_script_client", {
          name:       args.name,
          table:      args.table,
          type:       args.type,
          script:     args.script,
          field_name: args.field || "",
          active:     args.active !== false,
        });
        result = { sys_id: data.result.sys_id, name: data.result.name };
        break;
      }
      case "sn_create_ui_policy": {
        const data = await snPost("/api/now/table/sys_ui_policy", {
          short_description: args.name,
          table:             args.table,
          conditions:        args.condition || "",
          script:            args.script || "",
          active:            args.active !== false,
        });
        result = { sys_id: data.result.sys_id };
        break;
      }
      case "sn_create_field": {
        const data = await snPost("/api/now/table/sys_dictionary", {
          name:          args.table,
          column_label:  args.label,
          element:       args.name,
          internal_type: args.type,
          max_length:    args.max_length || 255,
          mandatory:     args.mandatory || false,
        });
        result = { sys_id: data.result.sys_id, element: data.result.element };
        break;
      }
      case "sn_create_table": {
        const data = await snPost("/api/now/table/sys_db_object", {
          label:       args.label,
          name:        args.name,
          super_class: args.extends_table || "",
        });
        result = { sys_id: data.result.sys_id, name: data.result.name };
        break;
      }
      case "sn_create_scheduled_job": {
        const data = await snPost("/api/now/table/sysauto_script", {
          name:     args.name,
          script:   args.script,
          run_type: args.run_type,
          active:   args.active !== false,
        });
        result = { sys_id: data.result.sys_id, name: data.result.name };
        break;
      }
      case "sn_execute_script": {
        const data = await snPost("/api/x_dev_agent/script_runner/execute", {
          script: args.script,
          scope:  args.scope || "global",
        });
        result = data.result;
        break;
      }
      case "sn_create_update_set": {
        const data = await snPost("/api/now/table/sys_update_set", {
          name:        args.name,
          description: args.description || "",
          state:       "in progress",
        });
        result = { sys_id: data.result.sys_id, name: data.result.name };
        break;
      }
      case "sn_set_current_update_set": {
        await snPost("/api/now/table/sys_user_preference", {
          name:  "sys_update_set",
          value: args.sys_id,
          user:  SN_USER,
        });
        result = { message: "Update Set definido como atual", sys_id: args.sys_id };
        break;
      }
      case "sn_create_record": {
        const data = await snPost(`/api/now/table/${args.table}`, args.data);
        result = data.result;
        break;
      }
      case "sn_update_record": {
        const data = await snPatch(`/api/now/table/${args.table}/${args.sys_id}`, args.data);
        result = data.result;
        break;
      }
      default:
        throw new Error(`Ferramenta desconhecida: ${name}`);
    }

    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
    };

  } catch (err) {
    return {
      content: [{ type: "text", text: `Erro: ${err.message}` }],
      isError: true,
    };
  }
});

const transport = new StdioServerTransport();
await server.connect(transport);
console.error("ServiceNow MCP Server rodando...");
