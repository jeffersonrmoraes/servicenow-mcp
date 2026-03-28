# ServiceNow Table: Designer User Preferences (sys_cb_user_preference)

**Category:** SYSTEM
**SysID:** 0e17f2ca183e32108bb255f46a373a5e

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_id` | Sys ID | GUID | - | - |
| `preference` | Preference | string | - | ✅ |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `value` | Value | string | - | ✅ |
| `sys_created_on` | Created | glide_date_time | - | - |
| `user` | User | reference | sys_user | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `sys_updated_by` | Updated by | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:50.568Z*