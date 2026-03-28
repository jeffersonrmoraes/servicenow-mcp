# ServiceNow Table: Custom Control Definition (sys_cs_custom_control_definition)

**Category:** SYSTEM
**SysID:** 5507fa8a183e32108bb255f46a373afe

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `ux_component_definition` | UX Component Definition | reference | sys_ux_lib_component | - |
| `channel` | Channel | string | - | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `sys_domain` | Domain | domain_id | - | - |
| `sys_custom_control` | Custom Control | reference | sys_cs_custom_control | ✅ |
| `ux_macroponent_definition` | UX Macroponent Definition | reference | sys_ux_macroponent | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:09.398Z*