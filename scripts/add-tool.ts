#!/usr/bin/env node
/**
 * Tool Scaffolder — v7.0.0
 * Usage: npx tsx scripts/add-tool.ts <module-name> <tool-name>
 * Example: npx tsx scripts/add-tool.ts reporting sn_export_dashboard
 */

import fs   from "fs/promises";
import path  from "path";

const [,, module, toolName] = process.argv;

if (!module || !toolName) {
  console.error(`
Usage: npx tsx scripts/add-tool.ts <module> <tool-name>

  module    — lowercase name for the new tool file (e.g. reporting)
  tool-name — snake_case MCP tool name starting with sn_ (e.g. sn_export_dashboard)

Example:
  npx tsx scripts/add-tool.ts reporting sn_export_dashboard
`);
  process.exit(1);
}

if (!toolName.startsWith("sn_")) {
  console.error(`Error: tool-name must start with "sn_" (got "${toolName}")`);
  process.exit(1);
}

// Derive handler name: sn_export_dashboard → handleReportingTool
const handlerGroup = module.charAt(0).toUpperCase() + module.slice(1).toLowerCase();

const toolsDir = path.resolve(process.cwd(), "src/tools");
const outPath  = path.join(toolsDir, `${module}.ts`);

// Check if file already exists
let exists = false;
try {
  await fs.access(outPath);
  exists = true;
} catch {}

if (exists) {
  console.error(`\nError: "${outPath}" already exists.`);
  console.error(`To add a new tool to an existing module, edit the file manually.\n`);
  process.exit(1);
}

const timestamp = new Date().toISOString().split("T")[0];

const content = `import { snGet } from "../lib/client.js";
import { validateTableName } from "../lib/validate.js";

// ─────────────────────────────────────────────
//  TOOLS — ${handlerGroup} (generated ${timestamp})
// ─────────────────────────────────────────────

export const ${module}Tools = [
  {
    name: "${toolName}",
    description: "TODO: describe what ${toolName} does.",
    inputSchema: {
      type: "object",
      properties: {
        env:   { type: "string", description: "Prefixo do ambiente (opcional, ex: DEV)" },
        table: { type: "string", description: "Nome da tabela" },
        // TODO: add your parameters here
      },
      required: ["table"],
    },
  },
];

// ─────────────────────────────────────────────
//  HANDLERS
// ─────────────────────────────────────────────

export async function handle${handlerGroup}Tool(name: string, args: any) {
  const env = args.env || null;

  switch (name) {
    case "${toolName}": {
      validateTableName(args.table);
      // TODO: implement tool logic
      const { result } = await snGet(\`/api/now/table/\${args.table}\`, {
        sysparm_limit: 1,
      }, env);
      return result;
    }

    default: return null;
  }
}
`;

await fs.writeFile(outPath, content, "utf8");

// Print registration instructions
console.log(`
✓ Ferramenta criada: src/tools/${module}.ts

Agora registre o módulo em src/index.ts:

  1. Adicione o import:
     import { ${module}Tools, handle${handlerGroup}Tool } from "./tools/${module}.js";

  2. Adicione ao array ALL_TOOLS:
     ...${module}Tools,

  3. Adicione ao array toolModules:
     { tools: ${module}Tools, handler: handle${handlerGroup}Tool },

E no src/dashboard/server.ts, adicione ao import e ao ALL_TOOLS:
  import { ${module}Tools } from "../tools/${module}.js";
  ...${module}Tools,

Execute \`npm run type-check\` para verificar a compilação.
`);
