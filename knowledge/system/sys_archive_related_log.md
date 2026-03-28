# ServiceNow Table: Archive Related Log (sys_archive_related_log)

**Category:** SYSTEM
**SysID:** 3d6b2ec2183232108bb255f46a373ac3

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_updated_by` | Updated by | string | - | - |
| `root_id` | Root ID | char | - | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `archive_log` | Archive log | reference | sys_archive_log | - |
| `sys_created_on` | Created | glide_date_time | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:31.689Z*