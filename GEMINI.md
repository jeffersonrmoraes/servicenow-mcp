# GEMINI.md — Contexto do Projeto para IA (v3.5.0)

Este arquivo fornece contexto estruturado sobre o repositório **ServiceNow MCP Server** para qualquer agente de IA que trabalhe nesta base de código. Leia este arquivo antes de qualquer intervenção.

---

## 📌 Visão Geral

- **Projeto**: ServiceNow MCP Server
- **Versão Atual**: `3.5.0` (Dark Tech Edition)
- **Descrição**: Servidor MCP que expõe ferramentas consolidadas e um Dashboard Web (Dark Tech) com suporte a Auto-URL, Privacy Masking e Instance Manager GUI.
- **Estrutura Core**: MCP SDK (Stdio) + Express (Dashboard API).
- **Repositório**: https://github.com/jeffersonrmoraes/servicenow-mcp

---

## 🗂️ Estrutura de Arquivos (v3.2+)

```
servicenow-mcp/
├── index.js               ← Orquestrador MCP Principal (Stdio)
├── dashboard/
│   ├── server.js          ← API do Dashboard (Express)
│   └── public/            ← Frontend (SPA Vanilla + Glassmorphism)
│       ├── index.html
│       ├── style.css
│       └── app.js
├── lib/
│   └── client.js          ← Cliente REST dinâmico (com roteador por prefixo)
├── tools/
│   ├── scripts.js         ← Core CRUD & Scripts
│   ├── frontend.js        ← UI/UX (Widgets, Actions)
│   ├── catalog.js         ← Service Catalog
│   ├── flow.js            ← Flow Designer
│   ├── security.js        ← Segurança (ACLs, Access)
│   ├── deploy.js          ← Update Sets
│   ├── attachments.js     ← Attachment API
│   └── properties.js      ← System Properties
├── AI_REFERENCE.md        ← Guia para IAs consumidoras
├── GEMINI.md              ← Este arquivo (contexto para desenvolvedores)
├── README.md              ← Documentação pública
└── package.json           ← v3.2.0 (Scripts: start, dashboard, dev)
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

Todas as ferramentas seguem o padrão `sn_manage_*` para CRUD inteligente. O Dashboard serve como a interface visual para validar se as instâncias estão devidamente configuradas no `.env`.

---

## 🔧 Funções do Cliente HTTP

| Função | Uso |
|---|---|
| `snGet(path, params, env)` | GET — leitura |
| `snPost(path, body, env)` | POST — criação |
| `snPatch(path, body, env)` | PATCH — atualização |
| `snDelete(path, env)` | DELETE — remoção |

---

## 📦 Ferramentas Ativas (v3.2.0 — ~35 total)

O servidor MCP e o Dashboard trabalham em conjunto para oferecer uma experiência "full-stack".

---

## ⚠️ Regras Importantes

1. **Nunca use `require()`** — o projeto é 100% ESM.
2. **Dashboard Aesthetics**: O painel segue a temática "Dark Tech" de alta precisão (preto/ciano) com "Shadow Masking" para senhas (`••••••••`).
3. **Versão**: As atualizações devem acompanhar o semantic versioning. 
4. **Smart-URL**: Credenciais no `.env` podem receber apenas os prefixos (ex: `dev12345`), e o `lib/client.js` faz o auto-complete para a URL do SN. A instância principal não usa prefixo (apenas `SN_INSTANCE`).

