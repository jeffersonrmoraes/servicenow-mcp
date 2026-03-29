# ServiceNow Table: Update Set (sys_update_set)

**Category:** SYSTEM
**SysID:** 242b2602183232108bb255f46a373ab3

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `installed_from` | Installed from | string | - | - |
| `release_date` | Release date | glide_date_time | - | - |
| `merged_to` | Merged to | reference | sys_update_set | - |
| `sys_mod_count` | Updates | integer | - | - |
| `is_default` | Default Set | boolean | - | - |
| `completed_on` | Completed on | glide_date_time | - | - |
| `sys_created_by` | Created by | string | - | - |
| `remote_sys_id` | Remote Sys Id | reference | sys_remote_update_set | - |
| `sys_updated_by` | Updated by | string | - | - |
| `batch_install_plan` | Batch Installation Plan | reference | sys_batch_install_plan | - |
| `parent` | Parent | reference | sys_update_set | - |
| `base_update_set` | Batch Base | reference | sys_update_set | - |
| `install_date` | Install date | glide_date_time | - | - |
| `application` | Application | reference | sys_scope | ✅ |
| `description` | Description | string | - | - |
| `origin_sys_id` | Origin sys ID | string | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `name` | Name | string | - | ✅ |
| `completed_by` | Completed by | reference | sys_user | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `state` | State | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:25:25.522Z*