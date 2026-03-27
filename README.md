<p align="center">
  <h1 align="center">🔧 ServiceNow MCP Server</h1>
  <p align="center">
    <strong>Integração entre agentes de IA e o ServiceNow via Model Context Protocol (MCP)</strong><br>
    Compatível com <b>Claude Desktop</b> · <b>VS Code (GitHub Copilot)</b> · <b>Google Agentspace (Antigravity)</b>
  </p>
  <p align="center">
    <img src="https://img.shields.io/badge/version-2.1.0-blue" alt="version" />
    <img src="https://img.shields.io/badge/tools-50+-green" alt="tools" />
    <img src="https://img.shields.io/badge/node-%3E%3D18-brightgreen" alt="node" />
    <img src="https://img.shields.io/badge/license-MIT-yellow" alt="license" />
    <img src="https://img.shields.io/badge/multi--instance-✓-purple" alt="multi-instance" />
  </p>
</p>

---

## ✨ Destaques

- **~50 ferramentas** cobrindo Scripts, Catalog, Flows, ACLs, Notificações, Roles, Deploy e mais
- **Multi-Instância Dinâmica** — gerencie N clientes/ambientes a partir de um único processo Node
- **Compatível com qualquer AI Agent** que suporte o protocolo MCP (Claude, Copilot, Agentspace)
- **Zero configuração de API** — usa a Table API nativa do ServiceNow (`/api/now/table/...`)
- **Arquitetura modular** — cada domínio é um módulo isolado em `tools/`

---

## 🚀 Instalação

### Pré-requisitos
- Node.js 18+
- Acesso admin na instância ServiceNow

### Passos

```bash
git clone https://github.com/jeffersonrmoraes/servicenow-mcp.git
cd servicenow-mcp
npm install
cp .env.example .env   # preencha com suas credenciais
node index.js          # ServiceNow MCP Server v2.2.0 rodando — 55 ferramentas ativas
```

---

## 🌐 Múltiplas Instâncias Dinâmicas (Multi-Tenant)

O servidor possui suporte nativo para conectar em **múltiplas instâncias do ServiceNow simultaneamente**. As ferramentas se roteiam automaticamente baseadas num prefixo de ambiente pré-configurado — sem exigir novos processos ou reinicializações.

### Como funciona

Todas as ferramentas aceitam um parâmetro opcional `env`. Quando informado, o servidor busca as credenciais com o prefixo correspondente. Quando omitido, utiliza as credenciais padrão (fallback).

```
┌─────────────────┐    env: "DEV"     ┌──────────────────────────┐
│   AI Agent      │──────────────────▶│  DEV_SN_INSTANCE         │
│  (Claude, etc)  │                   │  DEV_SN_USER             │
│                 │    env: "PROD"    │  DEV_SN_PASSWORD         │
│                 │──────────────────▶├──────────────────────────┤
│                 │                   │  PROD_SN_INSTANCE        │
│                 │    env: null      │  PROD_SN_USER            │
│                 │──────────────────▶│  PROD_SN_PASSWORD        │
└─────────────────┘   (fallback)      ├──────────────────────────┤
                                      │  SN_INSTANCE (default)   │
                                      │  SN_USER                 │
                                      │  SN_PASSWORD             │
                                      └──────────────────────────┘
```

### Configuração no `.env`

```env
# ── Conexão Padrão (Fallback) ──────────────────
SN_INSTANCE=https://seu-dominio.service-now.com
SN_USER=admin
SN_PASSWORD=sua-senha

# ── Instância de Desenvolvimento ────────────────
DEV_SN_INSTANCE=https://dev-cliente.service-now.com
DEV_SN_USER=admin
DEV_SN_PASSWORD=dev-senha

# ── Instância de Produção ──────────────────────
PROD_SN_INSTANCE=https://prod-cliente.service-now.com
PROD_SN_USER=svc_produser
PROD_SN_PASSWORD=prod-senha-segura
```

### Uso pela IA

