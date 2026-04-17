# GEMINI.md — Contexto do Projeto para IA (v5.0.0)

Este arquivo fornece contexto estruturado sobre o repositório **ServiceNow MCP Server** para qualquer agente de IA que trabalhe nesta base de código. Leia este arquivo antes de qualquer intervenção.

---

## Visão Geral

- **Projeto**: ServiceNow MCP Server
- **Versão Atual**: `5.0.0`
- **Descrição**: Servidor MCP que expõe 46 ferramentas e 4 prompts para desenvolver e gerenciar instâncias ServiceNow via agentes de IA (Claude, GitHub Copilot, Antigravity/Google Agentspace).
- **Estrutura Core**: MCP SDK (Stdio) + Express (Dashboard API) — 100% TypeScript com `tsx`.
- **Repositório**: https://github.com/jeffersonrmoraes/servicenow-mcp

---

## Estrutura de Arquivos (v5.0.0)

```
servicenow-mcp/
├── src/
│   ├── index.ts               ← Orquestrador MCP Principal (roteamento O(1) via Map + Prompts)
│   ├── types.ts               ← Interfaces TypeScript compartilhadas (ToolDefinition, MCPResource, etc.)
│   ├── dashboard/
│   │   └── server.ts          ← API do Dashboard + OAuth Callback
│   ├── lib/
│   │   ├── client.ts          ← Cliente REST (retry + backoff, OAuth refresh memory-only)
│   │   ├── cache.ts           ← LRU Cache com TTL + eviction + métricas
│   │   ├── ratelimit.ts       ← Sliding window 10 req/s read, 5 req/s write, por ambiente
│   │   ├── validate.ts        ← Validação de tableName, sys_id, limit, payload, query
│   │   ├── helpers.ts         ← Utilitários compartilhados (upsert, findByField, encodeQueryParam)
│   │   └── logger.ts          ← Logger estruturado JSON (stderr)
│   └── tools/
│       ├── crud.ts            ← Core CRUD + clone + diff + search_global + list_envs
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
│       ├── knowledge.ts       ← Harvester incremental (async I/O)
│       ├── relationships.ts   ← Mapeamento de dependências (get_dependencies, analyze_impact)
│       └── extras.ts          ← Utilitários (health_check, choice, export, email_template)
├── knowledge/                 ← Metadados locais da instância (gerado pelo Harvester)
│   ├── core/                  ← Tabelas nativas (incident, change, task...)
│   ├── custom/                ← Tabelas u_, x_
│   ├── system/                ← Tabelas sys_
│   └── state.json             ← Estado do sincronismo incremental
├── test/
│   ├── cache.test.ts          ← Testes do LRU cache (inclui eviction)
│   ├── ratelimit.test.ts      ← Testes do rate limiter
│   ├── security-guards.test.ts ← Testes de segurança
│   ├── validate.test.ts       ← Testes de validação
│   ├── client.test.ts         ← Testes do HTTP client
│   └── integration.test.ts    ← Testes de integração (Live)
├── AI_REFERENCE.md            ← Guia de uso para IAs consumidoras
├── GEMINI.md                  ← Este arquivo (contexto para desenvolvedores)
├── README.md                  ← Documentação pública
├── package.json               ← v5.0.0 (scripts: start, build, dashboard, dev, test, type-check)
└── tsconfig.json              ← Com declaration, sourceMap, declarationMap
```

---

## Stack e Convenções

| Item | Valor |
|---|---|
| Runtime | Node.js >= 18 (recomendado >= 20) |
| Linguagem | TypeScript via `tsx` (dev) / `tsc` (build) |
| Módulos | ESM (`"type": "module"`) — **nunca use `require()`** |
| Dashboard | Express + Vanilla HTML/JS |
| MCP Transport | Stdio |
| Versão fonte única | `const VERSION = "5.0.0"` em `src/index.ts` e `"version"` em `package.json` |

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

## Validação Obrigatória

Novas ferramentas CRUD devem importar de `lib/validate.ts`:

```typescript
import { validateTableName, validateSysId, validateLimit } from "../lib/validate.js";
```

---

## Segurança (v5.0)

1. **Delete completamente removido** — Nenhuma ferramenta executa operações DELETE.
2. **Script sanitization** — Scripts passam por validação contra padrões destrutivos antes de envio.
3. **OAuth memory-only** — Tokens renovados via refresh nunca são escritos em disco.
4. **Input validation** — Todos os inputs são validados contra injection e tamanho.

---

## MCP Resources

O servidor expõe os arquivos de `knowledge/` como MCP Resources:

- URI format: `knowledge://{category}/{tableName}`
- Categorias: `core`, `custom`, `system`

---

## MCP Prompts (v5.0)

O servidor expõe 4 prompts predefinidos: `create_business_rule`, `debug_incident`, `analyze_table`, `onboarding_app`.

---

## Regras Importantes

1. **Nunca use `require()`** — o projeto é 100% ESM.
2. **Use `fs/promises`** para I/O de arquivos. Use `existsSync` apenas para checks de existência rápidos.
3. **Versão**: Atualize `VERSION` em `src/index.ts` E `"version"` em `package.json`.
4. **Testes**: TypeScript em `test/*.test.ts`. Rode `npm test` antes de commitar.
5. **Parâmetro `env`**: Opcional em todas as ferramentas. Use para rotear para instâncias específicas configuradas no `.env` com prefixo.
   - **Exemplo**: Se no `.env` houver `PDI_SN_INSTANCE`, use `env: "PDI"`.
   - **Exemplo**: Se houver `DEV_SN_INSTANCE`, use `env: "DEV"`.
   - Se omitido, usa as variáveis padrão (`SN_INSTANCE`, etc.).
6. **Knowledge First**: Sempre verifique os MCP Resources (`knowledge://category/table`) ou a pasta `knowledge/` antes de assumir nomes de campos. Se a tabela estiver documentada, use-a como fonte da verdade.
7. **Validação automática**: Os campos `table`, `sys_id` e `limit` são validados em todas as operações CRUD. Erros de validação são imediatos — corrija o valor antes de tentar novamente.
8. **Cache automático**: Todas as chamadas GET são cacheadas por 60 segundos por ambiente. Operações de escrita (POST, PATCH, DELETE) invalidam o cache automaticamente.
9. **Rate Limit com Backoff**: O servidor limita a 10 chamadas/segundo. Se exceder, aguarda automaticamente (até 5s) — não implemente retry manual.
10. **MCP Resources**: Use os Resources do protocolo (`knowledge://category/tableName`) para ler schemas de tabelas localmente sem gastar chamadas de API.
11. **Descoberta de ambientes**: Use `sn_list_envs` para ver quais instâncias estão configuradas e quais prefixos usar.
12. **Dashboard Aesthetics**: O painel segue a temática "Dark Tech" (preto/ciano, JetBrains Mono).
13. **No Delete**: Nunca adicione operações DELETE. Política de segurança.

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
