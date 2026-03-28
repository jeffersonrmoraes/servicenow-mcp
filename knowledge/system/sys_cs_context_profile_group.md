# ServiceNow Table: Assistant hierarchy (sys_cs_context_profile_group)

**Category:** SYSTEM
**SysID:** 4c077a8a183e32108bb255f46a373a49

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `primary_profile_id` | Primary Profile Id | reference | sys_cs_context_profile | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `sys_overrides` | Overrides | reference | sys_cs_context_profile_group | - |
| `sys_domain` | Domain | domain_id | - | - |
| `secondary_profile_id` | Secondary Profile Id | reference | sys_cs_context_profile | ✅ |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:06.543Z*