# GEMINI.md — Contexto do Projeto para IA (v4.2.0)

Este arquivo fornece contexto estruturado sobre o repositório **ServiceNow MCP Server** para qualquer agente de IA que trabalhe nesta base de código. Leia este arquivo antes de qualquer intervenção.

---

## Visão Geral

- **Projeto**: ServiceNow MCP Server
- **Versão Atual**: `4.2.0`
- **Descrição**: Servidor MCP que expõe 44 ferramentas para desenvolver e gerenciar instâncias ServiceNow via agentes de IA (Claude, GitHub Copilot, Antigravity/Google Agentspace).
- **Estrutura Core**: MCP SDK (Stdio) + Express (Dashboard API) — 100% TypeScript com `tsx`.
- **Repositório**: https://github.com/jeffersonrmoraes/servicenow-mcp

---

## Estrutura de Arquivos (v4.2.0)

```
servicenow-mcp/
├── src/
│   ├── index.ts               ← Orquestrador MCP Principal (roteamento O(1) via Map)
│   ├── types.ts               ← Interfaces TypeScript compartilhadas
│   ├── dashboard/
│   │   └── server.ts          ← API do Dashboard + OAuth Callback
│   ├── lib/
│   │   ├── client.ts          ← Cliente REST (Basic & Bearer Auth + cache + rate limit)
│   │   ├── cache.ts           ← Cache TTL em memória (60s). Invalidação inteligente.
│   │   ├── ratelimit.ts       ← Sliding window 10 req/s por ambiente com Backoff Assíncrono.
│   │   ├── validate.ts        ← Validação de tableName, sys_id, limit
│   │   ├── helpers.ts         ← Utilitários compartilhados
│   │   └── logger.ts          ← Logger estruturado (stderr)
│   └── tools/
│       ├── scripts.ts         ← Core CRUD + AI Context + sn_query_all + sn_list_envs
│       ├── catalog.ts         ← Service Catalog (item, variável, categoria)
│       ├── frontend.ts        ← UI/UX (Widget, UI Action, UI Page)
│       ├── flow.ts            ← Flow Designer (get, activate, trigger, list, subflow, action)
│       ├── security.ts        ← Segurança (ACLs, Notifications, Access)
│       ├── deploy.ts          ← Update Sets (create, set current, list, complete)
│       ├── attachments.ts     ← Attachment API (upload, list, download)
│       ├── properties.ts      ← System Properties (get, set, list)
│       ├── bundle.ts          ← Leitura atômica de Catalog Items
│       ├── knowledge.ts       ← Harvester incremental (sn_sync_knowledge_base)
│       ├── relationships.ts   ← Mapeamento de dependências (get_dependencies, analyze_impact)
│       └── extras.ts          ← Utilitários (health_check, choice, export, email_template)
├── knowledge/                 ← Metadados locais da instância (gerado pelo Harvester)
│   ├── core/                  ← Tabelas nativas (incident, change, task...)
│   ├── custom/                ← Tabelas u_, x_
│   ├── system/                ← Tabelas sys_
│   └── state.json             ← Estado do sincronismo incremental
├── test/
│   ├── cache.test.js
│   ├── ratelimit.test.js
│   ├── security-guards.test.js
│   └── validate.test.js
├── AI_REFERENCE.md            ← Guia de uso para IAs consumidoras
├── GEMINI.md                  ← Este arquivo (contexto para desenvolvedores)
├── README.md                  ← Documentação pública
├── package.json               ← v4.2.0 (scripts: start, dashboard, dev, test, type-check)
└── tsconfig.json
```

---

## Stack e Convenções

| Item | Valor |
|---|---|
| Runtime | Node.js >= 18 (recomendado >= 20) |
| Linguagem | TypeScript via `tsx` (sem build step — execução direta) |
| Módulos | ESM (`"type": "module"`) — **nunca use `require()`** |
| Dashboard | Express + Vanilla HTML/JS |
| MCP Transport | Stdio |
| Versão fonte única | `const VERSION = "4.2.0"` em `src/index.ts` e `"version"` em `package.json` |

---

## Padrão de Módulo de Ferramenta

Todo arquivo em `src/tools/` deve exportar:
1. Um array `ToolDefinition[]` com o nome do módulo (ex: `scriptTools`)
2. Uma função `handleXxxTool(name: string, args: any): Promise<any>`

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

