# ServiceNow Table: User Experience Analytics Long Inactive Users Login (sys_analytics_long_inactive_users_login_data)

**Category:** SYSTEM
**SysID:** 7b7c668e187232108bb255f46a373ade

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_updated_by` | Updated by | string | - | - |
| `user` | User | reference | sys_user | ✅ |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `is_user_synchronized` | Is user synchronized | boolean | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:21.503Z*