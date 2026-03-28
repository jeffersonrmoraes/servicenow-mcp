# ServiceNow Table: AMB Message Processor (sys_amb_processor)

**Category:** SYSTEM
**SysID:** b5bb6eca183232108bb255f46a373a46

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `quick_message_delivery` | Quick message delivery | boolean | - | - |
| `user_unsubscribe_listener` | User unsubscribe listener | script | - | - |
| `description` | Description | string | - | - |
| `message_send_advanced_authorization` | Message send advanced authorization | script | - | - |
| `channel_create_advanced_authorization` | Channel create advanced authorization | script | - | - |
| `name` | Name | string | - | - |
| `verify_message_sent_from_server` | Verify message sent from server | boolean | - | - |
| `track_channel_presence` | Track channel presence | boolean | - | - |
| `lazy_message_delivery` | Lazy message delivery | boolean | - | - |
| `user_subscribe_listener` | User subscribe listener | script | - | - |
| `active` | Active | boolean | - | - |
| `message_send_roles` | Message send roles | user_roles | - | - |
| `channel_create_roles` | Channel create roles | user_roles | - | - |
| `public` | Public | boolean | - | - |
| `lazy_timeout` | Lazy timeout | integer | - | - |
| `message_receive_listener` | Message receive listener | script | - | - |
| `class_name` | Class name | string | - | - |
| `message_receive_advanced_authorization` | Message receive advanced authorization | script | - | - |
| `channel_name` | Channel name | string | - | - |
| `channel_subscribe_advanced_authorization` | Channel subscribe advanced authorization | script | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `channel_subscribe_roles` | Channel subscribe roles | user_roles | - | - |
| `redeliver_missed_messages` | Redeliver missed messages | boolean | - | - |
| `dedicated_session_sync` | Dedicated session sync | boolean | - | - |
| `message_send_listener` | Message send listener | script | - | - |
| `source_type` | Source type | string | - | - |
| `message_receive_roles` | Message receive roles | user_roles | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:18.634Z*