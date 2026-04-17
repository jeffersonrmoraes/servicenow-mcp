import "dotenv/config";
import express, { Request, Response } from "express";
import cors   from "cors";
import fs     from "fs/promises";
import fsSync from "fs";
import path   from "path";
import { fileURLToPath } from "url";

import { crudTools }         from "../tools/crud.js";
import { metadataTools }     from "../tools/metadata.js";
import { contextTools }      from "../tools/context.js";
import { envTools }          from "../tools/envs.js";
import { catalogTools }      from "../tools/catalog.js";
import { flowTools }         from "../tools/flow.js";
import { securityTools }     from "../tools/security.js";
import { deployTools }       from "../tools/deploy.js";
import { attachmentTools }   from "../tools/attachments.js";
import { propertyTools }     from "../tools/properties.js";
import { frontendTools }     from "../tools/frontend.js";
import { bundleTools }       from "../tools/bundle.js";
import { knowledgeTools }    from "../tools/knowledge.js";
import { relationshipTools } from "../tools/relationships.js";
import { extraTools }        from "../tools/extras.js";
import { logTools }          from "../tools/logs.js";
import { governanceTools }   from "../tools/governance.js";
import { readActivity, readActivityFrom, ACTIVITY_PATH } from "../lib/activity.js";
import { cacheStats }        from "../lib/cache.js";

const ALL_TOOLS = [
  ...crudTools, ...metadataTools, ...contextTools, ...envTools,
  ...catalogTools, ...flowTools,  ...securityTools,
  ...deployTools,  ...attachmentTools, ...propertyTools, ...frontendTools,
  ...bundleTools,  ...knowledgeTools,  ...relationshipTools, ...extraTools,
  ...logTools,     ...governanceTools,
];

// ─────────────────────────────────────────────
//  Module inference for Tools Explorer
// ─────────────────────────────────────────────

function inferModule(name: string): string {
  if (["sn_query_records","sn_get_record","sn_create_record","sn_update_record","sn_delete_record","sn_query_all"].includes(name)) return "CRUD";
  if (name.includes("acl") || name.includes("access") || name.includes("notification")) return "SECURITY";
  if (name.includes("catalog") || name.includes("variable"))   return "CATALOG";
  if (name.includes("flow"))                                    return "FLOW";
  if (name.includes("knowledge") || name.includes("sync"))     return "KNOWLEDGE";
  if (name.includes("dependenc") || name.includes("impact"))   return "RELATIONSHIPS";
  if (name.includes("syslog") || name.includes("node_log"))    return "LOGS";
  if (name.includes("update_set"))                             return "GOVERNANCE";
  if (name.includes("deploy") || name.includes("bundle"))      return "DEPLOY";
  if (name.includes("attachment"))                             return "ATTACHMENTS";
  if (name.includes("propert"))                                return "PROPERTIES";
  if (name.includes("frontend") || name.includes("style") || name.includes("angular")) return "FRONTEND";
  if (name.includes("metadata") || name.includes("schema") || name.includes("upsert") || name.includes("script")) return "METADATA";
  if (name.includes("context") || name.includes("generate"))  return "CONTEXT";
  return "EXTRAS";
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app       = express();
const PORT      = parseInt(process.env.DASHBOARD_PORT || "3000", 10);
const envPath   = path.resolve(__dirname, "../../.env");
const knowledgeDir = path.resolve(process.cwd(), "knowledge");

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "./public")));

// ─────────────────────────────────────────────
//  .env helpers
// ─────────────────────────────────────────────

function parseEnvFile(): Record<string, string> {
  if (!fsSync.existsSync(envPath)) return {};
  return fsSync.readFileSync(envPath, "utf8").split("\n").reduce((acc: Record<string, string>, line: string) => {
    const idx = line.indexOf("=");
    if (idx !== -1) {
      const key = line.substring(0, idx).trim();
      const val = line.substring(idx + 1).trim();
      if (key && !key.startsWith("#")) acc[key] = val;
    }
    return acc;
  }, {});
}

async function saveEnvFile(data: Record<string, string>) {
  const content = Object.entries(data)
    .filter(([k, v]) => k && v)
    .map(([k, v]) => `${k}=${v}`)
    .join("\n");
  await fs.writeFile(envPath, content, "utf8");
  Object.assign(process.env, data);
}

function resolveSnUrl(instance: string): string {
  return instance.startsWith("http") ? instance : `https://${instance}.service-now.com`;
}

// ─────────────────────────────────────────────
//  Knowledge base stats helper
// ─────────────────────────────────────────────

