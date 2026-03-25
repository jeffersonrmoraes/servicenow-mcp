# ServiceNow MCP Server

Integração entre agentes de IA e o **ServiceNow** via Model Context Protocol (MCP).
Compatível com **Claude Desktop**, **VS Code (GitHub Copilot)** e **Google Agentspace (Antigravity)**.

---

## 🚀 Instalação

### Pré-requisitos
- Node.js 18+
- Acesso admin na instância ServiceNow

### Passos

```bash
# 1. Clone o repositório
git clone https://github.com/jeffersonrmoraes/servicenow-mcp.git
cd servicenow-mcp

# 2. Instale as dependências
npm install

# 3. Configure as variáveis de ambiente
cp .env.example .env
# Edite o .env com suas credenciais

# 4. Teste o servidor
node index.js
# Deve exibir: ServiceNow MCP Server rodando...
```

---

## ⚙️ Configuração por ambiente

### 🟣 Claude Desktop

Abra o arquivo de configuração:
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

Reinicie o Claude Desktop. Um ícone de 🔌 confirmará a conexão.

---

### 🟦 VS Code (GitHub Copilot)

Crie o arquivo `.vscode/mcp.json` na raiz do seu projeto:

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

Ou adicione no `settings.json` global:

```json
{
  "github.copilot.chat.mcp.enabled": true,
  "mcp": {
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
}
```

No painel do Copilot Chat, troque para o modo **Agent** e as ferramentas do ServiceNow estarão disponíveis.

---

### 🟡 Google Agentspace (Antigravity)

1. Abra uma sessão de Agent no Agentspace
2. Clique em **"..." → MCP Servers → Manage MCP Servers → View raw config**
3. Adicione o bloco abaixo no `mcp_config.json`:

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

4. Clique em **Refresh** — as 15 ferramentas aparecerão na lista.

---

## 🛠️ Ferramentas disponíveis

| Ferramenta | Descrição |
|---|---|
| `sn_query_records` | Consulta registros de qualquer tabela |
| `sn_get_record` | Busca registro por sys_id |
| `sn_create_business_rule` | Cria Business Rule |
| `sn_update_business_rule` | Atualiza Business Rule existente |
| `sn_create_script_include` | Cria Script Include |
| `sn_create_client_script` | Cria Client Script |
| `sn_create_ui_policy` | Cria UI Policy |
| `sn_create_field` | Cria campo customizado |
| `sn_create_table` | Cria tabela customizada |
| `sn_create_scheduled_job` | Cria Scheduled Script Execution |
| `sn_execute_script` | Executa script no Background Scripts* |
| `sn_create_update_set` | Cria Update Set |
| `sn_set_current_update_set` | Define Update Set ativo |
| `sn_create_record` | Cria registro genérico |
| `sn_update_record` | Atualiza registro genérico |

> *`sn_execute_script` requer um Scripted REST API configurado na instância. Veja a seção abaixo.

---

## 📋 Configurar Script Executor no ServiceNow

Para a ferramenta `sn_execute_script` funcionar, crie um Scripted REST API:

1. Acesse **System Web Services → Scripted REST APIs**
2. Crie uma nova API:
   - **Name**: `Dev Agent Script Runner`
   - **API ID**: `x_dev_agent`
3. Adicione um recurso:
   - **Name**: `execute`
   - **HTTP method**: POST
   - **Relative path**: `/script_runner/execute`
4. Script do recurso:

```javascript
(function process(request, response) {
  var body = request.body.data;
  var script = body.script;

  if (!gs.hasRole('admin')) {
    response.setStatus(403);
    response.setBody({ error: 'Acesso negado' });
    return;
  }

  var result = '';
  try {
    var evaluator = new GlideScopedEvaluator();
    result = evaluator.evaluateScript(null, script, null);
  } catch(e) {
    result = 'Erro: ' + e.message;
  }

  response.setBody({ result: String(result) });
})(request, response);
```

---

## 💬 Exemplos de uso

> *"Crie uma Business Rule na tabela incident que, ao inserir um incidente com prioridade 1, notifique o grupo de suporte."*

> *"Liste todas as Business Rules ativas na tabela change_request."*

> *"Crie um Script Include chamado IncidentUtils com um método que retorna todos os incidentes abertos de um usuário."*

> *"Crie um Update Set chamado 'Sprint-42' e adicione uma nova Business Rule de validação."*

---

## 🔐 Segurança

- Use um usuário de serviço dedicado (não use `admin` em produção)
- Conceda apenas as roles necessárias: `web_service_admin`, `itil_admin`
- Em produção, use OAuth 2.0 em vez de Basic Auth
- Nunca commite o `.env` no repositório
- Adicione `.env` ao `.gitignore`
