# GEMINI.md — Contexto do Projeto para IA (v3.8.1)

Este arquivo fornece contexto estruturado sobre o repositório **ServiceNow MCP Server** para qualquer agente de IA que trabalhe nesta base de código. Leia este arquivo antes de qualquer intervenção.

---

## 📌 Visão Geral

- **Projeto**: ServiceNow MCP Server
- **Versão Atual**: `3.8.1` (Security Hardening Edition)
- **Descrição**: Servidor MCP que expõe ferramentas consolidadas e um Dashboard Web (Dark Tech) com suporte a Auto-URL, Privacy Masking, Instance Manager GUI e OAuth 2.0.
- **Estrutura Core**: MCP SDK (Stdio) + Express (Dashboard API).
- **Repositório**: https://github.com/jeffersonrmoraes/servicenow-mcp

---

## 🗂️ Estrutura de Arquivos (v3.8.1)

```
servicenow-mcp/
├── index.js               ← Orquestrador MCP Principal + validateEnv() no startup
├── dashboard/
│   ├── server.js          ← API do Dashboard + OAuth Callback (saveEnvFile async)
│   └── public/            ← Frontend (SPA Vanilla + Hybrid Auth UI)
│       ├── index.html
│       ├── style.css
│       └── app.js
├── knowledge/             ← [v3.8] Cérebro da Instância (KIs persistentes)
│   ├── core/              ← Tabelas nativas (incident, change)
│   ├── custom/            ← Tabelas u_, x_
│   └── system/            ← Tabelas sys_
├── lib/
│   ├── client.js          ← Cliente REST (Basic & Bearer Auth + cache + rate limit)
│   ├── cache.js           ← [NEW v3.8.1] Cache TTL em memória (60s, por URL)
│   ├── ratelimit.js       ← [NEW v3.8.1] Sliding window 10 req/s por ambiente
│   └── validate.js        ← [NEW v3.8.1] Validação de tableName, sys_id, limit
├── test/                  ← [NEW v3.8.1] Testes unitários (node:test, sem deps)
│   ├── cache.test.js
│   ├── ratelimit.test.js
│   ├── security-guards.test.js
│   └── validate.test.js
├── tools/
│   ├── scripts.js         ← Core CRUD & AI Context (com validação de inputs)
│   ├── bundle.js          ← Agrupamento Atômico (Catalog Items)
│   ├── frontend.js        ← UI/UX (Widgets, Actions)
│   ├── catalog.js         ← Service Catalog Standard
│   ├── flow.js            ← Flow Designer
│   ├── security.js        ← Segurança (ACLs, Access) — null checks em lookups
│   ├── deploy.js          ← Update Sets
│   ├── attachments.js     ← Attachment API
│   └── properties.js      ← System Properties
├── AI_REFERENCE.md        ← Guia para IAs consumidoras
├── GEMINI.md              ← Este arquivo (contexto para desenvolvedores)
├── README.md              ← Documentação pública
└── package.json           ← v3.8.1 (Scripts: start, dashboard, dev, test)
```

---

## ⚙️ Stack e Convenções

| Item | Valor |
|---|---|
| Dashboard | Express + Vanilla HTML/JS |
| UI | Dark Tech Aesthetics (#00F2FF, JetBrains Mono) + Privacy Masking |
| Módulos | ESM (`"type": "module"`) |

---

## 📐 Padrão de Ferramenta Consolidada

Todas as ferramentas seguem o padrão `sn_manage_*` para CRUD inteligente e `sn_get_*_bundle` para leituras atômicas de metadados complexos.

---

## 🔧 Funções do Cliente HTTP

| Função | Uso |
|---|---|
| `snGet(path, params, env)` | GET — leitura com cache TTL automático |
| `snPost(path, body, env)` | POST — criação (invalida cache do path) |
| `snPatch(path, body, env)` | PATCH — atualização (invalida cache do path) |
| `snDelete(path, env)` | DELETE — remoção (invalida cache do path) |

Todas as funções aplicam rate limit de 10 req/s por ambiente antes de fazer o fetch.

---

## 📦 Ferramentas Ativas (v3.8.0 — ~38 total)

O servidor MCP e o Dashboard trabalham em conjunto para oferecer uma experiência "full-stack".

### 🧠 Knowledge First
O repositório utiliza uma pasta `knowledge/` para armazenar o esquema da instância. **Sempre verifique se a tabela que você vai manipular já está documentada nesta pasta antes de perguntar ao usuário ou assumir campos.**

---

## ⚠️ Regras Importantes

1. **Nunca use `require()`** — o projeto é 100% ESM.
2. **Dashboard Aesthetics**: O painel segue a temática "Dark Tech" de alta precisão (preto/ciano) com "Shadow Masking" para senhas e tokens (`••••••••`).
3. **Versão**: As atualizações devem acompanhar o semantic versioning.
4. **Smart-URL**: Credenciais no `.env` podem receber apenas os prefixos (ex: `dev12345`), e o `lib/client.js` faz o auto-complete para a URL do SN.
5. **Auth Priority**: O cliente prioriza `SN_OAUTH_ACCESS_TOKEN` se disponível, caso contrário cai para `SN_USER`/`SN_PASSWORD`.
6. **Validação obrigatória**: Novas ferramentas CRUD devem importar e usar `validateTableName`, `validateSysId` e `validateLimit` de `lib/validate.js` antes de chamar a API.
7. **Testes**: Ao adicionar nova lib em `lib/`, crie o teste correspondente em `test/`. Rode `npm test` antes de commitar.
8. **Async I/O**: Nunca use `fs.writeFileSync` ou `fs.readFileSync` no dashboard — use sempre `fs.promises.*`.

