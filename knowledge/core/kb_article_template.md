# ServiceNow Table: Article Template (kb_article_template)

**Category:** CORE
**SysID:** 77d232c6187a32108bb255f46a373a66

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `description` | Description | string | - | - |
| `answer_ref` | Knowledge Interceptor Answer | reference | sys_wizard_answer | - |
| `sys_domain` | Domain | domain_id | - | - |
| `sys_domain_path` | Domain Path | domain_path | - | - |
| `article_template` | Name | string | - | ✅ |
| `active` | Active | boolean | - | - |
| `meta_description_field` | SEO Description Tag | reference | kb_article_template_definition | - |
| `child_table` | Template Table | table_name | - | - |
| `sys_id` | Sys ID | GUID | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:14:33.133Z*