# ServiceNow Table: Workspace Module (sys_aw_module)

**Category:** SYSTEM
**SysID:** ede0b2ce18b632108bb255f46a373a42

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `content_attrs` | Content attributes | glide_var | sys_ux_lib_component_attr | - |
| `order` | Order | integer | - | - |
| `icon` | Icon | string | - | ✅ |
| `detail_tag` | Detail Tag | string | - | ✅ |
| `sys_domain_path` | Domain Path | domain_path | - | - |
| `workspace_config` | Workspace | reference | sys_aw_master_config | ✅ |
| `detail_attrs` | Detail attributes | glide_var | sys_ux_lib_component_attr | - |
| `sys_id` | Sys ID | GUID | - | - |
| `content` | Compiled content | reference | sys_ux_custom_content_root_elem | - |
| `active` | Active | boolean | - | - |
| `sys_overrides` | Overrides | reference | sys_aw_module | - |
| `content_tag` | Content Tag | string | - | ✅ |
| `sys_props` | Required system properties | string | - | - |
| `id` | ID | string | - | ✅ |
| `detail` | Compiled detail | reference | sys_ux_custom_content_root_elem | - |
| `content_component` | Content component | reference | sys_ux_lib_component | - |
| `toolbar_button` | Compiled toolbar button | reference | sys_ux_custom_content_root_elem | - |
| `sys_domain` | Domain | domain_id | - | - |
| `label` | Label | translated_field | - | - |
| `hide_until_ready` | Hide Until Ready | boolean | - | - |
| `roles` | Roles | glide_list | sys_user_role | - |
| `detail_component` | Detail component | reference | sys_ux_lib_component | - |
| `type` | Type | string | - | ✅ |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:46.159Z*