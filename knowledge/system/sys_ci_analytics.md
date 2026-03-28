# ServiceNow Table: CI Analytics (sys_ci_analytics)

**Category:** SYSTEM
**SysID:** 4bf6f68a183e32108bb255f46a373a2f

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `document_ref` | Document Ref | string | - | - |
| `key` | Key | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `group_type` | Group Type | string | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `metric` | Metric | simple_name_values | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `group_id` | Group Id | string | - | - |
| `sys_created_by` | Created by | string | - | - |
| `document_id` | Document Id | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `conversation` | Conversation | reference | sys_cs_conversation | - |
| `value` | Value | string | - | - |
| `sys_updated_by` | Updated by | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:51.929Z*