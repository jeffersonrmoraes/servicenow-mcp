# ServiceNow Table: Conversation Server Configuration (sys_cs_configuration)

**Category:** SYSTEM
**SysID:** e6f6b68a183e32108bb255f46a373a76

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `value` | Value | string | - | ✅ |
| `name` | Name | string | - | ✅ |
| `sys_domain` | Domain | domain_id | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `parent` | Parent | reference | sys_cs_configuration_page | - |
| `short_description` | Short Description | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:05.052Z*