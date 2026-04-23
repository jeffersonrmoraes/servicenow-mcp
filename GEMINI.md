# GEMINI.md — Contexto do Projeto para IA (v7.1.0)

Este arquivo fornece contexto estruturado sobre o repositório **ServiceNow MCP Server** para qualquer agente de IA que trabalhe nesta base de código. Leia este arquivo antes de qualquer intervenção.

---

## Visão Geral

- **Projeto**: ServiceNow MCP Server
- **Versão Atual**: `7.1.0`
- **Descrição**: Servidor MCP que expõe 50 ferramentas e 4 prompts para desenvolver e gerenciar instâncias ServiceNow via agentes de IA (Claude, GitHub Copilot, Antigravity/Google Agentspace).
- **Estrutura Core**: MCP SDK (Stdio) + Express (Dashboard API) — 100% TypeScript com `tsx`.
- **Repositório**: https://github.com/jeffersonrmoraes/servicenow-mcp

---

## Estrutura de Arquivos (v7.0.0)

```
servicenow-mcp/
├── src/
│   ├── index.ts               ← Orquestrador MCP Principal (roteamento O(1) via Map + Prompts + JIT trigger + activity logging)
│   ├── types.ts               ← Interfaces TypeScript compartilhadas (ToolDefinition, MCPResource, etc.)
│   ├── dashboard/
│   │   ├── server.ts          ← API do Dashboard (Express) — SSE, health, stats, governance, knowledge, OAuth
│   │   └── public/
│   │       ├── index.html     ← SPA 6-abas (Environments, Tools, Activity, Stats, Governance, Graph)
│   │       ├── app.js         ← Lógica do frontend (lazy tab init, SSE reconnect, D3.js Graph Explorer, Schema Search, Latency Heatmap)
│   │       └── style.css      ← Dark Tech theme (JetBrains Mono, ciano/preto)
│   ├── lib/
│   │   ├── client.ts          ← Cliente REST (retry + backoff, OAuth refresh memory-only)
│   │   ├── cache.ts           ← LRU Cache com TTL + eviction + persistência JSON opcional
│   │   ├── activity.ts        ← Activity log JSONL (IPC MCP→Dashboard via byte-offset polling)
│   │   ├── ratelimit.ts       ← Sliding window 10 req/s read, 5 req/s write, por ambiente
│   │   ├── validate.ts        ← Validação de tableName, sys_id, limit, payload, query
│   │   ├── helpers.ts         ← Utilitários compartilhados (upsert, findByField, encodeQueryParam)
│   │   ├── logger.ts          ← Logger estruturado JSON (stderr)
│   │   ├── jit-harvester.ts   ← JIT Harvester (auto-sync background com in-flight guard + negative cache)
│   │   └── schema-validator.ts ← Schema-Aware Validation (parse de knowledge/ MD, cache Map, warns non-blocking)
│   └── tools/
│       ├── crud.ts            ← Core CRUD + clone + diff + search_global + list_envs + schema warnings
│       ├── metadata.ts        ← Scripts de desenvolvimento + Schema + sanitização
│       ├── context.ts         ← Gerador de contexto AI (sn_generate_ai_context)
│       ├── envs.ts            ← Listagem de ambientes configurados
│       ├── catalog.ts         ← Service Catalog (item, variável, categoria)
│       ├── frontend.ts        ← UI/UX (Widget, UI Action, UI Page)
│       ├── flow.ts            ← Flow Designer (get, activate, trigger, list, subflow, action)
│       ├── security.ts        ← Segurança (ACLs, Notifications, Access) — sem delete
│       ├── deploy.ts          ← Update Sets (create, set current, list, complete)
│       ├── attachments.ts     ← Attachment API (upload, list, download)
│       ├── properties.ts      ← System Properties (get, set, list)
│       ├── bundle.ts          ← Leitura atômica de Catalog Items
│       ├── knowledge.ts       ← Harvester incremental (async I/O, default 50 tabelas)
│       ├── relationships.ts   ← Mapeamento de dependências + Deep Discovery em 6 tabelas de scripts
│       ├── extras.ts          ← Utilitários (health_check, choice, export, email_template)
│       ├── logs.ts            ← Logs de sistema (sn_stream_syslog, sn_get_node_log) — admin-only
│       └── governance.ts      ← Barrel re-export (→ governance/handler.ts + governance/checks.ts)
│           governance/
│           ├── checks.ts      ← 15 funções de check + LintIssue interface + ALL_CHECKS array
│           ├── handler.ts     ← governanceTools array + handleGovernanceTool function
│           └── planner.ts     ← generateExecutionPlan: análise de impacto + plano + Markdown report
├── scripts/
│   └── add-tool.ts            ← Tool Scaffolder CLI (npm run add-tool <module> <sn_tool_name>)
├── knowledge/                 ← Metadados locais da instância (gerado pelo Harvester)
│   ├── core/                  ← Tabelas nativas (incident, change, task...)
│   ├── custom/                ← Tabelas u_, x_
│   ├── system/                ← Tabelas sys_
│   └── state.json             ← Estado do sincronismo incremental
├── test/
│   ├── cache.test.ts          ← Testes do LRU cache (inclui eviction + persistência)
│   ├── ratelimit.test.ts      ← Testes do rate limiter
│   ├── security-guards.test.ts ← Testes de segurança
│   ├── validate.test.ts       ← Testes de validação
│   ├── client.test.ts         ← Testes do HTTP client
│   ├── activity.test.ts       ← Testes do activity log (byte-offset, concurrent writes)
│   ├── governance.test.ts     ← Testes do linter (cada check individualmente)
│   ├── logs.test.ts           ← Testes das ferramentas de log
│   ├── relationships.test.ts  ← Testes do deep discovery
│   ├── planner.test.ts        ← 14 testes unitários do planner (puro, sem rede)
│   └── integration.test.ts    ← Testes de integração (Live)
├── AI_REFERENCE.md            ← Guia de uso para IAs consumidoras
├── GEMINI.md                  ← Este arquivo (contexto para desenvolvedores)
├── README.md                  ← Documentação pública
├── package.json               ← v7.0.0 (scripts: start, build, dashboard, dev, test, type-check, add-tool)
└── tsconfig.json              ← Com declaration, sourceMap, declarationMap
```

