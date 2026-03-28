# ServiceNow Table: What changed (sys_atf_what_changed)

**Category:** SYSTEM
**SysID:** 7670fa8618b632108bb255f46a373a60

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `application_file` | Application file | reference | sys_metadata | - |
| `sys_updated_by` | Updated by | string | - | - |
| `sys_atf_step` | ATF test step | reference | sys_atf_step | ✅ |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `previous_test_result` | Previous Test Result | reference | sys_atf_test_result | ✅ |
| `sys_atf_test_result` | Test Result | reference | sys_atf_test_result | ✅ |
| `update_set` | Update Set | reference | sys_update_set | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `update_name` | Update Name | string | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `type` | Type | string | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:38.944Z*