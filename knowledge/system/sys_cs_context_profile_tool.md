# ServiceNow Table: Setup Tools (sys_cs_context_profile_tool)

**Category:** SYSTEM
**SysID:** aff63a8a183e32108bb255f46a373a08

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_overrides` | Overrides | reference | sys_cs_context_tool | - |
| `setup_type` | Setup type | string | - | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `context_profile` | Chat Experience | reference | sys_cs_context_profile | ✅ |
| `sys_domain` | Domain | domain_id | - | - |
| `tool_id` | Tool Id | document_id | - | - |
| `tool_table` | Tool Table | table_name | - | ✅ |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:07.943Z*