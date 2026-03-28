# ServiceNow Table: Published Topic (sys_cb_design_topic)

**Category:** SYSTEM
**SysID:** 8cf6728a183e32108bb255f46a373aeb

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `compiled_topic` | Compiled topic | reference | sys_cs_topic | - |
| `type` | Type | string | - | ✅ |
| `name` | Name | string | - | ✅ |
| `graph` | Graph | string_full_utf8 | - | - |
| `design_definition` | Design definition | string | - | ✅ |
| `design_topic_id` | Design Topic Id | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `sys_domain` | Domain | domain_id | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:50.534Z*