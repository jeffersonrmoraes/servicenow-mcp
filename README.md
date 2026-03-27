# ServiceNow MCP Server 🚀

[![v3.5.0](https://img.shields.io/badge/version-3.5.0-blue.svg)](https://github.com/jeffersonrmoraes/servicenow-mcp/releases)
[![ServiceNow](https://img.shields.io/badge/ServiceNow-Xanadu-green.svg)](https://www.servicenow.com)
[![MCP](https://img.shields.io/badge/Protocol-MCP-orange.svg)](https://modelcontextprotocol.io)

O **ServiceNow MCP Server** é um conector de alta performance que permite que agentes de IA (Claude, Copilot, Antigravity) desenvolvam e gerenciem instâncias do ServiceNow diretamente via APIs nativas. 

**🎉 v3.5: Visual Command Center (Dark Tech Edition)** — Uma interface de terminal de alta tecnologia para gerenciar instâncias, variáveis de ambiente e segurança sem tocar em código.

---

## 🖥️ MCP Dashboard (v3.5.0)

Configuração via GUI com visualização focada em produtividade Dark Tech, Smart-URLs e Data Masking.

**Como acessar:**
```bash
npm run dashboard
# Abra http://localhost:3000 no seu navegador
```

**Funcionalidades:**
*   🚀 **Environment Manager (Modal)**: GUI interativa para CRUD de múltiplas instâncias.
*   ✅ **Auto-URL Intelligence**: O sistema completa prefixos (ex: `dev123`) automaticamente.
*   🔒 **Privacy Control**: Senhas ocultas no painel (`Shadow Masking`) para segurança.
*   ⚙️ **Live .env Editor**: Sincronização em tempo real das credenciais.

---

## 🚀 Como Começar

### 1. Requisitos
- Node.js ≥ 18
- Credenciais de uma instância ServiceNow (Basic Auth)

### 2. Instalação Local
```bash
git clone https://github.com/jeffersonrmoraes/servicenow-mcp.git
cd servicenow-mcp
npm install
npm run dashboard      # Use o dashboard para configurar sua primeira instância!
```

---

## 🛠️ Ferramentas Disponíveis (v3.2)

### 🧩 Core CRUD (Qualquer Tabela)
| Ferramenta | Descrição |
|---|---|
| `sn_query_records` | Consulta registros com query e filtros |
| `sn_get_record` | Busca um registro específico pelo sys_id |
| `sn_create_record` | Cria registro genérico (campos nativos) |
| `sn_update_record` | Atualiza registro genérico pelo sys_id |
| `sn_delete_record` | Remove registro de qualquer tabela |

### 🎨 Front-end & UX
| Ferramenta | Descrição |
|---|---|
| `sn_manage_widget` | Cria/Atualiza Service Portal Widgets (HTML, CSS, Server/Client Scripts) |
| `sn_manage_ui_action` | Cria/Atualiza botões, links e menus de formulário |
| `sn_manage_ui_page` | Gestão de UI Pages customizadas (XML/Jelly) |

### 📜 Desenvolvimento & Metadados
| Ferramenta | Descrição |
|---|---|
| `sn_upsert_metadata_script` | Cria/Atualiza Business Rules, Script Includes, Client Scripts, UI Policies e Jobs |
| `sn_execute_script` | Executa Background Scripts (Server-Side) |
| `sn_manage_schema` | Cria tabelas e campos customizados |

---

## 📈 Changelog

| Versão | Data | O que mudou |
|---|---|---|
| **v3.5.0** | 2026-03-27 | 🌑 **Dark Tech Edition** — Redesign do Dashboard, Auto-URL e Privacy Masking. |
| v3.2.0 | 2026-03-27 | 🖥️ **Visual Command Center** — Lançamento do MCP Dashboard (v1.0) para gestão visual de envs. |
| v3.1.0 | 2026-03-27 | 🎨 **Front-end Revolution** — Suporte para Service Portal Widgets e UI Actions. |
| v3.0.0 | 2026-03-27 | 🏗️ **Grande Refatoração** — Consolidação de ~55 ferramentas em ~32. |

---

## ⚠️ Regras para Desenvolvedores
Se você é uma IA trabalhando neste repositório, **leia o [GEMINI.md](file:///c:/servicenow-mcp/servicenow-mcp/GEMINI.md)** para entender as convenções e padrões de código antes de enviar um PR.
