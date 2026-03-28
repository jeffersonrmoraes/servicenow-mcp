# ServiceNow Table: Template Instance (sys_app_template_instance)

**Category:** SYSTEM
**SysID:** 720236c6183a32108bb255f46a373a24

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `flow_context` | Flow Context | reference | sys_flow_context | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `error` | Template Runner error | string | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `state` | State | string | - | - |
| `variables` | Variables | json | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `app_template` | Application template? | boolean | - | - |
| `caller` | Caller | reference | sys_user | - |
| `sys_updated_by` | Updated by | string | - | - |
| `parent_instance` | Parent Template Instance | reference | sys_app_template_instance | - |
| `sys_created_by` | Created by | string | - | - |
| `template` | Template | reference | sys_app_template | - |
| `sys_mod_count` | Updates | integer | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:28.746Z*