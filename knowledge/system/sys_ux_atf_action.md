# ServiceNow Table: UX ATF Action (sys_ux_atf_action)

**Category:** SYSTEM
**SysID:** 3f80760a18b632108bb255f46a373a6e

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `returns` | Returns | json | - | - |
| `description` | Description | translated_text | - | ✅ |
| `params` | Parameters | json | - | - |
| `label` | Label | translated_field | - | ✅ |
| `action_name` | Action Name | string | - | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `action_type` | Action Type | choice | - | ✅ |
| `component` | Component | reference | sys_ux_macroponent | ✅ |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:32.472Z*