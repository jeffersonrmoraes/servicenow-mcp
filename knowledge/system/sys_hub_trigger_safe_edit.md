# ServiceNow Table: Trigger Definition Safe Edit (sys_hub_trigger_safe_edit)

**Category:** SYSTEM
**SysID:** 1eb17e02183a32108bb255f46a373a5f

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `user` | User | string | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `trigger_definition` | Trigger Definition | reference | sys_hub_trigger_definition | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:24.852Z*