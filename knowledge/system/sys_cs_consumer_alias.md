# ServiceNow Table: Conversation Consumer alias (sys_cs_consumer_alias)

**Category:** SYSTEM
**SysID:** 5d07fa8a183e32108bb255f46a373aaf

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `vendor` | Vendor | reference | sys_cs_vendor | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `access_token` | Access Token | reference | sys_cs_access_token | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `sys_domain` | Domain | domain_id | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `client_type` | Client Type | string | - | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `consumer` | Consumer | reference | sys_cs_consumer | ✅ |
| `alias` | Alias | string | - | - |
| `sys_updated_by` | Updated by | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:05.138Z*