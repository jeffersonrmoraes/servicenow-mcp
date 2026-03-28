# ServiceNow Table: Push Notification (sys_cs_message_notification)

**Category:** SYSTEM
**SysID:** fdf6768a183e32108bb255f46a373a03

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `message_id` | Virtual Agent Conversation Message | reference | sys_cs_message | ✅ |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `consumer_account_id` | Consumer Account | reference | sys_cs_consumer_account | ✅ |
| `sys_updated_by` | Updated by | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `user_id` | User | reference | sys_user | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `push_title` | Push Notification Title | string | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:12.363Z*