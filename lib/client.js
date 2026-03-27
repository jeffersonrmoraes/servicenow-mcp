// ─────────────────────────────────────────────
//  ServiceNow HTTP Client
// ─────────────────────────────────────────────

const SN_INSTANCE = process.env.SN_INSTANCE || "https://your-instance.service-now.com";
const SN_USER     = process.env.SN_USER     || "your-user";
const SN_PASSWORD = process.env.SN_PASSWORD || "your-password";

export { SN_USER };

const AUTH = "Basic " + Buffer.from(`${SN_USER}:${SN_PASSWORD}`).toString("base64");
const HEADERS = {
  "Content-Type": "application/json",
  "Accept":       "application/json",
  "Authorization": AUTH,
};

export async function snGet(path, params = {}) {
  const url = new URL(`${SN_INSTANCE}${path}`);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const res = await fetch(url.toString(), { headers: HEADERS });
  if (!res.ok) throw new Error(`GET ${path} → ${res.status}: ${await res.text()}`);
  return res.json();
}

export async function snPost(path, body) {
  const res = await fetch(`${SN_INSTANCE}${path}`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`POST ${path} → ${res.status}: ${await res.text()}`);
  return res.json();
}

export async function snPatch(path, body) {
  const res = await fetch(`${SN_INSTANCE}${path}`, {
    method: "PATCH",
    headers: HEADERS,
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`PATCH ${path} → ${res.status}: ${await res.text()}`);
  return res.json();
}

export async function snDelete(path) {
  const res = await fetch(`${SN_INSTANCE}${path}`, {
    method: "DELETE",
    headers: HEADERS,
  });
  if (!res.ok) throw new Error(`DELETE ${path} → ${res.status}: ${await res.text()}`);
  return { deleted: true };
}
