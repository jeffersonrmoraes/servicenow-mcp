# ServiceNow Table: Test (sys_atf_test)

**Category:** SYSTEM
**SysID:** 5a70ba8618b632108bb255f46a373a1d

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sn_atf_tg_generated` | Generated | boolean | - | - |
| `description` | Description | string | - | - |
| `active` | Active | boolean | - | - |
| `fail_on_server_error` | Fail on server error | boolean | - | - |
| `copied_from` | Copied from | reference | sys_atf_test | - |
| `parameters` | Parameters | glide_var | sys_atf_parameter_variable | - |
| `test_origin` | Test origin | string | - | - |
| `remember` | Remembered values | glide_var | sys_atf_remembered_values | - |
| `enable_parameterized_testing` | Enable parameterized testing | boolean | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `name` | Name | string | - | ✅ |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:36.017Z*