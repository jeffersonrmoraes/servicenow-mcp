# ServiceNow Table: Provider Channel Identity (sys_cs_provider_application)

**Category:** SYSTEM
**SysID:** b607be8a183e32108bb255f46a373a62

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `short_description` | Short description | string | - | - |
| `default_portal` | Default Portal | reference | sp_portal | - |
| `message_auth` | Message auth | reference | provider_auth | - |
| `name` | Name | string | - | ✅ |
| `sys_domain` | Domain | domain_id | - | - |
| `inbound_id` | Inbound ID | string | - | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `trusted_media_domains` | Trusted media domains | string | - | - |
| `provider` | Provider | reference | sys_cs_provider | ✅ |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:15.143Z*