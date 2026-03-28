# ServiceNow Table: Conversation Consumer (sys_cs_consumer)

**Category:** SYSTEM
**SysID:** 68077a8a183e32108bb255f46a373ae5

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `profile` | Profile | string | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `user_id` | User Id | reference | sys_user | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `name` | Name | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `is_test_user` | Is Test User | boolean | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `inactive` | Is Inactive User | boolean | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:05.097Z*