# ServiceNow Table: Conversation Task FDIH Invocation Callback (sys_cs_fdih_invocation_callback)

**Category:** SYSTEM
**SysID:** 13f6f68a183e32108bb255f46a373aee

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_created_by` | Created by | string | - | - |
| `message` | Message | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `output_type` | Output Type | string | - | - |
| `outputs` | Outputs | json | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `callback_id` | Callback ID | string | - | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `response_code` | Response Code | string | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `time_taken` | Time Taken | string | - | - |
| `fdih_invocation` | FDIH Invocation | reference | sys_cs_fdih_invocation | ✅ |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:10.846Z*