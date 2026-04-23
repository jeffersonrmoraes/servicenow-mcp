# Guia de Ferramentas — ServiceNow MCP Server (v7.2.0)

Este manual é destinado a Agentes de IA que consomem este servidor MCP.

---

## Convenções Gerais

1. **Parâmetro `env`**: Opcional em todas as ferramentas. Use para rotear para instâncias específicas configuradas no `.env` com prefixo.
   - **Exemplo**: Se no `.env` houver `PDI_SN_INSTANCE`, use `env: "PDI"`.
   - **Exemplo**: Se houver `DEV_SN_INSTANCE`, use `env: "DEV"`.
   - Se omitido, usa as variáveis padrão (`SN_INSTANCE`, etc.).
2. **Knowledge First**: Sempre verifique os MCP Resources (`knowledge://category/table`) ou a pasta `knowledge/` antes de assumir nomes de campos. Se a tabela estiver documentada, use-a como fonte da verdade.
3. **Validação automática**: Os campos `table`, `sys_id` e `limit` são validados em todas as operações CRUD. Erros de validação são imediatos — corrija o valor antes de tentar novamente.
4. **Cache automático**: Todas as chamadas GET são cacheadas por 60 segundos por ambiente. Operações de escrita (POST, PATCH, DELETE) invalidam o cache automaticamente.
5. **Rate Limit com Backoff**: O servidor limita a 10 chamadas/segundo. Se exceder, aguarda automaticamente (até 5s) — não implemente retry manual.
6. **MCP Resources**: Use os Resources do protocolo (`knowledge://category/tableName`) para ler schemas de tabelas localmente sem gastar chamadas de API.
7. **Descoberta de ambientes**: Use `sn_list_envs` para ver quais instâncias estão configuradas antes de começar.
8. **Activity Log**: Toda chamada de ferramenta é registrada automaticamente em `.sn-activity.jsonl`. O Dashboard lê esse arquivo via SSE em tempo real.

---

## Melhores Práticas para a IA

1. **Zero Guesswork**: Se não souber os campos de uma tabela, use `sn_sync_knowledge_base` para sincronizar os metadados antes de qualquer insert ou update.
2. **Diagnóstico de conexão**: Use `sn_health_check` para verificar se as credenciais estão corretas e qual versão do ServiceNow está em uso.
3. **Datasets grandes**: Use `sn_query_all` (com cursor `next_offset`) em vez de `sn_query_records` com offset manual para datasets acima de 1000 registros.
4. **Exports**: Use `sn_export_records` para extrair dados em JSON ou CSV para migração ou análise.
5. **Deploy seguro e obrigatório**: Antes de QUALQUER criação ou modificação de artefatos:
   1. Chame `sn_generate_execution_plan` — gere o plano e apresente ao usuário
   2. Aguarde aprovação explícita do usuário (`requires_approval: true` → não prossiga sem "sim")
   3. Crie o Update Set com `sn_create_update_set`
   4. **Imediatamente** defina-o como atual com `sn_set_current_update_set` — sem esta etapa as mudanças vão para o Update Set default
   5. Execute os artefatos (catalog items, scripts, etc.)
   6. Feche com `sn_complete_update_set`
6. **Análise de impacto**: Antes de alterar o schema de uma tabela, use `sn_analyze_impact` com `deep_discovery: true` para ver todas as referências em scripts.
7. **Qualidade de código**: Antes de promover um Update Set, execute `sn_check_update_set` para detectar problemas de boas práticas — N+1 queries, eval(), current.update(), URLs e secrets hardcoded, etc.
8. **Logs de sistema**: Use `sn_stream_syslog` para investigar erros em produção (requer role `admin`). Suporta filtros por nível (`debug`/`info`/`warn`/`error`) e intervalos relativos (`-1h`, `-30m`).
9. **JIT Harvester**: O servidor sincroniza automaticamente tabelas desconhecidas em background quando detecta um `table` não presente em `knowledge/`. Não é necessária ação manual — o contexto fica disponível nas próximas chamadas.
10. **Schema Warnings**: `sn_query_records`, `sn_create_record` e `sn_update_record` retornam `schema_warnings` ou `_schema_warnings` quando campos não reconhecidos são usados. Esses avisos são não-bloqueantes — a operação ainda é executada.
11. **Governança de Mudanças**: `sn_generate_execution_plan` é **obrigatório** antes de qualquer mutação. Não pule esta etapa mesmo que o usuário não mencione explicitamente — o prompt `safe_change_request` automatiza o fluxo completo.
12. **DELETE bloqueado**: Não existe ferramenta de exclusão física neste servidor MCP. Para inativar um registro use `sn_update_record` com `active: false`. Nunca tente contornar isso — exclusões físicas são irreversíveis e não geram entrada no Update Set.

