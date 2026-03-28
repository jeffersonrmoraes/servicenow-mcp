# ServiceNow Table: Scan Failure (sys_app_scan_failure)

**Category:** SYSTEM
**SysID:** 1e02b2c6183a32108bb255f46a373af6

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `reason` | Error | string | - | ✅ |
| `sys_created_by` | Created by | string | - | - |
| `source_table` | Source table | table_name | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `file_table` | File table | table_name | - | - |
| `file_count` | File count | integer | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `file` | File | document_id | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `type` | Type | choice | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `scan_id` | Scan ID | string | - | - |
| `rule` | Permit Rule | reference | sys_app_template_permit_rule | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `source` | Scanned Source | document_id | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:25.904Z*