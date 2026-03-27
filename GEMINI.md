# GEMINI.md — Contexto do Projeto para IA

Este arquivo fornece contexto estruturado sobre o repositório **ServiceNow MCP Server** para qualquer agente de IA que trabalhe nesta base de código. Leia este arquivo antes de qualquer intervenção.

---

## 📌 Visão Geral

- **Projeto**: ServiceNow MCP Server
- **Versão Atual**: `2.2.0`
- **Descrição**: Servidor MCP que expõe ferramentas para agentes de IA interagirem com o ServiceNow via REST API nativa (`/api/now/table/...` e `/api/now/attachment/...`).
- **Compatibilidade**: Claude Desktop, VS Code (GitHub Copilot), Google Agentspace (Antigravity)
- **Licença**: MIT
- **Repositório**: https://github.com/jeffersonrmoraes/servicenow-mcp

---

## 🗂️ Estrutura de Arquivos

```
servicenow-mcp/
├── index.js               ← Orquestrador MCP — registra tools e handlers
├── lib/
│   └── client.js          ← HTTP client dinâmico (snGet, snPost, snPatch, snDelete, snPostBinary, snGetBinary)
├── tools/
│   ├── scripts.js         ← Business Rules, Script Includes, Client Scripts, UI Policies, Scheduled Jobs, CRUD genérico
│   ├── catalog.js         ← Service Catalog (itens, variáveis, categorias)
│   ├── flow.js            ← Flow Designer (flows, subflows, actions, execuções)
│   ├── security.js        ← ACLs, Notifications, Roles, Grupos
│   ├── deploy.js          ← Update Sets
│   └── attachments.js     ← Attachment API (upload, list, download, delete)
├── AI_REFERENCE.md        ← Guia de uso das ferramentas para a IA consumidora
├── GEMINI.md              ← Este arquivo (contexto para IA desenvolvedora)
├── README.md              ← Documentação pública
├── .env.example           ← Template de variáveis de ambiente
└── package.json           ← v2.2.0, ESM, Node ≥ 18
```

---

## ⚙️ Stack e Convenções

| Item | Valor |
|---|---|
| Runtime | Node.js ≥ 18 |
| Módulos | ESM (`"type": "module"`) — usar sempre `import`/`export`, nunca `require` |
| HTTP Client | `fetch` nativo do Node (sem axios ou node-fetch) |
| Autenticação | Basic Auth via `Buffer.from(user:pass).toString('base64')` |
| Protocolo | `@modelcontextprotocol/sdk` v1.x |
| Entrada de dados | `stdio` transport (StdioServerTransport) |
| Variáveis de ambiente | `dotenv` não é importado — as variáveis chegam via `process.env` injetadas pelo cliente MCP no `mcp_config.json` |

---

## 🌐 Arquitetura Multi-Instância (CRÍTICO)

**Toda** ferramenta aceita o parâmetro opcional `env`. A função `getContext(env)` em `lib/client.js` resolve as credenciais dinamicamente:

```js
// Resolve: PDI_SN_INSTANCE, PDI_SN_USER, PDI_SN_PASSWORD
// Fallback: SN_INSTANCE, SN_USER, SN_PASSWORD
export const getContext = (env) => {
  const prefix = env ? `${env.toUpperCase()}_` : "";
  const instance = process.env[`${prefix}SN_INSTANCE`] || process.env.SN_INSTANCE;
  ...
};
```

**Regra para novas ferramentas**: Sempre incluir `env` no `inputSchema` e passar `args.env || null` para as funções do cliente.

---

## 📐 Padrão de Módulo (Como adicionar uma nova tool)

Cada módulo em `tools/` segue **sempre** este padrão:

```js
// 1. Import das funções necessárias do cliente
import { snGet, snPost, snPatch, snDelete } from "../lib/client.js";

// 2. Array de definições de ferramentas (schemas JSON)
export const myTools = [
  {
    name: "sn_minha_tool",
    description: "Descrição clara do que faz.",
    inputSchema: {
      type: "object",
      properties: {
        env: { type: "string", description: "Prefixo do ambiente (opcional, ex: DEV)" },
        // ... outros campos
        campo_obrigatorio: { type: "string" },
      },
      required: ["campo_obrigatorio"],
    },
  },
];

// 3. Handler único que recebe (name, args) e retorna null se não reconhecer o nome
export async function handleMyTool(name, args) {
  const env = args.env || null;

  if (name === "sn_minha_tool") {
    const { result } = await snPost("/api/now/table/minha_tabela", { ...args }, env);
    return result;
  }

  return null; // ← OBRIGATÓRIO para o loop de handlers funcionar
}
```

