# ServiceNow Table: UX Form Actions Layout Item (sys_ux_form_action_layout_item)

**Category:** SYSTEM
**SysID:** b17be646183232108bb255f46a373a2f

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `action` | Action | reference | sys_ux_form_action | - |
| `description` | Description | string | - | - |
| `table` | Table | table_name | - | ✅ |
| `color` | Color | string | - | - |
| `active` | Active | boolean | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `animate_icon` | Animate icon | boolean | - | - |
| `name` | Name | string | - | ✅ |
| `icon` | Icon | reference | st_sys_design_system_icon | - |
| `order` | Order | integer | - | - |
| `overflow` | Overflow | boolean | - | - |
| `item_type` | Item Type | choice | - | - |
| `layout_group` | Group | reference | sys_ux_form_action_layout_group | - |
| `label` | Label | translated_field | - | ✅ |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:36.833Z*