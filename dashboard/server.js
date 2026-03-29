import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
const envPath = path.resolve(__dirname, '../.env');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, './public')));

// ─────────────────────────────────────────────
//  Helpers
// ─────────────────────────────────────────────

function parseEnvFile() {
  if (!fs.existsSync(envPath)) return {};
  return fs.readFileSync(envPath, 'utf8').split('\n').reduce((acc, line) => {
    const idx = line.indexOf('=');
    if (idx !== -1) {
      const key = line.substring(0, idx).trim();
      const value = line.substring(idx + 1).trim();
      if (key && !key.startsWith('#')) acc[key] = value;
    }
    return acc;
  }, {});
}

async function saveEnvFile(data) {
  const content = Object.entries(data)
    .filter(([k, v]) => k && v)
    .map(([k, v]) => `${k}=${v}`)
    .join('\n');
  await fs.promises.writeFile(envPath, content, 'utf8');
  Object.assign(process.env, data);
}

function resolveSnUrl(instance) {
  return instance.startsWith('http') ? instance : `https://${instance}.service-now.com`;
}

// ─────────────────────────────────────────────
//  Endpoints da API
// ─────────────────────────────────────────────

// Ler o .env (apenas o arquivo — sem expor process.env)
app.get('/api/env', (_req, res) => {
  const env = parseEnvFile();
  res.json(env);
});

// Salvar no .env
app.post('/api/env', async (req, res) => {
  try {
    await saveEnvFile(req.body);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: `Falha ao salvar configurações: ${err.message}` });
  }
});

// OAuth 1: Redirecionar para ServiceNow
app.get('/api/auth/:prefix', (req, res) => {
  const prefix = req.params.prefix.toUpperCase();
  const envPrefix = prefix === 'DEFAULT' ? '' : `${prefix}_`;
  const allEnv = parseEnvFile();

  const instance = allEnv[`${envPrefix}SN_INSTANCE`] || process.env[`${envPrefix}SN_INSTANCE`];
  const clientId = allEnv[`${envPrefix}SN_CLIENT_ID`] || process.env[`${envPrefix}SN_CLIENT_ID`];

  if (!instance || !clientId) {
    return res.status(400).send(`Erro: ${envPrefix}SN_INSTANCE ou ${envPrefix}SN_CLIENT_ID não configurados.`);
  }

  const snUrl = resolveSnUrl(instance);
  const redirectUri = `http://localhost:${port}/api/callback`;
  const authUrl = `${snUrl}/oauth_auth.do?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${prefix}`;
  res.redirect(authUrl);
});

// OAuth 2: Callback para trocar code por token
app.get('/api/callback', async (req, res) => {
  const { code, state: prefix } = req.query;
  const envPrefix = prefix === 'DEFAULT' ? '' : `${prefix}_`;

  if (!code) return res.status(400).send('Erro: Code não recebido.');

  try {
    const allEnv = parseEnvFile();

    const instance = allEnv[`${envPrefix}SN_INSTANCE`] || process.env[`${envPrefix}SN_INSTANCE`];
    const clientId = allEnv[`${envPrefix}SN_CLIENT_ID`] || process.env[`${envPrefix}SN_CLIENT_ID`];
    const clientSecret = allEnv[`${envPrefix}SN_CLIENT_SECRET`] || process.env[`${envPrefix}SN_CLIENT_SECRET`];

    const snUrl = resolveSnUrl(instance);
    const redirectUri = `http://localhost:${port}/api/callback`;

    const tokenParams = new URLSearchParams({
      grant_type:    'authorization_code',
      client_id:     clientId,
      client_secret: clientSecret,
      redirect_uri:  redirectUri,
      code,
    });

    const tokenRes = await fetch(`${snUrl}/oauth_token.do`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: tokenParams.toString(),
    });

    const tokenData = await tokenRes.json();

    if (tokenData.access_token) {
      allEnv[`${envPrefix}SN_OAUTH_ACCESS_TOKEN`] = tokenData.access_token;
      if (tokenData.refresh_token) allEnv[`${envPrefix}SN_OAUTH_REFRESH_TOKEN`] = tokenData.refresh_token;
      await saveEnvFile(allEnv);
      res.send(`<h1>Autorização OK!</h1><p>O token para <b>${prefix}</b> foi salvo. Você pode fechar esta janela e voltar ao Dashboard.</p><script>setTimeout(() => window.close(), 3000);</script>`);
    } else {
      res.status(500).send(`Erro na troca de token: ${JSON.stringify(tokenData)}`);
    }
  } catch (err) {
    res.status(500).send(`Erro interno no callback: ${err.message}`);
  }
});

// Testar conexão com ServiceNow
app.post('/api/test', async (req, res) => {
  const { instance, user, password, oauth_token } = req.body;

  if (!instance) return res.status(400).json({ error: 'Instância necessária' });

  const snUrl = resolveSnUrl(instance);
  const headers = { 'Accept': 'application/json' };

  if (oauth_token) {
    headers['Authorization'] = `Bearer ${oauth_token}`;
  } else if (user && password) {
    headers['Authorization'] = `Basic ${Buffer.from(`${user}:${password}`).toString('base64')}`;
  } else {
    return res.status(400).json({ error: 'Auth necessária (OAuth ou User/Pass)' });
  }

  try {
    const response = await fetch(`${snUrl}/api/now/table/sys_user?sysparm_limit=1`, { headers });
    res.json(response.ok ? { status: 'connected' } : { status: 'failed', code: response.status });
  } catch (err) {
    res.json({ status: 'error', message: err.message });
  }
});

app.listen(port, () => {
  console.log(`\x1b[36m%s\x1b[0m`, `MCP Dashboard rodando em http://localhost:${port}`);
});
