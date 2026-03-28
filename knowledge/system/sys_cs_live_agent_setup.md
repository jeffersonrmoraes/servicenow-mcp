# ServiceNow Table: Chat Setup (sys_cs_live_agent_setup)

**Category:** SYSTEM
**SysID:** ccf6728a183e32108bb255f46a373aa9

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `csm_queue` | CSM Queue | reference | chat_queue | - |
| `dynamic_translation` | Dynamic Translation | boolean | - | - |
| `allow_transcript_download` | Allow transcript download | boolean | - | - |
| `sys_overrides` | Overrides | reference | sys_cs_live_agent_setup | - |
| `short_description` | Short description | string | - | - |
| `itsm_queue` | ITSM Queue | reference | chat_queue | - |
| `hr_fulfiller` | HR Fulfiller UI | string | - | - |
| `notification_enabled` | Enable notifications for all users | boolean | - | - |
| `emoji_enabled` | Emoji Enabled | boolean | - | - |
| `live_agent_enabled` | Live Chat Enabled | boolean | - | - |
| `sys_domain` | Domain | domain_id | - | - |
| `global_fulfiller` | Global Fulfiller UI | string | - | - |
| `global_queue` | Global Queue | reference | chat_queue | - |
| `name` | Name | string | - | ✅ |
| `hr_queue` | HR Queue | reference | chat_queue | - |
| `show_agent_name_in_header` | Show agent name in chat header | boolean | - | - |
| `wait_status` | Live chat wait status | string | - | - |
| `no_agent_available_message` | No Agents Available message | translated_text | - | - |
| `transfer_message` | Transfer message | translated_text | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `itsm_fulfiller` | ITSM Fulfiller UI | string | - | - |
| `csm_fulfiller` | CSM Fulfiller UI | string | - | - |
| `users_to_be_disconnected` | Users To Be Disconnected | glide_list | - | - |
| `show_agent_details` | Show agent names and avatars | boolean | - | - |
| `agent_whisper` | Agent Whisper | boolean | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:12.350Z*