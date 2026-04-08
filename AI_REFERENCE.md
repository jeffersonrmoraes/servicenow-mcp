# Guia de Ferramentas - ServiceNow MCP Server (v3.8.1)

Este manual é destinado a Agentes de IA que consomem este servidor MCP.

---

## 🏛️ Convenções Gerais

1. **Parâmetro `env`**: Opcional. Use para rotear para instâncias específicas.
2. **Dashboard Visual**: Use o `npm run dashboard` para gerenciar seus ambientes visualmente antes de começar a codar.
3. **Knowledge First (v3.8)**: Sempre verifique a pasta `knowledge/` no diretório raiz. Se a tabela que você vai usar estiver documentada lá, use-a como fonte da verdade para nomes de campos e tipos.
4. **Validação de Inputs (v3.8.1)**: Os campos `table`, `sys_id` e `limit` são validados automaticamente em todas as operações CRUD. Nomes de tabela devem seguir o padrão `[a-zA-Z0-9_]+`. sys_ids devem ter 32 caracteres hexadecimais. Limites devem ser inteiros entre 1 e 1000.
5. **Cache automático (v3.8.1)**: Todas as chamadas `GET` são cacheadas por 60 segundos por ambiente. Operações de escrita (`POST`, `PATCH`, `DELETE`) invalidam o cache do path afetado automaticamente.
6. **Rate Limit (v3.8.1)**: O servidor limita a 10 chamadas/segundo por ambiente. Se exceder, o erro é retornado à IA com mensagem clara — aguarde e tente novamente.

---

## 🎨 Principais Blocos de Ferramentas

- **IA & Contexto**: `sn_sync_knowledge_base`, `sn_generate_ai_context`.
- **Front-end & UX**: `sn_manage_widget`, `sn_manage_ui_action`.
- **Desenvolvimento**: `sn_upsert_metadata_script`, `sn_manage_schema`.
- **Segurança**: `sn_manage_acl`, `sn_manage_access`.

---

## 💡 Melhores Práticas para a IA

1. **Zero Guesswork**: Se não souber os campos de uma tabela, use `sn_sync_knowledge_base` para sincronizar os metadados antes de tentar inserir ou atualizar registros.
2. **Validação Visual**: Se estiver criando um Widget, lembre-se que o usuário pode validar a conexão da instância via Dashboard.
3. **Setup amigável**: Se o usuário tiver problemas de conexão, sugira que ele use o Dashboard (`localhost:3000`) para testar as credenciais.
4. **Erros de validação**: Se receber erro de `tableName inválido` ou `sys_id inválido`, corrija o valor antes de tentar novamente — não é um erro de rede.
5. **Rate limit**: Se receber `Rate limit excedido`, não repita imediatamente. Aguarde 1 segundo antes da próxima chamada.
6. **Cache hit**: Respostas GET repetidas para o mesmo path/query retornam do cache (60s). Para forçar dados frescos, use `sn_query_records` com parâmetros diferentes ou aguarde o TTL.

---

## 🔒 Comportamento de Segurança (v3.8.1)

- **Dashboard `/api/env`**: Retorna apenas o conteúdo do arquivo `.env` — não expõe variáveis do processo do sistema.
- **Erros amigáveis**: Lookups de grupo, usuário e role retornam mensagem clara se o recurso não for encontrado (não causa crash).
- **Startup**: O servidor valida `SN_INSTANCE` ao iniciar e emite aviso no stderr se não configurado.

---

## 🧠 Conhecimento de Desenvolvimento ServiceNow

Esta seção documenta padrões, armadilhas e convenções aprendidas em desenvolvimento real em instâncias PDI. Leia antes de criar tabelas, scripts ou configurações de UI.

### 1. Escopo Global — Prefixo `u_`

Campos criados em tabelas no **escopo global** são automaticamente prefixados com `u_`. Nunca assuma que o campo se chama `department` — ele será `u_department`.

- Ao criar Script Includes, Business Rules, Client Scripts: sempre use `u_campo` nos GlideRecord
- Choices (opções de campo choice): o campo `element` do registro `sys_choice` deve ser `u_department`, não `department`
- Client Scripts: o campo `field` deve referenciar `u_department`, não `department`

```javascript
// ERRADO
gr.getValue("department");
// CORRETO
gr.getValue("u_department");
```

### 2. Herança da Tabela `task`

Tabelas que herdam de `task` (ex: `incident`, tabelas customizadas com parent=task) **exigem** o campo `short_description` preenchido para que `GlideRecord.insert()` funcione. Sem ele, o insert retorna `false` silenciosamente.

```javascript
gr.setValue("u_task_name",       taskName);
gr.setValue("short_description", taskName); // obrigatório — herança de task
var sysId = gr.insert();
if (!sysId) throw new Error("insert falhou: " + taskName);
```

### 3. Configuração de Formulário (sys_ui_section)

| Campo | Tipo | Uso correto |
|-------|------|-------------|
| `name` | String | Nome da tabela (ex: `incident`) |
| `view` | Reference | **sys_id** da view — NÃO a string "Default view" |
| `caption` | translated_field | Rótulo da seção visível no form |
| `title` | Boolean | `"true"` = exibir título da seção; `"false"` = ocultar |
| `position` | Integer | Ordem da seção no form (0, 1, 2...) |

