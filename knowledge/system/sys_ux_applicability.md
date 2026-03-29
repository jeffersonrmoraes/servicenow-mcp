# ServiceNow Table: Audience (sys_ux_applicability)

**Category:** SYSTEM
**SysID:** 7e7bae46183232108bb255f46a373a8b

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `active` | Active | boolean | - | - |
| `sys_domain_path` | Domain Path | domain_path | - | - |
| `api_name` | API Name | string | - | - |
| `roles` | Roles | glide_list | sys_user_role | - |
| `sys_id` | Sys ID | GUID | - | - |
| `name` | Name | string | - | ✅ |
| `sys_overrides` | Override | reference | sys_ux_applicability | - |
| `role_names` | Role names | user_roles | - | - |
| `sys_domain` | Domain | domain_id | - | - |
| `description` | Description | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:31.795Z*