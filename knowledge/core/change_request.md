# ServiceNow Table: Change Request (change_request)

**Category:** CORE
**SysID:** 5f1fe642187632108bb255f46a373aac

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `outside_maintenance_schedule` | Outside maintenance schedule | boolean | - | - |
| `cab_required` | CAB required | boolean | - | - |
| `on_hold_task` | On Hold Change Tasks | glide_list | change_task | - |
| `end_date` | Planned end date | glide_date_time | - | - |
| `phase` | Phase | string | - | - |
| `justification` | Justification | string | - | - |
| `production_system` | Production system | boolean | - | - |
| `review_comments` | Review comments | string | - | - |
| `chg_model` | Model | reference | chg_model | - |
| `scope` | Scope | integer | - | - |
| `implementation_plan` | Implementation plan | string | - | - |
| `cab_recommendation` | CAB recommendation | string | - | - |
| `unauthorized` | Unauthorized | boolean | - | - |
| `cab_delegate` | CAB delegate | reference | sys_user | - |
| `close_code` | Close code | string | - | - |
| `risk` | Risk | integer | - | - |
| `change_plan` | Change plan | string | - | - |
| `conflict_status` | Conflict status | string | - | - |
| `requested_by_date` | Requested by date | glide_date_time | - | - |
| `risk_impact_analysis` | Risk and impact analysis | string | - | - |
| `phase_state` | Phase state | string | - | - |
| `test_plan` | Test plan | string | - | - |
| `type` | Type | string | - | - |
| `review_date` | Review date | glide_date | - | - |
| `on_hold` | On hold | boolean | - | - |
| `conflict_last_run` | Conflict last run | glide_date_time | - | - |
| `std_change_producer_version` | Standard Change Template version | reference | std_change_producer_version | - |
| `reason` | Reason | string | - | - |
| `review_status` | Review status | integer | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `cab_date_time` | CAB date/time | glide_date_time | - | - |
| `on_hold_reason` | On hold reason | string | - | - |
| `requested_by` | Requested by | reference | sys_user | - |
| `start_date` | Planned start date | glide_date_time | - | - |
| `copied_from` | Copied from | reference | change_request | - |
| `category` | Category | string | - | - |
| `backout_plan` | Backout plan | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:24:18.749Z*