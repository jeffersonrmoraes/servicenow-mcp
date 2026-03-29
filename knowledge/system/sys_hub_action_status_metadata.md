# ServiceNow Table: Action Status Metadata (sys_hub_action_status_metadata)

**Category:** SYSTEM
**SysID:** 0fc17e42183a32108bb255f46a373a5c

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `action_type_id` | Action Type Id | reference | sys_hub_action_type_base | - |
| `sys_created_on` | Created | glide_date_time | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:20.511Z*