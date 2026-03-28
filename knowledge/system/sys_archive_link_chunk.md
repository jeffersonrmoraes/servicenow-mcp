# ServiceNow Table: Link Archive and Destroy Chunk (sys_archive_link_chunk)

**Category:** SYSTEM
**SysID:** 4a6b6ec2183232108bb255f46a373a97

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_id` | Sys ID | GUID | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `destroy_chunk` | Destroy chunk | reference | sys_archive_destroy_chunk | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `archive_chunk` | Archive chunk | reference | sys_archive_run_chunk | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `sys_updated_by` | Updated by | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:31.638Z*