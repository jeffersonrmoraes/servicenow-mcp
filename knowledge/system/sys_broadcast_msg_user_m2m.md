# ServiceNow Table: Broadcast Messages to Users (sys_broadcast_msg_user_m2m)

**Category:** SYSTEM
**SysID:** 8960f64618b632108bb255f46a373a55

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_id` | Sys ID | GUID | - | - |
| `message` | Message | reference | sys_broadcast_message | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `alerted` | Alerted | boolean | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `user` | User | reference | sys_user | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `sys_updated_by` | Updated by | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:47.655Z*