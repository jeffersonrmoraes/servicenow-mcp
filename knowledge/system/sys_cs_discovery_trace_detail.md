# ServiceNow Table: Topic Discovery Trace Detail (sys_cs_discovery_trace_detail)

**Category:** SYSTEM
**SysID:** 4ff6f68a183e32108bb255f46a373a66

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_id` | Sys ID | GUID | - | - |
| `sequence` | Sequence number | integer | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `topics` | Remaining topics | glide_list | sys_cs_topic | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `discovery_trace` | Topic Discovery Trace | reference | sys_cs_discovery_trace | - |
| `sys_updated_by` | Updated by | string | - | - |
| `filter` | Filter | string | - | - |
| `sys_created_by` | Created by | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:09.436Z*