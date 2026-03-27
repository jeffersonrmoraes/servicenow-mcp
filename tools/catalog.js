import { snGet, snPost, snPatch } from "../lib/client.js";

// ─────────────────────────────────────────────
//  TOOLS — Service Catalog
// ─────────────────────────────────────────────

export const catalogTools = [
  {
    name: "sn_create_catalog_item",
    description: "Cria um item de catálogo no Service Catalog do ServiceNow.",
    inputSchema: {
      type: "object",
      properties: {
        env:               { type: "string", description: "Prefixo do ambiente (opcional, ex: DEV)" },
        name:              { type: "string" },
        short_description: { type: "string" },
        description:       { type: "string", description: "HTML suportado" },
        category:          { type: "string", description: "sys_id da categoria" },
        workflow:          { type: "string", description: "sys_id do workflow (opcional)" },
        active:            { type: "boolean" },
        order:             { type: "number" },
        fulfillment_group: { type: "string", description: "sys_id do grupo de fulfillment" },
        delivery_time:     { type: "string", description: "Tempo estimado (ex: 1 4 0)" },
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
        env:               { type: "string", description: "Prefixo do ambiente (opcional, ex: DEV)" },
        sys_id:            { type: "string" },
        name:              { type: "string" },
        short_description: { type: "string" },
        description:       { type: "string" },
        active:            { type: "boolean" },
        workflow:          { type: "string" },
        order:             { type: "number" },
        fulfillment_group: { type: "string" },
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
        env:                 { type: "string", description: "Prefixo do ambiente (opcional, ex: DEV)" },
        catalog_item_sys_id: { type: "string" },
        name:                { type: "string" },
        question_text:       { type: "string" },
        type:                { type: "string", description: "1=Text, 2=Select, 3=MultiLine, 4=Reference, 5=CheckBox, 6=Date" },
        mandatory:           { type: "boolean" },
        active:              { type: "boolean" },
        order:               { type: "number" },
        default_value:       { type: "string" },
        help_text:           { type: "string" },
        reference_table:     { type: "string" },
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
        env:           { type: "string", description: "Prefixo do ambiente (opcional, ex: DEV)" },
        sys_id:        { type: "string" },
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
        env:         { type: "string", description: "Prefixo do ambiente (opcional, ex: DEV)" },
        title:       { type: "string" },
        description: { type: "string" },
        catalog:     { type: "string", description: "sys_id do catálogo pai (opcional)" },
        active:      { type: "boolean" },
        order:       { type: "number" },
      },
      required: ["title"],
    },
  },
];

// ─────────────────────────────────────────────
//  HANDLERS — Service Catalog
// ─────────────────────────────────────────────

export async function handleCatalogTool(name, args) {
  switch (name) {

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
      }, args.env);
      return { sys_id: data.result.sys_id, name: data.result.name };
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
      const data = await snPatch(`/api/now/table/sc_cat_item/${args.sys_id}`, payload, args.env);
      return { sys_id: data.result.sys_id, name: data.result.name, updated: Object.keys(payload) };
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
      }, args.env);
      return { sys_id: data.result.sys_id, name: data.result.name };
    }

    case "sn_update_catalog_variable": {
      const payload = {};
      if (args.question_text !== undefined) payload.question_text = args.question_text;
      if (args.mandatory     !== undefined) payload.mandatory     = args.mandatory;
      if (args.active        !== undefined) payload.active        = args.active;
      if (args.order         !== undefined) payload.order         = args.order;
      if (args.default_value !== undefined) payload.default_value = args.default_value;
      if (args.help_text     !== undefined) payload.help_text     = args.help_text;
      const data = await snPatch(`/api/now/table/item_option_new/${args.sys_id}`, payload, args.env);
      return { sys_id: data.result.sys_id, updated: Object.keys(payload) };
    }

    case "sn_create_catalog_category": {
      const data = await snPost("/api/now/table/sc_category", {
        title:       args.title,
        description: args.description || "",
        sc_catalog:  args.catalog || "",
        active:      args.active !== false,
        order:       args.order || 100,
      }, args.env);
      return { sys_id: data.result.sys_id, title: data.result.title };
    }

    default: return null;
  }
}
