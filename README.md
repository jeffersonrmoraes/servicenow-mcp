# ServiceNow MCP Server para Claude

Integração entre o **Claude Desktop** e o **ServiceNow** via Model Context Protocol (MCP).
Com este servidor, o Claude age como um agente de desenvolvimento dentro da sua instância.

---

## 🚀 Instalação

### Pré-requisitos
- Node.js 18+
- Claude Desktop instalado
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
# Deve exibir: ✅ ServiceNow MCP Server rodando...
```

---

## ⚙️ Configurar no Claude Desktop

Abra o arquivo de configuração do Claude Desktop:

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

> *`sn_execute_script` requer um Scripted REST API configurado na instância.

---

## 💬 Exemplos de uso

> *"Crie uma Business Rule na tabela incident que, ao inserir um novo incidente com prioridade 1, envie um email para o grupo de suporte."*

> *"Liste todas as Business Rules ativas na tabela change_request."*

> *"Crie um Script Include chamado IncidentUtils com um método que retorna todos os incidentes abertos de um usuário."*

> *"Crie um Update Set chamado 'Sprint-42' e adicione nele uma nova Business Rule de validação."*

---

## 🔐 Segurança

- Use um usuário de serviço dedicado (não use `admin` em produção)
- Conceda apenas as roles necessárias: `web_service_admin`, `itil_admin`
- Em produção, use OAuth 2.0 em vez de Basic Auth
- Nunca commite o `.env` no repositório
