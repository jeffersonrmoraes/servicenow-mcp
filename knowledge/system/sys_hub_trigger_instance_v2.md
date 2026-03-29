# ServiceNow Table: Trigger Instance V2 (sys_hub_trigger_instance_v2)

**Category:** SYSTEM
**SysID:** 22b17e02183a32108bb255f46a373ac0

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `name` | Name | string | - | ✅ |
| `sys_mod_count` | Updates | integer | - | - |
| `remote_sys_id` | Remote Sys Id | string | - | ✅ |
| `published_version` | Published version | string | - | - |
| `comment` | Comment | string | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `trigger_outputs` | Trigger outputs | string | - | - |
| `generation_source` | Generation source | string | - | - |
| `sys_created_by` | Created by | string | - | - |
| `trigger_inputs` | Trigger inputs | string | - | - |
| `sys_scope` | Application | reference | sys_scope | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `flow` | Flow | reference | sys_hub_flow_base | ✅ |
| `updation_source` | Updation source | string | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `trigger_type` | Trigger type | string | - | ✅ |
| `trigger_definition` | Trigger definition | reference | sys_hub_trigger_definition | - |
| `display_text` | Display text | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:24.870Z*