# ServiceNow Table: Custom DB Objects (sys_custom_db_object)

**Category:** SYSTEM
**SysID:** 19f2fe0a187a32108bb255f46a373ae5

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `source_scope` | Source Scope | reference | sys_scope | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `source_parent` | Source Parent | string | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `source_type` | Source Type | string | - | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `source` | Source | string | - | ✅ |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `is_from_app_install` | Table Included in App Install | boolean | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:18.117Z*