async function getKnowledgeStats(): Promise<{ total: number; categories: Record<string, number> }> {
  if (!fsSync.existsSync(knowledgeDir)) return { total: 0, categories: {} };
  try {
    const entries    = await fs.readdir(knowledgeDir, { withFileTypes: true });
    const categories = entries.filter(e => e.isDirectory()).map(e => e.name);
    const stats: Record<string, number> = {};
    let total = 0;
    await Promise.all(categories.map(async cat => {
      const files   = await fs.readdir(path.join(knowledgeDir, cat));
      const mdCount = files.filter(f => f.endsWith(".md")).length;
      stats[cat.toUpperCase()] = mdCount;
      total += mdCount;
    }));
    return { total, categories: stats };
  } catch {
    return { total: 0, categories: {} };
  }
}

// ─────────────────────────────────────────────
//  SSE — Live Activity Feed
//  Strategy: 500ms polling on byte offset (tail -f equivalent)
//  Zero watcher handles — no fs.watch reliability issues on Windows
// ─────────────────────────────────────────────

const sseClients = new Set<Response>();
let   _lastOffset = 0;
const SSE_POLL_MS = 500;
const SSE_HB_MS   = 15_000; // heartbeat interval

setInterval(async () => {
  if (sseClients.size === 0) return;
  const { entries, newOffset } = await readActivityFrom(_lastOffset);
  if (entries.length === 0) return;
  _lastOffset = newOffset;
  const payload = entries.map(e => `data: ${JSON.stringify(e)}\n\n`).join("");
  for (const client of sseClients) {
    try { client.write(payload); } catch { sseClients.delete(client); }
  }
}, SSE_POLL_MS);

// Heartbeat — keeps connections alive through proxies / Claude Desktop
setInterval(() => {
  const hb = ": heartbeat\n\n";
  for (const client of sseClients) {
    try { client.write(hb); } catch { sseClients.delete(client); }
  }
}, SSE_HB_MS);

// ─────────────────────────────────────────────
//  Existing Endpoints
// ─────────────────────────────────────────────

app.get("/api/env", (_req: Request, res: Response) => {
  res.json(parseEnvFile());
});

app.post("/api/env", async (req: Request, res: Response) => {
  try {
    await saveEnvFile(req.body);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: `Falha ao salvar: ${err.message}` });
  }
});

app.get("/api/auth/:prefix", (req: Request, res: Response) => {
  const prefix    = (req.params.prefix as string).toUpperCase();
  const envPrefix = prefix === "DEFAULT" ? "" : `${prefix}_`;
  const allEnv    = parseEnvFile();
  const instance  = allEnv[`${envPrefix}SN_INSTANCE`] || process.env[`${envPrefix}SN_INSTANCE`];
  const clientId  = allEnv[`${envPrefix}SN_CLIENT_ID`] || process.env[`${envPrefix}SN_CLIENT_ID`];

  if (!instance || !clientId) {
    return res.status(400).send(`Erro: ${envPrefix}SN_INSTANCE ou ${envPrefix}SN_CLIENT_ID não configurados.`);
  }
  const snUrl      = resolveSnUrl(instance);
  const redirectUri = `http://localhost:${PORT}/api/callback`;
  const authUrl    = `${snUrl}/oauth_auth.do?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${prefix}`;
  res.redirect(authUrl);
});

app.get("/api/callback", async (req: Request, res: Response) => {
  const code   = req.query.code   as string;
  const prefix = req.query.state  as string;
  const envPrefix = prefix === "DEFAULT" ? "" : `${prefix}_`;
  if (!code) return res.status(400).send("Erro: Code não recebido.");

  try {
    const allEnv       = parseEnvFile();
    const instance     = allEnv[`${envPrefix}SN_INSTANCE`]   || (process.env[`${envPrefix}SN_INSTANCE`]   as string);
    const clientId     = allEnv[`${envPrefix}SN_CLIENT_ID`]  || (process.env[`${envPrefix}SN_CLIENT_ID`]  as string);
    const clientSecret = allEnv[`${envPrefix}SN_CLIENT_SECRET`] || (process.env[`${envPrefix}SN_CLIENT_SECRET`] as string);
    if (!instance) return res.status(400).send(`Erro: SN_INSTANCE não encontrada para ${prefix}`);

    const snUrl = resolveSnUrl(instance);
    const redirectUri = `http://localhost:${PORT}/api/callback`;
    const tokenParams = new URLSearchParams({
      grant_type: "authorization_code", client_id: clientId, client_secret: clientSecret,
      redirect_uri: redirectUri, code,
    });
    const tokenRes  = await fetch(`${snUrl}/oauth_token.do`, {
      method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: tokenParams.toString(),
    });
    const tokenData: any = await tokenRes.json();
    if (tokenData.access_token) {
      allEnv[`${envPrefix}SN_OAUTH_ACCESS_TOKEN`]  = tokenData.access_token;
      if (tokenData.refresh_token) allEnv[`${envPrefix}SN_OAUTH_REFRESH_TOKEN`] = tokenData.refresh_token;
      await saveEnvFile(allEnv);
      res.send(`<h1>Autorização OK!</h1><p>Token para <b>${prefix}</b> salvo.</p><script>setTimeout(() => window.close(), 2000);</script>`);
    } else {
      res.status(500).send(`Erro na troca de token: ${JSON.stringify(tokenData)}`);
    }
  } catch (err: any) {
    res.status(500).send(`Erro: ${err.message}`);
  }
});