---

## Stack e Convenções

| Item | Valor |
|---|---|
| Runtime | Node.js >= 18 (recomendado >= 20) |
| Linguagem | TypeScript via `tsx` (dev) / `tsc` (build) |
| Módulos | ESM (`"type": "module"`) — **nunca use `require()`** |
| Dashboard | Express + Vanilla HTML/JS (sem framework) |
| MCP Transport | Stdio |
| IPC MCP→Dashboard | JSONL append-only (`.sn-activity.jsonl`) com byte-offset polling |
| Versão fonte única | `const VERSION = "7.1.0"` em `src/index.ts` e `"version"` em `package.json` |

---

## Padrão de Módulo de Ferramenta

Todo arquivo em `src/tools/` deve exportar:
1. Um array `ToolDefinition[]` com o nome do módulo (ex: `crudTools`)
2. Uma função handler correspondente (ex: `handleCrudTool`)

```typescript
// Exemplo mínimo
export const myTools: ToolDefinition[] = [
  {
    name: "sn_my_tool",
    description: "Descrição clara para o agente de IA.",
    inputSchema: {
      type: "object",
      properties: {
        env: { type: "string", description: "Prefixo do ambiente (opcional, ex: DEV)" },
        table: { type: "string", description: "Nome da tabela" },
      },
      required: ["table"],
    },
  },
];

export async function handleMyTool(name: string, args: any) {
  validateTableName(args.table);
  const data = await snGet(`/api/now/table/${args.table}`, {}, args.env);
  return data;
}
```

Após criar o módulo, registre-o em `src/index.ts` nos arrays `ALL_TOOLS` e `toolModules`.

**Tool Scaffolder**: Use `npm run add-tool <module> <sn_tool_name>` para gerar o boilerplate automaticamente:

```bash
npm run add-tool reporting sn_export_dashboard
# Gera src/tools/reporting.ts e imprime as instruções de registro
```

---

## Funções do Cliente HTTP (src/lib/client.ts)

| Função | Uso |
|---|---|
| `snGet(path, params, env?)` | GET — leitura com cache LRU + retry |
| `snPost(path, body, env?)` | POST — criação (invalida cache, retry em 5xx) |
| `snPatch(path, body, env?)` | PATCH — atualização (invalida cache, retry em 5xx) |
| `snPostBinary(path, buffer, contentType, env?)` | Upload binário |
| `snGetBinary(path, env?)` | Download binário (retorna Base64) |

