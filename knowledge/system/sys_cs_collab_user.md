# ServiceNow Table: Collab User (sys_cs_collab_user)

**Category:** SYSTEM
**SysID:** 661736ca183e32108bb255f46a373a4f

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_mod_count` | Updates | integer | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `user` | User | reference | sys_user | - |
| `sys_created_by` | Created by | string | - | - |
| `external_user` | External User | boolean | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `create_external_conversation` | Create External Conversation | boolean | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `sys_id` | Sys ID | GUID | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:05.093Z*