app.post("/api/test", async (req: Request, res: Response) => {
  const { instance, user, password, oauth_token } = req.body;
  if (!instance) return res.status(400).json({ error: "Instância necessária" });
  const snUrl   = resolveSnUrl(instance);
  const headers: Record<string, string> = { Accept: "application/json" };
  if (oauth_token) {
    headers.Authorization = `Bearer ${oauth_token}`;
  } else if (user && password) {
    headers.Authorization = `Basic ${Buffer.from(`${user}:${password}`).toString("base64")}`;
  } else {
    return res.status(400).json({ error: "Auth necessária" });
  }
  try {
    const r = await fetch(`${snUrl}/api/now/table/sys_user?sysparm_limit=1`, { headers });
    res.json(r.ok ? { status: "connected" } : { status: "failed", code: r.status });
  } catch (err: any) {
    res.json({ status: "error", message: err.message });
  }
});

// ─────────────────────────────────────────────
//  New Endpoints — v2.0
// ─────────────────────────────────────────────

// Tools with module metadata
app.get("/api/tools", (_req: Request, res: Response) => {
  const tools = ALL_TOOLS.map(t => ({
    name:        t.name,
    description: t.description,
    module:      inferModule(t.name),
    required:    (t.inputSchema as any).required || [],
    properties:  Object.keys((t.inputSchema as any).properties || {}),
    schema:      t.inputSchema,
  }));
  res.json({ count: tools.length, tools });
});

// Full health check for a specific env prefix
app.get("/api/health/:prefix", async (req: Request, res: Response) => {
  const prefix    = (req.params.prefix as string).toUpperCase();
  const envPrefix = prefix === "DEFAULT" ? "" : `${prefix}_`;
  const allEnv    = parseEnvFile();

  const instance   = allEnv[`${envPrefix}SN_INSTANCE`]          || process.env[`${envPrefix}SN_INSTANCE`];
  const user       = allEnv[`${envPrefix}SN_USER`]               || process.env[`${envPrefix}SN_USER`]       || "admin";
  const password   = allEnv[`${envPrefix}SN_PASSWORD`]           || process.env[`${envPrefix}SN_PASSWORD`];
  const oauthToken = allEnv[`${envPrefix}SN_OAUTH_ACCESS_TOKEN`] || process.env[`${envPrefix}SN_OAUTH_ACCESS_TOKEN`];

  if (!instance) return res.json({ status: "unconfigured", prefix });

  const snUrl   = resolveSnUrl(instance);
  const headers: Record<string, string> = { Accept: "application/json" };
  if (oauthToken) {
    headers.Authorization = `Bearer ${oauthToken}`;
  } else if (user && password) {
    headers.Authorization = `Basic ${Buffer.from(`${user}:${password}`).toString("base64")}`;
  } else {
    return res.json({ status: "no_auth", prefix, instance: snUrl });
  }

  const start = Date.now();
  try {
    // Parallel: user info + version (saves ~200ms)
    const [userRes, verRes] = await Promise.all([
      fetch(`${snUrl}/api/now/table/sys_user?sysparm_query=user_name=${encodeURIComponent(user)}&sysparm_fields=name,user_name&sysparm_limit=1`, { headers }),
      fetch(`${snUrl}/api/now/table/sys_properties?sysparm_query=name=glide.war&sysparm_fields=value&sysparm_limit=1`, { headers }),
    ]);

    if (!userRes.ok) {
      return res.json({ status: "error", prefix, instance: snUrl, http: userRes.status, latency: Date.now() - start });
    }

    const userData = await userRes.json();
    let version = "unknown";
    try {
      const vd = await verRes.json();
      version  = vd.result?.[0]?.value || "unknown";
      // Shorten: glide-zurich-07-01-2025__patch7... → zurich
      const m = version.match(/glide-([a-z]+)/i);
      if (m) version = m[1];
    } catch {}

    res.json({
      status:  "connected",
      prefix,
      instance: snUrl,
      user:    userData.result?.[0]?.name || user,
      version,
      latency: Date.now() - start,
    });
  } catch (err: any) {
    res.json({ status: "error", prefix, instance: snUrl, message: err.message, latency: Date.now() - start });
  }
});

