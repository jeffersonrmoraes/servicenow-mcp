# ServiceNow Table: UX App Route (sys_ux_app_route)

**Category:** SYSTEM
**SysID:** 2f7ba286183232108bb255f46a373a11

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `parent_macroponent_composition_element_id` | Parent Macroponent Composition Element ID | string | - | - |
| `order` | Order | integer | - | - |
| `name` | Name | translated_field | - | ✅ |
| `screen_type` | Screen Collection | reference | sys_ux_screen_type | - |
| `fields` | Fields | string | - | - |
| `extension_point` | Extension Point | reference | sys_ux_extension_point | - |
| `description` | Description | translated_text | - | - |
| `optional_parameters` | Optional Parameters | string | - | - |
| `parent_macroponent` | Parent Macroponent | reference | sys_ux_macroponent | - |
| `icon` | Icon | string | - | - |
| `interoperable` | Use across experiences | boolean | - | - |
| `route_type` | Route | string | - | ✅ |
| `app_config` | App Configuration | reference | sys_ux_app_config | - |
| `sys_id` | Sys ID | GUID | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:32.507Z*