# ServiceNow Table: Step Result Transaction (sys_atf_transaction_mtom)

**Category:** SYSTEM
**SysID:** d6707a8618b632108bb255f46a373aff

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `transaction_id` | Transaction | reference | syslog_transaction | - |
| `sys_updated_by` | Updated by | string | - | - |
| `recorded_at` | Recorded at | counter | - | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `engine` | ATF Engine Transaction | boolean | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `step_result` | Step result | reference | sys_atf_test_result_step | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:37.527Z*