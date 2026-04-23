#!/usr/bin/env node
import 'dotenv/config';
import fs   from "fs/promises";
import { existsSync } from "fs";
import path from "path";
import { logger } from "./lib/logger.js";

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
  ListPromptsRequestSchema,
  GetPromptRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

import { ToolDefinition, ToolHandler, MCPResource } from "./types.js";
import { persistLoad } from "./lib/cache.js";
import { logActivity } from "./lib/activity.js";
import { triggerJITSync } from "./lib/jit-harvester.js";

// ─────────────────────────────────────────────
//  Tool Modules (v5.0 — split architecture)
// ─────────────────────────────────────────────
import { crudTools,         handleCrudTool         } from "./tools/crud.js";
import { metadataTools,     handleMetadataTool     } from "./tools/metadata.js";
import { contextTools,      handleContextTool      } from "./tools/context.js";
import { envTools,          handleEnvTool          } from "./tools/envs.js";
import { catalogTools,      handleCatalogTool      } from "./tools/catalog.js";
import { flowTools,         handleFlowTool         } from "./tools/flow.js";
import { securityTools,     handleSecurityTool     } from "./tools/security.js";
import { deployTools,       handleDeployTool       } from "./tools/deploy.js";
import { attachmentTools,   handleAttachmentTool   } from "./tools/attachments.js";
import { propertyTools,     handlePropertyTool     } from "./tools/properties.js";
import { frontendTools,     handleFrontendTool     } from "./tools/frontend.js";
import { bundleTools,       handleBundleTool       } from "./tools/bundle.js";
import { knowledgeTools,    handleKnowledgeTool    } from "./tools/knowledge.js";
import { relationshipTools, handleRelationshipTool } from "./tools/relationships.js";
import { extraTools,        handleExtraTool        } from "./tools/extras.js";
import { logTools,          handleLogTool          } from "./tools/logs.js";
import { governanceTools,   handleGovernanceTool   } from "./tools/governance.js";

// ─────────────────────────────────────────────
//  Versão — fonte única de verdade
// ─────────────────────────────────────────────
const VERSION = "7.2.0";

// ─────────────────────────────────────────────
//  Todas as ferramentas registradas
// ─────────────────────────────────────────────
const ALL_TOOLS: ToolDefinition[] = [
  ...crudTools,
  ...metadataTools,
  ...contextTools,
  ...envTools,
  ...catalogTools,
  ...frontendTools,
  ...flowTools,
  ...securityTools,
  ...deployTools,
  ...attachmentTools,
  ...propertyTools,
  ...bundleTools,
  ...knowledgeTools,
  ...relationshipTools,
  ...extraTools,
  ...logTools,
  ...governanceTools,
];

// ─────────────────────────────────────────────
//  Roteamento O(1) — Map: toolName → handler
// ─────────────────────────────────────────────
const toolModules: { tools: ToolDefinition[], handler: ToolHandler }[] = [
  { tools: crudTools,         handler: handleCrudTool         },
  { tools: metadataTools,     handler: handleMetadataTool     },
  { tools: contextTools,      handler: handleContextTool      },
  { tools: envTools,          handler: handleEnvTool          },
  { tools: catalogTools,      handler: handleCatalogTool      },
  { tools: frontendTools,     handler: handleFrontendTool     },
  { tools: flowTools,         handler: handleFlowTool         },
  { tools: securityTools,     handler: handleSecurityTool     },
  { tools: deployTools,       handler: handleDeployTool       },
  { tools: attachmentTools,   handler: handleAttachmentTool   },
  { tools: propertyTools,     handler: handlePropertyTool     },
  { tools: bundleTools,       handler: handleBundleTool       },
  { tools: knowledgeTools,    handler: handleKnowledgeTool    },
  { tools: relationshipTools, handler: handleRelationshipTool },
  { tools: extraTools,        handler: handleExtraTool        },
  { tools: logTools,          handler: handleLogTool          },
  { tools: governanceTools,   handler: handleGovernanceTool   },
];

const HANDLER_MAP = new Map<string, ToolHandler>();
for (const { tools, handler } of toolModules) {
  for (const tool of tools) {
    HANDLER_MAP.set(tool.name, handler);
  }
}

