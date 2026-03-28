# ServiceNow Table: Collaboration Chat External Member Token Group (sys_cs_external_collab_chat_member_token_map)

**Category:** SYSTEM
**SysID:** 161736ca183e32108bb255f46a373a1f

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `provider_token` | Provider token | password2 | - | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `collab_chat` | Collab Chat | reference | sys_cs_collab_chat | ✅ |
| `sys_updated_by` | Updated by | string | - | - |
| `external_user_ids` | External User Id List | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `provider` | Provider | reference | sys_cs_collab_provider | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `status` | Status | string | - | ✅ |
| `sys_created_on` | Created | glide_date_time | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:10.921Z*