# ServiceNow Table: Next Best Action Tracker (sys_cs_nba_tracker)

**Category:** SYSTEM
**SysID:** 88f6b28a183e32108bb255f46a373a00

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `previous_action` | Previous Action | document_id | - | - |
| `previous_action_skill_type` | Previous Skill Type | string | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `fdih_invocation` | FDIH Invocation | reference | sys_cs_fdih_invocation | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `response_state` | Response State | string | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `conversation` | Conversation | reference | sys_cs_conversation | - |
| `previous_action_table` | Previous Action Table | table_name | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `nba_results_found` | NBA Results Found | boolean | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:13.719Z*