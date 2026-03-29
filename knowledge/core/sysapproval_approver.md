# ServiceNow Table: Approval (sysapproval_approver)

**Category:** CORE
**SysID:** 5adee60e183632108bb255f46a373a34

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `expected_start` | Expected start | glide_date_time | - | - |
| `group` | Group | reference | sysapproval_group | - |
| `order` | Order | integer | - | - |
| `approval_reason` | Approval Reason | string | - | - |
| `due_date` | Due date | glide_date_time | - | - |
| `document_id` | Approving | document_id | - | - |
| `process_step` | Process step | reference | process_step | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `approval_column` | Approval Column | field_name | - | - |
| `approval_source` | Approval source | string | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `approver` | Approver | reference | sys_user | - |
| `comments` | Comments | journal_input | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `state` | State | string | - | - |
| `sysapproval` | Approval for | reference | task | - |
| `state_binding` | State binding | reference | state_binding | - |
| `sys_updated_by` | Updated by | string | - | - |
| `source_table` | Source table | table_name | - | - |
| `iteration` | Iteration | integer | - | - |
| `sys_created_by` | Created by | string | - | - |
| `approval_journal_column` | Approval Journal Column | field_name | - | - |
| `sys_mod_count` | Updates | integer | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:25:06.668Z*