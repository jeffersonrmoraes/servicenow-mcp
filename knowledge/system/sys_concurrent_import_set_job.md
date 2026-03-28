# ServiceNow Table: Concurrent Import Set Job (sys_concurrent_import_set_job)

**Category:** SYSTEM
**SysID:** 5d9b260a183232108bb255f46a373a98

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `import_set` | Import Set | reference | sys_import_set | - |
| `synchronize_inserts` | Synchronize Inserts | boolean | - | - |
| `sys_created_by` | Created by | string | - | - |
| `concurrent_import_set` | Concurrent Import Set | reference | sys_concurrent_import_set | - |
| `sys_mod_count` | Updates | integer | - | - |
| `state` | State | string | - | - |
| `execution_context` | Execution Context | reference | sys_execution_context | - |
| `sys_updated_by` | Updated by | string | - | - |
| `type` | Type | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `number` | Number | string | - | - |
| `run_after` | Run after | reference | sys_concurrent_import_set_job | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `scheduled_import` | Scheduled Import | reference | scheduled_import_set | - |
| `retry_count` | Retry count | integer | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `multi_import_set` | Multi import set | reference | sys_multi_import_set | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:54.854Z*