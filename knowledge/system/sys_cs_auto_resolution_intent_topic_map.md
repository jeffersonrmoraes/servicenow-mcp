# ServiceNow Table: Auto-Resolution Intent Topic Map (sys_cs_auto_resolution_intent_topic_map)

**Category:** SYSTEM
**SysID:** 66877e42187e32108bb255f46a373a02

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `ar_configuration` | Auto-Resolution configuration | reference | sys_cs_auto_resolution_configuration | ✅ |
| `sys_updated_by` | Updated by | string | - | - |
| `matched_topic` | Matched topic | reference | sys_cs_topic | ✅ |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `active` | Active | boolean | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `ar_intent` | Auto-Resolution intent | string | - | ✅ |
| `sys_updated_on` | Updated | glide_date_time | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:59.222Z*