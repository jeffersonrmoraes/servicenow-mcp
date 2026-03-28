# ServiceNow Table: Topic (sys_cb_topic)

**Category:** SYSTEM
**SysID:** 55f6368a183e32108bb255f46a373a17

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `expose_on_palette` | Expose on palette | boolean | - | - |
| `nlu_intent_label` | NLU Intent Label | string | - | - |
| `nlu_provider` | NLU Provider | string | - | - |
| `context_profiles` | Context Profiles | glide_list | sys_cs_context_profile | - |
| `connect_queue` | Connect queue | reference | chat_queue | - |
| `secure_custom_input_control` | Secure custom input control | boolean | - | - |
| `name` | Name | string | - | ✅ |
| `live_agent` | Live agent | boolean | - | - |
| `channels` | Channels | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `flexible_conversation_switching` | Flexible conversation switching | boolean | - | - |
| `root_topic_id` | Root Topic ID | string | - | - |
| `library` | Library | boolean | - | - |
| `nlu_intent` | NLU Intent ID | string | - | - |
| `graph` | Graph | string_full_utf8 | - | - |
| `model_type` | Model Type | choice | - | ✅ |
| `roles` | Roles | user_roles | - | - |
| `autopilot_topic` | Autopilot Topic | boolean | - | - |
| `key_phrases` | Key phrases | string | - | - |
| `applicability_mode` | Applicability Mode | string | - | - |
| `foundational` | Foundational | boolean | - | - |
| `source_topic_id` | Source Topic ID | string | - | - |
| `description` | Description | translated_text | - | - |
| `nlu_model_label` | NLU Model Label | string | - | - |
| `triggerable_by_notification` | Triggerable by notification | boolean | - | - |
| `modify_confirmation_enabled` | Modify Confirmation Enabled | boolean | - | - |
| `sys_domain` | Domain | domain_id | - | - |
| `dialog_acts_enabled` | Dialog Acts Enabled | boolean | - | - |
| `category` | Category | glide_list | sys_cb_topic_category | - |
| `applicability` | applicability | string | - | - |
| `palette_label` | Palette label | string | - | - |
| `type` | Type | string | - | - |
| `title` | Title | translated_text | - | ✅ |
| `nlu_model` | NLU Model ID | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:50.511Z*