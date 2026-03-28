# ServiceNow Table: Reusable Test Step (sys_atf_step_callable)

**Category:** SYSTEM
**SysID:** 7670fa8618b632108bb255f46a373a1e

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `callable_inputs` | Reusable input variables | glide_var | atf_input_variable_callable | - |
| `sys_id` | Sys ID | GUID | - | - |
| `callable_test` | Reusable test | reference | sys_atf_test_callable | ✅ |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:34.636Z*