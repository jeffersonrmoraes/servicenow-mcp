# ServiceNow Table: View Table (sys_db_view_table)

**Category:** SYSTEM
**SysID:** ef4b6e42183232108bb255f46a373ad4

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `where_clause` | Where clause | string | - | - |
| `left_join` | Left join | boolean | - | - |
| `active` | Active | boolean | - | - |
| `order` | Order | integer | - | - |
| `view` | View | reference | sys_db_view | - |
| `variable_prefix` | Variable prefix | string | - | ✅ |
| `table` | Table | table_name | - | ✅ |
| `sys_id` | Sys ID | GUID | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:20.936Z*