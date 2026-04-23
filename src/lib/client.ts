import { cacheGet, cacheSet, cacheInvalidate } from "./cache.js";
import { checkRateLimit } from "./ratelimit.js";
import { logger } from "./logger.js";
import { ServiceNowContext, ServiceNowEnv } from "../types.js";

// ─────────────────────────────────────────────
//  Config
// ─────────────────────────────────────────────

const REQUEST_TIMEOUT_MS = parseInt(process.env.SN_REQUEST_TIMEOUT_MS || "30000", 10);
const MAX_RETRIES = parseInt(process.env.SN_MAX_RETRIES || "3", 10);
const RETRYABLE_STATUS = new Set([429, 500, 502, 503, 504]);

// ─────────────────────────────────────────────
//  Context Resolution
// ─────────────────────────────────────────────

export const getContext = (env: ServiceNowEnv): ServiceNowContext => {
  const prefix = env ? `${env.toUpperCase()}_` : "";
  let instance = process.env[`${prefix}SN_INSTANCE`] || process.env.SN_INSTANCE;
  const user       = process.env[`${prefix}SN_USER`]     || process.env.SN_USER;
  const pass       = process.env[`${prefix}SN_PASSWORD`] || process.env.SN_PASSWORD;
  const oauthToken = process.env[`${prefix}SN_OAUTH_ACCESS_TOKEN`] || process.env.SN_OAUTH_ACCESS_TOKEN;

  if (!instance) {
    throw new Error(`Instância (SN_INSTANCE) não configurada para o ambiente '${env || "default"}'`);
  }

  if (!oauthToken && (!user || !pass)) {
    throw new Error(`Autenticação incompleta para '${env || "default"}'. Configure USER/PASS ou OAUTH_ACCESS_TOKEN.`);
  }

  if (!instance.startsWith("http")) {
    instance = `https://${instance}.service-now.com`;
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "Accept":       "application/json",
  };

  if (oauthToken) {
    headers["Authorization"] = `Bearer ${oauthToken}`;
  } else {
    headers["Authorization"] = "Basic " + Buffer.from(`${user}:${pass}`).toString("base64");
  }

  return { instance, user: user || "OAuth_User", headers };
};

export function getEnvUser(env: ServiceNowEnv): string {
  return getContext(env).user;
}

// ─────────────────────────────────────────────
//  Fetch com timeout
// ─────────────────────────────────────────────

async function fetchWithTimeout(url: string, options: RequestInit): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } catch (err: any) {
    if (err.name === "AbortError") {
      throw new Error(`Timeout após ${REQUEST_TIMEOUT_MS / 1000}s — a instância ServiceNow não respondeu.`);
    }
    throw err;
  } finally {
    clearTimeout(timer);
  }
}

// ─────────────────────────────────────────────
//  Retry com Exponential Backoff (v5.0)
// ─────────────────────────────────────────────

async function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchWithRetry(
  url: string,
  options: RequestInit,
  method: string,
  path: string,
): Promise<Response> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const res = await fetchWithTimeout(url, options);

      // Se retryable e ainda temos tentativas, aguarda e retenta
      if (RETRYABLE_STATUS.has(res.status) && attempt < MAX_RETRIES) {
        const backoffMs = Math.pow(2, attempt) * 1000 + Math.random() * 500;
        logger.warn("Retrying request", {
          method,
          path,
          status: res.status,
          attempt: attempt + 1,
          maxRetries: MAX_RETRIES,
          backoff_ms: Math.round(backoffMs),
        });
        await sleep(backoffMs);
        continue;
      }

      return res;
    } catch (err: any) {
      lastError = err;

      // Retry em timeout/network errors
      if (attempt < MAX_RETRIES && (err.name === "AbortError" || err.code === "ECONNRESET" || err.code === "ENOTFOUND")) {
        const backoffMs = Math.pow(2, attempt) * 1000 + Math.random() * 500;
        logger.warn("Retrying after error", {
          method,
          path,
          error: err.message,
          attempt: attempt + 1,
          backoff_ms: Math.round(backoffMs),
        });
        await sleep(backoffMs);
        continue;
      }

      throw err;
    }
  }

  throw lastError || new Error(`Max retries (${MAX_RETRIES}) exceeded for ${method} ${path}`);
}

