// ─────────────────────────────────────────────
//  ServiceNow HTTP Client (Multi-Instance)
// ─────────────────────────────────────────────
import { cacheGet, cacheSet, cacheInvalidate } from "./cache.js";
import { checkRateLimit } from "./ratelimit.js";

export const getContext = (env) => {
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

  const headers = {
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

export function getEnvUser(env) {
  return getContext(env).user;
}

export async function snGet(path, params = {}, env = null) {
  checkRateLimit(env);
  const ctx = getContext(env);
  const url = new URL(`${ctx.instance}${path}`);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));

  const cacheKey = `${env || "default"}:${url.toString()}`;
  const cached = cacheGet(cacheKey);
  if (cached !== undefined) return cached;

  const res = await fetch(url.toString(), { headers: ctx.headers });
  if (!res.ok) throw new Error(`GET ${path} → ${res.status}: ${await res.text()}`);
  const data = await res.json();
  cacheSet(cacheKey, data);
  return data;
}

export async function snPost(path, body, env = null) {
  checkRateLimit(env);
  const ctx = getContext(env);
  const res = await fetch(`${ctx.instance}${path}`, {
    method: "POST",
    headers: ctx.headers,
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`POST ${path} → ${res.status}: ${await res.text()}`);
  cacheInvalidate(path);
  return res.json();
}

export async function snPatch(path, body, env = null) {
  checkRateLimit(env);
  const ctx = getContext(env);
  const res = await fetch(`${ctx.instance}${path}`, {
    method: "PATCH",
    headers: ctx.headers,
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`PATCH ${path} → ${res.status}: ${await res.text()}`);
  cacheInvalidate(path);
  return res.json();
}

export async function snDelete(path, env = null) {
  checkRateLimit(env);
  const ctx = getContext(env);
  const res = await fetch(`${ctx.instance}${path}`, {
    method: "DELETE",
    headers: ctx.headers,
  });
  if (!res.ok) throw new Error(`DELETE ${path} → ${res.status}: ${await res.text()}`);
  cacheInvalidate(path);
  return { deleted: true };
}

// ─────────────────────────────────────────────
//  Binary helpers — Attachment API
// ─────────────────────────────────────────────

/**
 * Upload de arquivo binário (Base64 → Buffer) para a Attachment API do ServiceNow.
 * Content-Type é definido pelo caller (ex: image/png, text/plain).
 */
export async function snPostBinary(path, bufferContent, contentType, env = null) {
  const ctx = getContext(env);
  // Remove o header application/json para o upload binário
  const binaryHeaders = {
    "Accept":        "application/json",
    "Authorization": ctx.headers["Authorization"],
    "Content-Type":  contentType,
  };
  const res = await fetch(`${ctx.instance}${path}`, {
    method:  "POST",
    headers: binaryHeaders,
    body:    bufferContent,
  });
  if (!res.ok) throw new Error(`POST_BINARY ${path} → ${res.status}: ${await res.text()}`);
  return res.json();
}

/**
 * Download de arquivo binário da Attachment API do ServiceNow.
 * Retorna o conteúdo como string Base64.
 */
export async function snGetBinary(path, env = null) {
  const ctx = getContext(env);
  const res = await fetch(`${ctx.instance}${path}`, { headers: ctx.headers });
  if (!res.ok) throw new Error(`GET_BINARY ${path} → ${res.status}: ${await res.text()}`);
  const arrayBuffer = await res.arrayBuffer();
  return Buffer.from(arrayBuffer).toString("base64");
}
