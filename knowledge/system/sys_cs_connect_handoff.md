# ServiceNow Table: Conversation Server Connect Hand-off (sys_cs_connect_handoff)

**Category:** SYSTEM
**SysID:** eef6b68a183e32108bb255f46a373a86

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_mod_count` | Updates | integer | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `connect_group` | Connect group | reference | live_group_profile | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `cs_conversation` | Cs conversation | reference | sys_cs_conversation | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `sys_id` | Sys ID | GUID | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:05.095Z*