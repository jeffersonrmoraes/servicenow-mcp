# ServiceNow Table: User (sys_user)

**Category:** SYSTEM
**SysID:** e03bea02183232108bb255f46a373ab3

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `ldap_server` | LDAP server | reference | ldap_server_config | - |
| `fax` | Fax | phone_number_e164 | - | - |
| `federated_id` | Federated ID | string | - | - |
| `enable_multifactor_authn` | Enable Multifactor Authentication | boolean | - | - |
| `preferred_language` | Language | string | - | - |
| `home_phone` | Home phone | ph_number | - | - |
| `date_format` | Date format | string | - | - |
| `manager_hp1` | Manager HP1 | record_hierarchy_path | - | - |
| `company` | Company | reference | core_company | - |
| `building` | Building | reference | cmn_building | - |
| `sys_updated_by` | Updated by | string | - | - |
| `user_password` | Password | password | - | - |
| `name` | Name | string | - | - |
| `accumulated_roles` | Accumulated roles | string | - | - |
| `department` | Department | reference | cmn_department | - |
| `employee_number` | Employee number | string | - | - |
| `sys_class_name` | Class | sys_class_name | - | - |
| `middle_name` | Middle name | string | - | - |
| `gender` | Gender | string | - | - |
| `locked_out` | Locked out | boolean | - | - |
| `default_perspective` | Default perspective | reference | sys_perspective | - |
| `state` | State / Province | string | - | - |
| `cost_center` | Cost center | reference | cmn_cost_center | - |
| `sys_mod_count` | Updates | integer | - | - |
| `introduction` | Prefix | string | - | - |
| `email` | Email | email | - | - |
| `last_login` | Last login | glide_date | - | - |
| `calendar_integration` | Calendar integration | integer | - | - |
| `street` | Street | multi_two_lines | - | - |
| `active` | Active | boolean | - | - |
| `sys_created_by` | Created by | string | - | - |
| `web_service_access_only` | Web service access only | boolean | - | - |
| `internal_integration_user` | Internal Integration User | boolean | - | - |
| `schedule` | Schedule | reference | cmn_schedule | - |
| `sys_domain_path` | Domain Path | domain_path | - | - |
| `identity_type` | Identity type | choice | - | - |
| `password_needs_reset` | Password needs reset | boolean | - | - |
| `phone` | Business phone | ph_number | - | - |
| `time_zone` | Time zone | string | - | - |
| `manager` | Manager | reference | sys_user | - |
| `vip` | VIP | boolean | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `user_name` | User ID | string | - | - |
| `last_name` | Last name | string | - | - |
| `roles` | Roles | user_roles | - | - |
| `location` | Location | reference | cmn_location | - |
| `zip` | Zip / Postal code | string | - | - |
| `avatar` | Avatar | user_image | - | - |
| `first_name` | First name | string | - | - |
| `title` | Title | string | - | - |
| `last_login_time` | Last login time | glide_date_time | - | - |
| `photo` | Photo | user_image | - | - |
| `city` | City | string | - | - |
| `sys_domain` | Domain | domain_id | sys_user_group | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `country` | Country code | string | - | - |
| `mobile_phone` | Mobile phone | ph_number | - | - |
| `time_format` | Time format | string | - | - |
| `notification` | Notification | integer | - | - |
| `source` | Source | string | - | - |
| `failed_attempts` | Failed login attempts | integer | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `hashed_user_id` | Hashed User ID | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:08:16.011Z*