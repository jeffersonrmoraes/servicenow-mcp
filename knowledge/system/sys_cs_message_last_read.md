# ServiceNow Table: Message Last Read (sys_cs_message_last_read)

**Category:** SYSTEM
**SysID:** 9c077a8a183e32108bb255f46a373ac9

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_mod_count` | Updates | integer | - | - |
| `last_read_message_id` | Last Read Message Id | reference | sys_cs_message | ✅ |
| `notification_needed` | Notification Needed | boolean | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `notification_type` | Notification Type | string | - | ✅ |
| `sys_created_by` | Created by | string | - | - |
| `conversation` | Conversation | reference | sys_cs_conversation | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `oldest_not_read_message_timestamp` | Oldest Not Read Message Timestamp | glide_date_time | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `consumer_account_id` | Consumer Account Id | reference | sys_cs_consumer_account | ✅ |
| `last_received_message_id` | Last Received Message | reference | sys_cs_message | ✅ |
| `sys_id` | Sys ID | GUID | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:12.366Z*