### Registrar no `index.js`:
```js
import { myTools, handleMyTool } from "./tools/mymodule.js";

const ALL_TOOLS = [ ...existingTools, ...myTools ];
const HANDLERS  = [ ...existingHandlers, handleMyTool ];
```

---

## 🔧 Funções do Cliente HTTP

| Função | Uso |
|---|---|
| `snGet(path, params, env)` | GET — leitura de registros |
| `snPost(path, body, env)` | POST — criação de registros (JSON) |
| `snPatch(path, body, env)` | PATCH — atualização de registros |
| `snDelete(path, env)` | DELETE — remoção de registros |
| `snPostBinary(path, buffer, contentType, env)` | POST binário — upload de arquivos (Attachment API) |
| `snGetBinary(path, env)` | GET binário — retorna Base64 (download de arquivos) |

**Nota sobre a Attachment API**: O `snPostBinary` **não** inclui `Content-Type: application/json`. Ele sobrescreve o header com o `contentType` passado (ex: `image/png`, `text/plain`).

---

## 📦 Ferramentas Registradas (v2.2.0 — 55 total)

| Módulo | Ferramentas |
|---|---|
| `scripts.js` | `sn_query_records`, `sn_get_record`, `sn_create_business_rule`, `sn_update_business_rule`, `sn_create_script_include`, `sn_update_script_include`, `sn_create_client_script`, `sn_update_client_script`, `sn_create_ui_policy`, `sn_update_ui_policy`, `sn_create_scheduled_job`, `sn_update_scheduled_job`, `sn_execute_script`, `sn_create_table`, `sn_create_field`, `sn_create_record`, `sn_update_record`, `sn_delete_record` |
| `catalog.js` | `sn_create_catalog_item`, `sn_update_catalog_item`, `sn_create_catalog_variable`, `sn_update_catalog_variable`, `sn_create_catalog_category` |
| `flow.js` | `sn_get_flow`, `sn_activate_flow`, `sn_trigger_flow`, `sn_list_flow_executions`, `sn_create_subflow`, `sn_create_flow_action` |
| `security.js` | `sn_create_acl`, `sn_update_acl`, `sn_delete_acl`, `sn_list_acls`, `sn_add_role_to_acl`, `sn_remove_role_from_acl`, `sn_create_notification`, `sn_update_notification`, `sn_list_notifications`, `sn_create_role`, `sn_add_user_to_group`, `sn_remove_user_from_group`, `sn_assign_role_to_user`, `sn_list_group_members` |
| `deploy.js` | `sn_create_update_set`, `sn_set_current_update_set`, `sn_list_update_sets`, `sn_complete_update_set` |
| `attachments.js` | `sn_upload_attachment`, `sn_list_attachments`, `sn_download_attachment`, `sn_delete_attachment` |

---

## 🛣️ Roadmap (Próximas Implementações)

| Feature | Status | Módulo Previsto |
|---|---|---|
| System Properties (get/set) | 🔜 **Próximo** | `tools/properties.js` |
| Knowledge Base (search/create) | 📋 Planejado | `tools/knowledge.js` |
| CMDB & CI Relationships | 📋 Planejado | `tools/cmdb.js` |
| OAuth 2.0 Authentication | 📋 Planejado | `lib/auth.js` |

---

## 🧪 Como Testar

```bash
npm install
# O servidor aceita stdin/stdout — use um cliente MCP ou:
node index.js  # Deve exibir: "ServiceNow MCP Server v2.2.0 rodando — 55 ferramentas ativas"
```

Para **testes de integração**, conecte ao Agentspace com o `mcp_config.json` configurado e use as ferramentas diretamente na janela de chat, passando `"env": "PDI"` (ou o prefixo do ambiente alvo).

---

## ⚠️ Regras Importantes

1. **Nunca use `require()`** — o projeto é 100% ESM.
2. **Toda nova tool DEVE ter `env` no schema** — sem exceções.
3. **Nunca commite o `.env`** — use apenas `.env.example`.
4. **Atualizar sempre antes de qualquer `git push`**:
   - `README.md` → seção de ferramentas + entrada no **Changelog** + **Roadmap** atualizado
   - `package.json` → campo `"version"`
   - `index.js` → versão no `new Server(...)` e no `console.error(...)` (dois lugares)
   - `GEMINI.md` → campo **Versão Atual** e tabela de **Ferramentas Registradas**
5. **Bump de versão**: patch (`x.x.1`) para correções, minor (`x.1.0`) para novas ferramentas, major (`1.0.0`) para breaking changes.
6. **`out.txt`**: arquivo temporário gerado em testes — já está no `.gitignore`, nunca remover essa entrada.
