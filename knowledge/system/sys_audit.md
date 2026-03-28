# ServiceNow Table: Sys Audit (sys_audit)

**Category:** SYSTEM
**SysID:** 1b1b6202183232108bb255f46a373aff

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `user` | User | string | - | - |
| `oldvalue` | Old value | string | - | - |
| `record_checkpoint` | Update count | integer | - | - |
| `sys_created_by` | Created by | string | - | - |
| `documentkey` | Document Key | char | - | - |
| `newvalue` | New value | string | - | - |
| `internal_checkpoint` | Record internal checkpoint | string | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `fieldname` | Field Name | short_field_name | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `tablename` | Table Name | short_table_name | - | - |
| `reason` | Reason | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:40.491Z*