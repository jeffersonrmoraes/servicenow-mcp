# ServiceNow Table: EVAM Datasource (sys_ux_composite_datasource)

**Category:** SYSTEM
**SysID:** f16fa6c6187632108bb255f46a373a26

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_id` | Sys ID | GUID | - | - |
| `encoded_query_script` | Encoded Query Script | script | - | - |
| `active` | Active | boolean | - | - |
| `condition` | Condition | conditions | - | - |
| `sort_by` | Interleave Field | field_name | - | - |
| `name` | Name | string | - | ✅ |
| `table` | Table | table_name | - | ✅ |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:33.236Z*