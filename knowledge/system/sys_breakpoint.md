# ServiceNow Table: JS Breakpoints (sys_breakpoint)

**Category:** SYSTEM
**SysID:** f6eba242187232108bb255f46a373a71

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_id` | Sys ID | GUID | - | - |
| `active` | Active | boolean | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `user` | User | reference | sys_user | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `lines` | Lines | string | - | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `key` | Key | string | - | - |
| `sys_updated_by` | Updated by | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:47.700Z*