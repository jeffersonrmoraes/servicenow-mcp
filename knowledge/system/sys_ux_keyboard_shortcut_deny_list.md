# ServiceNow Table: UX Keyboard Shortcut Deny List (sys_ux_keyboard_shortcut_deny_list)

**Category:** SYSTEM
**SysID:** a67b2e46183232108bb255f46a373aaa

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `shortcut` | Shortcut | json | - | ✅ |
| `description` | Description | translated_text | - | - |
| `name` | Name | translated_field | - | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `active` | Active | boolean | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:37.770Z*