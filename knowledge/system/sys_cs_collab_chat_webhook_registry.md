# ServiceNow Table: Collab Chat Webhook Registry (sys_cs_collab_chat_webhook_registry)

**Category:** SYSTEM
**SysID:** 2717b6ca183e32108bb255f46a373a39

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `path` | Path | url | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `oidc_provider` | OIDC Provider | reference | oauth_oidc_entity | ✅ |
| `sys_created_on` | Created | glide_date_time | - | - |
| `description` | Descripton | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `name` | Name | string | - | ✅ |
| `client_state` | Client State | password2 | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `callback_url` | Callback URL | url | - | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:02.175Z*