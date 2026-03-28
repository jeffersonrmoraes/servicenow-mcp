# ServiceNow Table: Client Adapter (sys_cs_client_adapter)

**Category:** SYSTEM
**SysID:** 1bf6f68a183e32108bb255f46a373ab9

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `user_context` | User context | string | - | - |
| `sys_created_by` | Created by | string | - | - |
| `vendor` | Vendor | reference | sys_cs_vendor | ✅ |
| `sys_mod_count` | Updates | integer | - | - |
| `client_type` | Client type | choice | - | - |
| `group_id` | Group ID | string | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `external_id` | External ID | string | - | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `adapter_state` | Adapter state | string | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `sys_domain` | Domain | domain_id | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `consumer` | Consumer | reference | sys_cs_consumer | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:00.732Z*