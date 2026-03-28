# ServiceNow Table: Concurrent Import Set (sys_concurrent_import_set)

**Category:** SYSTEM
**SysID:** 459be20a183232108bb255f46a373ad2

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_mod_count` | Updates | integer | - | - |
| `table_name` | Table Name | table_name | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `scheduled_import` | Scheduled Import | reference | scheduled_import_set | - |
| `sys_created_by` | Created by | string | - | - |
| `data_source` | Data Source | reference | sys_data_source | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `transaction_id` | Transaction ID | string | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `number` | Number | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:54.848Z*