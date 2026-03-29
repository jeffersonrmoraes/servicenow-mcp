# ServiceNow Table: Flow Runtime Values (sys_flow_runtime_value)

**Category:** SYSTEM
**SysID:** 3cb13a02183a32108bb255f46a373a6c

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_updated_by` | Updated by | string | - | - |
| `type` | Type | choice | - | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `context` | Context | reference | sys_flow_context | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `value` | Value | json | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:29.414Z*