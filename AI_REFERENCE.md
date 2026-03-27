# Referência do ServiceNow MCP Server para IA

Este documento serve como um guia de referência rápido e detalhamento de arquitetura para qualquer Inteligência Artificial (Agent) operando neste repositório ou consumindo suas ferramentas.

## 1. Visão Geral
O **ServiceNow MCP Server** é um servidor compatível com o **Model Context Protocol (MCP)** projetado para expor funcionalidades do ServiceNow para agentes de IA (como Claude, GitHub Copilot e Google Agentspace). Ele funciona recebendo requisições `CallToolRequestSchema` e repassando para a instância do ServiceNow através de APIs REST (`/api/now/table/...`).

### Arquitetura Básica
- `index.js`: Ponto de entrada. Declara as capacidades do servidor, carrega todas as ferramentas do diretório `tools/` e delega a execução para o handler correspondente.
- `lib/client.js`: Cliente HTTP (wrapper sobre `fetch`) para lidar genericamente com métodos GET, POST, PATCH e DELETE no ServiceNow. Trata a injeção do header de autorização (Basic Auth).
- `tools/*.js`: Módulos agrupados por domínio (Scripting, Catalog, Flow, Security, Deploy) que expõem arrays com a definição das ferramentas (schemas JSON) e as funções `handleXPTO(name, args)`.

---

## 2. Categorias de Ferramentas (Tools)

O servidor possui quase 50 ferramentas diferentes. **Regra de ouro para a IA:** Sempre prefira a ferramenta específica de domínio (ex: `sn_create_business_rule`) no lugar da genérica (`sn_create_record`), pois a específica lida com o mapeamento correto dos campos (ex: converte booleanos ou flags de insert/update).

### 2.1 Leitura e Consultas Genéricas (`scripts.js`)
- `sn_query_records`: Excelente para fazer filtros (`sysparm_query`) e descobrir `sys_id`s de registros que você precisa manipular.
- `sn_get_record`: Retorna os campos exatos de um registro usando o `sys_id`.
- `sn_create_record` / `sn_update_record` / `sn_delete_record`: Operações CRUD puras e genéricas. Use **apenas** quando não existir uma ferramenta específica para a tabela desejada.

### 2.2 Scripts Server-Side e Client-Side (`scripts.js`)
- **Server:** `sn_create_business_rule`, `sn_update_business_rule`, `sn_create_script_include`, `sn_update_script_include`.
- **Background:** `sn_execute_script`. **Atenção:** Requer que o ServiceNow tenha um Scripted REST API customizado (`x_dev_agent`) configurado na instância para funcionar.
- **Client/UI:** `sn_create_client_script`, `sn_update_client_script`, `sn_create_ui_policy`, `sn_update_ui_policy`, `sn_create_scheduled_job`, `sn_update_scheduled_job`.
- **DDL:** `sn_create_table`, `sn_create_field`.

### 2.3 Catálogo de Serviços (`catalog.js`)
- Abrange criação de variáveis (Items, Variables, Categories): `sn_create_catalog_item`, `sn_create_catalog_variable`, `sn_update_catalog_variable`, etc.
- Ao criar variáveis, sempre verifique seu `type` (Select, Reference, MultiLine, etc).

### 2.4 Flow Designer (`flow.js`)
- Permite gerenciar regras de negócios em flows (`sn_get_flow`, `sn_activate_flow`, `sn_create_subflow`, `sn_create_flow_action`).
- Execução: `sn_trigger_flow` para forçar o início de um flow e `sn_list_flow_executions` para analisar saídas de erro.

### 2.5 Segurança, Usuários e Notificações (`security.js`)
- **Segurança:** `sn_create_acl`, `sn_update_acl`, `sn_delete_acl`, e operações conectadas como `sn_add_role_to_acl`.
- **Notificação:** `sn_create_notification` usa HTML (`body`). Seja cuidadoso na construção da string HTML.
- **Identidade e Acesso:** `sn_create_role`, `sn_add_user_to_group`, `sn_assign_role_to_user`, `sn_list_group_members`.

### 2.6 Deploy & Update Sets (`deploy.js`)
- `sn_create_update_set`, `sn_set_current_update_set`, `sn_list_update_sets`, `sn_complete_update_set`. 
- **Dica:** Ao realizar múltiplas tarefas solicitadas pelo usuário, considere empacotá-las em um Update Set ativo (`sn_set_current_update_set`).

---

## 3. Diretrizes e Boas Práticas (Para IAs)

1. **Nunca invente/adivinhe `sys_id`s.**
   Sempre use as funções de consulta (`sn_query_records`) procurando pelo `name` ou outras tags textuais primeiro para encontrar o `sys_id` antes de invocar um `sn_update_*` ou relacionar registros.

2. **Atente-se à Especificidade de Enums e Payloads.**
   A ferramenta pode esperar parâmetros estritos do JSON Schema (ex: `when` num Business Rule tem de ser `before`, `after`, `async`, ou `display`). Respeite os Enums estritos documentados em cada ferramenta.

3. **Injeção de Scripts (Escapes).**
   Ao injetar payloads JSON contendo blocos extensos de código Javascript (ex: Script Includes, Business Rules, Flow Actions), verifique os escapes de strings para assegurar que a requisição não falhe sintaticamente ("Unexpected token").

4. **Tratamento de Erros:**
   Exceções disparadas no HTTP client geram trace de stack com o `res.status` e `res.text()`. Analise esse feedback detalhadamente; requisições 403 geralmente indicam permissão insuficiente. O executor `x_dev_agent` falha com 403 caso o usuário não tenha a role "admin".

5. **Lógica de Autenticação não deve ser modificada nas chamadas de Tool:**
   O Servidor usa as ENV vars `SN_INSTANCE`, `SN_USER` e `SN_PASSWORD`. Elas fluem do cliente MCP direto para o processo Node, logo, não é necessário enviar credenciais nos argumentos das ferramentas.

---
*Lembre-se: Antes de atuar ativamente num ambiente do usuário, valide a estabilidade dos registros (test-reads). Use as ferramentas específicas e leia os `sys_id`s reais do servidor!*
