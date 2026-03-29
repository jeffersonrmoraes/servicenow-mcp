# ServiceNow Table: Action (sn_ex_sp_action)

**Category:** CORE
**SysID:** c8c67a86183e32108bb255f46a373ace

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `icon` | Action icon | glyphicon | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `sys_overrides` | Overrides | reference | sn_ex_sp_action | - |
| `sys_domain` | Domain | domain_id | - | - |
| `action_type` | Action type | reference | sn_ex_sp_action_type | ✅ |
| `name` | Action label | translated_text | - | ✅ |
| `table` | Table | table_name | - | - |
| `active` | Active | boolean | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:16.636Z*