# ServiceNow Table: Topic Library Usage (sys_cs_topic_api_usage)

**Category:** SYSTEM
**SysID:** ad073e8a183e32108bb255f46a373a1b

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `api` | Api | document_id | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `node_id` | Node Id | string | - | ✅ |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `sys_domain` | Domain | domain_id | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `usage` | API Usage | string | - | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `calling_cs_topic_id` | Calling CS Topic Id | reference | sys_cs_topic | ✅ |
| `api_source` | Api source | table_name | - | - |
| `sys_updated_by` | Updated by | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:16.612Z*