**Como encontrar o sys_id da Default View:**
```
GET /api/now/table/sys_ui_view?sysparm_query=name%3Ddefault&sysparm_fields=sys_id,name,title
```
O sys_id da view "default" é fixo por instância. Exemplo PDI: `a07bae06183232108bb255f46a373a6e`.

**Criar seção corretamente:**
```json
POST /api/now/table/sys_ui_section
{
  "name":      "nome_da_tabela",
  "view":      "a07bae06183232108bb255f46a373a6e",
  "view_name": "Default view",
  "caption":   "Informações do Funcionário",
  "title":     "true"
}
```
> **Atenção:** `view_name` NÃO é auto-populado quando se usa `view` (sys_id) via REST API. Deve ser definido explicitamente como `"Default view"`. Sem ele, o form renderer não encontra as seções. Não existe campo `position` em `sys_ui_section`.

**Criar elemento de campo na seção:**
```json
POST /api/now/table/sys_ui_element
{
  "name":           "nome_da_tabela",
  "view":           "a07bae06183232108bb255f46a373a6e",
  "sys_ui_section": "<sys_id da seção criada acima>",
  "element":        "u_nome_do_campo",
  "position":       "0",
  "type":           "field"
}
```

### 4. Configuração de Lista (sys_ui_list + sys_ui_list_element)

Colunas de lista **não** são inseridas diretamente via `sys_ui_list_element` isolado. É obrigatório:
1. Criar o registro pai `sys_ui_list` para a tabela + view
2. Criar os `sys_ui_list_element` referenciando o `list_id` do pai

```json
// Passo 1 — criar lista (view_name é obrigatório — não é auto-populado via REST)
POST /api/now/table/sys_ui_list
{ "name": "nome_da_tabela", "view": "<sys_id da view>", "view_name": "Default view" }

// Passo 2 — adicionar colunas (requer o sys_id retornado acima)
POST /api/now/table/sys_ui_list_element
{
  "name":     "nome_da_tabela",
  "list_id":  "<sys_id do sys_ui_list>",
  "element":  "u_campo",
  "position": "0"
}
```

### 5. URL Encoding em sysparm_query

**Nunca** construa URLs com parâmetros de query manualmente concatenando strings com vírgulas. Sempre use `encodeURIComponent()`.

```javascript
// PERIGOSO — vírgulas não codificadas podem quebrar o filtro silenciosamente
const url = `/api/now/table/sys_ui_element?sysparm_query=nameIN${t1},${t2}`;

// CORRETO
function tableUrl(table, params) {
  const qs = Object.entries(params)
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
    .join("&");
  return `/api/now/table/${table}?${qs}`;
}
// Ex: sysparm_query com vírgula no valor IN:
tableUrl("sys_ui_element", {
  sysparm_query: `name=${tableName}`,  // um valor por vez é mais seguro
  sysparm_fields: "sys_id,name,element",
  sysparm_limit: "50"
});
```

**Prefira queries separadas por tabela** ao invés de `nameINtabela1,tabela2` — evita comportamentos imprevistos de parsing.

### 6. Scripted REST API — Descoberta de URL

O ServiceNow atribui automaticamente um namespace à API REST criada. A URL final **não** é `/api/nome_que_você_deu` — é `/api/<namespace>/<base_uri>`.

Para descobrir a URL real após criar a API:
```
GET /api/now/table/sys_ws_definition?sysparm_query=name=<nome_da_api>&sysparm_fields=sys_id,name,base_uri
```
O campo `base_uri` retorna o caminho completo incluindo o namespace gerado (ex: `/api/1964763/smart_onboarding`).

### 7. Validação em Business Rules — Cuidados com Script Includes

Business Rules que delegam validação a um Script Include podem falhar silenciosamente se o SI usa campos sem o prefixo `u_`. Prefira inline validation no BR para casos críticos:

```javascript
// Inline validation — mais seguro em escopo global
var dept  = current.getValue("u_department");
var name  = current.getValue("u_employee_name");
var email = current.getValue("u_employee_email");
if (!dept || !name || !email) {
    gs.log("Campos ausentes — abortando", "BusinessRule");
    return;
}
```

### 8. Diagnóstico de Business Rule sem Efeito

Se um Business Rule dispara mas não produz resultado (ex: 0 tarefas criadas), isole o problema com um BR mínimo de diagnóstico:

```javascript
// BR diagnóstico — sem Script Includes
(function executeRule(current, previous) {
    gs.log("BR disparou. sys_id=" + current.sys_id, "Diagnose");
    var gr = new GlideRecord("u_x_sua_tabela");
    gr.initialize();
    gr.setValue("short_description", "teste");
    gr.setValue("u_campo", "valor");
    var id = gr.insert();
    gs.log("insert result: " + id, "Diagnose");
})(current, previous);
```
Se `insert` retornar false: verifique se a tabela herda de `task` e se `short_description` está preenchido.

### 9. Módulos de Navegação (sys_app_module)

Para criar módulos de lista e formulário novo:

```json
POST /api/now/table/sys_app_module
{
  "name":        "Nome do Módulo",
  "application": "<sys_id do sys_app_application>",
  "table_name":  "nome_da_tabela",
  "link_type":   "LIST",   // ou "NEW" para formulário de criação
  "active":      "true",
  "order":       "100"
}
```

Sempre verifique se o menu da aplicação (`sys_app_application`) já existe antes de criar — filtre por `title=Nome Exato`.
