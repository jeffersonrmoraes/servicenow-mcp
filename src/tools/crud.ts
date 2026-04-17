import { snGet, snPost, snPatch } from "../lib/client.js";
import { validateTableName, validateSysId, validateLimit, validateDataPayload, validateEncodedQuery } from "../lib/validate.js";

// ─────────────────────────────────────────────
//  TOOLS — Core CRUD (v5.0)
// ─────────────────────────────────────────────

export const crudTools = [
  {
    name: "sn_query_records",
    description: "Consulta registros de qualquer tabela do ServiceNow.",
    inputSchema: {
      type: "object",
      properties: {
        env:    { type: "string", description: "Prefixo do ambiente (opcional, ex: DEV)" },
        table:  { type: "string" },
        query:  { type: "string", description: "Encoded query (ex: active=true^priority=1)" },
        fields: { type: "string", description: "Campos separados por vírgula" },
        limit:  { type: "number" },
        offset: { type: "number", description: "Offset para paginação (default: 0)" },
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
        env:    { type: "string", description: "Prefixo do ambiente (opcional, ex: DEV)" },
        table:  { type: "string" },
        sys_id: { type: "string" },
      },
      required: ["table", "sys_id"],
    },
  },
  {
    name: "sn_create_record",
    description: "Cria um registro genérico em qualquer tabela.",
    inputSchema: {
      type: "object",
      properties: {
        env:   { type: "string", description: "Prefixo do ambiente (opcional, ex: DEV)" },
        table: { type: "string" },
        data:  { type: "object", description: "Payload JSON com nomes nativos das colunas" },
      },
      required: ["table", "data"],
    },
  },
  {
    name: "sn_update_record",
    description: "Atualiza campos de qualquer registro pelo sys_id.",
    inputSchema: {
      type: "object",
      properties: {
        env:    { type: "string", description: "Prefixo do ambiente (opcional, ex: DEV)" },
        table:  { type: "string" },
        sys_id: { type: "string" },
        data:   { type: "object", description: "Campos a serem atualizados" },
      },
      required: ["table", "sys_id", "data"],
    },
  },
  {
    name: "sn_bulk_update",
    description: "Atualiza múltiplos registros de uma tabela por query encoded. Retorna a contagem de registros afetados.",
    inputSchema: {
      type: "object",
      properties: {
        env:   { type: "string", description: "Prefixo do ambiente (opcional, ex: DEV)" },
        table: { type: "string" },
        query: { type: "string", description: "Encoded query para selecionar os registros (ex: active=true^priority=1)" },
        data:  { type: "object", description: "Campos e valores a aplicar em todos os registros encontrados" },
        limit: { type: "number", description: "Máximo de registros a atualizar (default: 100, máx: 500)" },
      },
      required: ["table", "query", "data"],
    },
  },
  {
    name: "sn_query_all",
    description: "Consulta todos os registros de uma tabela paginando automaticamente. Retorna os dados e um cursor (next_offset) para continuar caso haja mais registros. Use para datasets maiores que 1000 registros.",
    inputSchema: {
      type: "object",
      properties: {
        env:        { type: "string", description: "Prefixo do ambiente (opcional, ex: DEV)" },
        table:      { type: "string" },
        query:      { type: "string", description: "Encoded query (ex: active=true^priority=1)" },
        fields:     { type: "string", description: "Campos separados por vírgula" },
        page_size:  { type: "number", description: "Registros por página (default: 200, máx: 1000)" },
        offset:     { type: "number", description: "Offset inicial para retomar um cursor (default: 0)" },
        max_pages:  { type: "number", description: "Máximo de páginas a buscar por chamada (default: 5, máx: 20)" },
      },
      required: ["table"],
    },
  },
  {
    name: "sn_clone_record",
    description: "Duplica um registro existente removendo campos sys_* somente-leitura. Útil para templates e criação rápida.",
    inputSchema: {
      type: "object",
      properties: {
        env:    { type: "string", description: "Prefixo do ambiente (opcional, ex: DEV)" },
        table:  { type: "string" },
        sys_id: { type: "string", description: "sys_id do registro a clonar" },
        overrides: { type: "object", description: "Campos a sobrescrever no clone (opcional)" },
      },
      required: ["table", "sys_id"],
    },
  },
  {
    name: "sn_diff_records",
    description: "Compara o mesmo registro entre dois ambientes (ex: DEV vs PROD) e retorna as diferenças campo a campo. Busca por number, name ou sys_id.",
    inputSchema: {
      type: "object",
      properties: {
        table:   { type: "string", description: "Tabela do registro (ex: sys_script)" },
        lookup_field: { type: "string", description: "Campo de busca (ex: name, number). Default: name" },
        lookup_value: { type: "string", description: "Valor do campo de busca (ex: MyBusinessRule)" },
        envA:    { type: "string", description: "Prefixo do primeiro ambiente (ex: DEV)" },
        envB:    { type: "string", description: "Prefixo do segundo ambiente (ex: PROD)" },
        fields:  { type: "string", description: "Campos a comparar, separados por vírgula. Se vazio, compara todos." },
      },
      required: ["table", "lookup_value"],
    },
  },
  {
    name: "sn_search_global",
    description: "Busca textual em múltiplas tabelas simultaneamente. Retorna resultados agrupados por tabela.",
    inputSchema: {
      type: "object",
      properties: {
        env:    { type: "string", description: "Prefixo do ambiente (opcional, ex: DEV)" },
        text:   { type: "string", description: "Texto a buscar" },
        tables: { type: "string", description: "Tabelas separadas por vírgula (default: incident,change_request,kb_knowledge,sys_script,sys_script_include)" },
        limit:  { type: "number", description: "Máximo de resultados por tabela (default: 5)" },
      },
      required: ["text"],
    },
  },
];

