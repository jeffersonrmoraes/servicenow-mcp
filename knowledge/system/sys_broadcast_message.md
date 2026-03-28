# ServiceNow Table: Broadcast Message (sys_broadcast_message)

**Category:** SYSTEM
**SysID:** 4560b64618b632108bb255f46a373aa7

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `dc_sys_id` | DC sys id | string | - | - |
| `email` | Email | boolean | - | - |
| `user_filter` | Role filter | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `message` | Message | string | - | ✅ |
| `email_sent` | Email sent | boolean | - | - |
| `notify_users_until_date` | Notify users until date | glide_date_time | - | ✅ |
| `notify_users_after_date` | Notify users after date | glide_date_time | - | ✅ |
| `logged_in` | Logged in | boolean | - | - |
| `at_login` | At login | boolean | - | - |
| `any_roled_user` | Any roled user | boolean | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:47.656Z*