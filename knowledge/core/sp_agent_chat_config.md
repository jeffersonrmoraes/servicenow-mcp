# ServiceNow Table: Service Portal Agent Chat Configuration (sp_agent_chat_config)

**Category:** CORE
**SysID:** 7d17f2ca183e32108bb255f46a373a09

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `name` | Name | translated_text | - | ✅ |
| `roles` | Roles | user_roles | - | - |
| `server_script` | Server script | script | - | - |
| `portal` | Portal(s) | glide_list | sp_portal | - |
| `sys_id` | Sys ID | GUID | - | - |
| `order` | Order | integer | - | ✅ |
| `public` | Public | boolean | - | - |
| `active` | Active | boolean | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:11.369Z*