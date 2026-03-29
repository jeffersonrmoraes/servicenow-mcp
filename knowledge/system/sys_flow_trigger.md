# ServiceNow Table: Trigger (sys_flow_trigger)

**Category:** SYSTEM
**SysID:** cab13e02183a32108bb255f46a373aed

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_scope` | Application | reference | sys_scope | - |
| `sys_updated_by` | Updated by | string | - | - |
| `sys_overrides` | Sys overrides | reference | sys_flow_trigger | - |
| `sys_created_by` | Created by | string | - | - |
| `trigger_definition` | Trigger definition | reference | sys_hub_trigger_definition | - |
| `sys_mod_count` | Updates | integer | - | - |
| `name` | Name | string | - | - |
| `sys_domain_path` | Domain Path | domain_path | - | - |
| `published_version` | Published version | string | - | - |
| `active` | Active | boolean | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `sys_class_name` | Class | sys_class_name | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `sys_domain` | Domain | domain_id | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:30.838Z*