// ─────────────────────────────────────────────
//  Parsing estruturado de erros HTTP
// ─────────────────────────────────────────────

async function parseHttpError(res: Response, method: string, path: string): Promise<Error> {
  let body = "";
  try { body = await res.text(); } catch {}

  let detail = body;
  try {
    const json = JSON.parse(body);
    if (json?.error?.message) detail = json.error.message;
    else if (json?.error?.detail) detail = `${json.error.message || ""} — ${json.error.detail}`.trim();
  } catch {}

  const msg = `${method} ${path} → HTTP ${res.status}: ${detail || "(sem corpo)"}`;
  logger.error("HTTP error", { method, path, status: res.status, detail });
  return new Error(msg);
}

// ─────────────────────────────────────────────
//  OAuth Refresh Token (v5.0 — memory-only)
// ─────────────────────────────────────────────

const _refreshLock = new Map<string, boolean>();

async function tryRefreshOAuth(env: ServiceNowEnv): Promise<boolean> {
  const prefix = env ? `${env.toUpperCase()}_` : "";
  const key    = prefix || "default";

  if (_refreshLock.get(key)) return false; // já está tentando
  _refreshLock.set(key, true);

  try {
    const refreshToken  = process.env[`${prefix}SN_OAUTH_REFRESH_TOKEN`]  || process.env.SN_OAUTH_REFRESH_TOKEN;
    const clientId      = process.env[`${prefix}SN_CLIENT_ID`]            || process.env.SN_CLIENT_ID;
    const clientSecret  = process.env[`${prefix}SN_CLIENT_SECRET`]        || process.env.SN_CLIENT_SECRET;
    let   instance      = process.env[`${prefix}SN_INSTANCE`]             || process.env.SN_INSTANCE;

    if (!refreshToken || !clientId || !clientSecret || !instance) {
      logger.warn("Refresh token não disponível — variáveis SN_OAUTH_REFRESH_TOKEN, SN_CLIENT_ID ou SN_CLIENT_SECRET ausentes.", { env: key });
      return false;
    }

    if (!instance.startsWith("http")) instance = `https://${instance}.service-now.com`;

    const params = new URLSearchParams({
      grant_type:    "refresh_token",
      client_id:     clientId,
      client_secret: clientSecret,
      refresh_token: refreshToken,
    });

    logger.info("Tentando refresh do OAuth access token...", { env: key });

    const res = await fetchWithTimeout(`${instance}/oauth_token.do`, {
      method:  "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body:    params.toString(),
    });

    if (!res.ok) {
      logger.error("Falha no refresh token", { env: key, status: res.status });
      return false;
    }

    const data: any = await res.json();
    if (!data.access_token) {
      logger.error("Refresh token não retornou access_token", { env: key });
      return false;
    }

    // v5.0: Tokens ficam APENAS em memória — não persiste no .env
    const accessKey  = prefix ? `${prefix}SN_OAUTH_ACCESS_TOKEN`  : "SN_OAUTH_ACCESS_TOKEN";
    const refreshKey = prefix ? `${prefix}SN_OAUTH_REFRESH_TOKEN` : "SN_OAUTH_REFRESH_TOKEN";
    process.env[accessKey] = data.access_token;
    if (data.refresh_token) process.env[refreshKey] = data.refresh_token;

    logger.info("OAuth access token renovado com sucesso (memory-only).", { env: key });
    return true;
  } finally {
    _refreshLock.set(key, false);
  }
}

// ─────────────────────────────────────────────
//  Cache helpers
// ─────────────────────────────────────────────

function invalidateRelatedCaches(path: string) {
  cacheInvalidate(path);
  const parts = path.split("/");
  if (parts.length > 5) {
    cacheInvalidate(parts.slice(0, -1).join("/"));
  }
}

// ─────────────────────────────────────────────
//  HTTP Methods (v5.0 — with retry)
// ─────────────────────────────────────────────

