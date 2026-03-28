# ServiceNow Table: Template Details (sys_app_template_detail)

**Category:** SYSTEM
**SysID:** 4b0236c6183a32108bb255f46a373a76

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `template` | Template | reference | sys_app_template | ✅ |
| `how_was_built` | How was this built? | translated_html | - | - |
| `hero_image_1` | Hero 1 Image | user_image | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `author` | Author | string | - | - |
| `schema_image` | Schema | user_image | - | - |
| `data_image` | Data | user_image | - | - |
| `additional_uses` | Other Use Cases | translated_text | - | - |
| `header_image` | Header Image | user_image | - | - |
| `detailed_description` | Detailed Description | translated_text | - | - |
| `short_description` | Short Description | translated_text | - | - |
| `metadata_list` | Building blocks | glide_list | sys_db_object | - |
| `hero_image_3` | Hero 3 Image | user_image | - | - |
| `header_background_color` | Header Background Color | color | - | - |
| `icon` | Icon | user_image | - | - |
| `function_type_list` | Functions | glide_list | sys_app_template_function_type | - |
| `hero_image_2` | Hero 2 Image | user_image | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:27.377Z*