// ─────────────────────────────────────────────
//  MCP Resources — Knowledge Base local
// ─────────────────────────────────────────────

const KNOWLEDGE_DIR = path.resolve(process.cwd(), "knowledge");

/**
 * Varre o diretório knowledge/ e retorna uma lista de MCP Resources.
 * Usa async I/O para não bloquear o event loop (v5.0).
 */
async function buildKnowledgeResources(): Promise<MCPResource[]> {
  const resources: MCPResource[] = [];
  if (!existsSync(KNOWLEDGE_DIR)) return resources;

  const entries = await fs.readdir(KNOWLEDGE_DIR, { withFileTypes: true });
  const categories = entries.filter(e => e.isDirectory()).map(e => e.name);

  for (const cat of categories) {
    const catDir = path.join(KNOWLEDGE_DIR, cat);
    const files  = (await fs.readdir(catDir)).filter(f => f.endsWith(".md"));

    for (const file of files) {
      const tableName = file.replace(".md", "");
      let label = tableName;
      try {
        const firstLine = (await fs.readFile(path.join(catDir, file), "utf8")).split("\n")[0];
        const match = firstLine.match(/# ServiceNow Table: (.+?) \(/);
        if (match) label = match[1].trim();
      } catch {}

      resources.push({
        uri:         `knowledge://${cat}/${tableName}`,
        name:        `${tableName} — ${label}`,
        description: `Schema da tabela ServiceNow '${tableName}' (categoria: ${cat.toUpperCase()})`,
        mimeType:    "text/markdown",
      });
    }
  }

  return resources;
}

// ─────────────────────────────────────────────
//  MCP Prompts — Templates de desenvolvimento (v5.0)
// ─────────────────────────────────────────────

const MCP_PROMPTS = [
  {
    name: "create_business_rule",
    description: "Guia passo-a-passo para criar uma Business Rule no ServiceNow via MCP.",
    arguments: [
      { name: "table", description: "Tabela alvo (ex: incident)", required: true },
      { name: "when", description: "Quando executar: before, after, async, display", required: false },
      { name: "action", description: "Eventos: insert, update, delete", required: false },
    ],
  },
  {
    name: "debug_incident",
    description: "Workflow completo para investigar e diagnosticar um incident específico.",
    arguments: [
      { name: "number", description: "Número do incident (ex: INC0010001)", required: true },
    ],
  },
  {
    name: "analyze_table",
    description: "Análise completa de uma tabela: schema, dependencies, ACLs e registros recentes.",
    arguments: [
      { name: "table", description: "Nome da tabela a analisar (ex: incident)", required: true },
    ],
  },
  {
    name: "safe_change_request",
    description: "Fluxo de governança seguro: gera plano de execução + análise de impacto e aguarda aprovação explícita antes de qualquer operação mutante.",
    arguments: [
      { name: "operation_type", description: "Tipo de operação: create_table, modify_table, create_script, modify_script, deploy_update_set, modify_acl, bulk_update, generic", required: true },
      { name: "description",    description: "Descrição clara do que será feito (ex: 'Criar Business Rule na tabela incident para enviar email ao fechar')", required: true },
      { name: "target_table",   description: "Tabela principal envolvida (ex: incident)", required: false },
      { name: "target_name",    description: "Nome do script/campo/artefato (ex: IncidentNotifier)", required: false },
      { name: "env",            description: "Prefixo do ambiente (ex: PDI, DEV)", required: false },
    ],
  },
];

function getPromptMessages(name: string, args: Record<string, string>): any[] {
  switch (name) {
    case "create_business_rule":
      return [{
        role: "user",
        content: {
          type: "text",
          text: `Preciso criar uma Business Rule no ServiceNow. Use as ferramentas MCP disponíveis para:

1. Primeiro, consulte o schema da tabela '${args.table || "incident"}' usando sn_sync_knowledge_base ou sn_generate_ai_context para entender os campos disponíveis
2. Gere o script da Business Rule seguindo best practices do ServiceNow:
   - When: ${args.when || "after"}
   - Action: ${args.action || "insert,update"}
   - Table: ${args.table || "incident"}
3. Use sn_upsert_metadata_script com type="business_rule" para criar a regra
4. Valide que a regra foi criada corretamente com sn_get_record

Siga as convenções:
- Prefixo 'u_' para campos customizados em escopo global
- Sempre defina condition para evitar execução desnecessária
- Use GlideRecord ao invés de GlideAggregate quando possível para operações simples`,
        },
      }];

    case "debug_incident":
      return [{
        role: "user",
        content: {
          type: "text",
          text: `Investigue o incident '${args.number}' no ServiceNow:

1. Use sn_query_records na tabela 'incident' com query number=${args.number}
2. Analise os campos: state, priority, assignment_group, assigned_to, short_description
3. Busque o histórico de atividades com sn_query_records em sys_journal_field com element_id=<sys_id do incident>
4. Verifique se há Business Rules ativas na tabela incident que podem estar causando problemas
5. Se houver worknotes ou comments, inclua no diagnóstico
6. Apresente um resumo estruturado com: status atual, timeline, e recomendações`,
        },
      }];

    case "analyze_table":
      return [{
        role: "user",
        content: {
          type: "text",
          text: `Faça uma análise completa da tabela '${args.table}' no ServiceNow:

1. Use sn_sync_knowledge_base para garantir que o schema local está atualizado
2. Use sn_get_dependencies para listar as tabelas que '${args.table}' referencia (outbound)
3. Use sn_analyze_impact para listar as tabelas que referenciam '${args.table}' (inbound)
4. Liste as ACLs ativas com sn_manage_acl action=list table=${args.table}
5. Busque as Business Rules ativas: sn_query_records table=sys_script query=collection=${args.table}^active=true
6. Busque os Client Scripts ativos: sn_query_records table=sys_script_client query=table=${args.table}^active=true
7. Conte os registros totais: sn_query_records table=${args.table} limit=1 (use o count do header)

Apresente um relatório completo com:
- Schema summary (campos, tipos, referências)
- Mapa de dependências (inbound e outbound)
- Regras de negócio ativas
- Scripts client-side
- Recomendações de segurança e performance`,
        },
      }];

    case "safe_change_request":
      return [{
        role: "user",
        content: {
          type: "text",
          text: `Quero fazer a seguinte mudança no ServiceNow:

**Operação**: ${args.operation_type || "generic"}
**Descrição**: ${args.description || "(não especificada)"}
${args.target_table ? `**Tabela alvo**: ${args.target_table}` : ""}
${args.target_name  ? `**Artefato alvo**: ${args.target_name}` : ""}
${args.env          ? `**Ambiente**: ${args.env}` : ""}

Antes de executar qualquer operação, siga obrigatoriamente este fluxo:

**PASSO 1 — Gerar o Plano de Execução**
Chame a ferramenta \`sn_generate_execution_plan\` com os parâmetros acima.
Exiba o campo \`report_markdown\` do resultado integralmente para o usuário.

**PASSO 2 — Análise de Aprovação**
Verifique o campo \`requires_approval\` no resultado:
- Se \`true\`: informe o usuário e aguarde confirmação explícita ("aprovado", "pode executar", "sim" ou equivalente).
  NÃO execute nenhuma ferramenta mutante (POST, PATCH, criação, atualização, bulk) antes da aprovação.
- Se \`false\`: prossiga, mas ainda assim mostre o plano ao usuário antes de executar.

**PASSO 3 — Execução (somente após aprovação)**
Execute cada passo do plano na ordem indicada, usando as ferramentas MCP listadas.
Reporte o resultado de cada passo antes de passar para o próximo.

**PASSO 4 — Verificação Final**
Confirme que cada artefato foi criado/modificado corretamente.
Se houver erro em qualquer passo, pare e consulte o usuário antes de continuar.

Lembre-se: nunca pule a análise de impacto. Nunca execute operações mutantes sem mostrar o plano primeiro.`,
        },
      }];

    default:
      return [{
        role: "user",
        content: { type: "text", text: "Prompt não encontrado." },
      }];
  }
}

// ─────────────────────────────────────────────
//  Server Definition (v5.0)
// ─────────────────────────────────────────────
const server = new Server(
  { name: "servicenow-mcp-server", version: VERSION },
  { capabilities: { tools: {}, resources: {}, prompts: {} } }
);

// ── List Tools ──
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: ALL_TOOLS,
}));

