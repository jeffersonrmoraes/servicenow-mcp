# ServiceNow Table: External Collaboration Chat Map (sys_cs_external_collab_chat_map)

**Category:** SYSTEM
**SysID:** 3a1736ca183e32108bb255f46a373aef

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `provider` | Provider | reference | sys_cs_collab_provider | - |
| `sys_id` | Sys ID | GUID | - | - |
| `context_id` | Context ID | string | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `status` | Status | string | - | ✅ |
| `sys_created_on` | Created | glide_date_time | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `external_id` | External Chat ID | string | - | - |
| `collab_chat` | Collaboration Chat | reference | sys_cs_collab_chat | ✅ |
| `sys_updated_by` | Updated by | string | - | - |
| `count` | Chat Member Count | integer | - | - |
| `sys_created_by` | Created by | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:09.455Z*