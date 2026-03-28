# ServiceNow Table: Auto-Resolution Reminder (sys_cs_auto_resolution_reminder)

**Category:** SYSTEM
**SysID:** fe877e42187e32108bb255f46a373a2c

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_updated_by` | Updated by | string | - | - |
| `percentage` | SLA percentage | integer | - | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `email_notification` | Email notification | reference | sysevent_email_action | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `configuration` | Configuration | reference | sys_cs_auto_resolution_configuration | ✅ |
| `sys_updated_on` | Updated | glide_date_time | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:59.273Z*