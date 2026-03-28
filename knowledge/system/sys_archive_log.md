# ServiceNow Table: Archive Log (sys_archive_log)

**Category:** SYSTEM
**SysID:** 4e6b6ec2183232108bb255f46a373a40

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `to_table` | To table | short_table_name | - | - |
| `display_value` | Display value | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `archive` | Archive | reference | sys_archive | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `payload` | Payload | string | - | - |
| `restored` | Restored | glide_date_time | - | - |
| `from_table` | From table | short_table_name | - | - |
| `id` | ID | document_id | - | - |
| `archive_run` | Archive run | reference | sys_archive_run | - |
| `sys_created_by` | Created by | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:31.651Z*