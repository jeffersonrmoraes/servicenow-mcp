# ServiceNow Table: Sys Audit Retention (sys_audit_retention)

**Category:** SYSTEM
**SysID:** ef3f6606187632108bb255f46a373a9b

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_mod_count` | Updates | integer | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `tablename` | Table Name | short_table_name | - | ✅ |
| `sys_created_by` | Created by | string | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `audit_retention` | Audit Retention | choice | - | ✅ |
| `sys_created_on` | Created | glide_date_time | - | - |
| `sys_id` | Sys ID | GUID | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:40.456Z*