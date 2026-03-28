# ServiceNow Table: Conversation Server Trace (sys_cs_trace)

**Category:** SYSTEM
**SysID:** d64c2e4a187232108bb255f46a373a0d

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_mod_count` | Updates | integer | - | - |
| `id` | ID | string | - | - |
| `result` | Result | json | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `metadata_document` | Metadata document | document_id | - | - |
| `sys_created_by` | Created by | string | - | - |
| `metadata_document_table` | Metadata document table | table_name | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `state` | State | choice | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `duration` | Duration | glide_duration | - | - |
| `sys_id` | Sys ID | GUID | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:16.689Z*