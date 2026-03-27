import { snGet, snPost, snPatch, snDelete } from "../lib/client.js";

// ─────────────────────────────────────────────
//  TOOLS — Scripts Server-Side
// ─────────────────────────────────────────────

export const scriptTools = [
  {
    name: "sn_query_records",
    description: "Consulta registros de qualquer tabela do ServiceNow.",
    inputSchema: {
      type: "object",
      properties: {
        env:       { type: "string", description: "Prefixo do ambiente (opcional, ex: DEV)" },
        table:  { type: "string" },
        query:  { type: "string", description: "Encoded query (ex: active=true^priority=1)" },
        fields: { type: "string", description: "Campos separados por vírgula" },
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
        env:       { type: "string", description: "Prefixo do ambiente (opcional, ex: DEV)" },
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
        env:       { type: "string", description: "Prefixo do ambiente (opcional, ex: DEV)" },
        name:      { type: "string" },
        table:     { type: "string" },
        when:      { type: "string", enum: ["before", "after", "async", "display"] },
        action:    { type: "string", description: "insert, update, delete, query (separados por vírgula)" },
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
        env:       { type: "string", description: "Prefixo do ambiente (opcional, ex: DEV)" },
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
  {
    name: "sn_create_script_include",
    description: "Cria um Script Include no ServiceNow.",
    inputSchema: {
      type: "object",
      properties: {
        env:       { type: "string", description: "Prefixo do ambiente (opcional, ex: DEV)" },
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
        env:       { type: "string", description: "Prefixo do ambiente (opcional, ex: DEV)" },
        sys_id:          { type: "string" },
        script:          { type: "string" },
        description:     { type: "string" },
        active:          { type: "boolean" },
        client_callable: { type: "boolean" },
      },
      required: ["sys_id"],
    },
  },
  {
    name: "sn_create_client_script",
    description: "Cria um Client Script no ServiceNow.",
    inputSchema: {
      type: "object",
      properties: {
        env:       { type: "string", description: "Prefixo do ambiente (opcional, ex: DEV)" },
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
        env:       { type: "string", description: "Prefixo do ambiente (opcional, ex: DEV)" },
        sys_id: { type: "string" },
        script: { type: "string" },
        type:   { type: "string", enum: ["onLoad", "onChange", "onSubmit", "onCellEdit"] },
        field:  { type: "string" },
        active: { type: "boolean" },
      },
      required: ["sys_id"],
    },
  },
  {
    name: "sn_create_ui_policy",
    description: "Cria uma UI Policy no ServiceNow.",
    inputSchema: {
      type: "object",
      properties: {
        env:       { type: "string", description: "Prefixo do ambiente (opcional, ex: DEV)" },
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
        env:       { type: "string", description: "Prefixo do ambiente (opcional, ex: DEV)" },
        sys_id:    { type: "string" },
        condition: { type: "string" },
        script:    { type: "string" },
        active:    { type: "boolean" },
      },
      required: ["sys_id"],
    },
  },
  {
    name: "sn_create_scheduled_job",
    description: "Cria um Scheduled Script Execution.",
    inputSchema: {
      type: "object",
      properties: {
        env:       { type: "string", description: "Prefixo do ambiente (opcional, ex: DEV)" },
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
        env:       { type: "string", description: "Prefixo do ambiente (opcional, ex: DEV)" },
        sys_id:   { type: "string" },
        script:   { type: "string" },
        run_type: { type: "string", enum: ["daily", "weekly", "monthly", "periodically", "once"] },
        active:   { type: "boolean" },
      },
      required: ["sys_id"],
    },
  },
  {
    name: "sn_execute_script",
    description: "Executa um script no Background Scripts do ServiceNow.",
    inputSchema: {
      type: "object",
      properties: {
        env:       { type: "string", description: "Prefixo do ambiente (opcional, ex: DEV)" },
        script: { type: "string" },
        scope:  { type: "string" },
      },
      required: ["script"],
    },
  },
  {
    name: "sn_create_field",
    description: "Cria um campo customizado em uma tabela do ServiceNow.",
    inputSchema: {
      type: "object",
      properties: {
        env:       { type: "string", description: "Prefixo do ambiente (opcional, ex: DEV)" },
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
        env:       { type: "string", description: "Prefixo do ambiente (opcional, ex: DEV)" },
        label:         { type: "string" },
        name:          { type: "string" },
        extends_table: { type: "string" },
      },
      required: ["label", "name"],
    },
  },
  {
    name: "sn_create_record",
    description: "Cria um registro genérico em qualquer tabela.",
    inputSchema: {
      type: "object",
      properties: {
        env:       { type: "string", description: "Prefixo do ambiente (opcional, ex: DEV)" },
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
        env:       { type: "string", description: "Prefixo do ambiente (opcional, ex: DEV)" },
        table:  { type: "string" },
        sys_id: { type: "string" },
        data:   { type: "object" },
      },
      required: ["table", "sys_id", "data"],
    },
  },
  {
    name: "sn_delete_record",
    description: "Remove um registro de qualquer tabela pelo sys_id.",
    inputSchema: {
      type: "object",
      properties: {
        env:       { type: "string", description: "Prefixo do ambiente (opcional, ex: DEV)" },
        table:  { type: "string" },
        sys_id: { type: "string" },
      },
      required: ["table", "sys_id"],
    },
  },
];

// ─────────────────────────────────────────────
//  HANDLERS — Scripts Server-Side
// ─────────────────────────────────────────────

export async function handleScriptTool(name, args) {
  switch (name) {

    case "sn_query_records": {
      const data = await snGet(`/api/now/table/${args.table}`, {
        sysparm_limit: args.limit || 10,
        ...(args.query  && { sysparm_query: args.query }),
        ...(args.fields && { sysparm_fields: args.fields }),
      }, args.env);
      return data.result;
    }

    case "sn_get_record": {
      const data = await snGet(`/api/now/table/${args.table}/${args.sys_id}`, {}, args.env);
      return data.result;
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
      }, args.env);
      return { sys_id: data.result.sys_id, name: data.result.name };
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
      const data = await snPatch(`/api/now/table/sys_script/${args.sys_id}`, payload, args.env);
      return { sys_id: data.result.sys_id, name: data.result.name, updated: Object.keys(payload) };
    }

    case "sn_create_script_include": {
      const data = await snPost("/api/now/table/sys_script_include", {
        name:            args.name,
        script:          args.script,
        description:     args.description || "",
        active:          args.active !== false,
        client_callable: args.client_callable || false,
        api_name:        args.name,
      }, args.env);
      return { sys_id: data.result.sys_id, name: data.result.name };
    }

    case "sn_update_script_include": {
      const payload = {};
      if (args.script          !== undefined) payload.script          = args.script;
      if (args.description     !== undefined) payload.description     = args.description;
      if (args.active          !== undefined) payload.active          = args.active;
      if (args.client_callable !== undefined) payload.client_callable = args.client_callable;
      const data = await snPatch(`/api/now/table/sys_script_include/${args.sys_id}`, payload, args.env);
      return { sys_id: data.result.sys_id, name: data.result.name, updated: Object.keys(payload) };
    }

    case "sn_create_client_script": {
      const data = await snPost("/api/now/table/sys_script_client", {
        name:       args.name,
        table:      args.table,
        type:       args.type,
        script:     args.script,
        field_name: args.field || "",
        active:     args.active !== false,
      }, args.env);
      return { sys_id: data.result.sys_id, name: data.result.name };
    }

    case "sn_update_client_script": {
      const payload = {};
      if (args.script !== undefined) payload.script     = args.script;
      if (args.type   !== undefined) payload.type       = args.type;
      if (args.field  !== undefined) payload.field_name = args.field;
      if (args.active !== undefined) payload.active     = args.active;
      const data = await snPatch(`/api/now/table/sys_script_client/${args.sys_id}`, payload, args.env);
      return { sys_id: data.result.sys_id, name: data.result.name, updated: Object.keys(payload) };
    }

    case "sn_create_ui_policy": {
      const data = await snPost("/api/now/table/sys_ui_policy", {
        short_description: args.name,
        table:             args.table,
        conditions:        args.condition || "",
        script:            args.script || "",
        active:            args.active !== false,
      }, args.env);
      return { sys_id: data.result.sys_id };
    }

    case "sn_update_ui_policy": {
      const payload = {};
      if (args.condition !== undefined) payload.conditions = args.condition;
      if (args.script    !== undefined) payload.script     = args.script;
      if (args.active    !== undefined) payload.active     = args.active;
      const data = await snPatch(`/api/now/table/sys_ui_policy/${args.sys_id}`, payload, args.env);
      return { sys_id: data.result.sys_id, updated: Object.keys(payload) };
    }

    case "sn_create_scheduled_job": {
      const data = await snPost("/api/now/table/sysauto_script", {
        name:     args.name,
        script:   args.script,
        run_type: args.run_type,
        active:   args.active !== false,
      }, args.env);
      return { sys_id: data.result.sys_id, name: data.result.name };
    }

    case "sn_update_scheduled_job": {
      const payload = {};
      if (args.script   !== undefined) payload.script   = args.script;
      if (args.run_type !== undefined) payload.run_type = args.run_type;
      if (args.active   !== undefined) payload.active   = args.active;
      const data = await snPatch(`/api/now/table/sysauto_script/${args.sys_id}`, payload, args.env);
      return { sys_id: data.result.sys_id, name: data.result.name, updated: Object.keys(payload) };
    }

    case "sn_execute_script": {
      const data = await snPost("/api/x_dev_agent/script_runner/execute", {
        script: args.script,
        scope:  args.scope || "global",
      }, args.env);
      return data.result;
    }

    case "sn_create_field": {
      const data = await snPost("/api/now/table/sys_dictionary", {
        name:          args.table,
        column_label:  args.label,
        element:       args.name,
        internal_type: args.type,
        max_length:    args.max_length || 255,
        mandatory:     args.mandatory || false,
      }, args.env);
      return { sys_id: data.result.sys_id, element: data.result.element };
    }

    case "sn_create_table": {
      const data = await snPost("/api/now/table/sys_db_object", {
        label:       args.label,
        name:        args.name,
        super_class: args.extends_table || "",
      }, args.env);
      return { sys_id: data.result.sys_id, name: data.result.name };
    }

    case "sn_create_record": {
      const data = await snPost(`/api/now/table/${args.table}`, args.data, args.env);
      return data.result;
    }

    case "sn_update_record": {
      const data = await snPatch(`/api/now/table/${args.table}/${args.sys_id}`, args.data, args.env);
      return data.result;
    }

    case "sn_delete_record": {
      const result = await snDelete(`/api/now/table/${args.table}/${args.sys_id}`, args.env);
      return { deleted: true, table: args.table, sys_id: args.sys_id };
    }

    default: return null;
  }
}
