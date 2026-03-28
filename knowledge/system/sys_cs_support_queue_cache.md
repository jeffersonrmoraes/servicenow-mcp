# ServiceNow Table: Live Agent Support Queue Cache (sys_cs_support_queue_cache)

**Category:** SYSTEM
**SysID:** edf6368a183e32108bb255f46a373ad3

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_mod_count` | Updates | integer | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `queue` | Queue | reference | chat_queue | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `cached_data` | Serialized Cached Data(SupportQueue) | string | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `sys_id` | Sys ID | GUID | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:15.247Z*