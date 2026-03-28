# ServiceNow Table: Problem (problem)

**Category:** CORE
**SysID:** aa1fa242187632108bb255f46a373a0b

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `known_error` | Known error | boolean | - | - |
| `review_outcome` | Major problem review notes | string | - | - |
| `rfc` | Change request | reference | change_request | - |
| `confirmed_by` | Confirmed by | reference | sys_user | - |
| `major_problem` | Major problem | boolean | - | - |
| `problem_state` | Problem state | integer | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `workaround` | Workaround | html | - | - |
| `fix_by` | Fix by | reference | sys_user | - |
| `reopen_count` | Reopen count | integer | - | - |
| `fix_at` | Fix | glide_date_time | - | - |
| `resolved_by` | Resolved by | reference | sys_user | - |
| `reopened_at` | Last reopened at | glide_date_time | - | - |
| `resolved_at` | Resolved | glide_date_time | - | - |
| `confirmed_at` | Confirmed | glide_date_time | - | - |
| `resolution_code` | Resolution code | choice | - | - |
| `reopened_by` | Last reopened by | reference | sys_user | - |
| `prb_model` | Model | reference | prb_model | - |
| `duplicate_of` | Duplicate of | reference | problem | - |
| `fix_communicated_by` | Fix communicated by | reference | sys_user | - |
| `subcategory` | Subcategory | choice | - | - |
| `cause_notes` | Cause notes | html | - | - |
| `workaround_communicated_at` | Workaround communicated | glide_date_time | - | - |
| `primary_known_error_article` | Primary Known Error article | reference | kb_template_known_error_article | - |
| `fix_communicated_at` | Fix communicated | glide_date_time | - | - |
| `category` | Category | choice | - | - |
| `fix_notes` | Fix notes | html | - | - |
| `workaround_applied` | Workaround applied | boolean | - | - |
| `workaround_communicated_by` | Workaround communicated by | reference | sys_user | - |
| `first_reported_by_task` | Origin task | reference | task | - |
| `related_incidents` | Related Incidents | integer | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:08:15.616Z*