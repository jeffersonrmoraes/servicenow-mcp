# ServiceNow Table: Backout Problem (sys_backout_problem)

**Category:** SYSTEM
**SysID:** 57cba28e183232108bb255f46a373a0e

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `target_version` | Target Version | reference | sys_update_version | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `description` | Description | string | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `set_id` | Set | document_id | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `set_table` | Set Table | source_table | - | - |
| `version` | Version | reference | sys_update_version | - |
| `sys_updated_by` | Updated by | string | - | - |
| `decision` | Decision | string | - | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:46.158Z*