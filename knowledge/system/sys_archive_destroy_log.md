# ServiceNow Table: Archive Destroy Log (sys_archive_destroy_log)

**Category:** SYSTEM
**SysID:** 8a6b6ec2183232108bb255f46a373aa9

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `archive_destroy` | Archive destroy | reference | sys_archive_destroy | - |
| `sys_id` | Sys ID | GUID | - | - |
| `id` | ID | document_id | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `from_table` | From table | table_name | - | - |
| `sys_created_by` | Created by | string | - | - |
| `archive_destroy_run` | Archive destroy run | reference | sys_archive_destroy_run | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:31.649Z*