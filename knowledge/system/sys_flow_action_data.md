# ServiceNow Table: Flow action data (sys_flow_action_data)

**Category:** SYSTEM
**SysID:** 40b1f602183a32108bb255f46a373a1a

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_mod_count` | Updates | integer | - | - |
| `id` | ID | string | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `status` | Status | string | - | - |
| `sys_created_by` | Created by | string | - | - |
| `type` | Type | string | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `data` | Data | json | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `context` | Context | reference | sys_flow_context | - |
| `sys_id` | Sys ID | GUID | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:26.491Z*