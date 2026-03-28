# ServiceNow Table: Collab Chat Mention (sys_cs_collab_mention)

**Category:** SYSTEM
**SysID:** 0f1776ca183e32108bb255f46a373a83

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_id` | Sys ID | GUID | - | - |
| `message` | Message | reference | sys_cs_collab_message | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `collab_user` | Collab user | reference | sys_cs_collab_user | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `read` | Read | boolean | - | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `sys_updated_by` | Updated by | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:03.594Z*