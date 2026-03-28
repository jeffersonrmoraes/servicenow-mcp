# ServiceNow Table: Collaboration Chat Provider (sys_cs_collab_provider)

**Category:** SYSTEM
**SysID:** 9f1776ca183e32108bb255f46a373afd

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `delete_chat_message_action` | Delete chat action | string | - | ✅ |
| `channel` | Channel | reference | sys_cs_collab_channel | ✅ |
| `remove_chat_member_action` | Remove chat member action | string | - | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `create_chat_subflow` | Create chat subflow | string | - | ✅ |
| `inbound_message_transformer` | Inbound message transformer | string | - | - |
| `join_chat_action` | Join chat action | string | - | ✅ |
| `webhook_registry_name` | Webhook Registry name | string | - | ✅ |
| `send_or_edit_chat_message_subflow` | Send chat message subflow | string | - | ✅ |
| `inbound_message_validator` | Inbound message validator | string | - | ✅ |
| `leave_chat_action` | Leave chat action | string | - | ✅ |
| `name` | Name | string | - | ✅ |
| `add_chat_member_action` | Add chat member action | string | - | ✅ |
| `active` | Active | boolean | - | - |
| `outbound_message_transformer` | Outbound message transformer | string | - | ✅ |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:03.674Z*