---

## Blocos de Ferramentas por Domínio

### IA & Contexto
- `sn_sync_knowledge_base` — sincroniza metadados (incremental por padrão, default 50 tabelas)
- `sn_get_dependencies` — tabelas referenciadas por uma tabela (outbound)
- `sn_analyze_impact` — tabelas que referenciam uma tabela (inbound). `deep_discovery: true` escaneia scripts em 6 tabelas adicionais
- `sn_generate_ai_context` — contexto Markdown otimizado a partir de um registro

### Core CRUD
- `sn_query_records` — consulta com encoded query, campos e paginação por offset
- `sn_query_all` — paginação automática com cursor `next_offset`
- `sn_get_record` — busca por `sys_id`
- `sn_create_record` — criação genérica
- `sn_update_record` — atualização por `sys_id`
- `sn_bulk_update` — atualização em massa por encoded query
- `sn_clone_record` — duplicação de registro
- `sn_diff_records` — comparação entre ambientes
- `sn_search_global` — busca textual global
- `sn_list_envs` — lista ambientes configurados

### Metadados & Código
- `sn_upsert_metadata_script` — Business Rules, Script Includes, Client Scripts, UI Policies, Scheduled Jobs
- `sn_execute_script` — execução de scripts no servidor (requer Scripted REST customizada)
- `sn_manage_schema` — criação de tabelas e campos

### Front-end & UX
- `sn_manage_widget` — Service Portal Widgets
- `sn_manage_ui_action` — UI Actions (botões e menus)
- `sn_manage_ui_page` — UI Pages customizadas

### Service Catalog
- `sn_manage_catalog_item` — itens do catálogo (upsert idempotente por `name`)
- `sn_manage_catalog_variable` — variáveis de catalog items (upsert idempotente por `name` + `cat_item`)
- `sn_manage_catalog_choice` — choices (opções de dropdown) de variáveis Select Box. Tabela: `question_choice` (campo `question` = sys_id do `item_option_new`, campo `text` = label, campo `order` = sequência). **Nunca use** `sc_choice` (bloqueado via REST em PDIs) nem `item_option_new_set` (Variable Sets — tabela diferente)
- `sn_manage_catalog_category` — categorias do catálogo
- `sn_get_catalog_item_bundle` — leitura atômica (item + variáveis + client scripts)

### Flow Designer
- `sn_get_flow` — busca por nome ou `sys_id`
- `sn_activate_flow` — ativa ou desativa
- `sn_trigger_flow` — disparo manual via API
- `sn_list_flow_executions` — histórico de execuções para debug
- `sn_create_subflow` — cria Subflow reutilizável
- `sn_create_flow_action` — cria Action customizada

### Segurança & Acesso
- `sn_manage_acl` — ACLs e roles (upsert, add_role, remove_role)
- `sn_manage_notification` — notificações de email
- `sn_manage_access` — Roles, Grupos e acessos de usuários

### Governança de Mudanças
- `sn_generate_execution_plan` — **USAR ANTES DE QUALQUER MUTAÇÃO** — plano de execução com análise de impacto em tempo real (BRs, Client Scripts, ACLs, contagem de registros). Retorna `report_markdown`, `requires_approval` e `steps` estruturados com nível de risco

### Deploy & Update Sets
- `sn_create_update_set` — cria Update Set
- `sn_set_current_update_set` — define o Update Set ativo
- `sn_list_update_sets` — lista Update Sets (filtrável por estado)
- `sn_complete_update_set` — marca como completo
- `sn_check_update_set` — linter com 15 checks de boas práticas

