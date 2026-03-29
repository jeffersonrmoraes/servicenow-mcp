# ServiceNow Table: Workflow Version (wf_workflow_version)

**Category:** CORE
**SysID:** c4feae4e183632108bb255f46a373a71

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `table` | Table | table_name | - | ✅ |
| `not_cacheable` | Not cacheable | boolean | - | - |
| `activity_stages` | Activity stages | compressed | - | - |
| `journal` | Journal | journal | - | - |
| `sys_created_by` | Created by | string | - | - |
| `name` | Name | string | - | ✅ |
| `condition` | Condition | conditions | - | - |
| `checked_out` | Checked out | glide_date_time | - | - |
| `expected_time` | Expected time | glide_duration | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `workflow` | Workflow | reference | wf_workflow | - |
| `start` | Starting activity | reference | wf_activity | - |
| `active` | Active | boolean | - | - |
| `schedule` | Schedule | reference | cmn_schedule | - |
| `stage_order` | Stage order | string | - | - |
| `description` | Description | string | - | - |
| `full_sequences` | Full sequences | compressed | - | - |
| `on_cancel` | On-cancel script | script | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `stage_field` | Stage field | field_name | - | - |
| `max_activity_count` | Max activity count | integer | - | - |
| `after_business_rules` | Run after bus. rules run | boolean | - | - |
| `timezone` | Timezone | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `column_renderer` | Stage rendering | reference | column_renderer | - |
| `run_multiple` | Run multiple | boolean | - | - |
| `expected_sequences` | Expected sequences | compressed | - | - |
| `requires_ert` | Requires ERT | boolean | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `condition_type` | If condition matches | string | - | - |
| `checked_out_by` | Checked out by | reference | sys_user | - |
| `expected_time_type` | Delivery based on | string | - | - |
| `pin_type` | Activity pinning | string | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `validated` | Workflow Runtime Validation Status | boolean | - | - |
| `order` | Order | integer | - | - |
| `published` | Published | boolean | - | - |
| `relative_duration` | Relative duration | reference | cmn_relative_duration | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:25:09.779Z*