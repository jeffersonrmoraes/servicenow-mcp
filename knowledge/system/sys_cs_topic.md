# ServiceNow Table: Topic (sys_cs_topic)

**Category:** SYSTEM
**SysID:** 54077a8a183e32108bb255f46a373a58

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `palette_label` | Palette label | translated_text | - | - |
| `applicability` | Applicability | string | - | - |
| `model_type` | Model Type | choice | - | ✅ |
| `vendor` | Vendor | reference | sys_cs_vendor | - |
| `autopilot_topic` | Autopilot Topic | boolean | - | - |
| `active` | Active | boolean | - | - |
| `library_usage` | Library Usage | string_full_utf8 | - | - |
| `name` | Name | string | - | ✅ |
| `definition` | Definition | string_full_utf8 | - | - |
| `nlu_model` | NLU Model | string | - | - |
| `title` | Title | translated_text | - | ✅ |
| `nlu_provider` | NLU Provider | string | - | - |
| `expose_on_palette` | Expose on palette | boolean | - | - |
| `sys_domain` | Domain | domain_id | - | - |
| `modify_confirmation_enabled` | Modify Confirmation Enabled | boolean | - | - |
| `metaphone` | Metaphone | translated_text | - | - |
| `channels` | Channels | string | - | - |
| `discoverable` | Is Topic Discoverable | boolean | - | - |
| `nlu_intent_label` | NLU Intent Label | string | - | - |
| `visible` | Is Topic Visible | boolean | - | - |
| `nlu_intent` | NLU Intent | string | - | - |
| `flexible_conversation_switching` | Flexible conversation switching | boolean | - | - |
| `triggerable_by_notification` | Triggerable by notification | boolean | - | - |
| `library` | Library | boolean | - | - |
| `cb_topic_id` | CB Topic Id | reference | sys_cb_topic | - |
| `dialog_acts_enabled` | Dialog Acts Enabled | boolean | - | - |
| `key_phrases` | Key phrases | translated_text | - | - |
| `type` | Type | string | - | - |
| `published` | published | boolean | - | - |
| `last_published_on` | Last Published On | glide_date_time | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `is_system_topic` | Is System Topic | boolean | - | - |
| `nlu_model_label` | NLU Model Label | string | - | - |
| `foundational` | Foundational | boolean | - | - |
| `design_category` | Design Category | glide_list | sys_cb_topic_category | - |
| `input_variables` | Input Variables | string_full_utf8 | - | - |
| `description` | Description | translated_text | - | - |
| `roles` | Roles | user_roles | - | - |
| `secure_custom_input_control` | Secure custom input control | boolean | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:16.669Z*