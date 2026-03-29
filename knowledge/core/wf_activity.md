# ServiceNow Table: Workflow Activity (wf_activity)

**Category:** CORE
**SysID:** 3beeae4e183632108bb255f46a373a16

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `activity_definition` | Activity definition | reference | wf_element_definition | - |
| `databus_lookup_id` | Databus lookup ID | integer | - | - |
| `vars` | Variables | glide_var | wf_activity_variable | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `stage` | Stage | reference | wf_stage | - |
| `x` | X | integer | - | - |
| `timeout` | Timeout | glide_duration | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `pinned_version` | Pinned version | reference | wf_versionable | - |
| `height` | Height | integer | - | - |
| `new_activity_definition` | New activity definition | reference | wf_element_definition | - |
| `parent` | Parent | reference | wf_activity | - |
| `sys_id` | Sys ID | GUID | - | - |
| `out_of_date` | Out of date | boolean | - | - |
| `width` | Width | integer | - | - |
| `name` | Name | string | - | - |
| `activity_definition_updated` | Activity definition updated | boolean | - | - |
| `is_parent` | Is parent | boolean | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `workflow_version` | Workflow version | reference | wf_workflow_version | - |
| `notes` | Notes | string | - | - |
| `input` | Input | data_object | - | - |
| `sys_created_by` | Created by | string | - | - |
| `pinned` | Pinned | boolean | - | - |
| `y` | Y | integer | - | - |
| `sys_mod_count` | Updates | integer | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:25:10.140Z*