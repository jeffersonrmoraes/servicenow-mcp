# ServiceNow Table: Collaboration Chat Profile (sys_cs_collab_provider_user_profile)

**Category:** SYSTEM
**SysID:** 761736ca183e32108bb255f46a373ac1

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `user_token` | User Token | password2 | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `active` | Active | boolean | - | - |
| `external_user_id` | External User ID | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `provider` | Provider | reference | sys_cs_collab_provider | ✅ |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `display_name` | Display Name | string | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `collab_user` | Collab User | reference | sys_cs_collab_user | ✅ |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `provider_user_id` | Provider User ID | string | - | ✅ |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:03.630Z*