# ServiceNow Table: Incident (incident)

**Category:** CORE
**SysID:** b21fe242187632108bb255f46a373aff

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `child_incidents` | Child Incidents | integer | - | - |
| `resolved_at` | Resolved | glide_date_time | - | - |
| `problem_id` | Problem | reference | problem | - |
| `caller_id` | Caller | reference | sys_user | - |
| `subcategory` | Subcategory | string | - | - |
| `reopened_time` | Last reopened at | glide_date_time | - | - |
| `parent_incident` | Parent Incident | reference | incident | - |
| `business_impact` | Business impact | string | - | - |
| `severity` | Severity | integer | - | - |
| `reopened_by` | Last reopened by | reference | sys_user | - |
| `notify` | Notify | integer | - | - |
| `hold_reason` | On hold reason | integer | - | - |
| `close_code` | Close code | string | - | - |
| `rfc` | Change Request | reference | change_request | - |
| `incident_state` | Incident state | integer | - | - |
| `calendar_stc` | Resolve time | integer | - | - |
| `origin_table` | Origin table | table_name | - | - |
| `resolved_by` | Resolved by | reference | sys_user | - |
| `reopen_count` | Reopen count | integer | - | - |
| `cause` | Probable cause | string | - | - |
| `business_stc` | Business resolve time | integer | - | - |
| `origin_id` | Origin | document_id | - | - |
| `caused_by` | Caused by Change | reference | change_request | - |
| `category` | Category | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:05:36.909Z*