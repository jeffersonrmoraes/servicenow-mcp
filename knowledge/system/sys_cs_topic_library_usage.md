# ServiceNow Table: Topic Library Usage (sys_cs_topic_library_usage)

**Category:** SYSTEM
**SysID:** f9f6768a183e32108bb255f46a373a19

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `node_id` | Node Id | string | - | ✅ |
| `library_cs_topic_id` | Library CS Topic Id | reference | sys_cs_topic | ✅ |
| `calling_cs_topic_id` | Calling CS Topic Id | reference | sys_cs_topic | ✅ |
| `sys_domain` | Domain | domain_id | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `library_usage` | Library Usage | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:16.645Z*