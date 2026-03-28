# ServiceNow Table: Article Template Field (kb_article_template_definition)

**Category:** CORE
**SysID:** 04e232c6187a32108bb255f46a373ab3

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `active` | Active | boolean | - | - |
| `article_template` | Article Template | reference | kb_article_template | - |
| `collapsible` | Expand/Collapse | choice | - | - |
| `sys_domain` | Domain | domain_id | - | - |
| `table_column` | Template Field | field_name | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `preview_text` | Preview Text | html | - | - |
| `field_style` | Field style | string | - | - |
| `order` | Order | integer | - | - |
| `column_type` | Field Type | choice | - | ✅ |
| `heading_style` | Heading style | string | - | - |
| `sys_domain_path` | Domain Path | domain_path | - | - |
| `mandatory` | Mandatory | boolean | - | - |
| `column_label` | Field Name | string | - | ✅ |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:14:33.487Z*