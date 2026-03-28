# ServiceNow Table: Template Sharing Permission (sys_app_template_sharing_m2m)

**Category:** SYSTEM
**SysID:** 970236c6183a32108bb255f46a373ae6

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `template` | Template | reference | sys_app_template | - |
| `sys_updated_by` | Updated by | string | - | - |
| `user_group` | User Group | reference | sys_user_group | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `global` | Global | boolean | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `user` | User | reference | sys_user | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:30.212Z*