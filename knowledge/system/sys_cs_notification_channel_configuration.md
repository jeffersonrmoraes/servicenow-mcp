# ServiceNow Table: Notification Channel Configuration (sys_cs_notification_channel_configuration)

**Category:** SYSTEM
**SysID:** b5073e8a183e32108bb255f46a373aac

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `notification_channel` | Notification Channel | reference | sys_notification_channel | - |
| `sys_updated_by` | Updated by | string | - | - |
| `provider` | Provider | reference | sys_cs_provider | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `channel` | Messaging Channel | reference | sys_cs_channel | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `notification_provider` | Notification Provider | reference | sys_notification_provider | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:13.721Z*