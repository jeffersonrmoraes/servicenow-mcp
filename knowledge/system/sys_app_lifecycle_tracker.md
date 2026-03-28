# ServiceNow Table: Upgrade Plan Auto Tracker (sys_app_lifecycle_tracker)

**Category:** SYSTEM
**SysID:** 9a0c2606187232108bb255f46a373afd

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `event_type` | Event Type | choice | - | ✅ |
| `sys_mod_count` | Updates | integer | - | - |
| `customization_version` | Customization version | version | - | - |
| `id` | ID | string | - | ✅ |
| `sys_updated_by` | Updated by | string | - | - |
| `name` | Name | string | - | ✅ |
| `sys_created_by` | Created by | string | - | - |
| `scope` | Scope | string | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `item_type` | Item Type | choice | - | ✅ |
| `rollback_context_id` | Rollback Context ID | reference | sys_rollback_context | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `version` | Version | version | - | - |
| `additional_parameters` | Additional parameters | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:25.862Z*