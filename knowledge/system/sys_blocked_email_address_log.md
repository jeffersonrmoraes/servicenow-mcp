# ServiceNow Table: Bounce Email Address Log (sys_blocked_email_address_log)

**Category:** SYSTEM
**SysID:** a26b2206183232108bb255f46a373a58

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `bounce_type` | Bounce Type | string | - | - |
| `email` | Email | reference | sys_email | - |
| `sys_updated_by` | Updated by | string | - | - |
| `diagnostic_code` | Diagnostic Code | string_full_utf8 | - | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `more_information` | More Information | string_full_utf8 | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `blocked_email` | Blocked Email Address | reference | sys_blocked_email_address | - |
| `sys_id` | Sys ID | GUID | - | - |
| `status` | Status | string | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:47.607Z*