# ServiceNow Table: Consumer Channel (sys_cs_consumer_channel)

**Category:** SYSTEM
**SysID:** f407fa8a183e32108bb255f46a373a2a

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `field_name` | Field name | string | - | - |
| `user_id` | User ID | string | - | - |
| `channel_info` | Channel info | string | - | - |
| `vendor` | Vendor | reference | sys_cs_vendor | - |
| `consumer` | Consumer | reference | sys_cs_consumer | - |
| `version` | Version | integer | - | - |
| `task` | Task | reference | sys_cs_conversation_task | - |
| `user_name` | User name | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `channel_group` | Channel group | string | - | - |
| `channel_user` | Channel user | string | - | - |
| `sys_domain` | Domain | domain_id | - | - |
| `session` | Session | reference | sys_cs_session | - |
| `timezone` | Timezone | string | - | - |
| `consumer_account` | Consumer account | reference | sys_cs_consumer_account | - |
| `profile` | Profile | string | - | - |
| `channel_type` | Channel type | choice | - | - |
| `control` | Control | string | - | - |
| `provider_user_id` | Provider user ID | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:06.509Z*