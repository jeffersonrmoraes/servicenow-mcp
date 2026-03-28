# ServiceNow Table: Session Binding (sys_cs_session_binding)

**Category:** SYSTEM
**SysID:** bcf6f28a183e32108bb255f46a373a0b

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `system_topic` | System topic | reference | sys_cs_conversation | - |
| `sys_updated_by` | Updated by | string | - | - |
| `channel_id` | The channel identifier | string | - | - |
| `client_connected` | Indicates Client is Connected | boolean | - | - |
| `sys_created_by` | Created by | string | - | - |
| `channel_type` | Channel Type | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `online` | Indicates whether client is online | boolean | - | - |
| `guest` | Indicates Guest User Session | boolean | - | - |
| `topic` | Topic | reference | sys_cs_conversation | - |
| `sys_id` | Sys ID | GUID | - | - |
| `session` | Session | reference | sys_cs_session | - |
| `sent_reminder` | Indicates Reminder is sent | boolean | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `auxiliary_channel_id` | The auxiliary channel identifier | string | - | - |
| `last_client_activity_time` | Last Client Activity Time | glide_date_time | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:15.216Z*