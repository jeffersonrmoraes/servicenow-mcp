# ServiceNow Table: Action Instance V2 (sys_hub_action_instance_v2)

**Category:** SYSTEM
**SysID:** d7c17e42183a32108bb255f46a373aa5

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `values` | Values | string | - | - |
| `action_type` | Action type | reference | sys_hub_action_type_base | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `compiled_snapshot` | Compiled snapshot | string | - | - |
| `action_type_parent` | Action type parent | reference | sys_hub_action_type_definition | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:20.520Z*