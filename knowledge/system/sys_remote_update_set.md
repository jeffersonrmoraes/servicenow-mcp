# ServiceNow Table: Retrieved Update Set (sys_remote_update_set)

**Category:** SYSTEM
**SysID:** 050c2ec2187232108bb255f46a373aed

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `parent` | Parent | reference | sys_remote_update_set | - |
| `remote_base_update_set` | Remote Batch Base | reference | sys_remote_update_set | - |
| `remote_parent_id` | Remote Parent ID | string | - | - |
| `name` | Name | string | - | - |
| `remote_sys_id` | Remote sys ID | string | - | - |
| `summary` | Total | integer | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `application_name` | Application name | string | - | - |
| `update_source` | Update source | reference | sys_update_set_source | - |
| `state` | State | string | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `application_version` | Application version | string | - | - |
| `updated` | Updated | integer | - | - |
| `release_date` | Release date | glide_date_time | - | - |
| `deleted` | Deleted | integer | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `description` | Description | string | - | - |
| `inserted` | Inserted | integer | - | - |
| `commit_date` | Commit date | glide_date_time | - | - |
| `collisions` | Collisions | integer | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `application` | Application | reference | sys_scope | - |
| `origin_sys_id` | Origin sys ID | string | - | - |
| `sys_class_name` | Class | sys_class_name | - | - |
| `sys_created_by` | Created by | string | - | - |
| `application_scope` | Application scope | string | - | - |
| `update_set` | Update set | reference | sys_update_set | - |
| `sys_mod_count` | Updates | integer | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:25:26.243Z*