// ── Call Tool — O(1) lookup ──
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  const handler = HANDLER_MAP.get(name);
  if (!handler) {
    return {
      content: [{ type: "text", text: `Ferramenta desconhecida: ${name}` }],
      isError: true,
    };
  }

  const start = Date.now();
  const env   = (args as any)?.env || "default";

  // JIT Harvester — background sync if table is not yet in knowledge/
  const table = (args as any)?.table;
  if (table && typeof table === "string") triggerJITSync(table, env);

  try {
    const result = await handler(name, args);
    // Fire-and-forget: zero latency impact on MCP response
    logActivity({ ts: new Date().toISOString(), tool: name, env, duration: Date.now() - start, status: "ok" }).catch(() => {});
    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
    };
  } catch (err: any) {
    logActivity({ ts: new Date().toISOString(), tool: name, env, duration: Date.now() - start, status: "error", error: err.message || String(err) }).catch(() => {});
    return {
      content: [{ type: "text", text: `Erro: ${err.message || String(err)}` }],
      isError: true,
    };
  }
});

// ── List Resources — expõe knowledge/ como MCP Resources ──
server.setRequestHandler(ListResourcesRequestSchema, async () => ({
  resources: await buildKnowledgeResources(),
}));

// ── Read Resource — retorna o conteúdo de um arquivo do knowledge/ ──
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const { uri } = request.params;

  const match = uri.match(/^knowledge:\/\/([^/]+)\/(.+)$/);
  if (!match) {
    throw new Error(`URI de recurso inválida: '${uri}'. Formato esperado: knowledge://category/tableName`);
  }

  const [, category, tableName] = match;
  const filePath = path.join(KNOWLEDGE_DIR, category, `${tableName}.md`);

  if (!existsSync(filePath)) {
    throw new Error(`Recurso não encontrado: '${uri}'. Execute sn_sync_knowledge_base para sincronizar.`);
  }

  const text = await fs.readFile(filePath, "utf8");

  return {
    contents: [
      {
        uri,
        mimeType: "text/markdown",
        text,
      },
    ],
  };
});

