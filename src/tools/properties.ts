import { snGet, snPost, snPatch } from "../lib/client.js";

// ─────────────────────────────────────────────
//  TOOLS — System Properties
// ─────────────────────────────────────────────

export const propertyTools = [
  {
    name: "sn_get_sys_property",
    description: "Busca o valor de uma System Property (sys_properties) pelo nome.",
    inputSchema: {
      type: "object",
      properties: {
        env:  { type: "string", description: "Prefixo do ambiente (opcional, ex: DEV)" },
        name: { type: "string", description: "Nome da property (ex: glide.email.smtp.host)" },
      },
      required: ["name"],
    },
  },
  {
    name: "sn_set_sys_property",
    description: "Cria ou atualiza uma System Property (upsert). Se a property existir, atualiza o valor. Se não existir, cria.",
    inputSchema: {
      type: "object",
      properties: {
        env:         { type: "string", description: "Prefixo do ambiente (opcional, ex: DEV)" },
        name:        { type: "string", description: "Nome da property (ex: glide.email.smtp.host)" },
        value:       { type: "string", description: "Valor da property" },
        description: { type: "string", description: "Descrição da property (usado ao criar)" },
        type:        { type: "string", description: "Tipo: string, boolean, integer, choice (usado ao criar)" },
        private:     { type: "boolean", description: "Se true, o valor é mascarado na UI (usado para senhas/tokens)" },
      },
      required: ["name", "value"],
    },
  },
  {
    name: "sn_list_sys_properties",
    description: "Lista System Properties filtrando por prefixo de nome ou categoria.",
    inputSchema: {
      type: "object",
      properties: {
        env:    { type: "string", description: "Prefixo do ambiente (opcional, ex: DEV)" },
        prefix: { type: "string", description: "Prefixo de nome para filtrar (ex: glide.email)" },
        limit:  { type: "number", description: "Máximo de resultados (default: 20)" },
      },
    },
  },
  // sn_delete_sys_property: DESABILITADO por política de segurança
];

// ─────────────────────────────────────────────
//  HANDLER
// ─────────────────────────────────────────────

import { ServiceNowEnv } from "../types.js";

export async function handlePropertyTool(name: string, args: any) {
  const env = args.env || null;

  // ── Get ──────────────────────────────────────
  if (name === "sn_get_sys_property") {
    const { result } = await snGet(
      "/api/now/table/sys_properties",
      {
        sysparm_query:  `name=${args.name}`,
        sysparm_fields: "sys_id,name,value,description,type,private",
        sysparm_limit:  "1",
      },
      env
    );

    if (!result || result.length === 0) {
      return { found: false, name: args.name };
    }

    return {
      found:       true,
      sys_id:      result[0].sys_id,
      name:        result[0].name,
      value:       result[0].value,
      description: result[0].description,
      type:        result[0].type,
      private:     result[0].private,
    };
  }

  // ── Set (Upsert) ─────────────────────────────
  if (name === "sn_set_sys_property") {
    const { name: propName, value, description = "", type = "string", private: isPrivate = false } = args;

    // Verifica se já existe
    const { result: existing } = await snGet(
      "/api/now/table/sys_properties",
      {
        sysparm_query:  `name=${propName}`,
        sysparm_fields: "sys_id,name,value",
        sysparm_limit:  "1",
      },
      env
    );

    if (existing && existing.length > 0) {
      // Atualiza via PATCH
      const sysId = existing[0].sys_id;
      const { result: updated } = await snPatch(
        `/api/now/table/sys_properties/${sysId}`,
        { value },
        env
      );
      return { action: "updated", sys_id: updated.sys_id, name: updated.name, value: updated.value };
    } else {
      // Cria via POST
      const { result: created } = await snPost(
        "/api/now/table/sys_properties",
        { name: propName, value, description, type, private: isPrivate },
        env
      );
      return { action: "created", sys_id: created.sys_id, name: created.name, value: created.value };
    }
  }

  // ── List ─────────────────────────────────────
  if (name === "sn_list_sys_properties") {
    const prefix = args.prefix || "";
    const limit  = args.limit  || 20;

    const query = prefix
      ? `nameLIKE${prefix}`
      : "active=true";

    const { result } = await snGet(
      "/api/now/table/sys_properties",
      {
        sysparm_query:  query,
        sysparm_fields: "sys_id,name,value,description,type,private",
        sysparm_limit:  String(limit),
        sysparm_orderby: "name",
      },
      env
    );

    return result;
  }

  // ── Delete (DESABILITADO) ─────────────────────
  if (name === "sn_delete_sys_property") {
    throw new Error("Operação de delete desabilitada por política de segurança.");
  }

  return null;
}
