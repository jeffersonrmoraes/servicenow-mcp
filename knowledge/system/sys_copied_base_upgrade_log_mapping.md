# ServiceNow Table: Copied-Base Upgrade Log Mapping (sys_copied_base_upgrade_log_mapping)

**Category:** SYSTEM
**SysID:** ac72b6ce183a32108bb255f46a373a35

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `copied_table_name` | Copied Record Table | table_name | - | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `base_record_upgrade_log` | Base Record's Upgrade History Log | reference | sys_upgrade_history_log | - |
| `base_table_name` | Base Record Table | table_name | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `upgrade_history` | Upgrade History | reference | sys_upgrade_history | - |
| `sys_id` | Sys ID | GUID | - | - |
| `base_record_sys_id` | Base Record | document_id | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `copied_record_sys_id` | Copied Record | document_id | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `copied_record_upgrade_log` | Copied Record's Upgrade History Log | reference | sys_upgrade_history_log | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:54.919Z*