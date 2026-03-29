# ServiceNow Table: Favorite Content Configuration (sn_ex_sp_favorite_content_config)

**Category:** CORE
**SysID:** f0c6fa86183e32108bb255f46a373a30

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `specify_portal_page` | Specify portal page | string | - | - |
| `primary_display` | Primary field to display | field_name | - | ✅ |
| `order` | Order | integer | - | - |
| `field` | Field | field_name | - | - |
| `url` | URL | url | - | - |
| `image_url` | Image URL | field_name | - | - |
| `availability` | Availability | string | - | - |
| `active` | Active | boolean | - | - |
| `favorite_content_type` | Content type | reference | sn_ex_sp_favorite_content_type | ✅ |
| `url_parameters` | URL parameters | simple_name_values | - | - |
| `external_navigation_type` | External navigation type | string | - | - |
| `image` | Image | field_name | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `condition` | Condition | conditions | - | - |
| `table` | Table | table_name | - | ✅ |
| `portal_page` | Portal page | reference | sp_page | - |
| `navigation_type` | Navigation type | string | - | - |
| `secondary_display` | Secondary fields to display | field_list | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:17.369Z*