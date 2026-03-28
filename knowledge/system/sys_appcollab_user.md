# ServiceNow Table: App Collaboration User (sys_appcollab_user)

**Category:** SYSTEM
**SysID:** fa8a8e79c37332101b4cd0dc05013141

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `application` | Collaboration Application | reference | sys_scope | ✅ |
| `sys_updated_by` | Updated by | string | - | - |
| `user` | Collaboration User | reference | sys_user | ✅ |
| `sys_created_on` | Created | glide_date_time | - | - |
| `assigned_by` | Assigning User | string | - | ✅ |
| `descriptor` | Collaboration Descriptor | reference | sys_appcollab_descriptor | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `sys_created_by` | Created by | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:24.454Z*