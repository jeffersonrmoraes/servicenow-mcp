# ServiceNow Table: Device App Registration Detail (sys_auth_policy_device_app_registry)

**Category:** SYSTEM
**SysID:** 9972f6ce183a32108bb255f46a373acf

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `app_flavour` | App Flavour | string | - | - |
| `last_login_time` | Last Login Time | glide_date_time | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `sys_domain_path` | Domain Path | domain_path | - | - |
| `registration_secret` | Registration Secret | password2 | - | ✅ |
| `os_type` | OS Type | string | - | - |
| `app_id` | AppID | string | - | - |
| `device_model` | Device Model | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `device_id` | Device ID | string | - | - |
| `active` | Active | boolean | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `is_registered` | Is Registered | boolean | - | - |
| `metadata` | Metadata | string | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `device_name` | Device Name | string | - | - |
| `sys_domain` | Domain | domain_id | sys_user_group | - |
| `sys_created_by` | Created by | string | - | - |
| `user` | User | reference | sys_user | ✅ |
| `app_version` | App Version | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `secret` | Secret | password2 | - | - |
| `os_version` | OS Version | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:43.286Z*