# ServiceNow Table: Topic Library Usage (sys_cb_topic_library_usage)

**Category:** SYSTEM
**SysID:** 85f6f28a183e32108bb255f46a373ab5

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `library_cb_topic_id` | Library CB Topic Id | reference | sys_cb_topic | ✅ |
| `calling_cb_topic_id` | Calling CB Topic Id | reference | sys_cb_topic | ✅ |
| `sys_overrides` | Overrides | reference | sys_cb_topic_library_usage | - |
| `sys_id` | Sys ID | GUID | - | - |
| `sys_domain` | Domain | domain_id | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:50.564Z*