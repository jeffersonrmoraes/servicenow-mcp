# ServiceNow Table: Test Run Data Set (sys_atf_parameter_set)

**Category:** SYSTEM
**SysID:** 9a80bec618b632108bb255f46a373aef

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `active` | Active | boolean | - | - |
| `test` | Test | reference | sys_atf_test | ✅ |
| `order` | Order | integer | - | ✅ |
| `description` | Description | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `copied_from` | Copied from | reference | sys_atf_parameter_set | - |
| `parameters` | Parameters | glide_var | sys_atf_parameter_variable | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:33.146Z*