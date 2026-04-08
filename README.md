# ServiceNow MCP Server 🚀

[![v4.0.0](https://img.shields.io/badge/version-4.0.0-blue.svg)](https://github.com/jeffersonrmoraes/servicenow-mcp/releases)
[![ServiceNow](https://img.shields.io/badge/ServiceNow-Xanadu-green.svg)](https://www.servicenow.com)
[![MCP](https://img.shields.io/badge/Protocol-MCP-orange.svg)](https://modelcontextprotocol.io)
[![License](https://img.shields.io/badge/license-MIT-lightgrey.svg)](LICENSE)

O **ServiceNow MCP Server** é um conector de alta performance que permite que agentes de IA (**Claude**, **GitHub Copilot**, **Antigravity**) desenvolvam e gerenciem instâncias do ServiceNow diretamente via APIs nativas.

**🚀 v4.0.0: TypeScript & Meta Architecture** — Migração total para TypeScript, Harvester Incremental (sincronização baseada em deltas), Mapeamento de Dependências de Tabelas (`sn_get_dependencies`) e refatoração para ESM nativo com suporte a `tsx`.

**⚡ v3.9.0: MCP Resources & Backoff** — Exposição de schemas locais como Resources, rate limiter com backoff inteligente, paginação (offset).

**🛡️ v3.8.1: Security Hardening** — Validação de inputs, cache TTL, rate limiting e testes unitários.

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
- [Incremental Harvester](#-incremental-harvester-v400)
- [Testes](#-testes)
- [Ferramentas Disponíveis](#️-ferramentas-disponíveis)
- [Changelog](#-changelog)

---

## ✅ Requisitos

- **Node.js ≥ 20** (Recomendado)
- **npm ≥ 9**
- Credenciais ServiceNow (Basic Auth ou OAuth 2.0)

---

## 🚀 Instalação Rápida

```bash
git clone https://github.com/jeffersonrmoraes/servicenow-mcp.git
cd servicenow-mcp
npm install
```

---

## 🔑 Configuração do Ambiente (.env)

O servidor carrega automaticamente as variáveis do arquivo `.env` na raiz.

```env
# Instância padrão
SN_INSTANCE=dev12345
SN_USER=admin
SN_PASSWORD=sua_senha

# Opcional: Ambientes múltiplos
DEV_SN_INSTANCE=dev99999
DEV_SN_USER=admin
DEV_SN_PASSWORD=outra_senha
```

---

## 🖥️ Instalação por Plataforma

Como o servidor agora utiliza TypeScript, recomenda-se o uso do `npx tsx` para execução direta.

### 🟣 Claude Desktop

Abra seu `claude_desktop_config.json` e adicione:

```json
{
  "mcpServers": {
    "servicenow": {
      "command": "npx",
      "args": ["-y", "tsx", "/caminho/absoluto/para/servicenow-mcp/src/index.ts"],
      "env": {
        "SN_INSTANCE": "dev12345",
        "SN_USER": "admin",
        "SN_PASSWORD": "sua_senha"
      }
    }
  }
}
```

---

## 🌾 Incremental Harvester (v4.0.0)

O Harvester sincroniza metadados da instância localmente. Na v4.0, ele utiliza o campo `sys_updated_on` para baixar apenas o que mudou desde o último sincronismo.

```bash
# Sincroniza apenas as mudanças desde a última execução
npm start sn_sync_knowledge_base -- --category CORE
```

Os metadados são salvos em `knowledge/` e o estado do sincronismo em `knowledge/state.json`.

---

## 🧪 Testes

```bash
npm test
```
Os testes agora utilizam `tsx --test` para validar a lógica em TypeScript.

---

## 🛠️ Ferramentas Disponíveis

### 🧠 IA & Contexto (v4.0)
| Ferramenta | Descrição |
|---|---|
| `sn_sync_knowledge_base` | Sincroniza metadados localmente (Incremental) |
| `sn_get_dependencies` | **[Novo]** Lista todas as tabelas referenciadas por uma tabela |
| `sn_analyze_impact` | **[Novo]** Lista todas as tabelas que referenciam uma tabela |
| `sn_generate_ai_context` | Gera context window otimizado para o agente |

### 🛠️ Core CRUD
| Ferramenta | Descrição |
|---|---|
| `sn_query_records` | Consulta registros com query, filtros e paginação |
| `sn_bulk_update` | Atualiza múltiplos registros de uma vez |
| `sn_get_record` | Busca um registro específico pelo sys_id |
| `sn_create_record` | Cria registro genérico |
| `sn_update_record` | Atualiza registro pelo sys_id |
| `sn_delete_record` | Remove um registro |

### ⚙️ Metadados & Código
| Ferramenta | Descrição |
|---|---|
| `sn_upsert_metadata_script` | Gestão de Business Rules, Script Includes, Client Scripts |
| `sn_execute_script` | Executa scripts no servidor (Background Scripts) |
| `sn_manage_schema` | Criação de tabelas e campos |
| `sn_manage_widget` | Gestão de Service Portal Widgets |
| `sn_manage_ui_action` | Gestão de UI Actions (Botões/Menus) |

### 📦 Deploy & Flow
| Ferramenta | Descrição |
|---|---|
| `sn_create_update_set` | Criação de pacotes de deploy |
| `sn_get_flow` | Detalhamento e ativação de Flows |
| `sn_trigger_flow` | Disparo manual de flows via API |

---

## 📈 Changelog

| Versão | Data | Destaque |
|---|---|---|
| **v4.0.0** | 2026-04-08 | 🚀 **TS Migration**: Refatoração completa para TypeScript. Harvester Incremental via `state.json`. Ferramentas de análise de impacto (`sn_get_dependencies`). |
| **v3.9.0** | 2026-04-08 | ⚡ **Resources**: Exposição de `knowledge/` como MCP Resources. |
| **v3.8.1** | 2026-03-29 | 🛡️ **Hardening**: Validação de inputs e rate limiting. |

---

## ⚠️ Para Agentes de IA

Leia as convenções em [GEMINI.md](GEMINI.md) antes de intervir.
