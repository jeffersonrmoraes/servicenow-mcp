# ServiceNow Table: Favorite (App Use) (sn_ex_sp_st_favorite)

**Category:** CORE
**SysID:** 7fb67a86183e32108bb255f46a373a44

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `badge_icon` | Badge icon | glyphicon | - | - |
| `start` | Start | integer | - | - |
| `fav_image` | Picture | user_image | - | - |
| `is_mobile` | Is mobile | boolean | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `url` | URL | url | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `primary_display` | Primary field to display | string | - | - |
| `portal` | Portal | reference | sp_portal | - |
| `target` | Target | string | - | - |
| `table_name` | Table | table_name | - | - |
| `last_viewed` | Last viewed | glide_date_time | - | - |
| `secondary_display` | Secondary fields to display | string | - | - |
| `category` | Category | reference | sn_ex_sp_favorite_content_type | - |
| `favorite_id` | Favorite ID | string | - | - |
| `end` | End | integer | - | - |
| `fav_image_url` | Picture URL | url | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:18.857Z*