# ServiceNow Table: Category (sc_category)

**Category:** CORE
**SysID:** a67fa60a187632108bb255f46a373ad0

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `title` | Title | translated_text | - | ✅ |
| `order` | Order | integer | - | - |
| `roles` | Roles | user_roles | - | - |
| `parent` | Parent | reference | sc_category | - |
| `mobile_subcategory_render_type` | Mobile Subcategory Render Type | string | - | - |
| `mobile_hide_description` | Hide description (classic mobile browsing) | boolean | - | - |
| `entitlement_script` | Entitlement script | script_plain | - | - |
| `active` | Active | boolean | - | - |
| `location` | Location | reference | cmn_location | - |
| `description` | Description | translated_text | - | - |
| `module` | Module link | reference | sys_app_module | - |
| `mobile_picture` | Classic Mobile Picture | user_image | - | - |
| `header_icon` | Header icon | user_image | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `image` | Image | image | - | - |
| `sc_catalog` | Catalog | reference | sc_catalog | - |
| `homepage_renderer` | Homepage renderer | reference | sc_homepage_renderer | ✅ |
| `homepage_image` | Homepage image | user_image | - | - |
| `icon` | Icon | user_image | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:24:35.996Z*