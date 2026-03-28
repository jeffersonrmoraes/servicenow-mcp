# ServiceNow Table: Table (sys_db_object)

**Category:** SYSTEM
**SysID:** 0a1b2202183232108bb255f46a373aa3

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `provider_class` | Provider class | string | - | - |
| `update_access` | Can update | boolean | - | - |
| `sys_class_code` | Sys class code | sys_class_code | - | - |
| `name` | Name | string | - | ✅ |
| `read_access` | Can read | boolean | - | - |
| `configuration_access` | Allow configuration | boolean | - | - |
| `number_ref` | Auto number | reference | sys_number | - |
| `actions_access` | Allow UI actions | boolean | - | - |
| `extension_model` | Extension model | string | - | - |
| `ws_access` | Allow access to this table via web services | boolean | - | - |
| `filter_extension` | Filter extension | string | - | - |
| `user_role` | User role | reference | sys_user_role | - |
| `caller_access` | Caller Access | string | - | - |
| `create_access_controls` | Create access controls | boolean | - | - |
| `is_df_table` | DataFabric Table | boolean | - | - |
| `label` | Label | documentation_field | - | ✅ |
| `alter_access` | Allow new fields | boolean | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `is_extendable` | Extensible | boolean | - | - |
| `delete_access` | Can delete | boolean | - | - |
| `sys_class_path` | Sys class path | sys_class_path | - | - |
| `super_class` | Extends table | reference | sys_db_object | - |
| `create_access` | Can create | boolean | - | - |
| `access` | Accessible from | string | - | - |
| `live_feed_enabled` | Live feed | boolean | - | - |
| `client_scripts_access` | Allow client scripts | boolean | - | - |
| `scriptable_table` | Remote Table | boolean | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:19.524Z*