# ServiceNow Table: UX Keyboard Shortcut Definition (sys_ux_keyboard_shortcut_definition)

**Category:** SYSTEM
**SysID:** 227b2e46183232108bb255f46a373a9c

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `name` | Name | translated_field | - | ✅ |
| `action_key` | Action Key | string | - | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `action_payload` | Action Payload | json | - | - |
| `component` | Component | reference | sys_ux_macroponent | ✅ |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:37.766Z*