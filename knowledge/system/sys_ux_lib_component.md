# ServiceNow Table: UX Component Definition (sys_ux_lib_component)

**Category:** SYSTEM
**SysID:** 3b7ba286183232108bb255f46a373aa1

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `overrides` | Allow Overrides | choice | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `tag` | Tag | string | - | ✅ |
| `suspend_on_view_change` | Suspend on view change | boolean | - | - |
| `required_user_prefs` | Required user preferences | string | - | - |
| `required_sys_props` | Required system properties | string | - | - |
| `default_layout` | Default Layout | reference | sys_ux_children_layout | - |
| `inner_components` | Inner Components | glide_list | sys_ux_lib_component | - |
| `deprecated` | Deprecated | boolean | - | - |
| `source_script_name` | Source script name | string | - | - |
| `default_children` | Default Available Child Slots | reference | sys_ux_children | - |
| `required_translation_keys` | Required translated message keys | string | - | - |
| `source_script` | Source script | reference | sys_ux_lib_source_script | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:37.743Z*