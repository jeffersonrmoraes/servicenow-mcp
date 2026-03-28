# ServiceNow MCP Server 🚀

[![v3.8.0](https://img.shields.io/badge/version-3.8.0-blue.svg)](https://github.com/jeffersonrmoraes/servicenow-mcp/releases)
[![ServiceNow](https://img.shields.io/badge/ServiceNow-Xanadu-green.svg)](https://www.servicenow.com)
[![MCP](https://img.shields.io/badge/Protocol-MCP-orange.svg)](https://modelcontextprotocol.io)

O **ServiceNow MCP Server** é um conector de alta performance que permite que agentes de IA (Claude, Copilot, Antigravity) desenvolvam e gerenciem instâncias do ServiceNow diretamente via APIs nativas. 

**🎉 v3.8: Knowledge Harvester & Smart Context** — A IA agora "aprende" a estrutura da sua instância (Tabelas, Campos, Relacionamentos) e persiste esse conhecimento localmente.

**🧩 v3.7: Hybrid Auth & AI Bundling** — Suporte total para OAuth 2.0 (SSO/Azure AD), Agrupamento Atômico de Catálogo e contextos otimizados para IA.

---

## 🖥️ MCP Dashboard (v3.7.0)

Configuração via GUI com visualização focada em produtividade Dark Tech, Smart-URLs e Data Masking.

**Como acessar:**
```bash
npm run dashboard
# Abra http://localhost:3000 no seu navegador
```

**Funcionalidades:**
*   🔐 **Hybrid Authentication**: Escolha entre **Basic Auth** ou **OAuth 2.0** por instância.
*   🌐 **Browser-based Authorization**: Clique em "Authorize" para login seguro via browser (compatível com **SSO/MFA**).
*   🚀 **Environment Manager (Modal)**: GUI interativa para CRUD de múltiplas instâncias.
*   ✅ **Auto-URL Intelligence**: O sistema completa prefixos (ex: `dev123`) automaticamente.
*   🔒 **Privacy Control**: Senhas e Tokens ocultos no painel (`Shadow Masking`).
*   ⚙️ **Live .env Editor**: Sincronização em tempo real das credenciais.

---

## 🚀 Como Começar

### 1. Requisitos
- Node.js ≥ 18
- Credenciais de uma instância ServiceNow (Basic ou OAuth)

### 2. Instalação Local
```bash
git clone https://github.com/jeffersonrmoraes/servicenow-mcp.git
cd servicenow-mcp
npm install
npm run dashboard      # Use o dashboard para configurar sua primeira instância!
```

---

## 🛠️ Ferramentas Disponíveis (v3.7)

### 🧩 Catalogo & Bundling (Inspirado em snsync)
| Ferramenta | Descrição |
|---|---|
| `sn_get_catalog_item_bundle` | Recupera Item, Variáveis e Scripts em uma única chamada atômica |
| `sn_manage_catalog_item` | Cria ou atualiza um item de catálogo |
| `sn_manage_catalog_variable` | Cria ou atualiza uma variável em um item |

### 🧠 IA & Contexto (Knowledge Harvester v3.8)
| Ferramenta | Descrição |
|---|---|
| `sn_sync_knowledge_base` | [v3.8] Sincroniza metadados (tabela/campo) em Markdown local |
| `sn_generate_ai_context` | Gera Markdown otimizado do código/registro para o Context Window |

**💡 Knowledge-First AI**: A pasta `knowledge/` armazena o "cérebro" da instância sincronizada, permitindo que qualquer IA entenda o seu modelo de dados sem erros.

### 🛠️ Core CRUD (Qualquer Tabela)
| Ferramenta | Descrição |
|---|---|
| `sn_query_records` | Consulta registros com query e filtros |
| `sn_get_record` | Busca um registro específico pelo sys_id |
| `sn_create_record` | Cria registro genérico (campos nativos) |
| `sn_update_record` | Atualiza registro genérico pelo sys_id |

### 🎨 Front-end & UX
| Ferramenta | Descrição |
|---|---|
| `sn_manage_widget` | Cria/Atualiza Service Portal Widgets (HTML, CSS, SCSS, Scripts) |
| `sn_manage_ui_action` | Cria/Atualiza botões, links e menus de formulário |
| `sn_manage_ui_page` | Gestão de UI Pages customizadas (XML/Jelly) |

---

## 📈 Changelog

| Versão | Data | O que mudou |
|---|---|---|
| **v3.8.0** | 2026-03-27 | 🌪️ **Knowledge Harvester** — Crawler de metadados persistente (Aprende seu modelo de dados). |
| **v3.7.0** | 2026-03-27 | 🔐 **Hybrid Auth Edition** — Suporte para OAuth 2.0, Integração com SSO (Azure AD) via browser. |
| **v3.6.0** | 2026-03-27 | 📦 **AI Bundling** — Ferramentas de pacote atômico e Context Window optimization. |
| **v3.5.0** | 2026-03-27 | 🌑 **Dark Tech Edition** — Redesign do Dashboard, Auto-URL e Privacy Masking. |
| v3.1.0 | 2026-03-27 | 🎨 **Front-end Revolution** — Suporte para Service Portal Widgets e UI Actions. |

---

## ⚠️ Regras para Desenvolvedores
Se você é uma IA trabalhando neste repositório, **leia o [GEMINI.md](file:///c:/servicenow-mcp/servicenow-mcp/GEMINI.md)** para entender as convenções e padrões de código antes de enviar um PR.