### Logs & Observabilidade
- `sn_stream_syslog` — lê entradas do syslog por nível, intervalo e nó. **Requer role `admin`**
- `sn_get_node_log` — logs de nó específico do cluster. **Requer role `admin`**

### Attachments
- `sn_manage_attachment` — `action=upload` (Base64), `action=list` (lista por registro), `action=download` (retorna Base64)

### System Properties
- `sn_manage_sys_property` — `action=get` (por nome), `action=set` (upsert, suporte a private=true), `action=list` (por prefixo)

### Utilitários
- `sn_health_check` — diagnóstico de conectividade
- `sn_manage_choice` — opções de campos Choice (`sys_choice`)
- `sn_export_records` — exportação JSON ou CSV
- `sn_manage_email_template` — templates de email (`sysevent_email_template`)

---

## Linter de Update Sets — Checks Disponíveis

Use `sn_check_update_set` com o parâmetro `checks` para selecionar quais análises executar. Sem o parâmetro, todos os 15 checks rodam por padrão.

| Check | Severidade | Detecta |
|---|---|---|
| `try_catch` | warning | Scripts com GlideRecord sem bloco try/catch |
| `comments` | info | Scripts longos (>5 linhas) sem comentários |
| `hardcoded_sysids` | error | Strings de 32 chars hexadecimais hardcoded |
| `missing_deps` | warning/error | Script Includes ausentes ou inativas |
| `duplicate_methods` | error | Funções com o mesmo nome no mesmo script |
| `gr_in_loop` | error | `new GlideRecord` dentro de while/for — N+1 queries |
| `current_update` | error | `current.update()` em Business Rules — loop infinito |
| `eval_usage` | error | `eval()` — injeção de código e ofuscação |
| `client_server_api` | error | `GlideRecord`, `gs.*`, `GlideQuery` em Client Scripts |
| `no_limit_query` | warning | `GlideRecord.query()` sem `setLimit()` — full-table scan |
| `rest_no_timeout` | warning | `RESTMessageV2` sem `setHttpTimeout()` — thread starvation |
| `encoded_query_concat` | warning | Concatenação em `addEncodedQuery()` — query injection |
| `hardcoded_urls` | warning | URLs http/https hardcoded no script (exceto localhost) |
| `hardcoded_secrets` | error | Credenciais hardcoded: `password`, `api_key`, `token`, `secret`, `client_secret` |
| `missing_description` | info | Script Includes e Business Rules sem campo `description` preenchido |

---

## Comportamento de Segurança

- **Validação de inputs**: `tableName` deve seguir `[a-zA-Z0-9_]+`; `sys_id` deve ter 32 chars hexadecimais; `limit` deve ser inteiro entre 1 e 1000.
- **Startup**: O servidor valida `SN_INSTANCE` ao iniciar e emite aviso no stderr se não configurado.
- **Erros amigáveis**: Lookups de grupo, usuário e role retornam mensagem clara se o recurso não for encontrado (sem crash).
- **Mascaramento**: `sn_set_sys_property` com `private: true` armazena o valor mascarado na UI.
- **Admin guard**: `sn_stream_syslog` e `sn_get_node_log` verificam a role `admin` na instância antes de qualquer chamada.

---

## Conhecimento de Desenvolvimento ServiceNow

Padrões e armadilhas aprendidos em desenvolvimento real em instâncias PDI.

### 1. Escopo Global — Prefixo `u_`

Campos em tabelas no escopo global são automaticamente prefixados com `u_`. Use sempre `u_department`, não `department`.

```javascript
// ERRADO
gr.getValue("department");
// CORRETO
gr.getValue("u_department");
```

Isso afeta: campos em GlideRecord, choices (`element` em `sys_choice`), Client Scripts (`field`).

### 2. Herança da Tabela `task`

Tabelas que herdam de `task` exigem `short_description` preenchido para que `GlideRecord.insert()` funcione. Sem ele, o insert retorna `false` silenciosamente.

### 3. Configuração de Formulário (sys_ui_section)

