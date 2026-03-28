# ServiceNow Table: Test Suite Test (sys_atf_test_suite_test)

**Category:** SYSTEM
**SysID:** b5707a8618b632108bb255f46a373a0c

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `test` | Test | reference | sys_atf_test | ✅ |
| `test_suite` | Test suite | reference | sys_atf_test_suite | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `abort_on_failure` | Abort on failure | boolean | - | - |
| `order` | Execution order | integer | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:37.483Z*