# ServiceNow Table: Trigger Log (sys_hub_trigger_log)

**Category:** SYSTEM
**SysID:** 7ab1be02183a32108bb255f46a373a75

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `change_summary` | Change Summary | string | - | ✅ |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `trigger_definition` | Trigger Definition | reference | sys_hub_trigger_definition | ✅ |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `connected_flows` | Connected Flows | glide_list | sys_hub_flow | - |
| `sys_created_on` | Created | glide_date_time | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:24.850Z*