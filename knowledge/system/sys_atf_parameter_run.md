# ServiceNow Table: Parameter Set Run (sys_atf_parameter_run)

**Category:** SYSTEM
**SysID:** 9a80bec618b632108bb255f46a373abe

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `order` | Order | integer | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `description` | Description | string | - | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `parameter_test_result` | Parameterized test result | reference | sys_atf_parameter_result | ✅ |
| `sys_created_on` | Created | glide_date_time | - | - |
| `test` | Test | reference | sys_atf_test | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `parameter_set` | Parameter set | reference | sys_atf_parameter_set | ✅ |
| `sys_updated_on` | Updated | glide_date_time | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:33.186Z*