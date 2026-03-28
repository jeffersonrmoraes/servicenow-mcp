# ServiceNow Table: VA Click Metrics (sys_cs_click_metrics)

**Category:** SYSTEM
**SysID:** 68f6b28a183e32108bb255f46a373a79

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `conversation_task` | Conversation task | reference | sys_cs_conversation_task | - |
| `sys_id` | Sys ID | GUID | - | - |
| `scratch_pad` | Scratch pad | string | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `state` | State | string | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `conversation` | Conversation | reference | sys_cs_conversation | - |
| `original_url` | Original URL | url | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `event_type` | Event Type | string | - | - |
| `sys_created_by` | Created by | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:00.776Z*