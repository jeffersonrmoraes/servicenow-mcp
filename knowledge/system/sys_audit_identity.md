# ServiceNow Table: Sys Audit Identity (sys_audit_identity)

**Category:** SYSTEM
**SysID:** df1ba202183232108bb255f46a373a19

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `user` | User | string | - | ✅ |
| `sys_mod_count` | Updates | integer | - | - |
| `source_table` | Source Table | table_name | - | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `source_id` | Source Id | string | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `type` | Type | choice | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:40.419Z*