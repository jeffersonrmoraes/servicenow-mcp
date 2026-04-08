import { cacheGet, cacheSet, cacheInvalidate } from "./cache.js";
import { checkRateLimit } from "./ratelimit.js";
import { ServiceNowContext, ServiceNowEnv } from "../types.js";

export const getContext = (env: ServiceNowEnv): ServiceNowContext => {
  const prefix = env ? `${env.toUpperCase()}_` : "";
  let instance = process.env[`${prefix}SN_INSTANCE`] || process.env.SN_INSTANCE;
  const user      = process.env[`${prefix}SN_USER`]     || process.env.SN_USER;
  const pass      = process.env[`${prefix}SN_PASSWORD`] || process.env.SN_PASSWORD;
  const oauthToken = process.env[`${prefix}SN_OAUTH_ACCESS_TOKEN`] || process.env.SN_OAUTH_ACCESS_TOKEN;

  if (!instance) {
    throw new Error(`Instância (SN_INSTANCE) não configurada para o ambiente '${env || "default"}'`);
  }

  // Se não tem OAuth Token, precisa de User/Pass
  if (!oauthToken && (!user || !pass)) {
    throw new Error(`Autenticação incompleta para '${env || "default"}'. Configure USER/PASS ou OAUTH_ACCESS_TOKEN.`);
  }

  // Inteligência de URL (v3.4.2)
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
    const auth = "Basic " + Buffer.from(`${user}:${pass}`).toString("base64");
    headers["Authorization"] = auth;
  }

  return { instance, user: user || "OAuth_User", headers };
};

export function getEnvUser(env: ServiceNowEnv): string {
  return getContext(env).user;
}

/**
 * Invalida o cache do registro específico E da listagem da tabela pai.
 */
function invalidateRelatedCaches(path: string) {
  cacheInvalidate(path);
  const parts = path.split("/");
  if (parts.length > 5) {
    const tablePath = parts.slice(0, -1).join("/");
    cacheInvalidate(tablePath);
  }
}

export async function snGet(path: string, params: Record<string, string | number | undefined> = {}, env: ServiceNowEnv = null) {
  await checkRateLimit(env);
  const ctx = getContext(env);
  const url = new URL(`${ctx.instance}${path}`);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined) url.searchParams.set(k, String(v));
  });

  const cacheKey = `${env || "default"}:${url.toString()}`;
  const cached = cacheGet(cacheKey);
  if (cached !== undefined) return cached;

  const res = await fetch(url.toString(), { headers: ctx.headers });
  if (!res.ok) throw new Error(`GET ${path} → ${res.status}: ${await res.text()}`);
  const data = await res.json();
  cacheSet(cacheKey, data);
  return data;
}

export async function snPost(path: string, body: any, env: ServiceNowEnv = null) {
  await checkRateLimit(env);
  const ctx = getContext(env);
  const res = await fetch(`${ctx.instance}${path}`, {
    method: "POST",
    headers: ctx.headers,
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`POST ${path} → ${res.status}: ${await res.text()}`);
  invalidateRelatedCaches(path);
  return res.json();
}

export async function snPatch(path: string, body: any, env: ServiceNowEnv = null) {
  await checkRateLimit(env);
  const ctx = getContext(env);
  const res = await fetch(`${ctx.instance}${path}`, {
    method: "PATCH",
    headers: ctx.headers,
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`PATCH ${path} → ${res.status}: ${await res.text()}`);
  invalidateRelatedCaches(path);
  return res.json();
}

export async function snDelete(path: string, env: ServiceNowEnv = null) {
  await checkRateLimit(env);
  const ctx = getContext(env);
  const res = await fetch(`${ctx.instance}${path}`, {
    method: "DELETE",
    headers: ctx.headers,
  });
  if (!res.ok) throw new Error(`DELETE ${path} → ${res.status}: ${await res.text()}`);
  invalidateRelatedCaches(path);
  return { deleted: true };
}

/**
 * Upload de arquivo binário (Base64 → Buffer) para a Attachment API do ServiceNow.
 */
export async function snPostBinary(path: string, bufferContent: Buffer, contentType: string, env: ServiceNowEnv = null) {
  const ctx = getContext(env);
  const binaryHeaders: Record<string, string> = {
    "Accept":        "application/json",
    "Authorization": ctx.headers["Authorization"],
    "Content-Type":  contentType,
  };
  const res = await fetch(`${ctx.instance}${path}`, {
    method:  "POST",
    headers: binaryHeaders,
    body:    bufferContent as any,
  });
  if (!res.ok) throw new Error(`POST_BINARY ${path} → ${res.status}: ${await res.text()}`);
  return res.json();
}

/**
 * Download de arquivo binário da Attachment API do ServiceNow.
 */
export async function snGetBinary(path: string, env: ServiceNowEnv = null) {
  const ctx = getContext(env);
  const res = await fetch(`${ctx.instance}${path}`, { headers: ctx.headers });
  if (!res.ok) throw new Error(`GET_BINARY ${path} → ${res.status}: ${await res.text()}`);
  const arrayBuffer = await res.arrayBuffer();
  return Buffer.from(arrayBuffer).toString("base64");
}
