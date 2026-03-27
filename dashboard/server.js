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
//  Endpoins da API
// ─────────────────────────────────────────────

// Ler o .env e parsear (com fallback para process.env)
app.get('/api/env', (req, res) => {
  const env = {};
  
  // 1. Carregar do arquivo .env (se existir)
  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf8');
    content.split('\n').forEach(line => {
      const idx = line.indexOf('=');
      if (idx !== -1) {
        const key = line.substring(0, idx).trim();
        const value = line.substring(idx + 1).trim();
        if (key && value) env[key] = value;
      }
    });
  }

  // 2. Mesclar com variáveis que contenham SN_INSTANCE (Fallback do Sistema)
  Object.entries(process.env).forEach(([key, value]) => {
    if (key.includes('SN_INSTANCE') || key.includes('SN_USER') || key.includes('SN_PASSWORD') || key.includes('SN_OAUTH')) {
      if (!env[key]) env[key] = value;
    }
  });

  res.json(env);
});

// Salvar no .env
app.post('/api/env', (req, res) => {
  const data = req.body;
  const content = Object.entries(data)
    .filter(([k,v]) => k && v) // Remove vazios
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');
  fs.writeFileSync(envPath, content, 'utf8');
  // Atualizar cache de processo se necessário
  Object.assign(process.env, data);
  res.json({ success: true });
});

// OAuth 1: Redirecionar para ServiceNow
app.get('/api/auth/:prefix', (req, res) => {
  const prefix = req.params.prefix.toUpperCase();
  const envPrefix = prefix === 'DEFAULT' ? '' : `${prefix}_`;
  
  // Buscar Client ID do .env (ou process.env)
  const allEnv = JSON.parse(fs.readFileSync(envPath, 'utf8').split('\n').reduce((acc, line) => {
    const idx = line.indexOf('=');
    if (idx !== -1) acc[line.substring(0, idx).trim()] = line.substring(idx + 1).trim();
    return acc;
  }, '{}'));

  const instance = allEnv[`${envPrefix}SN_INSTANCE`] || process.env[`${envPrefix}SN_INSTANCE`];
  const clientId = allEnv[`${envPrefix}SN_CLIENT_ID`] || process.env[`${envPrefix}SN_CLIENT_ID`];

  if (!instance || !clientId) {
    return res.status(400).send(`Erro: ${envPrefix}SN_INSTANCE ou ${envPrefix}SN_CLIENT_ID não configurados.`);
  }

  const snUrl = instance.startsWith('http') ? instance : `https://${instance}.service-now.com`;
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
    const allEnv = JSON.parse(fs.readFileSync(envPath, 'utf8').split('\n').reduce((acc, line) => {
      const idx = line.indexOf('=');
      if (idx !== -1) acc[line.substring(0, idx).trim()] = line.substring(idx + 1).trim();
      return acc;
    }, '{}'));

    const instance = allEnv[`${envPrefix}SN_INSTANCE`] || process.env[`${envPrefix}SN_INSTANCE`];
    const clientId = allEnv[`${envPrefix}SN_CLIENT_ID`] || process.env[`${envPrefix}SN_CLIENT_ID`];
    const clientSecret = allEnv[`${envPrefix}SN_CLIENT_SECRET`] || process.env[`${envPrefix}SN_CLIENT_SECRET`];

    const snUrl = instance.startsWith('http') ? instance : `https://${instance}.service-now.com`;
    const redirectUri = `http://localhost:${port}/api/callback`;

    const tokenParams = new URLSearchParams();
    tokenParams.append('grant_type', 'authorization_code');
    tokenParams.append('client_id', clientId);
    tokenParams.append('client_secret', clientSecret);
    tokenParams.append('redirect_uri', redirectUri);
    tokenParams.append('code', code);

    const tokenRes = await fetch(`${snUrl}/oauth_token.do`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: tokenParams
    });

    const tokenData = await tokenRes.json();

    if (tokenData.access_token) {
        // Salvar no .env via persistência do app
        allEnv[`${envPrefix}SN_OAUTH_ACCESS_TOKEN`] = tokenData.access_token;
        if (tokenData.refresh_token) allEnv[`${envPrefix}SN_OAUTH_REFRESH_TOKEN`] = tokenData.refresh_token;
        
        const content = Object.entries(allEnv)
            .map(([key, value]) => `${key}=${value}`)
            .join('\n');
        fs.writeFileSync(envPath, content, 'utf8');
        Object.assign(process.env, allEnv);

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
  
  if (!instance) return res.status(400).json({ error: 'Faltam credenciais (instância necessária)' });

  const snUrl = instance.startsWith('http') ? instance : `https://${instance}.service-now.com`;
  
  const headers = { 'Accept': 'application/json' };
  if (oauth_token) {
    headers['Authorization'] = `Bearer ${oauth_token}`;
  } else if (user && password) {
    headers['Authorization'] = `Basic ${Buffer.from(`${user}:${password}`).toString('base64')}`;
  } else {
    return res.status(400).json({ error: 'Faltam credenciais (Auth necessária)' });
  }
  
  try {
    const response = await fetch(`${snUrl}/api/now/table/sys_user?sysparm_limit=1`, { headers });
    
    if (response.ok) {
      res.json({ status: 'connected' });
    } else {
      res.json({ status: 'failed', code: response.status });
    }
  } catch (err) {
    res.json({ status: 'error', message: err.message });
  }
});

app.listen(port, () => {
  console.log(`\x1b[36m%s\x1b[0m`, `🚀 MCP Dashboard rodando em http://localhost:${port}`);
});
