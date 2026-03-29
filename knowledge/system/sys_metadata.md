# ServiceNow Table: Application File (sys_metadata)

**Category:** SYSTEM
**SysID:** c21b2202183232108bb255f46a373aa2

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_id` | Sys ID | GUID | - | ✅ |
| `sys_package` | Package | reference | sys_package | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `sys_scope` | Application | reference | sys_scope | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_update_name` | Update name | string | - | - |
| `sys_name` | Display name | string | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `sys_policy` | Protection policy | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `sys_class_name` | Class | sys_class_name | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:25:27.305Z*