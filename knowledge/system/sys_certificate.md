# ServiceNow Table: X.509 Certificate (sys_certificate)

**Category:** SYSTEM
**SysID:** d7db6ece183232108bb255f46a373a2b

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `pem_certificate` | PEM Certificate | string | - | - |
| `serial_number` | Serial number | string | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `issuer` | Issuer | string | - | - |
| `valid_from` | Valid from | glide_date_time | - | - |
| `notify_groups` | Groups to notify on expiration | glide_list | sys_user_group | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `short_description` | Short description | string | - | - |
| `expires_in_days` | Expires in days | integer | - | - |
| `type` | Type | string | - | - |
| `notify_on_expiration` | Notify on expiration | glide_list | sys_user | - |
| `sys_id` | Sys ID | GUID | - | - |
| `format` | Format | string | - | - |
| `expiration_notification` | Expiration notification | boolean | - | - |
| `key_store_password` | Key store password | password2 | - | - |
| `warn_in_days_to_expire` | Warn in days to expire | integer | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `name` | Name | string | - | ✅ |
| `active` | Active | boolean | - | - |
| `frequency` | Frequency | choice | - | ✅ |
| `sys_created_by` | Created by | string | - | - |
| `subject` | Subject | string | - | - |
| `expires` | Expires | glide_date_time | - | - |
| `sys_mod_count` | Updates | integer | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:52.049Z*