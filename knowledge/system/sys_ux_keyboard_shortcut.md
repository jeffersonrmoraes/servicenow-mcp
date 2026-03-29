# ServiceNow Table: UX Keyboard Shortcut (sys_ux_keyboard_shortcut)

**Category:** SYSTEM
**SysID:** 2e7b2e46183232108bb255f46a373ab8

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `category` | Category | choice | - | - |
| `shortcut` | Shortcut | json | - | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `name` | Name | translated_field | - | ✅ |
| `order` | Order | integer | - | ✅ |
| `description` | Description | translated_text | - | - |
| `active` | Active | boolean | - | - |
| `label` | Label | translated_field | - | ✅ |
| `definition` | Definition | reference | sys_ux_keyboard_shortcut_definition | ✅ |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:37.726Z*