# ServiceNow Table: Collaboration Chat Member Group (sys_cs_collab_member_group)

**Category:** SYSTEM
**SysID:** 321776ca183e32108bb255f46a373a0a

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `group_id` | Collab Chat Group ID | string | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `collab_chat` | Collaboration Chat | reference | sys_cs_collab_chat | ✅ |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `channel` | Channel | reference | sys_cs_channel | ✅ |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:02.219Z*