---

## Funções do Cliente HTTP (src/lib/client.ts)

| Função | Uso |
|---|---|
| `snGet(path, params, env?)` | GET — leitura com cache TTL automático |
| `snPost(path, body, env?)` | POST — criação (invalida cache do path) |
| `snPatch(path, body, env?)` | PATCH — atualização (invalida cache do path) |
| `snDelete(path, env?)` | DELETE — remoção (invalida cache do path) |

Todas as funções aplicam rate limit de 10 req/s por ambiente com backoff automático (aguarda liberar em vez de falhar).

**Smart-URL**: O campo `SN_INSTANCE` aceita apenas o prefixo da instância (ex: `dev12345`). O cliente completa automaticamente para `https://dev12345.service-now.com`.

**Auth Priority**: `SN_OAUTH_ACCESS_TOKEN` se disponível; caso contrário `SN_USER`/`SN_PASSWORD` (Basic Auth).

---

## Validação Obrigatória

Novas ferramentas CRUD devem importar de `lib/validate.ts`:

```typescript
import { validateTableName, validateSysId, validateLimit } from "../lib/validate.js";
```

- `validateTableName(table)` — padrão `[a-zA-Z0-9_]+`
- `validateSysId(sys_id)` — 32 caracteres hexadecimais
- `validateLimit(limit)` — inteiro entre 1 e 1000

---

## MCP Resources

O servidor expõe os arquivos de `knowledge/` como MCP Resources no protocolo:

- URI format: `knowledge://{category}/{tableName}`
- Categorias: `core`, `custom`, `system`
- Listagem via `ListResourcesRequestSchema`
- Leitura via `ReadResourceRequestSchema`

Agentes podem ler schemas de tabelas diretamente via Resources sem gastar chamadas de API.

---

## Regras Importantes

1. **Nunca use `require()`** — o projeto é 100% ESM.
2. **Nunca use `fs.writeFileSync` ou `fs.readFileSync`** — use sempre `fs.promises.*` ou equivalente assíncrono.
3. **Versão**: As atualizações devem acompanhar semantic versioning. Sempre atualize `VERSION` em `src/index.ts` E `"version"` em `package.json`.
4. **Testes**: Ao adicionar nova lib em `src/lib/`, crie o teste correspondente em `test/`. Rode `npm test` antes de commitar.
5. **Type-check**: Rode `npm run type-check` para validar TypeScript sem executar.
6. **Dashboard Aesthetics**: O painel segue a temática "Dark Tech" (preto/ciano, JetBrains Mono) com mascaramento de senhas (`••••••••`).
7. **Knowledge First**: Sempre verifique `knowledge/` antes de assumir campos de uma tabela.

---

## Aplicação de Referência — Smart Onboarding AI

Aplicação completa implementada via REST API no PDI `dev343269.service-now.com`. Serve como referência para desenvolvimento de apps ServiceNow via MCP.

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

### Lições aprendidas (para futuros desenvolvimentos)

1. Campos em escopo global sempre exigem prefixo `u_` — checar antes de qualquer script
2. Tabelas herdando de `task` exigem `short_description` para insert funcionar
3. `sys_ui_section.title` é booleano; o label da seção fica em `caption`
4. `sys_ui_section.view` e `sys_ui_list.view` exigem sys_id, não string "Default view"
5. `sys_ui_list_element` sem `list_id` é orphan — sempre criar o pai `sys_ui_list` primeiro
6. Namespace de Scripted REST API é gerado automaticamente — descobrir via `sys_ws_definition`
7. Choices criadas com `element` errado (sem `u_`) não aparecem no form — sempre usar o nome real do campo
8. Queries `sysparm_query` com vírgulas nos valores devem usar `encodeURIComponent` — vírgulas cruas quebram o filtro silenciosamente
9. `sys_ui_element` não tem campo `name` — queries `name=tabela` ignoram o filtro. Filtrar sempre por `sys_ui_section=<sys_id>`
10. `view_name` em `sys_ui_section` / `sys_ui_list` não é auto-populado via REST — deve ser setado explicitamente como `"Default view"`
11. Após criar/alterar form layout via REST, limpar o cache com `GET /cache.do` (espera redirect 302)
