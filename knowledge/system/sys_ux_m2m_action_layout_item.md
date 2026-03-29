# ServiceNow Table: Sys Ux M2m Action Layout Item (sys_ux_m2m_action_layout_item)

**Category:** SYSTEM
**SysID:** f57be646183232108bb255f46a373a5e

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `display_type` | Display type | string | - | - |
| `ux_form_action_layout` | UX Form Action Layout | reference | sys_ux_form_action_layout | ✅ |
| `animate_icon` | Animate icon | boolean | - | - |
| `order` | Order | integer | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `table` | Table | table_name | - | - |
| `icon` | Icon | reference | st_sys_design_system_icon | - |
| `active` | Active | boolean | - | - |
| `ux_form_action_layout_item` | UX Form Action Layout Item | reference | sys_ux_form_action_layout_item | ✅ |
| `variant` | Variant | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:39.197Z*