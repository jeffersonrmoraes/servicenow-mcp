# ServiceNow Table: Embeddable Log (sys_ux_embeddable_log)

**Category:** SYSTEM
**SysID:** bf7be286183232108bb255f46a373a99

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `component_tag` | Component Tag | string | - | ✅ |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `macroponent_sysid` | Macroponent SysId | string | - | ✅ |
| `sys_created_on` | Created | glide_date_time | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `session_id` | Session Id | string | - | ✅ |
| `sys_updated_by` | Updated by | string | - | - |
| `user` | User | reference | sys_user | ✅ |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:36.128Z*