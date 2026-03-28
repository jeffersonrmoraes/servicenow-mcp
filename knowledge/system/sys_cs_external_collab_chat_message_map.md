# ServiceNow Table: External Collaboration Chat Message Map (sys_cs_external_collab_chat_message_map)

**Category:** SYSTEM
**SysID:** 8f1776ca183e32108bb255f46a373aae

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `external_id` | External Message ID | string | - | - |
| `provider` | Provider | reference | sys_cs_collab_provider | - |
| `sys_updated_by` | Updated by | string | - | - |
| `status` | Status | string | - | ✅ |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `context_id` | Context ID | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `collab_chat_message` | Messsage | reference | sys_cs_collab_message | ✅ |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `error_type` | Error type | string | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:10.848Z*