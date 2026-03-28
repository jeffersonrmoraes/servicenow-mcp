# ServiceNow Table: Audit Relationship Change (sys_audit_relation)

**Category:** SYSTEM
**SysID:** 131ba202183232108bb255f46a373a27

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `audit_delete` | Audit delete | reference | sys_audit_delete | - |
| `documentkey` | Document Key | char | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `audit` | Audit | reference | sys_audit | - |
| `tablename` | Table Name | short_table_name | - | - |
| `sys_created_by` | Created by | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:40.421Z*