import express, { Request, Response } from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import { scriptTools }       from '../tools/scripts.js';
import { catalogTools }      from '../tools/catalog.js';
import { flowTools }         from '../tools/flow.js';
import { securityTools }     from '../tools/security.js';
import { deployTools }       from '../tools/deploy.js';
import { attachmentTools }   from '../tools/attachments.js';
import { propertyTools }     from '../tools/properties.js';
import { frontendTools }     from '../tools/frontend.js';
import { bundleTools }       from '../tools/bundle.js';
import { knowledgeTools }    from '../tools/knowledge.js';
import { relationshipTools } from '../tools/relationships.js';

const ALL_TOOLS = [
  ...scriptTools, ...catalogTools, ...flowTools, ...securityTools,
  ...deployTools, ...attachmentTools, ...propertyTools, ...frontendTools,
  ...bundleTools, ...knowledgeTools, ...relationshipTools,
];

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
const envPath = path.resolve(__dirname, '../../.env');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, './public')));

// ─────────────────────────────────────────────
//  Helpers
// ─────────────────────────────────────────────

function parseEnvFile(): Record<string, string> {
  if (!fs.existsSync(envPath)) return {};
  return fs.readFileSync(envPath, 'utf8').split('\n').reduce((acc: Record<string, string>, line: string) => {
    const idx = line.indexOf('=');
    if (idx !== -1) {
      const key = line.substring(0, idx).trim();
      const value = line.substring(idx + 1).trim();
      if (key && !key.startsWith('#')) acc[key] = value;
    }
    return acc;
  }, {});
}

async function saveEnvFile(data: Record<string, string>) {
  const content = Object.entries(data)
    .filter(([k, v]) => k && v)
    .map(([k, v]) => `${k}=${v}`)
    .join('\n');
  await fs.promises.writeFile(envPath, content, 'utf8');
  // Ativa as novas variáveis no processo atual
  Object.assign(process.env, data);
}

function resolveSnUrl(instance: string): string {
  return instance.startsWith('http') ? instance : `https://${instance}.service-now.com`;
}

// ─────────────────────────────────────────────
//  Endpoints da API
// ─────────────────────────────────────────────

// Ler o .env
app.get('/api/env', (_req: Request, res: Response) => {
  const env = parseEnvFile();
  res.json(env);
});

// Salvar no .env
app.post('/api/env', async (req: Request, res: Response) => {
  try {
    await saveEnvFile(req.body);
    res.json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: `Falha ao salvar configurações: ${err.message}` });
  }
});

// OAuth 1: Redirecionar para ServiceNow
app.get('/api/auth/:prefix', (req: Request, res: Response) => {
  const prefix = (req.params.prefix as string).toUpperCase();
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
app.get('/api/callback', async (req: Request, res: Response) => {
  const code = req.query.code as string;
  const prefix = req.query.state as string;
  const envPrefix = prefix === 'DEFAULT' ? '' : `${prefix}_`;

  if (!code) return res.status(400).send('Erro: Code não recebido.');

  try {
    const allEnv = parseEnvFile();

    const instance = allEnv[`${envPrefix}SN_INSTANCE`] || (process.env[`${envPrefix}SN_INSTANCE`] as string);
    const clientId = allEnv[`${envPrefix}SN_CLIENT_ID`] || (process.env[`${envPrefix}SN_CLIENT_ID`] as string);
    const clientSecret = allEnv[`${envPrefix}SN_CLIENT_SECRET`] || (process.env[`${envPrefix}SN_CLIENT_SECRET`] as string);

    if (!instance) return res.status(400).send(`Erro: SN_INSTANCE não encontrada para ${prefix}`);

    const snUrl = resolveSnUrl(instance);
    const redirectUri = `http://localhost:${port}/api/callback`;

    const tokenParams = new URLSearchParams({
      grant_type:    'authorization_code',
      client_id:     clientId!,
      client_secret: clientSecret!,
      redirect_uri:  redirectUri,
      code,
    });

    const tokenRes = await fetch(`${snUrl}/oauth_token.do`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: tokenParams.toString(),
    });

    const tokenData: any = await tokenRes.json();

    if (tokenData.access_token) {
      allEnv[`${envPrefix}SN_OAUTH_ACCESS_TOKEN`] = tokenData.access_token;
      if (tokenData.refresh_token) allEnv[`${envPrefix}SN_OAUTH_REFRESH_TOKEN`] = tokenData.refresh_token;
      await saveEnvFile(allEnv);
      res.send(`<h1>Autorização OK!</h1><p>O token para <b>${prefix}</b> foi salvo. Você pode fechar esta janela e voltar ao Dashboard.</p><script>setTimeout(() => window.close(), 3000);</script>`);
    } else {
      res.status(500).send(`Erro na troca de token: ${JSON.stringify(tokenData)}`);
    }
  } catch (err: any) {
    res.status(500).send(`Erro interno no callback: ${err.message}`);
  }
});

// Listar todas as ferramentas registradas
app.get('/api/tools', (_req: Request, res: Response) => {
  const tools = ALL_TOOLS.map(t => ({
    name:        t.name,
    description: t.description,
    required:    (t.inputSchema as any).required || [],
    properties:  Object.keys((t.inputSchema as any).properties || {}),
  }));
  res.json({ count: tools.length, tools });
});

// Testar conexão com ServiceNow
app.post('/api/test', async (req: Request, res: Response) => {
  const { instance, user, password, oauth_token } = req.body;

  if (!instance) return res.status(400).json({ error: 'Instância necessária' });

  const snUrl = resolveSnUrl(instance);
  const headers: Record<string, string> = { 'Accept': 'application/json' };

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
  } catch (err: any) {
    res.json({ status: 'error', message: err.message });
  }
});

app.listen(port, () => {
  console.log(`\x1b[36m%s\x1b[0m`, `MCP Dashboard rodando em http://localhost:${port}`);
});
