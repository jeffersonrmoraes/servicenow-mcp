# ServiceNow Table: Messaging Channel (sys_cs_channel)

**Category:** SYSTEM
**SysID:** 6bf63a8a183e32108bb255f46a373a20

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `name` | Name | translated_field | - | ✅ |
| `secure` | Secure | boolean | - | - |
| `typing_indicators_enabled` | Support typing indicator | boolean | - | - |
| `sentiment_enabled` | Enable Sentiment Analysis | boolean | - | - |
| `synchronous` | Synchronous | boolean | - | - |
| `enable_notification` | Enable Notifications | boolean | - | - |
| `whitelisted` | Opted in all topics by default | boolean | - | - |
| `live_agent_only` | Live Agent Only | boolean | - | - |
| `icon` | Icon | user_image | - | - |
| `sys_domain` | Domain | domain_id | domain | - |
| `type` | Type | string | - | - |
| `supports_multiple_conversations` | Supports Multiple Conversations | boolean | - | - |
| `timeout` | Conversation Idle Timeout | integer | - | - |
| `store_app_page_link` | Store app page link | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:00.739Z*