A IA simplesmente passa `"env": "DEV"` ao chamar qualquer ferramenta:
```json
{
  "name": "sn_query_records",
  "arguments": {
    "table": "incident",
    "query": "priority=1",
    "env": "DEV"
  }
}
```

---

## ⚙️ Configuração por ambiente

### 🟣 Claude Desktop

- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "servicenow": {
      "command": "node",
      "args": ["C:\\caminho\\para\\servicenow-mcp\\index.js"],
      "env": {
        "SN_INSTANCE": "https://seu-dominio.service-now.com",
        "SN_USER": "admin",
        "SN_PASSWORD": "sua-senha",
        "DEV_SN_INSTANCE": "https://dev-cliente.service-now.com",
        "DEV_SN_USER": "admin",
        "DEV_SN_PASSWORD": "dev-senha"
      }
    }
  }
}
```

### 🟦 VS Code (GitHub Copilot)

Crie `.vscode/mcp.json` na raiz do projeto:

```json
{
  "servers": {
    "servicenow": {
      "type": "stdio",
      "command": "node",
      "args": ["C:\\caminho\\para\\servicenow-mcp\\index.js"],
      "env": {
        "SN_INSTANCE": "https://seu-dominio.service-now.com",
        "SN_USER": "admin",
        "SN_PASSWORD": "sua-senha"
      }
    }
  }
}
```

No painel do Copilot Chat, troque para o modo **Agent**.

### 🟡 Google Agentspace (Antigravity)

1. Abra uma sessão de Agent
2. Clique em **"..." → MCP Servers → Manage MCP Servers → View raw config**
3. Adicione o bloco `servicenow-mcp` no `mcp_config.json`
4. Clique em **Refresh**

---

## 🗂️ Estrutura do projeto

```
servicenow-mcp/
├── index.js            ← Orquestrador MCP (< 80 linhas)
├── lib/
│   └── client.js       ← HTTP client dinâmico (snGet, snPost, snPatch, snDelete)
├── tools/
│   ├── scripts.js      ← Business Rules, Script Includes, Client Scripts, UI Policies, Scheduled Jobs, CRUD
│   ├── catalog.js      ← Service Catalog (itens, variáveis, categorias)
│   ├── flow.js         ← Flow Designer (flows, subflows, actions, execuções)
│   ├── security.js     ← ACLs + Notifications + Roles e Grupos
│   └── deploy.js       ← Update Sets
├── AI_REFERENCE.md     ← Guia de referência para IAs consumidoras
├── .env.example
└── package.json
```

---

## 🛠️ Ferramentas disponíveis (~50 total)

> **Nota:** Todas as ferramentas aceitam o parâmetro opcional `env` para roteamento multi-instância.

### 🔍 Leitura e Consulta
| Ferramenta | Descrição |
|---|---|
| `sn_query_records` | Consulta registros de qualquer tabela com filtros (encoded query) |
| `sn_get_record` | Busca registro específico por sys_id |

### ⚙️ Scripts Server-Side
| Ferramenta | Descrição |
|---|---|
| `sn_create_business_rule` | Cria Business Rule (before, after, async, display) |
| `sn_update_business_rule` | Atualiza script, condição, quando e ações |
| `sn_create_script_include` | Cria biblioteca reutilizável server-side |
| `sn_update_script_include` | Atualiza script, descrição e client_callable |
| `sn_create_scheduled_job` | Cria Scheduled Script Execution |
| `sn_update_scheduled_job` | Atualiza script e frequência |
| `sn_execute_script` | Executa script em background* |

### 🖥️ Interface / UX
| Ferramenta | Descrição |
|---|---|
| `sn_create_client_script` | Cria Client Script (onLoad, onChange, onSubmit, onCellEdit) |
| `sn_update_client_script` | Atualiza script, tipo e campo alvo |
| `sn_create_ui_policy` | Cria UI Policy com condições |
| `sn_update_ui_policy` | Atualiza condição, script e status |

### 🛒 Service Catalog
| Ferramenta | Descrição |
|---|---|
| `sn_create_catalog_item` | Cria item com descrição, categoria, workflow e fulfillment |
| `sn_update_catalog_item` | Atualiza qualquer campo do item |
| `sn_create_catalog_variable` | Cria variáveis: Text, Select, Reference, CheckBox, Date... |
| `sn_update_catalog_variable` | Atualiza texto, obrigatoriedade, ordem e valor padrão |
| `sn_create_catalog_category` | Cria categorias no catálogo |

### 🔄 Flow Designer
| Ferramenta | Descrição |
|---|---|
| `sn_get_flow` | Busca flows por nome ou sys_id |
| `sn_activate_flow` | Ativa ou desativa um flow |
| `sn_trigger_flow` | Dispara um flow via API com inputs customizados |
| `sn_list_flow_executions` | Lista execuções com filtro de status (debug) |
| `sn_create_subflow` | Cria subflow reutilizável |
| `sn_create_flow_action` | Cria Action customizada com script |

### 🔐 ACLs e Segurança
| Ferramenta | Descrição |
|---|---|
| `sn_create_acl` | Cria ACL (record, rest, soap) com role, script e condição |
| `sn_update_acl` | Atualiza role, script, condição e status |
| `sn_delete_acl` | Remove uma ACL pelo sys_id |
| `sn_list_acls` | Lista ACLs de uma tabela ou campo |
| `sn_add_role_to_acl` | Adiciona uma role a uma ACL existente |
| `sn_remove_role_from_acl` | Remove uma role de uma ACL existente |

### 📧 Notifications
| Ferramenta | Descrição |
|---|---|
| `sn_create_notification` | Cria notificação de email com subject, body HTML e condição |
| `sn_update_notification` | Atualiza subject, body e status |
| `sn_list_notifications` | Lista notificações de uma tabela |

### 👥 Roles e Grupos
| Ferramenta | Descrição |
|---|---|
| `sn_create_role` | Cria nova role |
| `sn_add_user_to_group` | Adiciona usuário a um grupo (resolve nomes automaticamente) |
| `sn_remove_user_from_group` | Remove usuário de um grupo |
| `sn_assign_role_to_user` | Atribui role a um usuário |
| `sn_list_group_members` | Lista membros de um grupo |

### 🗄️ Estrutura de Dados
| Ferramenta | Descrição |
|---|---|
| `sn_create_field` | Cria campo customizado em uma tabela |
| `sn_create_table` | Cria tabela customizada com herança |

### 📦 Deploy
| Ferramenta | Descrição |
|---|---|
| `sn_create_update_set` | Cria Update Set para empacotar mudanças |
| `sn_set_current_update_set` | Define o Update Set ativo |
| `sn_list_update_sets` | Lista Update Sets com filtro por estado |
| `sn_complete_update_set` | Marca Update Set como completo |

### 📎 Attachments
| Ferramenta | Descrição |
|---|---|
| `sn_upload_attachment` | Faz upload de arquivo (Base64) como anexo em qualquer registro |
| `sn_list_attachments` | Lista todos os anexos de um registro (nome, tipo, tamanho, link) |
| `sn_download_attachment` | Baixa o conteúdo de um anexo e retorna em Base64 |
| `sn_delete_attachment` | Remove um anexo pelo sys_id |

### 🔧 Genérico
| Ferramenta | Descrição |
|---|---|
| `sn_create_record` | Cria registro em qualquer tabela |
| `sn_update_record` | Atualiza qualquer registro pelo sys_id |
| `sn_delete_record` | Remove qualquer registro pelo sys_id |

> *`sn_execute_script` requer um Scripted REST API configurado na instância. Veja a seção abaixo.

---

## 📋 Configurar Script Executor no ServiceNow

Para habilitar a ferramenta `sn_execute_script` (execução de scripts em background):

1. Acesse **System Web Services → Scripted REST APIs**
2. Crie a API: **Name** = `Dev Agent Script Runner`, **API ID** = `x_dev_agent`
3. Adicione recurso: **POST** em `/script_runner/execute`
4. Script do recurso:

```javascript
(function process(request, response) {
  var body = request.body.data;
  if (!gs.hasRole('admin')) {
    response.setStatus(403);
    response.setBody({ error: 'Acesso negado' });
    return;
  }
  var result = '';
  try {
    var evaluator = new GlideScopedEvaluator();
    result = evaluator.evaluateScript(null, body.script, null);
  } catch(e) {
    result = 'Erro: ' + e.message;
  }
  response.setBody({ result: String(result) });
})(request, response);
```

---

## 💬 Exemplos de uso

```
"Crie uma Business Rule na tabela incident que, ao inserir um incidente com
prioridade 1, notifique o grupo de suporte."

