# ServiceNow Table: Email Log (sys_email_log)

**Category:** SYSTEM
**SysID:** 612ba602183232108bb255f46a373acf

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_updated_by` | Updated by | string | - | - |
| `event` | Event | reference | sysevent | - |
| `sys_mod_count` | Updates | integer | - | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `notification` | Notification | reference | sysevent_email_action | - |
| `email` | Email | reference | sys_email | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:25:31.688Z*