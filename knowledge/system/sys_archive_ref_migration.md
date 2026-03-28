# ServiceNow Table: Archive Rule Reference Migration (sys_archive_ref_migration)

**Category:** SYSTEM
**SysID:** 8e6b2ec2183232108bb255f46a373af7

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `table` | Table | table_name | - | ✅ |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `reference_migration_progress` | Reference migration progress | choice | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `rule` | Rule | reference | sys_archive | ✅ |
| `sys_updated_by` | Updated by | string | - | - |
| `reference_current_marker` | Reference current marker | glide_date_time | - | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:31.677Z*