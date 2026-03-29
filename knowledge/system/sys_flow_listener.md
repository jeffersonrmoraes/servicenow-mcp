# ServiceNow Table: Listening Contexts (sys_flow_listener)

**Category:** SYSTEM
**SysID:** a4b13a02183a32108bb255f46a373a52

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_mod_count` | Updates | integer | - | - |
| `sys_flow_context` | Sys flow context | reference | sys_flow_context | ✅ |
| `listening_to` | Listening to | condition | - | ✅ |
| `sys_updated_by` | Updated by | string | - | - |
| `name` | Name | string | - | - |
| `sys_created_by` | Created by | string | - | - |
| `source_table` | Source table | table_name | - | ✅ |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `state` | State | choice | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `message` | Message | string | - | ✅ |
| `sys_id` | Sys ID | GUID | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:28.690Z*