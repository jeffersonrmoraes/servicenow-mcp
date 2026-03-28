# ServiceNow Table: Bot Messages (sys_cs_bot_messages)

**Category:** SYSTEM
**SysID:** d2077e8a183e32108bb255f46a373a79

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_cs_provider_application` | Provider Channel Identity | reference | sys_cs_provider_application | ✅ |
| `value` | Value | string | - | ✅ |
| `sys_updated_by` | Updated by | string | - | - |
| `message_type` | Message Type | choice | - | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `sys_domain` | Domain | domain_id | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `name` | Name | string | - | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `description` | Description | string | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:00.680Z*