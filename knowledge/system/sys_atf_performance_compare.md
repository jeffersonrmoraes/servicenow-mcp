# ServiceNow Table: Performance Comparison (sys_atf_performance_compare)

**Category:** SYSTEM
**SysID:** df80f20a18b632108bb255f46a373a16

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `run1` | First run | reference | sys_atf_performance_run | ✅ |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `number` | Number | string | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `description` | Description | string | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `run2` | Second run | reference | sys_atf_performance_run | ✅ |
| `sys_created_on` | Created | glide_date_time | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:33.157Z*