# ServiceNow Table: Test Suite (sys_atf_test_suite)

**Category:** SYSTEM
**SysID:** 3670fa8618b632108bb255f46a373a2a

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_id` | Sys ID | GUID | - | - |
| `sn_atf_tg_generated` | Generated | boolean | - | - |
| `active` | Active | boolean | - | - |
| `parent` | Parent suite | reference | sys_atf_test_suite | - |
| `description` | Description | string | - | - |
| `name` | Name | string | - | ✅ |
| `input_filter` | Filter | conditions | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:37.494Z*