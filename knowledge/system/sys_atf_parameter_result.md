# ServiceNow Table: Parameterized Test Result (sys_atf_parameter_result)

**Category:** SYSTEM
**SysID:** 9680fec618b632108bb255f46a373a01

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `start_time` | Start time | glide_date_time | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `status` | Status | string | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `test` | Test | reference | sys_atf_test | ✅ |
| `sys_updated_by` | Updated by | string | - | - |
| `run_time` | Duration | glide_duration | - | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:33.149Z*