# ServiceNow Table: Collaboration Chat Member User Group (sys_cs_collab_member_user_group)

**Category:** SYSTEM
**SysID:** cf1776ca183e32108bb255f46a373a6f

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_updated_by` | Updated by | string | - | - |
| `collab_chat_user_group` | Collaboration Chat User Group | reference | sys_user_group | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `active` | Active | boolean | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `collab_chat_member` | Collaboration Chat Member | reference | sys_cs_collab_member | ✅ |
| `sys_updated_on` | Updated | glide_date_time | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:02.224Z*