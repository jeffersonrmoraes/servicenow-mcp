#!/usr/bin/env node

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";

import { scriptTools,       handleScriptTool       } from "./tools/scripts.js";
import { catalogTools,      handleCatalogTool      } from "./tools/catalog.js";
import { flowTools,         handleFlowTool         } from "./tools/flow.js";
import { aclTools,          handleAclTool          } from "./tools/security.js";
import { notificationTools, handleNotificationTool } from "./tools/security.js";
import { roleTools,         handleRoleTool         } from "./tools/security.js";
import { deployTools,       handleDeployTool       } from "./tools/deploy.js";

// ─────────────────────────────────────────────
//  Todas as ferramentas registradas
// ─────────────────────────────────────────────
const ALL_TOOLS = [
  ...scriptTools,
  ...catalogTools,
  ...flowTools,
  ...aclTools,
  ...notificationTools,
  ...roleTools,
  ...deployTools,
];

// ─────────────────────────────────────────────
//  Mapa de handlers por domínio
// ─────────────────────────────────────────────
const HANDLERS = [
  handleScriptTool,
  handleCatalogTool,
  handleFlowTool,
  handleAclTool,
  handleNotificationTool,
  handleRoleTool,
  handleDeployTool,
];

// ─────────────────────────────────────────────
//  Server
// ─────────────────────────────────────────────
const server = new Server(
  { name: "servicenow-dev-agent", version: "2.1.0" },
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
//  Start
// ─────────────────────────────────────────────
const transport = new StdioServerTransport();
await server.connect(transport);
console.error(`ServiceNow MCP Server v2.1.0 rodando — ${ALL_TOOLS.length} ferramentas ativas`);
