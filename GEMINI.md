# GEMINI.md — Contexto do Projeto para IA (v3.9.0)

Este arquivo fornece contexto estruturado sobre o repositório **ServiceNow MCP Server** para qualquer agente de IA que trabalhe nesta base de código. Leia este arquivo antes de qualquer intervenção.

---

## 📌 Visão Geral

- **Projeto**: ServiceNow MCP Server
- **Versão Atual**: `3.9.0` (Performance & Resources Edition)
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
│   ├── cache.js           ← [v3.8.1] Cache TTL em memória (60s). Invalidação inteligente (parent table).
│   ├── ratelimit.js       ← [v3.9.0] Sliding window 10 req/s por ambiente com Backoff Assíncrono (retry).
│   └── validate.js        ← [v3.8.1] Validação de tableName, sys_id, limit
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

Todas as funções aplicam rate limit de 10 req/s por ambiente com backoff automático (aguarda liberar em vez de falhar).

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

---

## 🏗️ Aplicação de Referência — Smart Onboarding AI

Aplicação completa implementada via REST API diretamente no PDI `dev343269.service-now.com`. Serve como referência para desenvolvimento de apps ServiceNow via MCP.

### Componentes implementados

| Componente | Tipo | Nome/Tabela |
|-----------|------|-------------|
| Tabela de Requisições | Table (extends task) | `u_x_smart_onboarding_request` |
| Tabela de Tarefas | Table (extends task) | `u_x_smart_onboarding_task` |
| Script Include | OnboardingLogger | Logging centralizado |
| Script Include | OnboardingValidator | Validação de payloads |
| Script Include | OnboardingRuleEngine | Orquestrador de tarefas por departamento |
| Business Rule | CreateTasksOnInsert | After Insert → chama RuleEngine |
| Client Script | DepartmentOnChange | onChange → filtra campos por departamento |
| UI Policy | RequireEmailForIT | Torna email obrigatório para dept IT |
| Scripted REST API | smart_onboarding | `POST /api/1964763/smart_onboarding/request` |
| Form Layout | Default view | 2 seções para request, 1 para task |
| List Columns | Default view | 5 colunas por tabela |
| Nav Menu | Smart Onboarding AI | 3 módulos: list request, list task, new request |

### Campos das tabelas (escopo global — prefixo `u_`)

**u_x_smart_onboarding_request**
- `u_employee_name` (string) — nome do funcionário
- `u_employee_email` (string) — email
- `u_department` (choice) — IT / HR / Finance
- `u_start_date` (date)
- `u_status` (choice) — Draft / In Progress / Completed
- `u_notes` (string)
- `short_description` — herdado de task (obrigatório para insert)

**u_x_smart_onboarding_task**
- `u_task_name` (string) — nome da tarefa
- `u_request` (reference → u_x_smart_onboarding_request)
- `u_status` (choice) — Pending / In Progress / Done
- `u_assigned_to` (reference → sys_user)
- `short_description` — herdado de task (obrigatório para insert)

### Endpoint REST

```
POST https://dev343269.service-now.com/api/1964763/smart_onboarding/request
Content-Type: application/json
Authorization: Basic <base64>

{
  "employee_name":  "João Silva",
  "employee_email": "joao@empresa.com",
  "department":     "IT",
  "start_date":     "2026-04-01"
}
```

Resposta 201 (criado) | 409 (duplicata ativa) | 422 (payload inválido)

### Lições aprendidas (para futuros desenvolvimentos)

1. Campos em escopo global sempre exigem prefixo `u_` — checar antes de qualquer script
2. Tabelas herdando de `task` exigem `short_description` para insert funcionar
3. `sys_ui_section.title` é booleano; o label da seção fica em `caption`
4. `sys_ui_section.view` e `sys_ui_list.view` exigem sys_id, não string "Default view"
5. `sys_ui_list_element` sem `list_id` é orphan — sempre criar o pai `sys_ui_list` primeiro
6. Namespace de Scripted REST API é gerado automaticamente — descobrir via `sys_ws_definition`
7. Choices criadas com `element` errado (sem `u_`) não aparecem no form — sempre usar o nome real do campo
8. Queries `sysparm_query` com vírgulas nos valores **devem** usar `encodeURIComponent` — vírgulas cruas quebram o filtro silenciosamente e podem causar deleções em massa
9. `sys_ui_element` **não tem campo `name`** — queries `name=tabela` ignoram o filtro e retornam todos os registros. Filtrar sempre por `sys_ui_section=<sys_id>`
10. `view_name` em `sys_ui_section` / `sys_ui_list` **não é auto-populado** via REST API — deve ser setado explicitamente como `"Default view"` ou o form renderer não localiza as seções/listas
11. Após criar/alterar form layout via REST, limpar o cache com `GET /cache.do` (espera redirect 302)

