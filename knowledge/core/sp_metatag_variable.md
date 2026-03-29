# ServiceNow Table: Content variable (sp_metatag_variable)

**Category:** CORE
**SysID:** 3790764a18b632108bb255f46a373a21

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `variable` | Name | string | - | ✅ |
| `source_field` | Table field | field_name | - | - |
| `source_table` | Table | table_name | - | ✅ |
| `order` | Order | integer | - | - |
| `column_name` | Relevant table column | field_name | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `sp_metatag` | Metatag | reference | sp_metatag | ✅ |
| `filter_condition` | Query Condition | conditions | - | - |
| `id_parameter` | URL query parameter | string | - | ✅ |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:14.127Z*