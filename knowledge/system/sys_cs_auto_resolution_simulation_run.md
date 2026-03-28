# ServiceNow Table: Auto-Resolution Simulation Run (sys_cs_auto_resolution_simulation_run)

**Category:** SYSTEM
**SysID:** 0687fa42187e32108bb255f46a373aa3

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `total_records` | Total records | integer | - | - |
| `unsupported_intent` | Records with unsupported intent | integer | - | - |
| `config` | Simulation config | reference | sys_cs_auto_resolution_simulation_configuration | - |
| `records_match_active_topic` | Records with matching intent active topic | integer | - | - |
| `flow_context` | Flow context | reference | sys_flow_context | - |
| `sys_id` | Sys ID | GUID | - | - |
| `completed_time` | Completed time | glide_date_time | - | - |
| `records_no_matching_intent` | Records without matching intent | integer | - | - |
| `state` | State | choice | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `solution_name` | Solution name | string | - | - |
| `matching_inactive_intent` | Records with matching inactive intent | integer | - | - |
| `progress` | Progress | percent_complete | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `query_run` | Query run | string | - | - |
| `matching_active_intent` | Records with matching active intent | integer | - | - |
| `summary` | Summary | string | - | - |
| `sys_created_by` | Created by | string | - | - |
| `latest_trained_version` | Latest trained version | string | - | - |
| `no_intent_found` | Records with no intent found | integer | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `records_matching_intent` | Records with matching intent | integer | - | - |
| `resolution_rate` | Resolution rate (%) | integer | - | - |
| `start_time` | Start time | glide_date_time | - | - |
| `records_match_inactive_topic` | Records with matching intent inactive topic | integer | - | - |
| `message` | Message | string | - | - |
| `sys_updated_by` | Updated by | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:59.282Z*