// ─────────────────────────────────────────────
//  HANDLERS — Core CRUD
// ─────────────────────────────────────────────

export async function handleCrudTool(name: string, args: any) {
  const env = args.env || null;

  switch (name) {
    case "sn_query_records": {
      validateTableName(args.table);
      const limit  = args.limit  ? validateLimit(args.limit)  : 10;
      const offset = args.offset ? Math.max(0, parseInt(args.offset, 10)) : 0;
      const query  = validateEncodedQuery(args.query);
      const { result } = await snGet(`/api/now/table/${args.table}`, {
        sysparm_limit:  limit,
        sysparm_offset: offset,
        ...(query      && { sysparm_query:  query      }),
        ...(args.fields && { sysparm_fields: args.fields }),
      }, env);
      return { result, meta: { offset, limit, count: result.length } };
    }

    case "sn_get_record": {
      validateTableName(args.table);
      validateSysId(args.sys_id);
      const { result } = await snGet(`/api/now/table/${args.table}/${args.sys_id}`, {}, env);
      return result;
    }

    case "sn_create_record": {
      validateTableName(args.table);
      validateDataPayload(args.data);
      const { result } = await snPost(`/api/now/table/${args.table}`, args.data, env);
      return result;
    }

    case "sn_update_record": {
      validateTableName(args.table);
      validateSysId(args.sys_id);
      validateDataPayload(args.data);
      const { result } = await snPatch(`/api/now/table/${args.table}/${args.sys_id}`, args.data, env);
      return result;
    }

    case "sn_bulk_update": {
      validateTableName(args.table);
      validateDataPayload(args.data);
      const query = validateEncodedQuery(args.query, "query");
      if (!query) throw new Error("O campo 'query' é obrigatório para sn_bulk_update.");
      const limit = Math.min(args.limit || 100, 500);

      const { result: records } = await snGet(`/api/now/table/${args.table}`, {
        sysparm_query:  query,
        sysparm_fields: "sys_id",
        sysparm_limit:  limit,
      }, env);

      if (!records || records.length === 0) {
        return { updated: 0, message: "Nenhum registro encontrado para o filtro informado." };
      }

      const results = await Promise.allSettled(
        records.map((r: any) => snPatch(`/api/now/table/${args.table}/${r.sys_id}`, args.data, env))
      );

      const succeeded = results.filter(r => r.status === "fulfilled").length;
      const failed = results
        .map((r, i) => r.status === "rejected"
          ? { sys_id: records[i].sys_id, reason: r.reason instanceof Error ? r.reason.message : String(r.reason) }
          : null
        )
        .filter(Boolean);

      return {
        updated: succeeded,
        failed_count: failed.length,
        ...(failed.length > 0 && { failures: failed }),
      };
    }

    case "sn_query_all": {
      validateTableName(args.table);
      const pageSize  = Math.min(args.page_size || 200, 1000);
      const maxPages  = Math.min(args.max_pages || 5, 20);
      let offset      = Math.max(args.offset || 0, 0);
      const allQuery  = validateEncodedQuery(args.query);

      const allRecords: any[] = [];
      let pagesRead = 0;
      let hasMore   = false;

      while (pagesRead < maxPages) {
        const { result } = await snGet(`/api/now/table/${args.table}`, {
          sysparm_limit:  pageSize,
          sysparm_offset: offset,
          ...(allQuery    && { sysparm_query:  allQuery    }),
          ...(args.fields && { sysparm_fields: args.fields }),
        }, env);

        if (!result || result.length === 0) break;
        allRecords.push(...result);
        pagesRead++;
        offset += result.length;

        if (result.length < pageSize) break;
        if (pagesRead >= maxPages) { hasMore = true; break; }
      }

      return {
        result:    allRecords,
        meta: {
          total_fetched: allRecords.length,
          pages_read:    pagesRead,
          has_more:      hasMore,
          next_offset:   hasMore ? offset : null,
        },
      };
    }

    case "sn_clone_record": {
      validateTableName(args.table);
      validateSysId(args.sys_id);

      // 1. Fetch original
      const { result: original } = await snGet(`/api/now/table/${args.table}/${args.sys_id}`, {}, env);

      // 2. Remove sys_* read-only fields
      const sysFields = new Set([
        "sys_id", "sys_created_on", "sys_created_by", "sys_updated_on", "sys_updated_by",
        "sys_mod_count", "sys_tags", "sys_class_name", "sys_domain", "sys_domain_path",
        "sys_update_name", "sys_package", "sys_scope", "sys_policy",
      ]);

      const clonePayload: Record<string, any> = {};
      for (const [key, value] of Object.entries(original)) {
        if (!sysFields.has(key) && value !== null && value !== undefined && value !== "") {
          // Se o valor é um objeto {display_value, value}, usa só o value
          clonePayload[key] = typeof value === "object" && (value as any)?.value !== undefined
            ? (value as any).value
            : value;
        }
      }

      // 3. Apply overrides
      if (args.overrides && typeof args.overrides === "object") {
        Object.assign(clonePayload, args.overrides);
      }

      // 4. Create clone
      const { result: clone } = await snPost(`/api/now/table/${args.table}`, clonePayload, env);

      return {
        action: "cloned",
        original_sys_id: args.sys_id,
        clone_sys_id: clone.sys_id,
        table: args.table,
        fields_copied: Object.keys(clonePayload).length,
      };
    }

    case "sn_diff_records": {
      validateTableName(args.table);

      const lookupField = args.lookup_field || "name";
      const lookupValue = args.lookup_value;
      const envA = args.envA || null;
      const envB = args.envB || null;

      // Fetch from environment A
      const { result: resultA } = await snGet(`/api/now/table/${args.table}`, {
        sysparm_query: `${lookupField}=${lookupValue}`,
        sysparm_limit: 1,
        ...(args.fields && { sysparm_fields: args.fields }),
      }, envA);

      // Fetch from environment B
      const { result: resultB } = await snGet(`/api/now/table/${args.table}`, {
        sysparm_query: `${lookupField}=${lookupValue}`,
        sysparm_limit: 1,
        ...(args.fields && { sysparm_fields: args.fields }),
      }, envB);

      if (!resultA?.length && !resultB?.length) {
        throw new Error(`Registro '${lookupField}=${lookupValue}' não encontrado em nenhum dos ambientes.`);
      }

      const recordA = resultA?.[0] || {};
      const recordB = resultB?.[0] || {};

      // Compare fields
      const allKeys = new Set([...Object.keys(recordA), ...Object.keys(recordB)]);
      const sysIgnored = new Set(["sys_updated_on", "sys_created_on", "sys_mod_count", "sys_updated_by", "sys_created_by"]);

      const differences: { field: string; envA: any; envB: any }[] = [];
      const matching: string[] = [];

      for (const key of allKeys) {
        if (sysIgnored.has(key)) continue;
        const valA = typeof recordA[key] === "object" ? JSON.stringify(recordA[key]) : String(recordA[key] ?? "");
        const valB = typeof recordB[key] === "object" ? JSON.stringify(recordB[key]) : String(recordB[key] ?? "");

        if (valA !== valB) {
          differences.push({ field: key, envA: recordA[key] ?? "(ausente)", envB: recordB[key] ?? "(ausente)" });
        } else {
          matching.push(key);
        }
      }

      return {
        table: args.table,
        lookup: `${lookupField}=${lookupValue}`,
        envA: envA || "default",
        envB: envB || "default",
        found_in_A: !!resultA?.length,
        found_in_B: !!resultB?.length,
        differences_count: differences.length,
        differences,
        matching_fields_count: matching.length,
      };
    }

    case "sn_search_global": {
      const text = args.text;
      if (!text || typeof text !== "string" || text.length < 2) {
        throw new Error("O campo 'text' é obrigatório e deve ter pelo menos 2 caracteres.");
      }

      const defaultTables = "incident,change_request,kb_knowledge,sys_script,sys_script_include";
      const tables = (args.tables || defaultTables).split(",").map((t: string) => t.trim());
      const limit = args.limit ? Math.min(args.limit, 20) : 5;

      const results: Record<string, any[]> = {};
      let totalFound = 0;

      for (const table of tables) {
        try {
          validateTableName(table);
          const { result } = await snGet(`/api/now/table/${table}`, {
            sysparm_query: `short_descriptionLIKE${text}^ORnameLIKE${text}^ORdescriptionLIKE${text}^ORnumberLIKE${text}`,
            sysparm_fields: "sys_id,number,name,short_description,sys_updated_on",
            sysparm_limit: limit,
          }, env);

          if (result && result.length > 0) {
            results[table] = result;
            totalFound += result.length;
          }
        } catch {
          // Ignora tabelas que falham (campo inexistente, ACL, etc.)
        }
      }

      return {
        search_text: text,
        tables_searched: tables.length,
        total_found: totalFound,
        results,
      };
    }

    default: return null;
  }
}
