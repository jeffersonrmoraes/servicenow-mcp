# ServiceNow Table: App Collaboration Group (sys_appcollab_group)

**Category:** SYSTEM
**SysID:** 228a4e79c37332101b4cd0dc05013124

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `application` | Collaboration Application | reference | sys_scope | ✅ |
| `sys_created_on` | Created | glide_date_time | - | - |
| `assigned_by` | Assigning User | string | - | ✅ |
| `sys_updated_by` | Updated by | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `group` | Collaboration Group | reference | sys_user_group | ✅ |
| `sys_created_by` | Created by | string | - | - |
| `descriptor` | Collaboration Descriptor | reference | sys_appcollab_descriptor | ✅ |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `sys_mod_count` | Updates | integer | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:24.416Z*