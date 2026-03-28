# ServiceNow Table: Topic Discovery Trace (sys_cs_discovery_trace)

**Category:** SYSTEM
**SysID:** 69f6368a183e32108bb255f46a373aaf

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `search_text` | Search text | string | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `conversation_task` | Conversation task | reference | sys_cs_conversation_task | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:09.472Z*