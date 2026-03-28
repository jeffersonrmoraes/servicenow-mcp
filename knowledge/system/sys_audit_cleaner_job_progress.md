# ServiceNow Table: Sys Audit Cleaner Job Progress (sys_audit_cleaner_job_progress)

**Category:** SYSTEM
**SysID:** 233f6606187632108bb255f46a373a88

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_audit_delete_last_processed_time` | Last Processed Timestamp Sys Audit Delete | glide_date_time | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `sys_audit_retention` | Table Name | reference | sys_audit_retention | ✅ |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `sys_audit_last_processed_time` | Last Processed Timestamp Sys Audit | glide_date_time | - | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:40.418Z*