// ── List Prompts (v5.0) ──
server.setRequestHandler(ListPromptsRequestSchema, async () => ({
  prompts: MCP_PROMPTS,
}));

// ── Get Prompt (v5.0) ──
server.setRequestHandler(GetPromptRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;
  const prompt = MCP_PROMPTS.find(p => p.name === name);
  if (!prompt) {
    throw new Error(`Prompt desconhecido: '${name}'`);
  }

  return {
    description: prompt.description,
    messages: getPromptMessages(name, args || {}),
  };
});

// ─────────────────────────────────────────────
//  Startup — Validação de Ambiente
// ─────────────────────────────────────────────
function validateEnv() {
  const hasDefault = !!process.env.SN_INSTANCE;
  if (!hasDefault) {
    const hasPrefixed = Object.keys(process.env).some(k => k.endsWith("_SN_INSTANCE"));
    if (!hasPrefixed) {
      logger.warn(
        "Nenhuma instância ServiceNow configurada (SN_INSTANCE). " +
        "Copie .env.example para .env e preencha as credenciais antes de usar as ferramentas."
      );
    }
  }
}

validateEnv();
await persistLoad();

// ─────────────────────────────────────────────
//  Start Transport
// ─────────────────────────────────────────────
const transport = new StdioServerTransport();
await server.connect(transport);

const resources = await buildKnowledgeResources();
logger.info("ServiceNow MCP Server iniciado", {
  version:   VERSION,
  tools:     ALL_TOOLS.length,
  resources: resources.length,
  prompts:   MCP_PROMPTS.length,
  log_level: process.env.SN_LOG_LEVEL || "info",
  cache_ttl: process.env.SN_CACHE_TTL_MS || "60000",
  timeout:   process.env.SN_REQUEST_TIMEOUT_MS || "30000",
  retries:   process.env.SN_MAX_RETRIES || "3",
});
