# ServiceNow Table: Step Result (sys_atf_test_result_step)

**Category:** SYSTEM
**SysID:** b1703a8618b632108bb255f46a373af3

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_id` | Sys ID | GUID | - | - |
| `origin_test` | Origin Test | reference | sys_atf_test | ✅ |
| `order` | Execution order | integer | - | - |
| `outputs` | Output variables | glide_var | atf_output_variable | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:36.060Z*