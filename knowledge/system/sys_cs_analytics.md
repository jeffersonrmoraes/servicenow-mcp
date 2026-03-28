# ServiceNow Table: Chat Server Analytics (sys_cs_analytics)

**Category:** SYSTEM
**SysID:** 97f6f68a183e32108bb255f46a373a9d

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `thread_id` | Thread ID | integer | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `node_id` | Node ID | string | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `metric_value` | Metric Value | integer | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `conversation` | Conversation | reference | sys_cs_conversation | ✅ |
| `event_id` | Event ID | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `message` | Message | reference | sys_cs_message | ✅ |
| `user_id` | User ID | string | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `metric_key` | Metric Key | string | - | - |
| `sys_created_by` | Created by | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:57.737Z*