# ServiceNow Table: Data Policy Rule (sys_data_policy_rule)

**Category:** SYSTEM
**SysID:** 8b4bea42183232108bb255f46a373a9e

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `table` | Table | table_name | - | ✅ |
| `field` | Field name | field_name | - | ✅ |
| `mandatory` | Mandatory | string | - | - |
| `disabled` | Read only | string | - | - |
| `sys_data_policy` | Data Policy | reference | sys_data_policy2 | - |
| `sys_id` | Sys ID | GUID | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:19.506Z*