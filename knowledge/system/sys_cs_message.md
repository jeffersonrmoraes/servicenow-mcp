# ServiceNow Table: Conversation Message (sys_cs_message)

**Category:** SYSTEM
**SysID:** f0f6f28a183e32108bb255f46a373a2f

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `conversation` | Conversation | reference | sys_cs_conversation | - |
| `vendor` | Vendor | reference | sys_cs_vendor | - |
| `sequence` | Sequence | counter | - | - |
| `recipient` | Recipient | reference | sys_user | - |
| `is_agentic` | Is Agentic | boolean | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `direction` | Direction | string | - | - |
| `live_message` | Live Message | reference | live_message | - |
| `is_agent` | Agent | boolean | - | - |
| `validation_error_message` | Validation Error Message | string | - | - |
| `skill_document_table` | Skill Document Table | table_name | - | ✅ |
| `sys_created_by` | Created by | string | - | - |
| `receive_time` | Receive Time | glide_date_time | - | - |
| `message_size` | Message Size | integer | - | - |
| `sender` | Sender | string | - | - |
| `is_sensitive` | Sensitive | boolean | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `consumer_account` | Consumer Account | reference | sys_cs_consumer_account | - |
| `sys_domain` | Domain | domain_id | - | - |
| `sender_profile` | Sender Profile | reference | sys_cs_channel_user_profile | - |
| `sentiment` | Sentiment | string | - | - |
| `payload` | Payload | string_full_utf8 | - | - |
| `message_type` | Message Type | string | - | - |
| `q_data_message_type` | Queue Data Message Type | string | - | - |
| `is_profane` | Profane | boolean | - | - |
| `consumer` | Consumer | reference | sys_cs_consumer | - |
| `system_id` | System ID | string | - | - |
| `visibility_type` | Visibility Type | string | - | - |
| `sentiment_normalized` | Sentiment Normalized | decimal | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `session` | Session | reference | sys_cs_session | - |
| `status` | Status | string | - | - |
| `serial_number` | Serial Number | integer | - | ✅ |
| `agent_translated_msg` | Agent translated msg | string_full_utf8 | - | - |
| `aia_execution_plan` | AIA Execution Plan | reference | sn_aia_execution_plan | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `send_time` | Send Time | glide_date_time | - | - |
| `task` | Task | reference | sys_cs_conversation_task | - |
| `is_bot_message` | Bot Message | boolean | - | - |
| `message_updated` | Message Updated | boolean | - | - |
| `skill_document` | Skill Document | document_id | - | ✅ |
| `sys_created_on` | Created | glide_date_time | - | - |
| `external_chat_status` | External Chat status | string | - | - |
| `primary_bot_history` | Primary Bot History | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:12.305Z*