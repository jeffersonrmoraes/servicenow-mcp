# ServiceNow Table: UX Component Preset (sys_ux_component_preset)

**Category:** SYSTEM
**SysID:** 008be286183232108bb255f46a373ad0

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `name` | Name | translated_field | - | ✅ |
| `parent_repeater_preset` | Parent repeater preset | reference | sys_ux_component_preset | - |
| `required_translations` | Required translations | json_translations | - | - |
| `controller` | Controller | reference | sys_ux_controller | - |
| `is_repeater` | Is repeater | boolean | - | - |
| `event_handlers` | Event Handlers | json | - | - |
| `component` | Component | reference | sys_ux_macroponent | ✅ |
| `description` | Description | translated_text | - | - |
| `is_repeated_element` | Is repeated element | boolean | - | - |
| `properties` | Properties | json | - | - |
| `controller_dependencies` | Controller Dependencies | json | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `repeat_with` | Repeat with | json | - | - |
| `hide_component` | Hide Component | json | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:33.245Z*