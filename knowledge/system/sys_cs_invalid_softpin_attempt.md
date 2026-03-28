# ServiceNow Table: Invalid Softpin Attempt (sys_cs_invalid_softpin_attempt)

**Category:** SYSTEM
**SysID:** 4b07be8a183e32108bb255f46a373ac1

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `channel_user_id` | Channel user ID | string | - | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `provider_application` | Provider channel identity | reference | sys_cs_provider_application | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `active` | Active | boolean | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:12.330Z*