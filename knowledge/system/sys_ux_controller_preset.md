# ServiceNow Table: UX Controller Preset (sys_ux_controller_preset)

**Category:** SYSTEM
**SysID:** a37b6286183232108bb255f46a373a81

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `event_handlers` | Event Handlers | json | - | - |
| `description` | Description | translated_text | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `require_explicit_event_mapping` | Require explicit event mapping | boolean | - | - |
| `required_translations` | Required translations | json_translations | - | - |
| `properties` | Properties | json | - | - |
| `name` | Name | translated_field | - | ✅ |
| `host_event_handlers` | Host Event Handlers | json | - | - |
| `connected_controller` | Connected Controller | reference | sys_ux_controller | - |
| `connected_controller_event_handlers` | Connected Controller Event Handlers | json | - | - |
| `controller` | Controller | reference | sys_ux_controller | ✅ |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:34.632Z*