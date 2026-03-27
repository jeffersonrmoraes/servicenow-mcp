# GEMINI.md — Contexto do Projeto para IA (v3.7.0)

Este arquivo fornece contexto estruturado sobre o repositório **ServiceNow MCP Server** para qualquer agente de IA que trabalhe nesta base de código. Leia este arquivo antes de qualquer intervenção.

---

## 📌 Visão Geral

- **Projeto**: ServiceNow MCP Server
- **Versão Atual**: `3.7.0` (Hybrid Auth Edition)
- **Descrição**: Servidor MCP que expõe ferramentas consolidadas e um Dashboard Web (Dark Tech) com suporte a Auto-URL, Privacy Masking, Instance Manager GUI e OAuth 2.0.
- **Estrutura Core**: MCP SDK (Stdio) + Express (Dashboard API).
- **Repositório**: https://github.com/jeffersonrmoraes/servicenow-mcp

---

## 🗂️ Estrutura de Arquivos (v3.7+)

```
servicenow-mcp/
├── index.js               ← Orquestrador MCP Principal (Stdio)
├── dashboard/
│   ├── server.js          ← API do Dashboard + OAuth Callback
│   └── public/            ← Frontend (SPA Vanilla + Hybrid Auth UI)
│       ├── index.html
│       ├── style.css
│       └── app.js
├── lib/
│   └── client.js          ← Cliente REST (Suporta Basic & Bearer Auth)
├── tools/
│   ├── scripts.js         ← Core CRUD & AI Context
│   ├── bundle.js          ← Agrupamento Atômico (Catalog Items) [NEW v3.6]
│   ├── frontend.js        ← UI/UX (Widgets, Actions)
│   ├── catalog.js         ← Service Catalog Standard
│   ├── flow.js            ← Flow Designer
│   ├── security.js        ← Segurança (ACLs, Access)
│   ├── deploy.js          ← Update Sets
│   ├── attachments.js     ← Attachment API
│   └── properties.js      ← System Properties
├── AI_REFERENCE.md        ← Guia para IAs consumidoras
├── GEMINI.md              ← Este arquivo (contexto para desenvolvedores)
├── README.md              ← Documentação pública
└── package.json           ← v3.7.0 (Scripts: start, dashboard, dev)
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
| `snGet(path, params, env)` | GET — leitura (Auto-Refresh OAUTH em breve) |
| `snPost(path, body, env)` | POST — criação |
| `snPatch(path, body, env)` | PATCH — atualização |
| `snDelete(path, env)` | DELETE — remoção |

---

## 📦 Ferramentas Ativas (v3.7.0 — ~37 total)

O servidor MCP e o Dashboard trabalham em conjunto para oferecer uma experiência "full-stack".

---

## ⚠️ Regras Importantes

1. **Nunca use `require()`** — o projeto é 100% ESM.
2. **Dashboard Aesthetics**: O painel segue a temática "Dark Tech" de alta precisão (preto/ciano) com "Shadow Masking" para senhas e tokens (`••••••••`).
3. **Versão**: As atualizações devem acompanhar o semantic versioning. 
4. **Smart-URL**: Credenciais no `.env` podem receber apenas os prefixos (ex: `dev12345`), e o `lib/client.js` faz o auto-complete para a URL do SN. 
5. **Auth Priority**: O cliente prioriza `SN_OAUTH_ACCESS_TOKEN` se disponível, caso contrário cai para `SN_USER`/`SN_PASSWORD`.

