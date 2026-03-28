# ServiceNow Table: Build Suggestion Log (sys_build_suggestion_log)

**Category:** SYSTEM
**SysID:** 9e90324a18b632108bb255f46a373ac0

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `step` | Step | string | - | ✅ |
| `error` | Error | string | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `session_id` | Session | string | - | - |
| `build` | Build | string | - | ✅ |
| `message` | Message | string | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:47.652Z*