// Aggregate stats: cache + knowledge + server
app.get("/api/stats", async (_req: Request, res: Response) => {
  const [knowledge, cache] = await Promise.all([
    getKnowledgeStats(),
    Promise.resolve(cacheStats()),
  ]);
  res.json({
    server: {
      version:   "6.0.0",
      tools:     ALL_TOOLS.length,
      uptime_s:  Math.floor(process.uptime()),
      node:      process.version,
      activity_path: ACTIVITY_PATH,
    },
    cache,
    knowledge,
  });
});

// Knowledge base directory stats only
app.get("/api/knowledge", async (_req: Request, res: Response) => {
  res.json(await getKnowledgeStats());
});

// Last N activity entries (history for initial load)
app.get("/api/activity", async (req: Request, res: Response) => {
  const limit = Math.min(parseInt(req.query.limit as string || "100", 10), 500);
  res.json(await readActivity(limit));
});

// SSE — real-time activity stream
app.get("/api/activity/stream", (req: Request, res: Response) => {
  res.setHeader("Content-Type",  "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection",    "keep-alive");
  res.setHeader("X-Accel-Buffering", "no"); // disable Nginx buffering
  res.flushHeaders();

  // Initialise offset to current file size so we only push NEW events
  (async () => {
    try {
      const stat = await fs.stat(ACTIVITY_PATH);
      if (stat.size > _lastOffset) _lastOffset = stat.size;
    } catch {}
  })();

  sseClients.add(res);

  // Send initial connected event
  res.write(`data: ${JSON.stringify({ type: "connected", ts: new Date().toISOString() })}\n\n`);

  req.on("close", () => sseClients.delete(res));
});

// Governance: list recent update sets for the quick linter UI
app.get("/api/governance/update-sets", async (req: Request, res: Response) => {
  const prefix    = ((req.query.env as string) || "DEFAULT").toUpperCase();
  const envPrefix = prefix === "DEFAULT" ? "" : `${prefix}_`;
  const allEnv    = parseEnvFile();

  const instance   = allEnv[`${envPrefix}SN_INSTANCE`]          || process.env[`${envPrefix}SN_INSTANCE`];
  const user       = allEnv[`${envPrefix}SN_USER`]               || process.env[`${envPrefix}SN_USER`]       || "admin";
  const password   = allEnv[`${envPrefix}SN_PASSWORD`]           || process.env[`${envPrefix}SN_PASSWORD`];
  const oauthToken = allEnv[`${envPrefix}SN_OAUTH_ACCESS_TOKEN`] || process.env[`${envPrefix}SN_OAUTH_ACCESS_TOKEN`];

  if (!instance) return res.json([]);
  const snUrl = resolveSnUrl(instance);
  const headers: Record<string, string> = { Accept: "application/json" };
  if (oauthToken) headers.Authorization = `Bearer ${oauthToken}`;
  else if (user && password) headers.Authorization = `Basic ${Buffer.from(`${user}:${password}`).toString("base64")}`;
  else return res.json([]);

  try {
    const r = await fetch(
      `${snUrl}/api/now/table/sys_update_set?sysparm_query=nameISNOTEMPTY^ORDERBYDESCsys_updated_on&sysparm_fields=sys_id,name,state,sys_updated_on&sysparm_limit=30`,
      { headers }
    );
    const d: any = await r.json();
    res.json(d.result || []);
  } catch {
    res.json([]);
  }
});

// Governance: run linter on an update set via dashboard
app.post("/api/governance/lint", async (req: Request, res: Response) => {
  const { update_set_id, name: updateSetName, env: envPrefix = "DEFAULT", checks } = req.body;
  if (!update_set_id && !updateSetName) {
    return res.status(400).json({ error: "Informe update_set_id ou name" });
  }

  // Re-use the governance handler directly
  try {
    const { handleGovernanceTool } = await import("../tools/governance.js");
    const result = await handleGovernanceTool("sn_check_update_set", {
      update_set_id, name: updateSetName,
      env: envPrefix === "DEFAULT" ? null : envPrefix,
      checks,
    });
    res.json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

// ─────────────────────────────────────────────
//  Start
// ─────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\x1b[36m%s\x1b[0m`, `MCP Dashboard v2.0 → http://localhost:${PORT}`);
  console.log(`\x1b[2m%s\x1b[0m`, `Activity log: ${ACTIVITY_PATH}`);
});
