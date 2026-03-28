# ServiceNow Table: General Settings (sys_cs_general_settings)

**Category:** SYSTEM
**SysID:** b117b2ca183e32108bb255f46a373ad6

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `mask_requester_to_agent` | Masking for requester to agent | boolean | - | ✅ |
| `mask_requester_to_virtual_agent` | Masking for requester to virtual agent | boolean | - | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `nlu_driver` | NLU Driver | reference | open_nlu_driver | - |
| `auto_select_prompt_enabled_mid` | Auto Select Prompt Enabled for Topic Switch | boolean | - | ✅ |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `voice_enabled` | Voice Enabled | boolean | - | ✅ |
| `language_detection_for_topic_discovery` | Language Detection For Topic Discovery | boolean | - | ✅ |
| `sys_created_on` | Created | glide_date_time | - | - |
| `sys_domain` | Domain | domain_id | - | - |
| `auto_select_prompt_message` | Auto Select Prompt Message | string | - | ✅ |
| `sys_created_by` | Created by | string | - | - |
| `mask_sensitive_information` | Mask Sensitive Information | boolean | - | ✅ |
| `sys_mod_count` | Updates | integer | - | - |
| `mask_agent_to_requester` | Masking for agent to requester | boolean | - | ✅ |
| `nlu_enabled` | NLU Enabled | boolean | - | ✅ |
| `auto_select_prompt_enabled_initial` | Auto Select Prompt Enabled for Initial | boolean | - | ✅ |
| `sys_updated_by` | Updated by | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:10.884Z*