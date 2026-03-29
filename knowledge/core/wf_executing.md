# ServiceNow Table: Workflow Executing Activity (wf_executing)

**Category:** CORE
**SysID:** a4feee4e183632108bb255f46a373adb

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `state` | State | string | - | - |
| `registered_events` | Registered events | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `workflow_version` | Workflow version | reference | wf_workflow_version | - |
| `started` | Started | glide_date_time | - | - |
| `sys_domain` | Domain | domain_id | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `activity` | Activity | reference | wf_activity | - |
| `result` | Result | string | - | - |
| `output_data` | Output Data | string | - | - |
| `parent` | Parent | reference | wf_executing | - |
| `output` | Output | string | - | - |
| `sys_domain_path` | Domain Path | domain_path | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `previous_activity` | Previous activity | reference | wf_history | - |
| `fault_description` | Fault description | string | - | - |
| `is_parent` | Is parent | boolean | - | - |
| `scratchpad` | Scratchpad | name_values | - | - |
| `notify_termination` | Notify Termination | boolean | - | - |
| `activity_index` | Activity index | integer | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `sys_created_by` | Created by | string | - | - |
| `context` | Context | reference | wf_context | - |
| `due` | Due | glide_date_time | - | - |
| `input_data` | Input Data | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:25:10.506Z*