#!/usr/bin/env node

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

// ─────────────────────────────────────────────
//  Todas as ferramentas registradas (CONSOLIDADO v3.0)
// ─────────────────────────────────────────────
const ALL_TOOLS = [
  ...scriptTools,
  ...catalogTools,
  ...flowTools,
  ...securityTools,
  ...deployTools,
  ...attachmentTools,
  ...propertyTools,
];

// ─────────────────────────────────────────────
//  Mapa de handlers por domínio
// ─────────────────────────────────────────────
const HANDLERS = [
  handleScriptTool,
  handleCatalogTool,
  handleFlowTool,
  handleSecurityTool,
  handleDeployTool,
  handleAttachmentTool,
  handlePropertyTool,
];

// ─────────────────────────────────────────────
//  Server Definition
// ─────────────────────────────────────────────
const server = new Server(
  { name: "servicenow-mcp-server", version: "3.0.0" },
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

console.error(`ServiceNow MCP Server v3.0.0 rodando — ${ALL_TOOLS.length} ferramentas consolidadas`);
