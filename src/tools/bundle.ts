import { snGet } from "../lib/client.js";

// ─────────────────────────────────────────────
//  TOOLS — Bundling & Atomic Views (Inspired by snsync)
// ─────────────────────────────────────────────

export const bundleTools = [
  {
    name: "sn_get_catalog_item_bundle",
    description: "Obtém um pacote completo de um Item de Catálogo: configurações, variáveis e client scripts associados.",
    inputSchema: {
      type: "object",
      properties: {
        env:    { type: "string", description: "Prefixo do ambiente (opcional)" },
        sys_id: { type: "string", description: "sys_id do sc_cat_item" },
      },
      required: ["sys_id"],
    },
  },
];

// ─────────────────────────────────────────────
//  HANDLERS
// ─────────────────────────────────────────────

import { ServiceNowEnv } from "../types.js";

export async function handleBundleTool(name: string, args: any) {
  const env = args.env || null;

  if (name === "sn_get_catalog_item_bundle") {
    const sys_id = args.sys_id;

    // 1. Buscar o Item de Catálogo
    const { result: item } = await snGet(`/api/now/table/sc_cat_item/${sys_id}`, {}, env);

    // 2. Buscar as Variáveis (item_option_new)
    const { result: variables } = await snGet("/api/now/table/item_option_new", {
      sysparm_query: `cat_item=${sys_id}`,
      sysparm_fields: "name,question_text,type,mandatory,order,default_value,help_text,reference,sys_id"
    }, env);

    // 3. Buscar os Catalog Client Scripts
    const { result: clientScripts } = await snGet("/api/now/table/catalog_script_client", {
      sysparm_query: `cat_item=${sys_id}`,
      sysparm_fields: "name,type,script,active,applies_catalog,applies_req_item,applies_sc_task,sys_id"
    }, env);

    // 4. Buscar as Catalog UI Policies
    const { result: uiPolicies } = await snGet("/api/now/table/catalog_ui_policy", {
      sysparm_query: `catalog_item=${sys_id}`,
      sysparm_fields: "short_description,applies_catalog,applies_req_item,applies_sc_task,active,conditions,sys_id"
    }, env);

    return {
      item: {
        name: item.name,
        short_description: item.short_description,
        description: item.description,
        active: item.active,
        sys_id: item.sys_id
      },
      variables: variables.map((v: any) => ({
        name: v.name,
        label: v.question_text,
        type: v.type,
        mandatory: v.mandatory === "true",
        order: parseInt(v.order),
        sys_id: v.sys_id
      })),
      client_scripts: clientScripts,
      ui_policies: uiPolicies,
      summary: `Pacote carregado: ${variables.length} variáveis, ${clientScripts.length} client scripts e ${uiPolicies.length} UI policies.`
    };
  }

  return null;
}
