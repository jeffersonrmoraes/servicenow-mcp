# ServiceNow Table: Banner Announcement (sys_ux_banner_announcement)

**Category:** SYSTEM
**SysID:** 9a6faac6187632108bb255f46a373a41

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `icon` | Icon | reference | st_sys_design_system_icon | - |
| `non_stackable` | Non-stackable | boolean | - | - |
| `summary` | Summary | translated_field | - | - |
| `start` | Start | glide_date_time | - | ✅ |
| `color` | Color | choice | - | - |
| `add_link` | Add a link | boolean | - | - |
| `roles` | Roles | glide_list | sys_user_role | - |
| `link_url` | URL | url | - | - |
| `sys_domain` | Domain | domain_id | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `sys_domain_path` | Domain Path | domain_path | - | - |
| `link_label` | Label | translated_field | - | - |
| `group` | Groups | glide_list | sys_user_group | - |
| `sys_id` | Sys ID | GUID | - | - |
| `link_click_behavior` | Click behavior | choice | - | - |
| `non_dismissible` | Non-dismissible | boolean | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `heading` | Heading | translated_field | - | ✅ |
| `icon_tooltip` | Icon tooltip | translated_field | - | - |
| `content_position` | Content position | choice | - | - |
| `end` | End | glide_date_time | - | - |
| `show_for` | Show for | choice | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:32.517Z*