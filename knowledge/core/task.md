# ServiceNow Table: Task (task)

**Category:** CORE
**SysID:** 85fb2e42187232108bb255f46a373ab3

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_class_name` | Task type | sys_class_name | - | - |
| `sys_domain_path` | Domain Path | domain_path | - | - |
| `contract` | Contract | reference | ast_contract | - |
| `assignment_group` | Assignment group | reference | sys_user_group | - |
| `approval` | Approval | string | - | - |
| `calendar_duration` | Duration | glide_duration | - | - |
| `knowledge` | Knowledge | boolean | - | - |
| `correlation_display` | Correlation display | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `short_description` | Short description | string | - | - |
| `company` | Company | reference | core_company | - |
| `approval_set` | Approval set | glide_date_time | - | - |
| `opened_by` | Opened by | reference | sys_user | - |
| `contact_type` | Contact type | string | - | - |
| `made_sla` | Made SLA | boolean | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `work_notes_list` | Work notes list | glide_list | sys_user | - |
| `parent` | Parent | reference | task | - |
| `priority` | Priority | integer | - | - |
| `close_notes` | Close notes | string | - | - |
| `reassignment_count` | Reassignment count | integer | - | - |
| `due_date` | Due date | glide_date_time | - | - |
| `order` | Order | integer | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `description` | Description | string | - | - |
| `impact` | Impact | integer | - | - |
| `closed_at` | Closed | glide_date_time | - | - |
| `group_list` | Group list | glide_list | sys_user_group | - |
| `activity_due` | Activity due | due_date | - | - |
| `comments_and_work_notes` | Comments and Work notes | journal_list | - | - |
| `universal_request` | Universal Request | reference | task | - |
| `task_effective_number` | Effective number | string | - | - |
| `route_reason` | Transfer reason | integer | - | - |
| `expected_start` | Expected start | glide_date_time | - | - |
| `upon_reject` | Upon reject | string | - | - |
| `work_start` | Actual start | glide_date_time | - | - |
| `upon_approval` | Upon approval | string | - | - |
| `work_end` | Actual end | glide_date_time | - | - |
| `delivery_task` | Delivery task | reference | sc_cat_item_delivery_task | - |
| `delivery_plan` | Delivery plan | reference | sc_cat_item_delivery_plan | - |
| `service_offering` | Service offering | reference | service_offering | - |
| `comments` | Additional comments | journal_input | - | - |
| `urgency` | Urgency | integer | - | - |
| `opened_at` | Opened | glide_date_time | - | - |
| `watch_list` | Watch list | glide_list | sys_user | - |
| `sla_due` | SLA due | due_date | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `assigned_to` | Assigned to | reference | sys_user | - |
| `escalation` | Escalation | integer | - | - |
| `time_worked` | Time worked | timer | - | - |
| `additional_assignee_list` | Additional assignee list | glide_list | sys_user | - |
| `correlation_id` | Correlation ID | string | - | - |
| `number` | Number | string | - | - |
| `cmdb_ci` | Configuration item | reference | cmdb_ci | - |
| `approval_history` | Approval history | journal | - | - |
| `business_duration` | Business duration | glide_duration | - | - |
| `location` | Location | reference | cmn_location | - |
| `user_input` | User input | user_input | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `active` | Active | boolean | - | - |
| `state` | State | integer | - | - |
| `work_notes` | Work notes | journal_input | - | - |
| `closed_by` | Closed by | reference | sys_user | - |
| `follow_up` | Follow up | glide_date_time | - | - |
| `sys_domain` | Domain | domain_id | - | - |
| `sys_created_by` | Created by | string | - | - |
| `business_service` | Service | reference | cmdb_ci_service | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:24:18.355Z*