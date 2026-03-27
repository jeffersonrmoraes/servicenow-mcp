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

// Ler o .env e parsear
app.get('/api/env', (req, res) => {
  if (!fs.existsSync(envPath)) return res.json({});
  const content = fs.readFileSync(envPath, 'utf8');
  const lines = content.split('\n');
  const env = {};
  lines.forEach(line => {
    const [key, value] = line.split('=');
    if (key && value) env[key.trim()] = value.trim();
  });
  res.json(env);
});

// Salvar no .env
app.post('/api/env', (req, res) => {
  const data = req.body;
  const content = Object.entries(data)
    .map(([key, value]) => `${key}=${value}`)
    .join('\n');
  fs.writeFileSync(envPath, content, 'utf8');
  res.json({ success: true });
});

// Testar conexão com ServiceNow
app.post('/api/test', async (req, res) => {
  const { instance, user, password } = req.body;
  const auth = Buffer.from(`${user}:${password}`).toString('base64');
  
  try {
    const response = await fetch(`https://${instance}.service-now.com/api/now/table/sys_user?sysparm_limit=1`, {
      headers: {
        'Authorization': `Basic ${auth}`,
        'Accept': 'application/json'
      }
    });
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
