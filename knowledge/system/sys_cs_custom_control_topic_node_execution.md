# ServiceNow Table: Custom Control Topic Node Execution (sys_cs_custom_control_topic_node_execution)

**Category:** SYSTEM
**SysID:** 38f6b28a183e32108bb255f46a373aef

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `topic` | Topic | reference | sys_cs_topic | - |
| `control_data` | Control Data | string_full_utf8 | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `response_transcript` | Response Transcript | string_full_utf8 | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `conversation_id` | Conversation | reference | sys_cs_conversation | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `sys_domain` | Domain | domain_id | - | - |
| `sys_created_by` | Created by | string | - | - |
| `plan` | Plan | reference | sys_cs_custom_control_execution_plan | ✅ |
| `sys_mod_count` | Updates | integer | - | - |
| `topic_node_id` | Topic Node Id | string_full_utf8 | - | - |
| `response_value` | Response Value | string_full_utf8 | - | - |
| `sys_updated_by` | Updated by | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:09.403Z*