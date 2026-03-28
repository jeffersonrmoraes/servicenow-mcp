# ServiceNow Table: Conversation (sys_cs_conversation)

**Category:** SYSTEM
**SysID:** 7af6b68a183e32108bb255f46a373ac2

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `vendor` | Vendor | reference | sys_cs_vendor | - |
| `title` | Conversation Title | string | - | - |
| `sys_domain` | Domain | domain_id | - | - |
| `provenance` | Provenance | string | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `consumer_account` | Consumer Account | reference | sys_cs_consumer_account | - |
| `current_device` | Current Device | string | - | - |
| `conversation_completed` | Conversation Completed | glide_date_time | - | - |
| `sentiment_normalized` | Sentiment Normalized | decimal | - | - |
| `sys_created_by` | Created by | string | - | - |
| `state` | Conversation State | string | - | - |
| `device_type` | Device Type | string | - | - |
| `label` | Conversation Label | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `topic_definition_name` | Topic Definition Name | string | - | - |
| `lock_version` | Lock Version | integer | - | - |
| `sys_lock_acquired` | Conversation Lock Acquired | glide_date_time | - | - |
| `topic_definition` | Topic Definition | string_full_utf8 | - | - |
| `device_subtype` | Device Subtype | string | - | - |
| `sys_lock_owner` | Conversation Lock Owner | string | - | - |
| `topic` | Topic | reference | sys_cs_topic | - |
| `topic_published` | Topic Published | boolean | - | - |
| `model_type` | Model Type | string | - | - |
| `sys_lock_touched` | Conversation Lock Touched | glide_date_time | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `consumer` | Consumer | reference | sys_cs_consumer | - |
| `context` | Conversation Context | compressed | - | - |
| `live_agent_transfer_time` | Live Agent Transfer Time | glide_date_time | - | - |
| `sentiment` | Sentiment | string | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `context_profile` | Context Profile | reference | sys_cs_context_profile | - |
| `conversation_type` | Conversation Type | string | - | - |
| `api_version` | API Version | string | - | - |
| `context_format` | Conversation Context Format | string | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:07.994Z*