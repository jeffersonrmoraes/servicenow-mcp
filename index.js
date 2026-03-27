#!/usr/bin/env node
import 'dotenv/config';

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";

import { scriptTools,       handleScriptTool       } from "./tools/scripts.js";
import { catalogTools,      handleCatalogTool      } from "./tools/catalog.js";
import { flowTools,         handleFlowTool         } from "./tools/flow.js";
import { securityTools,     handleSecurityTool     } from "./tools/security.js";
import { deployTools,       handleDeployTool       } from "./tools/deploy.js";
import { attachmentTools,   handleAttachmentTool   } from "./tools/attachments.js";
import { propertyTools,     handlePropertyTool     } from "./tools/properties.js";
import { frontendTools,     handleFrontendTool     } from "./tools/frontend.js";
import { bundleTools,       handleBundleTool       } from "./tools/bundle.js";

// ─────────────────────────────────────────────
//  Todas as ferramentas registradas (v3.1.0)
// ─────────────────────────────────────────────
const ALL_TOOLS = [
  ...scriptTools,
  ...catalogTools,
  ...frontendTools,
  ...flowTools,
  ...securityTools,
  ...deployTools,
  ...attachmentTools,
  ...propertyTools,
  ...bundleTools,
];

// ─────────────────────────────────────────────
//  Mapa de handlers por domínio
// ─────────────────────────────────────────────
const HANDLERS = [
  handleScriptTool,
  handleCatalogTool,
  handleFrontendTool,
  handleFlowTool,
  handleSecurityTool,
  handleDeployTool,
  handleAttachmentTool,
  handlePropertyTool,
  handleBundleTool,
];

// ─────────────────────────────────────────────
//  Server Definition
// ─────────────────────────────────────────────
const server = new Server(
  { name: "servicenow-mcp-server", version: "3.7.0" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: ALL_TOOLS,
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    for (const handler of HANDLERS) {
      const result = await handler(name, args);
      if (result !== null) {
        return {
          content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
        };
      }
    }
    throw new Error(`Ferramenta desconhecida: ${name}`);
  } catch (err) {
    return {
      content: [{ type: "text", text: `Erro: ${err.message}` }],
      isError: true,
    };
  }
});

// ─────────────────────────────────────────────
//  Start Transport
// ─────────────────────────────────────────────
const transport = new StdioServerTransport();
await server.connect(transport);

console.error(`ServiceNow MCP Server v3.7.0 rodando — ${ALL_TOOLS.length} ferramentas consolidadas`);
