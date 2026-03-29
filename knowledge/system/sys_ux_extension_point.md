# ServiceNow Table: UX Extension Point (sys_ux_extension_point)

**Category:** SYSTEM
**SysID:** 1b7b2286183232108bb255f46a373ae5

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `component` | Component | reference | sys_ux_macroponent | ✅ |
| `name` | Name | translated_field | - | ✅ |
| `type` | Type | choice | - | - |
| `controller` | Controller | reference | sys_ux_controller | - |
| `sys_id` | Sys ID | GUID | - | - |
| `controller_dependencies` | Controller Dependencies | json | - | - |
| `description` | Description | translated_text | - | - |
| `app_shell` | App shell | reference | sys_ux_macroponent | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:36.829Z*