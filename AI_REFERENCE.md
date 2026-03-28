# Guia de Ferramentas - ServiceNow MCP Server (v3.8.0)

Este manual é destinado a Agentes de IA que consomem este servidor MCP.

---

## 🏛️ Convenções Gerais

1. **Parâmetro `env`**: Opcional. Use para rotear para instâncias específicas.
2. **Dashboard Visual**: Use o `npm run dashboard` para gerenciar seus ambientes visualmente antes de começar a codar.
3. **Knowledge First (v3.8)**: Sempre verifique a pasta `knowledge/` no diretório raiz. Se a tabela que você vai usar estiver documentada lá, use-a como fonte da verdade para nomes de campos e tipos.

---

## 🎨 Principais Blocos de Ferramentas

- **IA & Contexto**: `sn_sync_knowledge_base`, `sn_generate_ai_context`.
- **Front-end & UX**: `sn_manage_widget`, `sn_manage_ui_action`.
- **Desenvolvimento**: `sn_upsert_metadata_script`, `sn_manage_schema`.
- **Segurança**: `sn_manage_acl`, `sn_manage_access`.

---

## 💡 Melhores Práticas para a IA

1. **Zero Guesswork**: Se não souber os campos de uma tabela, use `sn_sync_knowledge_base` para sincronizar os metadados antes de tentar inserir ou atualizar registros.
2. **Validação Visual**: Se estiver criando um Widget, lembre-se que o usuário pode validar a conexão da instância via Dashboard.
3. **Setup amigável**: Se o usuário tiver problemas de conexão, sugira que ele use o Dashboard (`localhost:3000`) para testar as credenciais.
