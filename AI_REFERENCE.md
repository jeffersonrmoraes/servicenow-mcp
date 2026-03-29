# Guia de Ferramentas - ServiceNow MCP Server (v3.8.1)

Este manual é destinado a Agentes de IA que consomem este servidor MCP.

---

## 🏛️ Convenções Gerais

1. **Parâmetro `env`**: Opcional. Use para rotear para instâncias específicas.
2. **Dashboard Visual**: Use o `npm run dashboard` para gerenciar seus ambientes visualmente antes de começar a codar.
3. **Knowledge First (v3.8)**: Sempre verifique a pasta `knowledge/` no diretório raiz. Se a tabela que você vai usar estiver documentada lá, use-a como fonte da verdade para nomes de campos e tipos.
4. **Validação de Inputs (v3.8.1)**: Os campos `table`, `sys_id` e `limit` são validados automaticamente em todas as operações CRUD. Nomes de tabela devem seguir o padrão `[a-zA-Z0-9_]+`. sys_ids devem ter 32 caracteres hexadecimais. Limites devem ser inteiros entre 1 e 1000.
5. **Cache automático (v3.8.1)**: Todas as chamadas `GET` são cacheadas por 60 segundos por ambiente. Operações de escrita (`POST`, `PATCH`, `DELETE`) invalidam o cache do path afetado automaticamente.
6. **Rate Limit (v3.8.1)**: O servidor limita a 10 chamadas/segundo por ambiente. Se exceder, o erro é retornado à IA com mensagem clara — aguarde e tente novamente.

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
4. **Erros de validação**: Se receber erro de `tableName inválido` ou `sys_id inválido`, corrija o valor antes de tentar novamente — não é um erro de rede.
5. **Rate limit**: Se receber `Rate limit excedido`, não repita imediatamente. Aguarde 1 segundo antes da próxima chamada.
6. **Cache hit**: Respostas GET repetidas para o mesmo path/query retornam do cache (60s). Para forçar dados frescos, use `sn_query_records` com parâmetros diferentes ou aguarde o TTL.

---

## 🔒 Comportamento de Segurança (v3.8.1)

- **Dashboard `/api/env`**: Retorna apenas o conteúdo do arquivo `.env` — não expõe variáveis do processo do sistema.
- **Erros amigáveis**: Lookups de grupo, usuário e role retornam mensagem clara se o recurso não for encontrado (não causa crash).
- **Startup**: O servidor valida `SN_INSTANCE` ao iniciar e emite aviso no stderr se não configurado.
