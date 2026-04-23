# ServiceNow MCP Server

[![v7.1.0](https://img.shields.io/badge/version-7.1.0-blue.svg)](https://github.com/jeffersonrmoraes/servicenow-mcp/releases)
[![ServiceNow](https://img.shields.io/badge/ServiceNow-Xanadu-green.svg)](https://www.servicenow.com)
[![MCP](https://img.shields.io/badge/Protocol-MCP-orange.svg)](https://modelcontextprotocol.io)
[![License](https://img.shields.io/badge/license-MIT-lightgrey.svg)](LICENSE)

O **ServiceNow MCP Server** é um conector de alta performance que permite que agentes de IA (**Claude**, **GitHub Copilot**, **Antigravity**) desenvolvam e gerenciem instâncias do ServiceNow diretamente via APIs nativas.

**v7.1.0** — 51 ferramentas ativas, 5 MCP Prompts. Nova ferramenta `sn_generate_execution_plan` com análise de impacto em tempo real. Novo prompt `safe_change_request` que guia o agente pelo fluxo Plan → Impact → Approval antes de qualquer operação mutante. Dashboard v3.0 com Graph Explorer (D3.js), Schema Search e Latency Heatmap.

---

## Índice

- [Requisitos](#requisitos)
- [Instalação Rápida](#instalação-rápida)
- [Configuração do Ambiente (.env)](#configuração-do-ambiente-env)
- [Instalação por Plataforma](#instalação-por-plataforma)
  - [Claude Desktop](#claude-desktop)
  - [Claude Code (CLI)](#claude-code-cli)
  - [VS Code + GitHub Copilot](#vs-code--github-copilot)
  - [Antigravity (Google Agentspace)](#antigravity-google-agentspace)
- [Dashboard v3.0](#dashboard-v30)
- [Incremental Harvester](#incremental-harvester)
- [Build & Testes](#build--testes)
- [Ferramentas Disponíveis](#ferramentas-disponíveis)
- [MCP Prompts](#mcp-prompts)
- [Changelog](#changelog)

---

## Requisitos

- **Node.js >= 18** (Recomendado: >= 20)
- **npm >= 9**
- Credenciais ServiceNow (Basic Auth ou OAuth 2.0)

---

## Instalação Rápida

```bash
git clone https://github.com/jeffersonrmoraes/servicenow-mcp.git
cd servicenow-mcp
npm install
```

---

## Configuração do Ambiente (.env)

O servidor carrega automaticamente as variáveis do arquivo `.env` na raiz.

```env
# Exemplo 1: Ambiente PDI
PDI_SN_INSTANCE=dev12345
PDI_SN_USER=admin
PDI_SN_PASSWORD=sua_senha

# Exemplo 2: Ambiente DEV
DEV_SN_INSTANCE=dev99999
DEV_SN_USER=admin
DEV_SN_PASSWORD=outra_senha

# Instância padrão (sem prefixo)
SN_INSTANCE=dev88888
SN_USER=admin
SN_PASSWORD=senha_padrao

# Cache persistente (opcional)
SN_CACHE_PERSIST=true
SN_CACHE_PERSIST_PATH=.sn-cache.json

# Activity log (opcional — sobrepõe o caminho padrão)
SN_ACTIVITY_LOG_PATH=.sn-activity.jsonl
```

Use o parâmetro `env` nas ferramentas para rotear entre ambientes:
- `env: "PDI"` → usa `PDI_SN_INSTANCE`, `PDI_SN_USER`, etc.
- `env: "DEV"` → usa `DEV_SN_INSTANCE`, `DEV_SN_USER`, etc.
- `env: ""` (ou omitido) → usa as variáveis sem prefixo (`SN_INSTANCE`, etc.)

---

## Instalação por Plataforma

### Claude Desktop

Abra seu `claude_desktop_config.json` e adicione a configuração exata baseada no seu diretório:

```json
{
  "mcpServers": {
    "servicenow-mcp": {
      "command": "npx",
      "args": [
        "-y",
        "tsx",
        "c:/servicenow-mcp/servicenow-mcp/src/index.ts"
      ],
      "workingDirectory": "c:/servicenow-mcp/servicenow-mcp",
      "disabled": false
    }
  }
}
```

### Claude Code (CLI)

```bash
claude mcp add servicenow -- npx tsx /caminho/para/servicenow-mcp/src/index.ts
```

Ou configure via `.mcp.json` na raiz do projeto:

```json
{
  "mcpServers": {
    "servicenow": {
      "command": "npx",
      "args": ["tsx", "/caminho/para/servicenow-mcp/src/index.ts"]
    }
  }
}
```

### VS Code + GitHub Copilot

Em `.vscode/mcp.json`:

```json
{
  "servers": {
    "servicenow": {
      "type": "stdio",
      "command": "npx",
      "args": ["tsx", "/caminho/para/servicenow-mcp/src/index.ts"]
    }
  }
}
```

### Antigravity (Google Agentspace)

Configure o servidor como `stdio` apontando para o arquivo principal.
**Configuração recomendada:**
- **Command**: `npx`
- **Args**: `["-y", "tsx", "c:/servicenow-mcp/servicenow-mcp/src/index.ts"]`
- **Working Directory**: `c:/servicenow-mcp/servicenow-mcp`

---

## Dashboard v3.0

O Dashboard é um painel web local que roda em paralelo ao servidor MCP, sem interferir na latência das ferramentas.

```bash
npm run dashboard
# Acesse: http://localhost:3000
```

### Funcionalidades

| Aba | O que faz |
|---|---|
| **ENVIRONMENTS** | Gerencia instâncias (.env), health check paralelo por ambiente, editor de config raw, OAuth 2.0 flow |
| **TOOLS** | Explorer com busca full-text e filtros por módulo, visualização de schema JSON + **Schema Search** integrada |
| **ACTIVITY** | Live feed via SSE (Server-Sent Events) com reconexão automática, filtro por tool, auto-scroll |
| **STATS** | Métricas de servidor, cache, knowledge base e activity log com auto-refresh a cada 30s + **Latency Heatmap** |
| **GOVERNANCE** | Linter de Update Sets com 15 checks de boas práticas — selecionáveis individualmente |
| **GRAPH** | **Graph Explorer** — visualização D3.js force-directed das relações entre tabelas (zoom, drag, sidebar de detalhes) |

### Linter de Update Sets (15 checks)

| Check | Severidade | Detecta |
|---|---|---|
| `try_catch` | warning | Scripts com GlideRecord sem bloco try/catch |
| `comments` | info | Scripts longos sem comentários |
| `hardcoded_sysids` | error | sys_ids de 32 chars hardcoded no código |
| `missing_deps` | warning/error | Script Includes referenciadas mas ausentes/inativas |
| `duplicate_methods` | error | Funções com o mesmo nome no mesmo script |
| `gr_in_loop` | **error** | `new GlideRecord` dentro de while/for — N+1 queries |
| `current_update` | **error** | `current.update()` em Business Rules — loop infinito |
| `eval_usage` | **error** | `eval()` — injeção de código |
| `client_server_api` | **error** | APIs server-only (`GlideRecord`, `gs.*`) em Client Scripts |
| `no_limit_query` | warning | `GlideRecord.query()` sem `setLimit()` — full-table scan |
| `rest_no_timeout` | warning | `RESTMessageV2` sem `setHttpTimeout()` — thread starvation |
| `encoded_query_concat` | warning | Concatenação em `addEncodedQuery()` — query injection |
| `hardcoded_urls` | warning | URLs http/https hardcoded (exceto localhost) |
| `hardcoded_secrets` | **error** | Credenciais hardcoded: password, api_key, token, secret, client_secret |
| `missing_description` | info | Script Includes e Business Rules sem campo `description` preenchido |

---

## Incremental Harvester

O Harvester sincroniza metadados da instância localmente em `knowledge/`. Usa `sys_updated_on` para baixar apenas o que mudou desde o último sincronismo (`knowledge/state.json`). Default: 50 tabelas por execução.

```bash
# Sincroniza apenas as mudanças desde a última execução
npm start -- sn_sync_knowledge_base --category CORE

# Força sincronismo completo
npm start -- sn_sync_knowledge_base --force

# Com garbage collection (remove schemas obsoletos)
npm start -- sn_sync_knowledge_base --force --cleanup
```

Os schemas ficam em `knowledge/core/`, `knowledge/custom/` e `knowledge/system/`.

---

## Build & Testes

```bash
# Type-check sem build
npm run type-check

# Build para produção (gera dist/)
npm run build

# Testes (TypeScript direto)
npm test

# Modo desenvolvimento com hot-reload
npm run dev

# Dashboard (http://localhost:3000)
npm run dashboard

# Tool Scaffolder — gera boilerplate de novo módulo
npm run add-tool <module> <sn_tool_name>
# Exemplo: npm run add-tool reporting sn_export_dashboard
```

---

## Ferramentas Disponíveis

51 ferramentas organizadas em 17 módulos.

### Core CRUD

| Ferramenta | Descrição |
|---|---|
| `sn_query_records` | Consulta registros com encoded query, filtros de campos e paginação por offset |
| `sn_query_all` | Paginação automática: retorna dados e cursor `next_offset` para datasets grandes |
| `sn_get_record` | Busca um registro específico pelo `sys_id` |
| `sn_create_record` | Cria registro genérico em qualquer tabela |
| `sn_update_record` | Atualiza campos de qualquer registro pelo `sys_id` |
| `sn_bulk_update` | Atualiza múltiplos registros por encoded query (até 500 registros) |
| `sn_clone_record` | Duplica um registro removendo campos sys_* somente-leitura |
| `sn_diff_records` | Compara o mesmo registro entre dois ambientes (ex: DEV vs PROD) |
| `sn_search_global` | Busca textual em múltiplas tabelas simultaneamente |
| `sn_list_envs` | Lista todos os ambientes configurados no `.env` com seus prefixos |

### Metadados & Código

| Ferramenta | Descrição |
|---|---|
| `sn_upsert_metadata_script` | Cria ou atualiza Business Rules, Script Includes, Client Scripts, UI Policies, Scheduled Jobs |
| `sn_execute_script` | Executa scripts no servidor via Scripted REST (com sanitização de segurança) |
| `sn_manage_schema` | Criação de tabelas e campos com tipos nativos do ServiceNow |

### IA & Contexto

| Ferramenta | Descrição |
|---|---|
| `sn_sync_knowledge_base` | Sincroniza metadados localmente (incremental via `state.json`, com garbage collection). Default: 50 tabelas |
| `sn_get_dependencies` | Lista tabelas referenciadas por uma tabela (Outbound Relationships) |
| `sn_analyze_impact` | Lista tabelas que referenciam uma tabela (Inbound). Com `deep_discovery: true` escaneia scripts em 6 tabelas |
| `sn_generate_ai_context` | Gera context window otimizado cruzando o registro com o schema local |

### Front-end & UX

| Ferramenta | Descrição |
|---|---|
| `sn_manage_widget` | Cria ou atualiza Service Portal Widgets (template, CSS, server/client scripts) |
| `sn_manage_ui_action` | Cria ou atualiza UI Actions (botões e menus em formulários e listas) |
| `sn_manage_ui_page` | Cria ou atualiza UI Pages customizadas (XHTML + CSS + scripts) |

### Service Catalog

| Ferramenta | Descrição |
|---|---|
| `sn_manage_catalog_item` | Cria ou atualiza itens do Service Catalog |
| `sn_manage_catalog_variable` | Cria ou atualiza variáveis de um Catalog Item |
| `sn_manage_catalog_category` | Cria ou atualiza categorias no Service Catalog |
| `sn_get_catalog_item_bundle` | Leitura atômica: configurações, variáveis e client scripts de um Catalog Item |

### Flow Designer

| Ferramenta | Descrição |
|---|---|
| `sn_get_flow` | Busca um Flow pelo nome ou `sys_id` |
| `sn_activate_flow` | Ativa ou desativa um Flow |
| `sn_trigger_flow` | Dispara um Flow manualmente via API |
| `sn_list_flow_executions` | Lista execuções recentes para monitoramento e debug |
| `sn_create_subflow` | Cria um Subflow reutilizável |
| `sn_create_flow_action` | Cria uma Action customizada reutilizável |

### Segurança & Acesso

| Ferramenta | Descrição |
|---|---|
| `sn_manage_acl` | Gestão de ACLs e roles associadas (upsert, list, add_role) |
| `sn_manage_notification` | Gestão de notificações de email |
| `sn_manage_access` | Gestão de Roles, Grupos e acessos de usuários |

### Deploy & Update Sets

| Ferramenta | Descrição |
|---|---|
| `sn_create_update_set` | Cria um Update Set |
| `sn_set_current_update_set` | Define o Update Set atual |
| `sn_list_update_sets` | Lista Update Sets disponíveis |
| `sn_complete_update_set` | Marca um Update Set como completo |
| `sn_generate_execution_plan` | Gera plano de execução + análise de impacto em tempo real antes de operações mutantes |
| `sn_check_update_set` | Linter de qualidade com 15 checks de boas práticas ServiceNow |

### Logs & Observabilidade

| Ferramenta | Descrição |
|---|---|
| `sn_stream_syslog` | Lê entradas do syslog da instância por nível, intervalo de tempo e nó. **Requer role admin** |
| `sn_get_node_log` | Busca logs de um nó específico do cluster com filtros de severity |

### Attachments

| Ferramenta | Descrição |
|---|---|
| `sn_upload_attachment` | Faz upload de arquivo (Base64) como anexo |
| `sn_list_attachments` | Lista todos os anexos de um registro |
| `sn_download_attachment` | Baixa o conteúdo de um anexo em Base64 |

### System Properties

| Ferramenta | Descrição |
|---|---|
| `sn_get_sys_property` | Busca o valor de uma System Property pelo nome |
| `sn_set_sys_property` | Cria ou atualiza uma System Property (upsert) |
| `sn_list_sys_properties` | Lista System Properties filtrando por prefixo |

### Utilitários

| Ferramenta | Descrição |
|---|---|
| `sn_health_check` | Testa conectividade e retorna versão, instância e usuário |
| `sn_manage_choice` | Gerencia opções de campos Choice (`sys_choice`) |
| `sn_export_records` | Exporta registros em JSON ou CSV (até 1000 registros) |
| `sn_manage_email_template` | Gerencia templates de email reutilizáveis |

---

## MCP Prompts

O servidor expõe 5 prompts predefinidos que guiam agentes de IA em workflows comuns:

| Prompt | Descrição |
|---|---|
| `create_business_rule` | Guia passo-a-passo para criar uma Business Rule |
| `debug_incident` | Workflow para investigar e diagnosticar um incident |
| `analyze_table` | Análise completa: schema, dependencies, ACLs, scripts |
| `onboarding_app` | Scaffold de uma aplicação de onboarding completa |
| `safe_change_request` | **Governança de Mudanças**: gera plano de execução + análise de impacto e aguarda aprovação antes de qualquer operação mutante |

## Governança de Mudanças — Fluxo Plan → Impact → Approval

A partir da v7.1.0, o MCP oferece um fluxo de segurança consultivo para operações mutantes. O prompt `safe_change_request` instrui o agente a:

1. **Planejar** — chamar `sn_generate_execution_plan` para gerar um plano detalhado
2. **Analisar o impacto** — a ferramenta consulta a instância em tempo real (Business Rules, Client Scripts, ACLs, registros afetados)
3. **Pedir aprovação** — se `requires_approval: true`, o agente para e aguarda confirmação explícita do usuário antes de executar qualquer operação

> **Importante**: O fluxo é consultivo — o MCP não bloqueia tecnicamente chamadas subsequentes. O prompt guia a IA a interromper e solicitar aprovação explícita do usuário.

### `sn_generate_execution_plan` — Parâmetros

| Parâmetro | Tipo | Descrição |
|---|---|---|
| `operation_type` | string | `create_table`, `modify_table`, `create_script`, `modify_script`, `deploy_update_set`, `modify_acl`, `bulk_update`, `generic` |
| `description` | string | Descrição clara do que será feito (obrigatório) |
| `target_table` | string | Tabela principal envolvida (ex: `incident`) |
| `target_name` | string | Nome do script ou artefato alvo |
| `update_set_id` | string | sys_id do Update Set — aparecerá no plano de lint |
| `preview_query` | string | Encoded query para `bulk_update` — conta registros afetados |
| `env` | string | Prefixo do ambiente (ex: `PDI`, `DEV`) |

O retorno inclui `report_markdown` com plano completo, `requires_approval` (boolean), e campo `steps` estruturado com ferramenta e nível de risco por passo.

---

## Segurança

- **Operações de delete**: Completamente removidas por política de segurança. Use a interface do ServiceNow para operações destrutivas.
- **Script sanitization**: `sn_execute_script` e `sn_upsert_metadata_script` bloqueiam operações perigosas (`deleteMultiple`, `Packages.java`, `Runtime`, etc.).
- **OAuth tokens**: Armazenados apenas em memória durante a sessão. Nunca persistidos em `.env` via código.
- **Retry**: Backoff exponencial automático para erros 429, 500, 502, 503, 504.
- **LRU Cache**: Limite máximo de entradas para prevenir memory leaks. Persistência opcional em JSON.
- **Admin guard**: `sn_stream_syslog` e `sn_get_node_log` verificam a role `admin` via API antes de executar.

---

## Changelog

| Versão | Data | Destaque |
|---|---|---|
| **v7.1.0** | 2026-04-23 | Governança de Mudanças: `sn_generate_execution_plan` (análise de impacto em tempo real — BRs, Client Scripts, ACLs, bulk count). Prompt `safe_change_request` (fluxo Plan→Impact→Approval). 51 ferramentas, 5 prompts. 14 testes unitários para o planner. |
| **v7.0.0** | 2026-04-23 | Dashboard v3.0 (Graph Explorer D3.js, Schema Search, Latency Heatmap, 6 abas). JIT Harvester (auto-sync de tabelas desconhecidas em background). Schema-Aware Validation (warnings de campos inválidos em CRUD). Linter expandido para 15 checks (`hardcoded_urls`, `hardcoded_secrets`, `missing_description`). Governance sub-modularizado (`src/tools/governance/`). Tool Scaffolder CLI (`npm run add-tool`). |
| **v6.0.0** | 2026-04-17 | 50 ferramentas. Dashboard v2.0 (5 abas, SSE live activity, linter UI). Novos módulos: `sn_stream_syslog`, `sn_get_node_log` (admin-only), `sn_check_update_set` (12 checks). Cache persistente em JSON. Activity log JSONL (IPC MCP→Dashboard). Deep Discovery em `sn_analyze_impact`. Harvester default 50 tabelas. |
| **v5.0.0** | 2026-04-17 | 46 ferramentas. Arquitetura split (15 módulos). LRU cache com eviction. Retry com exponential backoff. MCP Prompts (4). Novos tools: `sn_clone_record`, `sn_diff_records`, `sn_search_global`. Script sanitization. OAuth memory-only. Delete completamente removido. Testes migrados para TypeScript. Build step com `tsc`. |
| **v4.2.0** | 2026-04-13 | 44 ferramentas ativas. Novos módulos: `sn_query_all`, `sn_list_envs`, `sn_manage_ui_page`, `sn_activate_flow`, `sn_list_flow_executions`, `sn_create_subflow`, `sn_create_flow_action`, `sn_set_current_update_set`, `sn_list_update_sets`, `sn_complete_update_set`, `sn_export_records`, `sn_manage_email_template`. |
| **v4.0.0** | 2026-04-08 | Migração completa para TypeScript. Harvester incremental via `state.json`. `sn_get_dependencies` e `sn_analyze_impact`. ESM nativo com `tsx`. |
| **v3.9.0** | 2026-04-08 | MCP Resources: exposição de `knowledge/` como `knowledge://category/table`. Rate limiter com backoff inteligente. Paginação por offset. |
| **v3.8.1** | 2026-03-29 | Security hardening: validação de inputs, cache TTL, rate limiting, testes unitários. |

---

## Para Agentes de IA

Leia as convenções em [GEMINI.md](GEMINI.md) e o guia de uso em [AI_REFERENCE.md](AI_REFERENCE.md) antes de qualquer intervenção.
