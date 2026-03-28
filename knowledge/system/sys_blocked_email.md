# ServiceNow Table: Blocked Emails (sys_blocked_email)

**Category:** SYSTEM
**SysID:** 5a6b2206183232108bb255f46a373a41

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `status` | Status | string | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `notification` | Notification | reference | sysevent_email_action | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `blocked_email` | Blocked Email Address | reference | sys_blocked_email_address | - |
| `sys_updated_by` | Updated by | string | - | - |
| `email` | Email | reference | sys_email | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:47.654Z*