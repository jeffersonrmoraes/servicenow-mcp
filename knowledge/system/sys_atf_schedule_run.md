# ServiceNow Table: Scheduled Suite Run (sys_atf_schedule_run)

**Category:** SYSTEM
**SysID:** 01803ac618b632108bb255f46a373af9

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `watch_list` | Watch list | glide_list | sys_user | - |
| `browser_version` | Browser version starts with | string | - | - |
| `description` | Description | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `order` | Execution order | integer | - | - |
| `browser_name` | Browser name | choice | - | - |
| `active` | Active | boolean | - | - |
| `os_version` | OS version starts with | string | - | - |
| `test_suite` | Test suite | reference | sys_atf_test_suite | ✅ |
| `schedule` | Schedule | reference | sys_atf_schedule | - |
| `os_name` | OS name | choice | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:34.639Z*