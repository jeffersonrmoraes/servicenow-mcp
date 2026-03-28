# ServiceNow Table: UI Action Group (sys_aw_form_uiaction_group)

**Category:** SYSTEM
**SysID:** bca2be82187a32108bb255f46a373a4f

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `active` | Active | boolean | - | - |
| `ui_action_layout` | UI Action layout | reference | sys_aw_form_uiaction_layout | ✅ |
| `order` | Order | integer | - | - |
| `description` | Description | string | - | - |
| `name` | Name | translated_field | - | ✅ |
| `type` | Type | integer | - | - |
| `color` | Color | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `overflow` | Overflow | boolean | - | - |
| `ui_actions` | UI Actions | glide_list | sys_ui_action | ✅ |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:44.705Z*