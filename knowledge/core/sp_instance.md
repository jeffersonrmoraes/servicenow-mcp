# ServiceNow Table: Instance (sp_instance)

**Category:** CORE
**SysID:** 5f90f24a18b632108bb255f46a373aee

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `advanced_placeholder_dimensions` |  Advance placeholder configuration | boolean | - | - |
| `async_load_trigger` | In which order do you want to load the widget? | string | - | - |
| `active` | Active | boolean | - | - |
| `class_name` | Bootstrap class name | string | - | - |
| `size` | Bootstrap size | string | - | - |
| `sp_widget` | Widget | reference | sp_widget | - |
| `color` | Bootstrap color | bootstrap_color | - | - |
| `sp_column` | Column | reference | sp_column | - |
| `placeholder_template` | Placeholder template | xml | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `async_load` |  Select the checkbox to defer load this widget | boolean | - | - |
| `roles` | Roles | user_roles | - | - |
| `short_description` | Short description | translated_text | - | - |
| `css` | CSS | css | - | - |
| `title` | Title | translated_text | - | - |
| `preserve_placeholder_size` |  Limit widget size to placeholder | boolean | - | - |
| `id` | ID | string | - | - |
| `placeholder_dimensions` | Placeholder dimensions | json | - | - |
| `widget_parameters` | Additional options, JSON format | script_server | - | - |
| `url` | HREF / URL | string | - | - |
| `glyph` | Glyph | glyphicon | - | - |
| `order` | Order | integer | - | - |
| `placeholder_dimensions_script` |  Placeholder configuration script | script | - | - |
| `async_load_device_type` | Device type | glide_list | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:09:39.867Z*