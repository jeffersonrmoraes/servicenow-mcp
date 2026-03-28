# ServiceNow Table: Performance Run (sys_atf_performance_run)

**Category:** SYSTEM
**SysID:** 7e80720a18b632108bb255f46a373add

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_mod_count` | Updates | integer | - | - |
| `source` | Source | document_id | - | - |
| `description` | Description | string | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `status` | Status | string | - | - |
| `sys_created_by` | Created by | string | - | - |
| `execution_tracker` | Execution tracker | reference | sys_execution_tracker | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `expected_iterations` | Expected Iterations | integer | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `number` | Number | string | - | - |
| `source_type` | Source type | table_name | - | - |
| `sys_id` | Sys ID | GUID | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:34.567Z*