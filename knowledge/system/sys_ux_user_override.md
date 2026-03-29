# ServiceNow Table: UX User Override (sys_ux_user_override)

**Category:** SYSTEM
**SysID:** 267b2e46183232108bb255f46a373aea

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_id` | Sys ID | GUID | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `overrides` | Overrides | json | - | ✅ |
| `sys_created_on` | Created | glide_date_time | - | - |
| `user` | User | reference | sys_user | ✅ |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `category` | Category | choice | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:43.565Z*