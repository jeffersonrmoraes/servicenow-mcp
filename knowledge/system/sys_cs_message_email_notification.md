# ServiceNow Table: Unread Message Email Notification (sys_cs_message_email_notification)

**Category:** SYSTEM
**SysID:** 62f6b68a183e32108bb255f46a373a3c

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `user` | User | reference | sys_user | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `interaction` | Interaction | reference | interaction | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `messages` | Messages | glide_list | sys_cs_message | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:12.326Z*