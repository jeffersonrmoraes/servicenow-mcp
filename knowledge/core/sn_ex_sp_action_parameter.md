# ServiceNow Table: Action parameter (sn_ex_sp_action_parameter)

**Category:** CORE
**SysID:** 18c6ba86183e32108bb255f46a373a50

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `action` | Action | reference | sn_ex_sp_action | ✅ |
| `table` | Table | table_name | - | - |
| `json` | Json parameters | json | - | - |
| `parameter_type` | parameter type | string | - | ✅ |
| `is_client` | Is client parameter? | boolean | - | - |
| `text` | Action parameter value | string | - | - |
| `field` | Field | field_name | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `name` | Action parameter name | string | - | ✅ |
| `is_display_value` | Is display value? | boolean | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:16.680Z*