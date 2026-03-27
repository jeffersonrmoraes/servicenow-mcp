# GEMINI.md — Contexto do Projeto para IA (v3.0.0)

Este arquivo fornece contexto estruturado sobre o repositório **ServiceNow MCP Server** para qualquer agente de IA que trabalhe nesta base de código. Leia este arquivo antes de qualquer intervenção.

---

## 📌 Visão Geral

- **Projeto**: ServiceNow MCP Server
- **Versão Atual**: `3.0.0` (Major Release - Consolidado)
- **Descrição**: Servidor MCP que expõe ferramentas consolidadas para agentes de IA interagirem com o ServiceNow via REST API nativa.
- **Compatibilidade**: Claude Desktop, VS Code (GitHub Copilot), Google Agentspace (Antigravity)
- **Licença**: MIT
- **Repositório**: https://github.com/jeffersonrmoraes/servicenow-mcp

---

## 🗂️ Estrutura de Arquivos (v3.0+)

```
servicenow-mcp/
├── index.js               ← Orquestrador MCP — registra ~25 ferramentas de alta performance
├── lib/
│   └── client.js          ← HTTP client dinâmico (snGet, snPost, snPatch, snDelete, snPostBinary, snGetBinary)
├── tools/
│   ├── scripts.js         ← Core CRUD + sn_upsert_metadata_script + sn_manage_schema
│   ├── catalog.js         ← Service Catalog (sn_manage_catalog_item, sn_manage_catalog_variable, sn_manage_catalog_category)
│   ├── flow.js            ← Flow Designer (sn_get_flow, sn_activate_flow, sn_trigger_flow, etc.)
│   ├── security.js        ← Security Consolidada (sn_manage_acl, sn_manage_notification, sn_manage_access)
│   ├── deploy.js          ← Update Sets
│   ├── attachments.js     ← Attachment API (upload, list, download, delete)
│   └── properties.js      ← System Properties (get, set, list, delete)
├── AI_REFERENCE.md        ← Guia de uso das ferramentas para a IA consumidora
├── GEMINI.md              ← Este arquivo (contexto para IA desenvolvedora)
├── README.md              ← Documentação pública
├── .env.example           ← Template de variáveis de ambiente
└── package.json           ← v3.0.0, ESM, Node ≥ 18
```

---

## ⚙️ Stack e Convenções

| Item | Valor |
|---|---|
| Runtime | Node.js ≥ 18 |
| Módulos | ESM (`"type": "module"`) — usar sempre `import`/`export`, nunca `require` |
| HTTP Client | `fetch` nativo do Node (sem axios ou node-fetch) |
| Protocolo | `@modelcontextprotocol/sdk` v1.x |
| Entrada de dados | `stdio` transport |

---

## 🌐 Arquitetura Multi-Instância

**Toda** ferramenta aceita o parâmetro opcional `env`. A função `getContext(env)` em `lib/client.js` resolve as credenciais dinamicamente baseado em prefixos (ex: `PDI_`, `DEV_`).

---

## 📐 Padrão de Ferramenta Consolidada (v3.0+)

A partir da v3.0, priorizamos o uso de **Gerenciadores de Domínio** (`sn_manage_*` ou `sn_upsert_*`) que consolidam `POST` (criação) e `PATCH` (atualização) em uma única ferramenta via parâmetro opcional `sys_id`.

**Regra para novas ferramentas**:
1. Agrupar operações CRUD de um mesmo objeto em uma única ferramenta.
2. Usar enums para definir ações (`action: create|update|delete|list`).
3. Mapear campos amigáveis para nomes nativos do ServiceNow nos Handlers.

---

## 🔧 Funções do Cliente HTTP

| Função | Uso |
|---|---|
| `snGet(path, params, env)` | GET — leitura |
| `snPost(path, body, env)` | POST — criação |
| `snPatch(path, body, env)` | PATCH — atualização |
| `snDelete(path, env)` | DELETE — remoção |
| `snPostBinary(...)` | POST binário — upload de anexos |
| `snGetBinary(...)` | GET binário — download de anexos (returns Base64) |

---

## 📦 Ferramentas Ativas (v3.0.0 — ~25 total)

| Módulo | Exemplos de Ferramentas |
|---|---|
| `scripts.js` | `sn_query_records`, `sn_upsert_metadata_script`, `sn_manage_schema`, `sn_execute_script` |
| `security.js` | `sn_manage_acl`, `sn_manage_notification`, `sn_manage_access` |
| `catalog.js` | `sn_manage_catalog_item`, `sn_manage_catalog_variable`, `sn_manage_catalog_category` |
| `flow.js` | `sn_get_flow`, `sn_activate_flow`, `sn_trigger_flow`, `sn_list_flow_executions` |
| `attachments.js`| `sn_upload_attachment`, `sn_list_attachments`, `sn_download_attachment`, `sn_delete_attachment` |
| `properties.js` | `sn_get_sys_property`, `sn_set_sys_property`, `sn_list_sys_properties`, `sn_delete_sys_property` |
| `deploy.js` | `sn_create_update_set`, `sn_set_current_update_set`, `sn_list_update_sets`, `sn_complete_update_set` |

---

## ⚠️ Regras Importantes

1. **Nunca use `require()`** — o projeto é 100% ESM.
2. **Sempre atualizar tudo antes de um `git push`**:
   - `README.md`, `AI_REFERENCE.md`, `GEMINI.md`, `package.json` (v3.0.0+), `index.js`.
3. **Padrão Major**: Como dezenas de ferramentas foram unificadas, a versão saltou para **3.x.x**.
4. **`out.txt`**: Sempre ignorado pelo Git.
