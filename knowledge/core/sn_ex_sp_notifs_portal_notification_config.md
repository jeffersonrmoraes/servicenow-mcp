# ServiceNow Table: Portal notification configuration (sn_ex_sp_notifs_portal_notification_config)

**Category:** CORE
**SysID:** 41c6fa86183e32108bb255f46a373ad0

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `enable_bell_icon` | Enable bell icon | boolean | - | - |
| `name` | Name | string | - | ✅ |
| `card_actions` | Card actions | glide_list | - | - |
| `notification_classification_filters` | Notification classification filters | glide_list | sys_notification_classification | - |
| `active` | Active | boolean | - | - |
| `static_filters` | Standard filters | glide_list | - | - |
| `show_unread_count` | Show unread count | boolean | - | - |
| `order` | Order | integer | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `tray_actions` | Tray actions | glide_list | - | - |
| `enable_badge_count` | Show notifications count | boolean | - | - |
| `portal` | Portal | reference | sp_portal | ✅ |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:18.139Z*