**Retry automático**: Até 3 tentativas com backoff exponencial (1s, 2s, 4s + jitter) para status 429, 500, 502, 503, 504.

**Smart-URL**: O campo `SN_INSTANCE` aceita apenas o prefixo (ex: `dev12345`) → `https://dev12345.service-now.com`.

**Auth Priority**: `SN_OAUTH_ACCESS_TOKEN` > `SN_USER`/`SN_PASSWORD` (Basic Auth).

**OAuth Refresh**: Tokens renovados ficam apenas em memória — nunca persistidos no `.env`.

---

## Activity Log (src/lib/activity.ts)

O arquivo `.sn-activity.jsonl` é o canal IPC entre o processo MCP (stdio) e o Dashboard (HTTP).

- **MCP**: chama `logActivity(entry)` com fire-and-forget (`logActivity(...).catch(() => {})`) — zero impacto na latência das ferramentas.
- **Dashboard**: endpoint `/api/activity/stream` faz polling via SSE a cada 500ms usando `readActivityFrom(offsetBytes)` — lê apenas os bytes novos (equivalente a `tail -f`).
- **Rotação**: verifica e trunca a cada 50 appends quando o arquivo ultrapassa 1000 linhas.
- **Escrita serializada**: fila via Promise chain — sem corrupção em escritas concorrentes.

---

## Cache Persistente (src/lib/cache.ts)

- `SN_CACHE_PERSIST=true` habilita persistência em JSON.
- `SN_CACHE_PERSIST_PATH` define o caminho (default: `.sn-cache.json`).
- `persistLoad()` deve ser chamado no startup do MCP antes de conectar.
- Flush debounced: 2s de inatividade após a última escrita.
- `cachePersistMeta(key, value, ttlMs)` para metadados de longa duração (ex: schemas de tabelas, TTL=24h).

---

## Validação Obrigatória

Novas ferramentas CRUD devem importar de `lib/validate.ts`:

```typescript
import { validateTableName, validateSysId, validateLimit } from "../lib/validate.js";
```

---

## Segurança (v6.0)

1. **Delete completamente removido** — Nenhuma ferramenta executa operações DELETE.
2. **Script sanitization** — Scripts passam por validação contra padrões destrutivos antes de envio.
3. **OAuth memory-only** — Tokens renovados via refresh nunca são escritos em disco.
4. **Input validation** — Todos os inputs são validados contra injection e tamanho.
5. **Admin guard** — `sn_stream_syslog` e `sn_get_node_log` verificam role `admin` via `sys_user_has_role` antes de qualquer chamada de log.

---

## MCP Resources

O servidor expõe os arquivos de `knowledge/` como MCP Resources:

- URI format: `knowledge://{category}/{tableName}`
- Categorias: `core`, `custom`, `system`

---

## MCP Prompts (v6.0)

O servidor expõe 4 prompts predefinidos: `create_business_rule`, `debug_incident`, `analyze_table`, `onboarding_app`.

---

## Dashboard v3.0 — Endpoints da API

| Endpoint | Método | Descrição |
|---|---|---|
| `GET /api/envs` | GET | Lista instâncias do `.env` |
| `GET /api/health/:prefix` | GET | Health check paralelo (user + versão) |
| `GET /api/tools` | GET | Lista todas as 50 ferramentas com módulo inferido |
| `GET /api/stats` | GET | Métricas de servidor, cache, knowledge e activity |
| `GET /api/activity` | GET | Histórico de activity log (últimas N entradas) |
| `GET /api/activity/stream` | SSE | Stream live de novas entradas via byte-offset polling |
| `GET /api/activity/heatmap` | GET | Latência agregada por ferramenta (avg/min/max ms, error_rate) — últimas 500 entradas |
| `GET /api/governance/update-sets` | GET | Lista Update Sets do ambiente |
| `POST /api/governance/lint` | POST | Executa linter em um Update Set (15 checks) |
| `GET /api/knowledge/search?q=` | GET | Busca full-text em knowledge/ MD — retorna ranked results |
| `GET /api/knowledge/graph` | GET | Grafo de relações entre tabelas — nodes + edges para D3.js |
| `GET /api/env` | GET | Lê o arquivo `.env` raw (senhas mascaradas) |
| `POST /api/env` | POST | Salva o `.env` e aplica em `process.env` |

---

## Regras Importantes

