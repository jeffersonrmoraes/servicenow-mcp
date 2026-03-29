# ServiceNow MCP Server 🚀

[![v3.8.1](https://img.shields.io/badge/version-3.8.1-blue.svg)](https://github.com/jeffersonrmoraes/servicenow-mcp/releases)
[![ServiceNow](https://img.shields.io/badge/ServiceNow-Xanadu-green.svg)](https://www.servicenow.com)
[![MCP](https://img.shields.io/badge/Protocol-MCP-orange.svg)](https://modelcontextprotocol.io)
[![License](https://img.shields.io/badge/license-MIT-lightgrey.svg)](LICENSE)

O **ServiceNow MCP Server** é um conector de alta performance que permite que agentes de IA (**Claude**, **GitHub Copilot**, **Antigravity**) desenvolvam e gerenciem instâncias do ServiceNow diretamente via APIs nativas.

**🛡️ v3.8.1: Security Hardening & Quality** — Validação de inputs, cache TTL, rate limiting, testes unitários e correções de bugs críticos.

**🌪️ v3.8: Knowledge Harvester & Smart Context** — A IA agora "aprende" a estrutura da sua instância (Tabelas, Campos, Relacionamentos) e persiste esse conhecimento localmente.

**🔐 v3.7: Hybrid Auth & AI Bundling** — Suporte total para OAuth 2.0 (SSO/Azure AD), Agrupamento Atômico de Catálogo e contextos otimizados para IA.

---

## 📋 Índice

- [Requisitos](#-requisitos)
- [Instalação Rápida](#-instalação-rápida)
- [Configuração do Ambiente (.env)](#-configuração-do-ambiente-env)
- [Instalação por Plataforma](#-instalação-por-plataforma)
  - [Claude Desktop](#-claude-desktop)
  - [Claude Code (CLI)](#-claude-code-cli)
  - [VS Code + GitHub Copilot](#-vs-code--github-copilot)
  - [Antigravity (Google Agentspace)](#-antigravity-google-agentspace)
- [MCP Dashboard](#️-mcp-dashboard-v370)
- [Knowledge Harvester](#-knowledge-harvester-harvest-v380)
- [Testes](#-testes)
- [Ferramentas Disponíveis](#️-ferramentas-disponíveis)
- [Changelog](#-changelog)

---

## ✅ Requisitos

- **Node.js ≥ 18**
- **npm ≥ 8**
- Credenciais de uma instância ServiceNow (Basic Auth ou OAuth 2.0)

---

## 🚀 Instalação Rápida

```bash
git clone https://github.com/jeffersonrmoraes/servicenow-mcp.git
cd servicenow-mcp
npm install
```

Configure suas credenciais (veja a próxima seção) e então siga as instruções da sua plataforma.

---

## 🔑 Configuração do Ambiente (.env)

Crie um arquivo `.env` na raiz do projeto (ou use `npm run dashboard` para configurar via GUI):

```env
# Instância padrão
SN_INSTANCE=dev12345
SN_USER=admin
SN_PASSWORD=sua_senha

# Múltiplas instâncias (opcional)
DEV_SN_INSTANCE=dev12345
DEV_SN_USER=admin
DEV_SN_PASSWORD=senha_dev

PROD_SN_INSTANCE=empresa
PROD_SN_USER=admin
PROD_SN_PASSWORD=senha_prod

# OAuth 2.0 (opcional — sobrepõe User/Pass)
SN_OAUTH_ACCESS_TOKEN=seu_token_aqui
SN_CLIENT_ID=client_id_oauth
SN_CLIENT_SECRET=client_secret_oauth
```

> **Dica:** O campo `SN_INSTANCE` aceita apenas o subdomínio (ex: `dev12345`) — o servidor completa a URL automaticamente para `https://dev12345.service-now.com`.

---

## 🖥️ Instalação por Plataforma

### 🟣 Claude Desktop

1. Abra o arquivo de configuração do Claude Desktop:
   - **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
   - **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`
   - **Linux:** `~/.config/Claude/claude_desktop_config.json`

2. Adicione a entrada do servidor MCP:

```json
{
  "mcpServers": {
    "servicenow": {
      "command": "node",
      "args": ["/caminho/absoluto/para/servicenow-mcp/index.js"],
      "env": {
        "SN_INSTANCE": "dev12345",
        "SN_USER": "admin",
        "SN_PASSWORD": "sua_senha"
      }
    }
  }
}
```

> **Windows:** use barras duplas ou barras normais no caminho: `"C:/Users/voce/servicenow-mcp/index.js"`

3. Reinicie o Claude Desktop. Você verá o ícone 🔌 indicando que o MCP está ativo.

---

### 🤖 Claude Code (CLI)

Com o [Claude Code](https://claude.ai/code) instalado, execute:

```bash
# Adicionar o servidor MCP globalmente
claude mcp add servicenow -- node /caminho/absoluto/para/servicenow-mcp/index.js

# Verificar se foi registrado
claude mcp list

# Executar Claude com o servidor ativo
claude
```

Para passar credenciais diretamente:

```bash
claude mcp add servicenow \
  -e SN_INSTANCE=dev12345 \
  -e SN_USER=admin \
  -e SN_PASSWORD=sua_senha \
  -- node /caminho/para/servicenow-mcp/index.js
```

Ou, se o `.env` já está configurado na pasta do projeto, basta apontar para o `index.js` e o `dotenv` carrega tudo automaticamente.

---

### 🔵 VS Code + GitHub Copilot

O VS Code suporta servidores MCP diretamente no Copilot Chat (requer VS Code ≥ 1.99 com Copilot habilitado).

**Opção 1 — Configuração por Workspace (`.vscode/mcp.json`)**

Crie o arquivo `.vscode/mcp.json` no seu workspace:

```json
{
  "servers": {
    "servicenow": {
      "type": "stdio",
      "command": "node",
      "args": ["/caminho/absoluto/para/servicenow-mcp/index.js"],
      "env": {
        "SN_INSTANCE": "dev12345",
        "SN_USER": "admin",
        "SN_PASSWORD": "sua_senha"
      }
    }
  }
}
```

**Opção 2 — Configuração Global (`settings.json`)**

Abra as configurações do VS Code (`Ctrl+Shift+P` → *Open User Settings JSON*) e adicione:

```json
{
  "mcp": {
    "servers": {
      "servicenow": {
        "type": "stdio",
        "command": "node",
        "args": ["/caminho/absoluto/para/servicenow-mcp/index.js"],
        "env": {
          "SN_INSTANCE": "dev12345",
          "SN_USER": "admin",
          "SN_PASSWORD": "sua_senha"
        }
      }
    }
  }
}
```

**Ativar no Copilot Chat:**

1. Abra o Copilot Chat (`Ctrl+Alt+I`)
2. Clique no ícone de **ferramentas** (🔧) no canto superior
3. Selecione **servicenow** na lista de servidores MCP
4. Agora você pode perguntar ao Copilot coisas como: *"Crie uma Business Rule na tabela incident"*

---

### 🟡 Antigravity (Google Agentspace)

O Antigravity / Google Agentspace suporta servidores MCP via configuração `stdio`.

1. Acesse as configurações do seu agente no Agentspace
2. Na seção **MCP Servers**, adicione:

```json
{
  "name": "servicenow",
  "transport": {
    "type": "stdio",
    "command": "node",
    "args": ["/caminho/absoluto/para/servicenow-mcp/index.js"],
    "env": {
      "SN_INSTANCE": "dev12345",
      "SN_USER": "admin",
      "SN_PASSWORD": "sua_senha"
    }
  }
}
```

3. Salve e reinicie o agente. As ferramentas `sn_*` estarão disponíveis no contexto do agente.

---

## 🖥️ MCP Dashboard (v3.7.0)

Interface web para gerenciar múltiplas instâncias e configurar OAuth 2.0 sem editar arquivos manualmente.

```bash
npm run dashboard
# Acesse http://localhost:3000
```

**Funcionalidades:**
- 🔐 **Hybrid Authentication** — Basic Auth ou OAuth 2.0 por instância
- 🌐 **Browser-based Authorization** — Login via browser com suporte a SSO/MFA
- 🚀 **Environment Manager** — GUI para CRUD de múltiplas instâncias
- ✅ **Auto-URL Intelligence** — Completa `dev123` para `https://dev123.service-now.com`
- 🔒 **Privacy Control** — Senhas e tokens mascarados (`Shadow Masking`)
- ⚙️ **Live .env Editor** — Sincronização em tempo real das credenciais

---

## 🌾 Knowledge Harvester (`harvest.js` v3.8.0)

O Harvester aprende a estrutura da sua instância e salva o esquema em Markdown local (`knowledge/`), dando à IA contexto preciso sobre tabelas e campos.

```bash
# Modos disponíveis
node harvest.js main     # Tabelas essenciais (task, incident, sys_user...)
node harvest.js catalog  # Knowledge Management + Service Catalog
node harvest.js portal   # Service Portal (sp_*) + Employee Center (sn_ex_sp_*)
node harvest.js flow     # Flow Designer (sys_hub_*, sys_flow_*, sys_ux_*)
node harvest.js sys      # Todas as tabelas sys_* (até 500)
node harvest.js enrich   # Enriquecimento completo (ITSM, CMDB, HR, CSM, GRC...)
node harvest.js all      # Executa todos os modos em sequência

# Especificar ambiente
node harvest.js enrich --env PROD
```

O resultado é salvo em `knowledge/core/`, `knowledge/system/` e `knowledge/custom/` e indexado em `knowledge/INDEX.md`.

---

## 🧪 Testes

O projeto utiliza o runner nativo do Node.js (`node:test`) — sem dependências extras.

```bash
npm test
```

Os testes cobrem:
- `lib/validate.js` — validação de tableName, sys_id e limit
- `lib/cache.js` — get/set/TTL/invalidate
- `lib/ratelimit.js` — sliding window, isolamento por ambiente
- `tools/security.js` — guards de null check em lookups de grupo/usuário/role

---

## 🛠️ Ferramentas Disponíveis

### 🧠 IA & Contexto (Knowledge Harvester v3.8)
| Ferramenta | Descrição |
|---|---|
| `sn_sync_knowledge_base` | Sincroniza metadados (tabela/campo) em Markdown local |
| `sn_generate_ai_context` | Gera Markdown otimizado do código/registro para o Context Window |

### 🧩 Catálogo & Bundling
| Ferramenta | Descrição |
|---|---|
| `sn_get_catalog_item_bundle` | Recupera Item, Variáveis e Scripts em uma única chamada atômica |
| `sn_manage_catalog_item` | Cria ou atualiza um item de catálogo |
| `sn_manage_catalog_variable` | Cria ou atualiza uma variável em um item |
| `sn_manage_catalog_category` | Gestão de categorias do catálogo |

### 🛠️ Core CRUD (Qualquer Tabela)
| Ferramenta | Descrição |
|---|---|
| `sn_query_records` | Consulta registros com query e filtros |
| `sn_get_record` | Busca um registro específico pelo sys_id |
| `sn_create_record` | Cria registro genérico (campos nativos) |
| `sn_update_record` | Atualiza registro genérico pelo sys_id |
| `sn_delete_record` | Remove um registro pelo sys_id |

### 🎨 Front-end & UX
| Ferramenta | Descrição |
|---|---|
| `sn_manage_widget` | Cria/Atualiza Service Portal Widgets (HTML, CSS, Scripts) |
| `sn_manage_ui_action` | Cria/Atualiza botões, links e menus de formulário |
| `sn_manage_ui_page` | Gestão de UI Pages customizadas (XML/Jelly) |

### ⚙️ Scripts & Metadados
| Ferramenta | Descrição |
|---|---|
| `sn_upsert_metadata_script` | Cria/Atualiza Business Rules, Script Includes, Client Scripts, UI Policies |
| `sn_execute_script` | Executa script Server-Side (Background Scripts) |
| `sn_manage_schema` | Cria tabelas e campos (Schema Management) |

### 🔄 Flow Designer
| Ferramenta | Descrição |
|---|---|
| `sn_get_flow` | Recupera detalhes de um Flow |
| `sn_activate_flow` | Ativa/desativa um Flow |
| `sn_trigger_flow` | Dispara execução de um Flow |
| `sn_create_subflow` | Cria um Subflow |

### 🔒 Segurança
| Ferramenta | Descrição |
|---|---|
| `sn_manage_acl` | Gestão completa de ACLs e roles associadas |
| `sn_manage_notification` | Gestão de notificações de e-mail |
| `sn_manage_access` | Gestão de Roles, Grupos e Acessos de Usuários |

### 📦 Deploy & Propriedades
| Ferramenta | Descrição |
|---|---|
| `sn_create_update_set` | Cria um Update Set |
| `sn_set_current_update_set` | Define o Update Set atual |
| `sn_list_update_sets` | Lista Update Sets disponíveis |
| `sn_get_sys_property` | Lê uma System Property |
| `sn_set_sys_property` | Define uma System Property |

### 📎 Anexos
| Ferramenta | Descrição |
|---|---|
| `sn_upload_attachment` | Faz upload de arquivo (Base64) para um registro |
| `sn_list_attachments` | Lista anexos de um registro |
| `sn_download_attachment` | Download de anexo como Base64 |

---

## 📈 Changelog

| Versão | Data | O que mudou |
|---|---|---|
| **v3.8.1** | 2026-03-29 | 🛡️ **Security Hardening** — Validação de inputs (`lib/validate.js`), cache TTL 60s (`lib/cache.js`), rate limit 10 req/s (`lib/ratelimit.js`), 22 testes unitários, `/api/env` seguro, `saveEnvFile` async, null checks em security tools, startup validation. |
| **v3.8.0** | 2026-03-27 | 🌪️ **Knowledge Harvester** — Crawler de metadados persistente em Markdown. `harvest.js` consolidado com 7 modos CLI. |
| **v3.7.0** | 2026-03-27 | 🔐 **Hybrid Auth** — OAuth 2.0, SSO/Azure AD via browser, Dashboard com Environment Manager. |
| **v3.6.0** | 2026-03-27 | 📦 **AI Bundling** — Catálogo atômico e otimização de Context Window. |
| **v3.5.0** | 2026-03-27 | 🌑 **Dark Tech Dashboard** — Auto-URL, Privacy Masking, redesign completo. |
| **v3.1.0** | 2026-03-27 | 🎨 **Front-end Revolution** — Suporte para Service Portal Widgets e UI Actions. |

---

## ⚠️ Para Agentes de IA

Se você é uma IA trabalhando neste repositório, leia o [GEMINI.md](GEMINI.md) para entender as convenções e padrões de código antes de qualquer intervenção.
