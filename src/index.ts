#!/usr/bin/env node
import 'dotenv/config';
import fs   from "fs";
import path from "path";
import { logger } from "./lib/logger.js";

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

import { scriptTools,       handleScriptTool       } from "./tools/scripts.js";
import { catalogTools,      handleCatalogTool      } from "./tools/catalog.js";
import { flowTools,         handleFlowTool         } from "./tools/flow.js";
import { securityTools,     handleSecurityTool     } from "./tools/security.js";
import { deployTools,       handleDeployTool       } from "./tools/deploy.js";
import { attachmentTools,   handleAttachmentTool   } from "./tools/attachments.js";
import { propertyTools,     handlePropertyTool     } from "./tools/properties.js";
import { frontendTools,     handleFrontendTool     } from "./tools/frontend.js";
import { bundleTools,       handleBundleTool        } from "./tools/bundle.js";
import { knowledgeTools,    handleKnowledgeTool    } from "./tools/knowledge.js";
import { relationshipTools, handleRelationshipTool } from "./tools/relationships.js";

// ─────────────────────────────────────────────
//  Interfaces (v4.0)
// ─────────────────────────────────────────────

interface ToolDefinition {
  name: string;
  description: string;
  inputSchema: object;
}

interface ToolHandler {
  (name: string, args: any): Promise<any>;
}

interface MCPResource {
  uri: string;
  name: string;
  description: string;
  mimeType: string;
}

// ─────────────────────────────────────────────
//  Todas as ferramentas registradas (v3.9.0)
// ─────────────────────────────────────────────
const ALL_TOOLS: ToolDefinition[] = [
  ...scriptTools,
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
];

// ─────────────────────────────────────────────
//  Roteamento O(1) — Map: toolName → handler
// ─────────────────────────────────────────────
const toolModules: { tools: ToolDefinition[], handler: ToolHandler }[] = [
  { tools: scriptTools,     handler: handleScriptTool     },
  { tools: catalogTools,    handler: handleCatalogTool    },
  { tools: frontendTools,   handler: handleFrontendTool   },
  { tools: flowTools,       handler: handleFlowTool       },
  { tools: securityTools,   handler: handleSecurityTool   },
  { tools: deployTools,     handler: handleDeployTool     },
  { tools: attachmentTools, handler: handleAttachmentTool },
  { tools: propertyTools,   handler: handlePropertyTool   },
  { tools: bundleTools,     handler: handleBundleTool     },
  { tools: knowledgeTools,  handler: handleKnowledgeTool  },
  { tools: relationshipTools, handler: handleRelationshipTool },
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
 * Varre o diretório knowledge/ e retorna uma lista de MCP Resources,
 * um por arquivo Markdown de schema de tabela.
 */
function buildKnowledgeResources(): MCPResource[] {
  const resources: MCPResource[] = [];
  if (!fs.existsSync(KNOWLEDGE_DIR)) return resources;

  const categories = fs.readdirSync(KNOWLEDGE_DIR).filter(
    f => fs.statSync(path.join(KNOWLEDGE_DIR, f)).isDirectory()
  );

  for (const cat of categories) {
    const catDir = path.join(KNOWLEDGE_DIR, cat);
    const files  = fs.readdirSync(catDir).filter(f => f.endsWith(".md"));

    for (const file of files) {
      const tableName = file.replace(".md", "");
      // Tenta extrair o label da primeira linha do MD
      let label = tableName;
      try {
        const firstLine = fs.readFileSync(path.join(catDir, file), "utf8").split("\n")[0];
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
//  Server Definition
// ─────────────────────────────────────────────
const server = new Server(
  { name: "servicenow-mcp-server", version: "4.1.0" },
  { capabilities: { tools: {}, resources: {} } }
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

  try {
    const result = await handler(name, args);
    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
    };
  } catch (err: any) {
    return {
      content: [{ type: "text", text: `Erro: ${err.message || String(err)}` }],
      isError: true,
    };
  }
});

// ── List Resources — expõe knowledge/ como MCP Resources ──
server.setRequestHandler(ListResourcesRequestSchema, async () => ({
  resources: buildKnowledgeResources(),
}));

// ── Read Resource — retorna o conteúdo de um arquivo do knowledge/ ──
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const { uri } = request.params;

  // URI format: knowledge://{category}/{tableName}
  const match = uri.match(/^knowledge:\/\/([^/]+)\/(.+)$/);
  if (!match) {
    throw new Error(`URI de recurso inválida: '${uri}'. Formato esperado: knowledge://category/tableName`);
  }

  const [, category, tableName] = match;
  const filePath = path.join(KNOWLEDGE_DIR, category, `${tableName}.md`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Recurso não encontrado: '${uri}'. Execute sn_sync_knowledge_base para sincronizar.`);
  }

  const text = fs.readFileSync(filePath, "utf8");

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

// ─────────────────────────────────────────────
//  Start Transport
// ─────────────────────────────────────────────
const transport = new StdioServerTransport();
await server.connect(transport);

const resourceCount = buildKnowledgeResources().length;
logger.info("ServiceNow MCP Server iniciado", {
  version:   "4.1.0",
  tools:     ALL_TOOLS.length,
  resources: resourceCount,
  log_level: process.env.SN_LOG_LEVEL || "info",
  cache_ttl: process.env.SN_CACHE_TTL_MS || "60000",
  timeout:   process.env.SN_REQUEST_TIMEOUT_MS || "30000",
});