| Campo | Tipo | Uso correto |
|-------|------|-------------|
| `view` | Reference | sys_id da view — NÃO a string "Default view" |
| `view_name` | String | Deve ser setado explicitamente como `"Default view"` (não é auto-populado via REST) |
| `caption` | translated_field | Label da seção visível no form |
| `title` | Boolean | `"true"` = exibir título da seção |

Sem `view_name`, o form renderer não encontra as seções. Não existe campo `position` em `sys_ui_section`.

### 4. Configuração de Lista (sys_ui_list)

Criar colunas de lista exige dois passos:
1. Criar `sys_ui_list` (pai) para tabela + view — incluir `view_name: "Default view"` explicitamente
2. Criar `sys_ui_list_element` com `list_id` referenciando o pai

### 5. URL Encoding em sysparm_query

Nunca concatene vírgulas diretamente em queries. Use `encodeURIComponent()` ou separe queries por tabela individualmente.

```javascript
// PERIGOSO — vírgulas quebram o filtro silenciosamente
`?sysparm_query=nameIN${t1},${t2}`

// CORRETO — uma query por vez ou encode explícito
`?sysparm_query=${encodeURIComponent(`name=${tableName}`)}`
```

### 6. Scripted REST API — Descoberta de URL

O ServiceNow atribui automaticamente um namespace à API. A URL real não é `/api/nome-que-você-deu`.

Para descobrir:
```
GET /api/now/table/sys_ws_definition?sysparm_query=name=<nome_da_api>&sysparm_fields=sys_id,name,base_uri
```

### 7. `sys_ui_element` não tem campo `name`

Queries `name=tabela` em `sys_ui_element` ignoram o filtro e retornam todos os registros. Filtre sempre por `sys_ui_section=<sys_id>`.

### 8. Limpeza de cache após alterações de layout

Após criar/alterar form layout via REST:
```
GET /cache.do
```
Aguarda redirect 302. Sem isso, o form renderiza o layout antigo.

### 9. Tipos de Variáveis de Catalog Item (`item_option_new.type`)

O campo `type` usa **valores numéricos** internamente — não use strings como `short_text` ou `yes_no`.

| Valor | Tipo de Campo |
|-------|--------------|
| `1`   | Yes / No |
| `2`   | Multi Line Text |
| `3`   | Multiple Choice |
| `4`   | Numeric Scale |
| `5`   | **Select Box** ← opções via `sn_manage_catalog_choice` |
| `6`   | **Single Line Text** ← mais comum para texto livre |
| `7`   | CheckBox |
| `8`   | Reference |
| `9`   | Date |
| `10`  | Date/Time |
| `16`  | Wide Single Line Text |
| `18`  | Lookup Select Box |

Armadilha: o valor `1` **não é** Single Line Text — é Yes/No. Nunca assuma correspondência posicional.

### 10. Anti-patterns detectados pelo linter (v7.0)

- **GlideRecord em loop**: Nunca instancie `new GlideRecord` dentro de `while(gr.next())`. Pré-carregue os dados antes do loop.
- **`current.update()` em Business Rules**: Causa loop infinito. Use `setWorkflow(false)` ou reestruture a lógica.
- **`eval()`**: Evite completamente. Use `JSON.parse()` para dados dinâmicos.
- **APIs server-only em Client Scripts**: `GlideRecord`, `gs.getProperty()`, `gs.log()` não existem no browser. Use `GlideAjax`.
- **`GlideRecord.query()` sem `setLimit()`**: Pode retornar a tabela inteira. Sempre use `setLimit(n)`.
- **`RESTMessageV2` sem timeout**: Chamadas externas bloqueiam threads. Sempre use `setHttpTimeout(ms)`.
- **URLs hardcoded em scripts**: Credenciais ou endpoints de integração hardcoded no script dificultam promoção entre ambientes. Use System Properties.
- **Secrets hardcoded**: Qualquer padrão `password =`, `api_key =`, `token =` etc. com valor literal é bloqueante. Use `gs.getProperty()` ou GlideCredentialStore.
- **Script Include sem `description`**: Dificulta manutenção e documentação automática. Sempre preencha a descrição.
