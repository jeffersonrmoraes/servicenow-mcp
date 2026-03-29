# ServiceNow Table: Workflow Resource Filter Rule (sys_hub_resource_filter_rule)

**Category:** SYSTEM
**SysID:** 14f17246183a32108bb255f46a373a67

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `role` | User Roles | glide_list | sys_user_role | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `delegated_development_permission` | Delegated Development Permission | reference | sys_development_permission | - |
| `resource` | Resource Definition | reference | sys_hub_resource | ✅ |
| `filter_type` | Filter Type | string | - | - |
| `active` | Active | boolean | - | - |
| `name` | Name | string | - | ✅ |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:23.397Z*