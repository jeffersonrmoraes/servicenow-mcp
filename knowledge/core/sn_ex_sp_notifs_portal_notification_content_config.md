# ServiceNow Table: Portal notification content configurations (sn_ex_sp_notifs_portal_notification_content_config)

**Category:** CORE
**SysID:** d5c63e86183e32108bb255f46a373a35

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `content_params` | Content params | email_script | - | - |
| `content_script` | Content Script | script | - | - |
| `invert_icon_color` | Invert icon color | boolean | - | - |
| `actor` | Actor | email_script | - | - |
| `custom_icon` | Custom icon | user_image | - | - |
| `icon` | Icon | glyphicon | - | - |
| `order` | Order | integer | - | - |
| `action_url` | Action url | email_script | - | - |
| `use_custom_icon` | Use custom icon | boolean | - | - |
| `icon_background` | Icon background | color | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `portals` | Portals | glide_list | sp_portal | - |
| `advanced` | Advanced | boolean | - | - |
| `content_template` | Content template | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:18.157Z*