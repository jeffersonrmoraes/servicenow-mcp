# ServiceNow Table: Dynamic page variables (sp_page_title_variable)

**Category:** CORE
**SysID:** 45a0f64a18b632108bb255f46a373a45

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `filter_condition` | Query Condition | conditions | - | - |
| `id_parameter` | URL query parameter | string | - | ✅ |
| `variable` | Name | string | - | ✅ |
| `source_field` | Table field | field_name | - | - |
| `source_table` | Table | table_name | - | ✅ |
| `order` | Order | integer | - | - |
| `column_name` | Relevant table column | field_name | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `sp_page` | Page | reference | sp_page | ✅ |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:14.123Z*