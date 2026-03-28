# ServiceNow Table: Conversation Task (sys_cs_conversation_task)

**Category:** SYSTEM
**SysID:** aef6b68a183e32108bb255f46a373a98

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `fields` | Fields | string_full_utf8 | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `topic_type` | Topic | reference | sys_cs_topic | - |
| `calling_task` | Calling Task | reference | sys_cs_conversation_task | - |
| `sys_created_by` | Created by | string | - | - |
| `state` | State | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `pending_progress` | Pending progress | string | - | - |
| `name` | Name | string | - | - |
| `precentage_complete` | Precentage complete | decimal | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `conversation` | Conversation | reference | sys_cs_conversation | - |
| `context` | Task Context | compressed | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `consumer_account` | Consumer Account | reference | sys_cs_consumer_account | - |
| `derived_scope` | Derived Scope | reference | sys_scope | - |
| `sys_created_on` | Created | glide_date_time | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:07.984Z*