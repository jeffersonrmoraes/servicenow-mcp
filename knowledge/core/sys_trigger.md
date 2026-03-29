# ServiceNow Table: Schedule Item (sys_trigger)

**Category:** CORE
**SysID:** 153bae02183232108bb255f46a373a04

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `entered_run_start` | Starting | calendar_date_time | - | - |
| `entered_time` | Time | glide_utc_time | - | - |
| `entered_run_end` | Ending | calendar_date_time | - | - |
| `time_zone` | Time zone | string | - | - |
| `document_key` | Document key | char | - | - |
| `job_classification` | Job classification | string | - | - |
| `run_month` | Run month | month_of_year | - | - |
| `error_count` | Error count | integer | - | - |
| `repeat_every` | Repeat every | integer | - | - |
| `next_action` | Next action | glide_date_time | - | - |
| `trigger_type` | Trigger type | integer | - | - |
| `run_weekinmonth` | Run weekinmonth | week_of_month | - | - |
| `claimed_by` | Claimed by | string | - | - |
| `run_start` | Starting | glide_date_time | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `trigger_class` | Trigger class | string | - | - |
| `log` | Log | boolean | - | - |
| `run_daysofweek` | Run days of week | days_of_week | - | - |
| `system_id` | System ID | string | - | - |
| `rollback_context_id` | Rollback context ID | reference | sys_rollback_context | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `job_context` | Job context | string | - | - |
| `run_time` | Run time | glide_time | - | - |
| `application` | Application | string | - | - |
| `processing_duration` | Processing duration | integer | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `business_calendar` | Business calendar | reference | business_calendar | - |
| `document` | Document | string | - | - |
| `transaction_id` | Transaction ID | string | - | - |
| `advanced` | Advanced | boolean | - | - |
| `run_count` | Run count | integer | - | - |
| `run_end` | Ending | glide_date_time | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `state` | State | integer | - | - |
| `maintenance` | Maintenance | boolean | - | - |
| `run_dayofmonth` | Run dayofmonth | integer | - | - |
| `parent` | Parent | reference | sys_trigger | - |
| `replication_originator` | Replication originator | string | - | - |
| `sys_created_by` | Created by | string | - | - |
| `name` | Name | string | - | - |
| `calendar` | Calendar | reference | sys_calendar | - |
| `run_dayofweek` | Run dayofweek | day_of_week | - | - |
| `script` | Script | string | - | - |
| `priority` | Priority | integer | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `job_id` | Job ID | reference | sys_job | - |
| `repeat` | Repeat | glide_duration | - | - |
| `max_drift` | Max drift | glide_duration | - | - |
| `last_error` | Last error | string | - | - |
| `upgrade_safe` | Upgrade safe | boolean | - | - |
| `offset_type` | Offset type | integer | - | - |
| `offset` | Offset | glide_duration | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:25:09.067Z*