# ServiceNow Table: Modified Record (sys_atf_modified_record_m2m)

**Category:** SYSTEM
**SysID:** 6270ba8618b632108bb255f46a373a68

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_id` | Sys ID | GUID | - | - |
| `record` | Record | reference | sys_atf_modified_record | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `parameter_set_order` | Parameter set order | integer | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `operation` | Operation | string | - | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `test` | Test | reference | sys_atf_test | - |
| `sys_updated_by` | Updated by | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:33.111Z*