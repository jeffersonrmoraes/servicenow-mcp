# ServiceNow Table: Collab Chat Settings (sys_cs_collab_settings)

**Category:** SYSTEM
**SysID:** ab17b6ca183e32108bb255f46a373a51

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `enable_slack` | Enable Slack | boolean | - | - |
| `short_description` | Short description | string | - | - |
| `enabled` | Enabled | boolean | - | - |
| `name` | Name | string | - | ✅ |
| `sys_overrides` | Overrides | reference | sys_cs_collab_settings | - |
| `enable_teams` | Enable Teams | boolean | - | - |
| `sys_domain` | Domain | domain_id | - | - |
| `enable_legacy_support` | Enable Legacy Support | boolean | - | - |
| `enable_expert_finder` | Enable Participant Suggestions | boolean | - | - |
| `preference_channel` | Preference Channel | reference | sys_cs_collab_channel | - |
| `enable_emojis` | Enable Emojis | boolean | - | - |
| `sys_id` | Sys ID | GUID | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:03.627Z*