"Crie um item de catálogo 'Solicitação de Acesso' com as variáveis:
sistema (Select), justificativa (MultiLine) e data de início (Date)."

"Liste todas as ACLs de leitura da tabela incident e mostre quais roles têm acesso."

"Crie uma notificação de email para a tabela change_request que dispara
quando uma mudança é aprovada, enviando um resumo em HTML para o solicitante."

"Adicione o usuário john.doe ao grupo 'Service Desk' e atribua a ele a role itil."

"Busque o flow 'Onboarding de Funcionário', dispare-o para o registro
xyz e liste as últimas 5 execuções com erro."

"Crie um Update Set 'Sprint-42', defina como ativo, adicione uma Business Rule
e marque como completo ao terminar."

"Liste os incidentes da instância DEV com prioridade 1."
```

---

## 🔐 Segurança

- Use um **usuário de serviço dedicado** (não use `admin` em produção)
- Roles mínimas recomendadas: `web_service_admin`, `itil_admin`, `security_admin`
- Em produção, considere **OAuth 2.0** em vez de Basic Auth
- **Nunca** commite o arquivo `.env` no repositório
- Para multi-instância, cada ambiente pode ter seu próprio nível de permissão

---

## 📌 Changelog

| Versão | Data | O que mudou |
|---|---|---|
| **v2.2.0** | 2026-03-27 | 📎 **Attachment API** — 4 novas ferramentas: `sn_upload_attachment`, `sn_list_attachments`, `sn_download_attachment`, `sn_delete_attachment`. Adição de `snPostBinary` e `snGetBinary` no HTTP client para tráfego de arquivos binários via Base64. Total: 55 ferramentas. |
| v2.1.0 | 2026-03-27 | 🌐 **Multi-Instância Dinâmica** — suporte a N ambientes simultâneos via prefixo `env` em todas as ferramentas. Refatoração completa do HTTP client (`lib/client.js`) com `getContext(env)`. Atualização de schemas e handlers em todos os módulos. Documentação `AI_REFERENCE.md` criada. |
| v2.0.0 | — | Refatoração modular + Notifications + Roles/Grupos + Deploy melhorado + `sn_delete_record` (~50 ferramentas) |
| v1.3.0 | — | ACLs e Segurança — create, update, delete, list, add/remove roles (6 ferramentas) |
| v1.2.0 | — | Service Catalog + Flow Designer (11 ferramentas) |
| v1.1.0 | — | Atualização de Script Include, Client Script, UI Policy, Scheduled Job |
| v1.0.0 | — | Scripts, tabelas, campos, Update Sets (15 ferramentas) |

---

## 🛣️ Roadmap

| Feature | Status |
|---|---|
| Attachment API (upload/download/delete via Base64) | ✅ Concluído (v2.2.0) |
| System Properties (get/set) | 🔜 Próximo |
| Knowledge Base (search/create articles) | 📋 Planejado |
| CMDB & CI Relationships | 📋 Planejado |
| OAuth 2.0 Authentication | 📋 Planejado |

---

## 📄 Licença

MIT — Veja o arquivo [LICENSE](LICENSE) para detalhes.
