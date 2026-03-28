# ServiceNow Table: Adapter Conversation Lookup (sys_cs_adapter_conversation_lookup)

**Category:** SYSTEM
**SysID:** 3a07be8a183e32108bb255f46a373a78

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `internal_conversation_id` | Internal Conversation Id | reference | sys_cs_conversation | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `device_type` | Device Type | string | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `external_conversation_id` | External Conversation Id | string | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `consumer_account` | Consumer Account | reference | sys_cs_consumer_account | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:57.778Z*