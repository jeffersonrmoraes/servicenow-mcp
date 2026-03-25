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
  { name: "servicenow-dev-agent", version: "1.2.0" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [

    // ── LEITURA ────────────────────────────────
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

    // ── BUSINESS RULES ─────────────────────────
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
      description: "Atualiza script, condição ou status de uma Business Rule existente.",
      inputSchema: {
        type: "object",
        properties: {
          sys_id:    { type: "string" },
          name:      { type: "string" },
          script:    { type: "string" },
          condition: { type: "string" },
          when:      { type: "string", enum: ["before", "after", "async", "display"] },
          action:    { type: "string" },
          active:    { type: "boolean" },
          order:     { type: "number" },
        },
        required: ["sys_id"],
      },
    },

    // ── SCRIPT INCLUDES ────────────────────────
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
      name: "sn_update_script_include",
      description: "Atualiza script, descrição ou status de um Script Include existente.",
      inputSchema: {
        type: "object",
        properties: {
          sys_id:          { type: "string" },
          script:          { type: "string" },
          description:     { type: "string" },
          active:          { type: "boolean" },
          client_callable: { type: "boolean" },
        },
        required: ["sys_id"],
      },
    },

    // ── CLIENT SCRIPTS ─────────────────────────
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
      name: "sn_update_client_script",
      description: "Atualiza script, tipo ou status de um Client Script existente.",
      inputSchema: {
        type: "object",
        properties: {
          sys_id: { type: "string" },
          script: { type: "string" },
          type:   { type: "string", enum: ["onLoad", "onChange", "onSubmit", "onCellEdit"] },
          field:  { type: "string" },
          active: { type: "boolean" },
        },
        required: ["sys_id"],
      },
    },

    // ── UI POLICIES ────────────────────────────
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
      name: "sn_update_ui_policy",
      description: "Atualiza condição, script ou status de uma UI Policy existente.",
      inputSchema: {
        type: "object",
        properties: {
          sys_id:    { type: "string" },
          condition: { type: "string" },
          script:    { type: "string" },
          active:    { type: "boolean" },
        },
        required: ["sys_id"],
      },
    },

    // ── SCHEDULED JOBS ─────────────────────────
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
      name: "sn_update_scheduled_job",
      description: "Atualiza script ou status de um Scheduled Job existente.",
      inputSchema: {
        type: "object",
        properties: {
          sys_id:   { type: "string" },
          script:   { type: "string" },
          run_type: { type: "string", enum: ["daily", "weekly", "monthly", "periodically", "once"] },
          active:   { type: "boolean" },
        },
        required: ["sys_id"],
      },
    },

    // ── SERVICE CATALOG ────────────────────────
    {
      name: "sn_create_catalog_item",
      description: "Cria um item de catálogo no Service Catalog do ServiceNow.",
      inputSchema: {
        type: "object",
        properties: {
          name:               { type: "string", description: "Nome do item" },
          short_description:  { type: "string", description: "Descrição curta exibida no catálogo" },
          description:        { type: "string", description: "Descrição completa (HTML suportado)" },
          category:           { type: "string", description: "sys_id da categoria" },
          workflow:           { type: "string", description: "sys_id do workflow a ser disparado (opcional)" },
          active:             { type: "boolean" },
          order:              { type: "number", description: "Ordem de exibição no catálogo" },
          fulfillment_group:  { type: "string", description: "sys_id do grupo de fulfillment (opcional)" },
          delivery_time:      { type: "string", description: "Tempo estimado de entrega (ex: 1 4 0)" },
        },
        required: ["name", "short_description"],
      },
    },
    {
      name: "sn_update_catalog_item",
      description: "Atualiza um item de catálogo existente.",
      inputSchema: {
        type: "object",
        properties: {
          sys_id:             { type: "string", description: "sys_id do item de catálogo" },
          name:               { type: "string" },
          short_description:  { type: "string" },
          description:        { type: "string" },
          active:             { type: "boolean" },
          workflow:           { type: "string" },
          order:              { type: "number" },
          fulfillment_group:  { type: "string" },
        },
        required: ["sys_id"],
      },
    },
    {
      name: "sn_create_catalog_variable",
      description: "Cria uma variável (campo) em um item de catálogo.",
      inputSchema: {
        type: "object",
        properties: {
          catalog_item_sys_id: { type: "string", description: "sys_id do item de catálogo pai" },
          name:                { type: "string", description: "Nome interno da variável (ex: u_justificativa)" },
          question_text:       { type: "string", description: "Texto da pergunta exibido ao usuário" },
          type:                { type: "string", description: "Tipo: 1=Text, 2=Select, 3=MultiLine, 4=Reference, 5=CheckBox, 6=Date, 14=Label, 16=Container Start, 17=Container End, 18=Container Split" },
          mandatory:           { type: "boolean" },
          active:              { type: "boolean" },
          order:               { type: "number" },
          default_value:       { type: "string" },
          help_text:           { type: "string" },
          reference_table:     { type: "string", description: "Tabela de referência (somente para type=4)" },
        },
        required: ["catalog_item_sys_id", "name", "question_text", "type"],
      },
    },
    {
      name: "sn_update_catalog_variable",
      description: "Atualiza uma variável existente de um item de catálogo.",
      inputSchema: {
        type: "object",
        properties: {
          sys_id:        { type: "string", description: "sys_id da variável" },
          question_text: { type: "string" },
          mandatory:     { type: "boolean" },
          active:        { type: "boolean" },
          order:         { type: "number" },
          default_value: { type: "string" },
          help_text:     { type: "string" },
        },
        required: ["sys_id"],
      },
    },
    {
      name: "sn_create_catalog_category",
      description: "Cria uma categoria no Service Catalog.",
      inputSchema: {
        type: "object",
        properties: {
          title:       { type: "string" },
          description: { type: "string" },
          catalog:     { type: "string", description: "sys_id do catálogo pai (opcional, usa o padrão)" },
          active:      { type: "boolean" },
          order:       { type: "number" },
        },
        required: ["title"],
      },
    },

    // ── FLOW DESIGNER ──────────────────────────
    {
      name: "sn_get_flow",
      description: "Busca um Flow pelo nome ou sys_id.",
      inputSchema: {
        type: "object",
        properties: {
          name:   { type: "string", description: "Nome do flow (busca parcial)" },
          sys_id: { type: "string", description: "sys_id exato do flow" },
        },
      },
    },
    {
      name: "sn_activate_flow",
      description: "Ativa ou desativa um Flow no Flow Designer.",
      inputSchema: {
        type: "object",
        properties: {
          sys_id: { type: "string", description: "sys_id do flow" },
          active: { type: "boolean", description: "true para ativar, false para desativar" },
        },
        required: ["sys_id", "active"],
      },
    },
    {
      name: "sn_trigger_flow",
      description: "Dispara um Flow manualmente via API (flows com trigger Record-based ou API).",
      inputSchema: {
        type: "object",
        properties: {
          flow_sys_id:  { type: "string", description: "sys_id do flow" },
          inputs:       { type: "object", description: "Inputs do flow (chave/valor conforme definido no flow)" },
          table:        { type: "string", description: "Tabela do registro alvo (para flows com trigger de record)" },
          record_sys_id:{ type: "string", description: "sys_id do registro alvo (para flows com trigger de record)" },
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
          flow_sys_id: { type: "string", description: "sys_id do flow" },
          limit:       { type: "number", description: "Número de execuções a retornar (padrão: 10)" },
          status:      { type: "string", enum: ["complete", "error", "running", "cancelled"], description: "Filtrar por status" },
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
          category:    { type: "string", description: "Categoria do subflow (opcional)" },
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
          script:      { type: "string", description: "Script da action (JavaScript)" },
          active:      { type: "boolean" },
        },
        required: ["name", "script"],
      },
    },

    // ── CAMPOS / TABELAS ───────────────────────
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

    // ── EXECUTE SCRIPT ─────────────────────────
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

    // ── UPDATE SETS ────────────────────────────
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

    // ── GENÉRICO ───────────────────────────────
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

      // ── BUSINESS RULES ──────────────────────
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
        if (args.name      !== undefined) payload.name      = args.name;
        if (args.script    !== undefined) payload.script    = args.script;
        if (args.condition !== undefined) payload.condition = args.condition;
        if (args.when      !== undefined) payload.when      = args.when;
        if (args.active    !== undefined) payload.active    = args.active;
        if (args.order     !== undefined) payload.order     = args.order;
        if (args.action    !== undefined) {
          payload.action_insert = args.action.includes("insert");
          payload.action_update = args.action.includes("update");
          payload.action_delete = args.action.includes("delete");
          payload.action_query  = args.action.includes("query");
        }
        const data = await snPatch(`/api/now/table/sys_script/${args.sys_id}`, payload);
        result = { sys_id: data.result.sys_id, name: data.result.name, updated: Object.keys(payload) };
        break;
      }

      // ── SCRIPT INCLUDES ─────────────────────
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

      case "sn_update_script_include": {
        const payload = {};
        if (args.script          !== undefined) payload.script          = args.script;
        if (args.description     !== undefined) payload.description     = args.description;
        if (args.active          !== undefined) payload.active          = args.active;
        if (args.client_callable !== undefined) payload.client_callable = args.client_callable;
        const data = await snPatch(`/api/now/table/sys_script_include/${args.sys_id}`, payload);
        result = { sys_id: data.result.sys_id, name: data.result.name, updated: Object.keys(payload) };
        break;
      }

      // ── CLIENT SCRIPTS ──────────────────────
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

      case "sn_update_client_script": {
        const payload = {};
        if (args.script !== undefined) payload.script     = args.script;
        if (args.type   !== undefined) payload.type       = args.type;
        if (args.field  !== undefined) payload.field_name = args.field;
        if (args.active !== undefined) payload.active     = args.active;
        const data = await snPatch(`/api/now/table/sys_script_client/${args.sys_id}`, payload);
        result = { sys_id: data.result.sys_id, name: data.result.name, updated: Object.keys(payload) };
        break;
      }

      // ── UI POLICIES ─────────────────────────
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

      case "sn_update_ui_policy": {
        const payload = {};
        if (args.condition !== undefined) payload.conditions = args.condition;
        if (args.script    !== undefined) payload.script     = args.script;
        if (args.active    !== undefined) payload.active     = args.active;
        const data = await snPatch(`/api/now/table/sys_ui_policy/${args.sys_id}`, payload);
        result = { sys_id: data.result.sys_id, updated: Object.keys(payload) };
        break;
      }

      // ── SCHEDULED JOBS ──────────────────────
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

      case "sn_update_scheduled_job": {
        const payload = {};
        if (args.script   !== undefined) payload.script   = args.script;
        if (args.run_type !== undefined) payload.run_type = args.run_type;
        if (args.active   !== undefined) payload.active   = args.active;
        const data = await snPatch(`/api/now/table/sysauto_script/${args.sys_id}`, payload);
        result = { sys_id: data.result.sys_id, name: data.result.name, updated: Object.keys(payload) };
        break;
      }

      // ── SERVICE CATALOG ─────────────────────
      case "sn_create_catalog_item": {
        const data = await snPost("/api/now/table/sc_cat_item", {
          name:              args.name,
          short_description: args.short_description,
          description:       args.description || "",
          category:          args.category || "",
          workflow:          args.workflow || "",
          active:            args.active !== false,
          order:             args.order || 100,
          group:             args.fulfillment_group || "",
          delivery_time:     args.delivery_time || "",
        });
        result = { sys_id: data.result.sys_id, name: data.result.name };
        break;
      }

      case "sn_update_catalog_item": {
        const payload = {};
        if (args.name              !== undefined) payload.name              = args.name;
        if (args.short_description !== undefined) payload.short_description = args.short_description;
        if (args.description       !== undefined) payload.description       = args.description;
        if (args.active            !== undefined) payload.active            = args.active;
        if (args.workflow          !== undefined) payload.workflow          = args.workflow;
        if (args.order             !== undefined) payload.order             = args.order;
        if (args.fulfillment_group !== undefined) payload.group             = args.fulfillment_group;
        const data = await snPatch(`/api/now/table/sc_cat_item/${args.sys_id}`, payload);
        result = { sys_id: data.result.sys_id, name: data.result.name, updated: Object.keys(payload) };
        break;
      }

      case "sn_create_catalog_variable": {
        const data = await snPost("/api/now/table/item_option_new", {
          cat_item:      args.catalog_item_sys_id,
          name:          args.name,
          question_text: args.question_text,
          type:          args.type,
          mandatory:     args.mandatory || false,
          active:        args.active !== false,
          order:         args.order || 100,
          default_value: args.default_value || "",
          help_text:     args.help_text || "",
          reference:     args.reference_table || "",
        });
        result = { sys_id: data.result.sys_id, name: data.result.name };
        break;
      }

      case "sn_update_catalog_variable": {
        const payload = {};
        if (args.question_text !== undefined) payload.question_text = args.question_text;
        if (args.mandatory     !== undefined) payload.mandatory     = args.mandatory;
        if (args.active        !== undefined) payload.active        = args.active;
        if (args.order         !== undefined) payload.order         = args.order;
        if (args.default_value !== undefined) payload.default_value = args.default_value;
        if (args.help_text     !== undefined) payload.help_text     = args.help_text;
        const data = await snPatch(`/api/now/table/item_option_new/${args.sys_id}`, payload);
        result = { sys_id: data.result.sys_id, updated: Object.keys(payload) };
        break;
      }

      case "sn_create_catalog_category": {
        const data = await snPost("/api/now/table/sc_category", {
          title:       args.title,
          description: args.description || "",
          sc_catalog:  args.catalog || "",
          active:      args.active !== false,
          order:       args.order || 100,
        });
        result = { sys_id: data.result.sys_id, title: data.result.title };
        break;
      }

      // ── FLOW DESIGNER ───────────────────────
      case "sn_get_flow": {
        const params = { sysparm_limit: 10 };
        if (args.sys_id) {
          const data = await snGet(`/api/now/table/sys_hub_flow/${args.sys_id}`);
          result = data.result;
        } else {
          params.sysparm_query = `nameLIKE${args.name || ""}`;
          params.sysparm_fields = "sys_id,name,description,active,sys_scope,trigger_type";
          const data = await snGet("/api/now/table/sys_hub_flow", params);
          result = data.result;
        }
        break;
      }

      case "sn_activate_flow": {
        const data = await snPatch(`/api/now/table/sys_hub_flow/${args.sys_id}`, {
          active: args.active,
        });
        result = {
          sys_id: data.result.sys_id,
          name:   data.result.name,
          active: data.result.active,
        };
        break;
      }

      case "sn_trigger_flow": {
        // Usa a Flow API para disparar o flow
        const body = {
          inputs: args.inputs || {},
        };
        if (args.table && args.record_sys_id) {
          body.inputs.table = args.table;
          body.inputs.sys_id = args.record_sys_id;
        }
        const data = await snPost(
          `/api/now/v1/flow_api/flow/${args.flow_sys_id}/run`,
          body
        );
        result = data.result || data;
        break;
      }

      case "sn_list_flow_executions": {
        const params = {
          sysparm_limit: args.limit || 10,
          sysparm_query: `flow=${args.flow_sys_id}${args.status ? `^status=${args.status}` : ""}`,
          sysparm_fields: "sys_id,flow,status,start_time,end_time,error",
          sysparm_orderby: "sys_created_on",
          sysparm_orderby_direction: "desc",
        };
        const data = await snGet("/api/now/table/sys_flow_context", params);
        result = data.result;
        break;
      }

      case "sn_create_subflow": {
        const data = await snPost("/api/now/table/sys_hub_flow", {
          name:        args.name,
          description: args.description || "",
          active:      args.active !== false,
          flow_type:   "subflow",
          category:    args.category || "",
        });
        result = { sys_id: data.result.sys_id, name: data.result.name };
        break;
      }

      case "sn_create_flow_action": {
        const data = await snPost("/api/now/table/sys_hub_action_type_definition", {
          name:        args.name,
          description: args.description || "",
          script:      args.script,
          active:      args.active !== false,
        });
        result = { sys_id: data.result.sys_id, name: data.result.name };
        break;
      }

      // ── CAMPOS / TABELAS ────────────────────
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

      // ── EXECUTE SCRIPT ──────────────────────
      case "sn_execute_script": {
        const data = await snPost("/api/x_dev_agent/script_runner/execute", {
          script: args.script,
          scope:  args.scope || "global",
        });
        result = data.result;
        break;
      }

      // ── UPDATE SETS ─────────────────────────
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

      // ── GENÉRICO ────────────────────────────
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
console.error("ServiceNow MCP Server v1.2.0 rodando...");
