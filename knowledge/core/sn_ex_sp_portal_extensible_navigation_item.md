# ServiceNow Table: Navigation menu item (sn_ex_sp_portal_extensible_navigation_item)

**Category:** CORE
**SysID:** f7b67a86183e32108bb255f46a373a1b

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `menu_title` | Menu Title | string | - | - |
| `portal_extensible_navigation` | Advanced portal navigation | reference | sn_ex_sp_portal_extensible_navigation | ✅ |
| `widget_parameters` | Widget parameters | simple_name_values | - | - |
| `widget` | Widget | reference | sp_widget | - |
| `parent_item` | Parent navigation item | reference | sn_ex_sp_portal_extensible_navigation_item | - |
| `sys_id` | Sys ID | GUID | - | - |
| `topic` | Topic | reference | topic | - |
| `browse_button_text` | Browse button display text | translated_text | - | - |
| `browse_button` | Browse button | boolean | - | - |
| `render_as` | Render as | choice | - | - |
| `order` | Order | integer | - | ✅ |
| `menu` | Menu item | reference | sp_rectangle_menu_item | - |
| `navigation_item_type` | Source | choice | - | ✅ |
| `submenu_type` | Submenu display type | choice | - | - |
| `position` | Position | choice | - | - |
| `active` | Active | boolean | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:18.130Z*