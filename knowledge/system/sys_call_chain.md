# ServiceNow Table: Call Chain (sys_call_chain)

**Category:** SYSTEM
**SysID:** 4042beca183a32108bb255f46a373a26

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_id` | Sys ID | GUID | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `source_record_id` | Source Record | document_id | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `source_table` | Source Table | table_name | - | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `call_chain` | Call chain | json | - | - |
| `sys_updated_by` | Updated by | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:49.103Z*