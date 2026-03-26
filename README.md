# ServiceNow MCP Server

Integração entre agentes de IA e o **ServiceNow** via Model Context Protocol (MCP).
Compatível com **Claude Desktop**, **VS Code (GitHub Copilot)** e **Google Agentspace**.

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
node index.js          # ServiceNow MCP Server v1.3.0 rodando...
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
        "SN_PASSWORD": "sua-senha"
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

### 🟡 Google Agentspace

1. Abra uma sessão de Agent
2. Clique em **"..." → MCP Servers → Manage MCP Servers → View raw config**
3. Adicione o bloco `servicenow` no `mcp_config.json`
4. Clique em **Refresh**

---

## 🛠️ Ferramentas disponíveis (36 total)

### 🔍 Leitura e Consulta
| Ferramenta | Descrição |
|---|---|
| `sn_query_records` | Consulta registros de qualquer tabela com filtros |
| `sn_get_record` | Busca registro específico por sys_id |

### ⚙️ Scripts Server-Side
| Ferramenta | Descrição |
|---|---|
| `sn_create_business_rule` | Cria Business Rule (before, after, async, display) |
| `sn_update_business_rule` | Atualiza script, condição, quando e ações |
| `sn_create_script_include` | Cria biblioteca reutilizável |
| `sn_update_script_include` | Atualiza script, descrição e client_callable |
| `sn_create_scheduled_job` | Cria Scheduled Script Execution |
| `sn_update_scheduled_job` | Atualiza script e frequência |

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

### 🗄️ Estrutura de Dados
| Ferramenta | Descrição |
|---|---|
| `sn_create_field` | Cria campo customizado em uma tabela |
| `sn_create_table` | Cria tabela customizada com herança |

### 🧪 Execução e Testes
| Ferramenta | Descrição |
|---|---|
| `sn_execute_script` | Executa script em background* |

### 📦 Deploy
| Ferramenta | Descrição |
|---|---|
| `sn_create_update_set` | Cria Update Set para empacotar mudanças |
| `sn_set_current_update_set` | Define o Update Set ativo |

### 🔧 Genérico
| Ferramenta | Descrição |
|---|---|
| `sn_create_record` | Cria registro em qualquer tabela |
| `sn_update_record` | Atualiza qualquer registro pelo sys_id |

> *`sn_execute_script` requer um Scripted REST API configurado. Veja a seção abaixo.

---

## 📋 Configurar Script Executor no ServiceNow

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

"Crie uma ACL que restrinja a escrita no campo salary da tabela hr_profile
apenas para usuários com a role hr_admin."

"Busque o flow 'Onboarding de Funcionário', dispare-o para o registro
de ID xyz e liste as últimas 5 execuções."

"Crie um Update Set 'Sprint-42', defina como ativo e adicione uma nova
Business Rule de validação na tabela change_request."
```

---

## 🔐 Segurança

- Use um usuário de serviço dedicado (não use `admin` em produção)
- Roles mínimas recomendadas: `web_service_admin`, `itil_admin`, `security_admin`
- Em produção, use OAuth 2.0 em vez de Basic Auth
- Nunca commite o `.env` no repositório

---

## 📌 Changelog

| Versão | O que foi adicionado |
|---|---|
| v1.0.0 | Scripts, tabelas, campos, Update Sets (15 ferramentas) |
| v1.1.0 | Atualização de Script Include, Client Script, UI Policy, Scheduled Job |
| v1.2.0 | Service Catalog + Flow Designer (11 ferramentas) |
| v1.3.0 | ACLs e Segurança — create, update, delete, list, add/remove roles (6 ferramentas) |