1. **Nunca use `require()`** — o projeto é 100% ESM.
2. **Use `fs/promises`** para I/O de arquivos. Use `existsSync` apenas para checks de existência rápidos.
3. **Versão**: Atualize `VERSION` em `src/index.ts` E `"version"` em `package.json`.
4. **Testes**: TypeScript em `test/*.test.ts`. Rode `npm test` antes de commitar.
5. **Parâmetro `env`**: Opcional em todas as ferramentas. Use para rotear para instâncias específicas configuradas no `.env` com prefixo.
6. **Knowledge First**: Sempre verifique os MCP Resources (`knowledge://category/table`) ou a pasta `knowledge/` antes de assumir nomes de campos.
7. **Validação automática**: Os campos `table`, `sys_id` e `limit` são validados em todas as operações CRUD.
8. **Cache automático**: Todas as chamadas GET são cacheadas por 60 segundos por ambiente.
9. **Rate Limit com Backoff**: O servidor limita a 10 chamadas/segundo.
10. **Activity Logging**: Fire-and-forget em `src/index.ts` — nunca espere o resultado do `logActivity`.
11. **Dashboard dotenv**: `src/dashboard/server.ts` deve ter `import "dotenv/config"` como **primeira** importação — o Dashboard roda como processo separado.
12. **No Delete**: Nunca adicione operações DELETE. Política de segurança.
13. **Dashboard Aesthetics**: O painel segue a temática "Dark Tech" (preto/ciano, JetBrains Mono).
14. **TDZ no Frontend**: Em `app.js`, chame funções que dependem de `const` declaradas abaixo apenas no final do `DOMContentLoaded` handler.
15. **JIT Harvester**: Fire-and-forget em `src/index.ts` — `triggerJITSync(table, env)` antes do try/catch de execução. Nunca bloqueie a chamada esperando o sync.
16. **Schema Validator**: `validateFields` retorna array vazio quando a tabela não está em `knowledge/` — nunca lança exceção. Adicione warnings ao resultado sem bloquear a operação.
17. **Governance barrel**: Importe sempre de `"./tools/governance.js"` — o barrel re-exporta de `governance/handler.js` e `governance/checks.js`. Não importe diretamente dos sub-módulos em `src/index.ts`.
18. **Fluxo de governança**: Chame `sn_generate_execution_plan` antes de qualquer ferramenta mutante. Se `requires_approval: true`, exiba `report_markdown` integralmente e aguarde confirmação explícita antes de prosseguir. Nunca pule esse passo em operações de tipo `deploy_update_set`, `bulk_update` ou `modify_acl`.
19. **Prompt `safe_change_request`**: Automatiza o fluxo Plan→Impact→Approval. Use-o quando o usuário solicitar mudanças complexas ou de alto risco — ele garante que a IA gera o plano, mostra ao usuário e só executa com aprovação explícita.

---

## Aplicação de Referência — Smart Onboarding AI

Aplicação completa implementada via REST API no PDI `dev343269.service-now.com`. Serve como referência para desenvolvimento de apps ServiceNow via MCP.

### Lições aprendidas (para futuros desenvolvimentos)

1. Campos em escopo global sempre exigem prefixo `u_` — checar antes de qualquer script
2. Tabelas herdando de `task` exigem `short_description` para insert funcionar
3. `sys_ui_section.title` é booleano; o label da seção fica em `caption`
4. `sys_ui_section.view` e `sys_ui_list.view` exigem sys_id, não string "Default view"
5. `sys_ui_list_element` sem `list_id` é orphan — sempre criar o pai `sys_ui_list` primeiro
6. Namespace de Scripted REST API é gerado automaticamente — descobrir via `sys_ws_definition`
7. Choices criadas com `element` errado (sem `u_`) não aparecem no form — sempre usar o nome real do campo
8. Queries `sysparm_query` com vírgulas nos valores devem usar `encodeURIComponent`
9. `sys_ui_element` não tem campo `name` — filtrar sempre por `sys_ui_section=<sys_id>`
10. `view_name` em `sys_ui_section` / `sys_ui_list` não é auto-populado via REST
11. Após criar/alterar form layout via REST, limpar o cache com `GET /cache.do`
12. `current.update()` em Business Rules causa loop infinito — usar `setWorkflow(false)` ou reestruturar
13. `GlideRecord` não existe em Client Scripts — usar `GlideAjax` para chamadas server-side