export async function snGet(
  path: string,
  params: Record<string, string | number | undefined> = {},
  env: ServiceNowEnv = null,
): Promise<any> {
  await checkRateLimit(env, "GET");
  const ctx = getContext(env);
  const url = new URL(`${ctx.instance}${path}`);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined) url.searchParams.set(k, String(v));
  });

  const cacheKey = `${env || "default"}:${url.toString()}`;
  const cached = cacheGet(cacheKey);
  if (cached !== undefined) {
    logger.debug("Cache hit", { path, env: env || "default" });
    return cached;
  }

  const start = Date.now();
  let res = await fetchWithRetry(url.toString(), { headers: ctx.headers }, "GET", path);

  // 401 → tenta refresh uma vez
  if (res.status === 401) {
    const refreshed = await tryRefreshOAuth(env);
    if (refreshed) {
      const newCtx = getContext(env);
      res = await fetchWithRetry(url.toString(), { headers: newCtx.headers }, "GET", path);
    }
  }

  if (!res.ok) throw await parseHttpError(res, "GET", path);

  const data = await res.json();
  cacheSet(cacheKey, data);
  logger.debug("GET ok", { path, ms: Date.now() - start });
  return data;
}

export async function snPost(path: string, body: any, env: ServiceNowEnv = null): Promise<any> {
  await checkRateLimit(env, "POST");
  const ctx = getContext(env);

  const start = Date.now();
  let res = await fetchWithRetry(`${ctx.instance}${path}`, {
    method:  "POST",
    headers: ctx.headers,
    body:    JSON.stringify(body),
  }, "POST", path);

  if (res.status === 401) {
    const refreshed = await tryRefreshOAuth(env);
    if (refreshed) {
      const newCtx = getContext(env);
      res = await fetchWithRetry(`${newCtx.instance}${path}`, {
        method:  "POST",
        headers: newCtx.headers,
        body:    JSON.stringify(body),
      }, "POST", path);
    }
  }

  if (!res.ok) throw await parseHttpError(res, "POST", path);
  invalidateRelatedCaches(path);
  logger.debug("POST ok", { path, ms: Date.now() - start });
  return res.json();
}

export async function snPatch(path: string, body: any, env: ServiceNowEnv = null): Promise<any> {
  await checkRateLimit(env, "PATCH");
  const ctx = getContext(env);

  const start = Date.now();
  let res = await fetchWithRetry(`${ctx.instance}${path}`, {
    method:  "PATCH",
    headers: ctx.headers,
    body:    JSON.stringify(body),
  }, "PATCH", path);

  if (res.status === 401) {
    const refreshed = await tryRefreshOAuth(env);
    if (refreshed) {
      const newCtx = getContext(env);
      res = await fetchWithRetry(`${newCtx.instance}${path}`, {
        method:  "PATCH",
        headers: newCtx.headers,
        body:    JSON.stringify(body),
      }, "PATCH", path);
    }
  }

  if (!res.ok) throw await parseHttpError(res, "PATCH", path);
  invalidateRelatedCaches(path);
  logger.debug("PATCH ok", { path, ms: Date.now() - start });
  return res.json();
}

export async function snDelete(path: string, env: ServiceNowEnv = null): Promise<void> {
  await checkRateLimit(env, "DELETE");
  const ctx = getContext(env);
  const res = await fetchWithRetry(`${ctx.instance}${path}`, {
    method:  "DELETE",
    headers: ctx.headers,
  }, "DELETE", path);
  if (!res.ok) throw await parseHttpError(res, "DELETE", path);
  invalidateRelatedCaches(path);
}

export async function snPostBinary(
  path: string,
  bufferContent: Buffer,
  contentType: string,
  env: ServiceNowEnv = null,
): Promise<any> {
  await checkRateLimit(env, "POST");
  const ctx = getContext(env);
  const binaryHeaders: Record<string, string> = {
    "Accept":        "application/json",
    "Authorization": ctx.headers["Authorization"],
    "Content-Type":  contentType,
  };
  const res = await fetchWithRetry(`${ctx.instance}${path}`, {
    method:  "POST",
    headers: binaryHeaders,
    body:    bufferContent as any,
  }, "POST_BINARY", path);
  if (!res.ok) throw await parseHttpError(res, "POST_BINARY", path);
  return res.json();
}

export async function snGetBinary(path: string, env: ServiceNowEnv = null): Promise<string> {
  await checkRateLimit(env, "GET");
  const ctx = getContext(env);
  const res = await fetchWithRetry(`${ctx.instance}${path}`, { headers: ctx.headers }, "GET_BINARY", path);
  if (!res.ok) throw await parseHttpError(res, "GET_BINARY", path);
  const arrayBuffer = await res.arrayBuffer();
  return Buffer.from(arrayBuffer).toString("base64");
}
