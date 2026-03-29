# ServiceNow Table: Action group (sn_ex_sp_action_group)

**Category:** CORE
**SysID:** 8dc6fa86183e32108bb255f46a373a97

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `active` | Active | boolean | - | - |
| `name` | Action group name | string | - | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `sys_overrides` | Overrides | reference | sn_ex_sp_action_group | - |
| `sys_domain` | Domain | domain_id | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:16.622Z*