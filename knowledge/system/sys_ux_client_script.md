# ServiceNow Table: UX Client Script (sys_ux_client_script)

**Category:** SYSTEM
**SysID:** fb7ba286183232108bb255f46a373acb

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `script_api_version` | API version | string | - | ✅ |
| `macroponent` | Macroponent | reference | sys_ux_macroponent | - |
| `target` | Target | string | - | - |
| `includes` | Client Script Include Dependencies | glide_list | sys_ux_client_script_include | - |
| `script` | Script | script_client | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `type` | Type | string | - | - |
| `controller_preset` | Controller Preset | reference | sys_ux_controller_preset | - |
| `preset` | Preset | reference | sys_ux_component_preset | - |
| `name` | Name | string | - | ✅ |
| `required_translations` | Required translations | json_translations | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:33.198Z*