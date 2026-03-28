# ServiceNow Table: Test Runner (sys_atf_agent)

**Category:** SYSTEM
**SysID:** c770fa8618b632108bb255f46a373a9c

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `status` | Status | string | - | - |
| `user_agent` | User agent | string | - | ✅ |
| `last_checkin` | Last checkin | glide_date_time | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `browser_name` | Browser name | string | - | - |
| `headless` | Headless Runner | boolean | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `os_name` | OS name | string | - | - |
| `root_tracker_id` | Root tracker | reference | sys_execution_tracker | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `browser_version` | Browser version | string | - | - |
| `is_cloud_runner` | Is cloud runner | boolean | - | - |
| `sys_created_by` | Created by | string | - | - |
| `os_version` | OS version | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `session_id` | Session ID | string | - | - |
| `user` | User | reference | sys_user | - |
| `status_reason` | Status reason | string | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `type` | Type | choice | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:33.124Z*