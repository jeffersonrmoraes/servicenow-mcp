# ServiceNow Table: Virtual Agent Notifications (sys_cs_notification)

**Category:** SYSTEM
**SysID:** 75073e8a183e32108bb255f46a373af6

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `actionable_notification` | Actionable notification | boolean | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `sequence` | Sequence | auto_increment | - | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `notification_execution` | Notification Execution | reference | sys_notification_execution | - |
| `consumer_account` | Consumer Account | reference | sys_cs_consumer_account | - |
| `content` | Content | string_full_utf8 | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `state` | State | string | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `conversation` | Conversation | reference | sys_cs_conversation | - |
| `sys_created_on` | Created | glide_date_time | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:13.723Z*