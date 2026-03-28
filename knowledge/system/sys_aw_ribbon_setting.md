# ServiceNow Table: Ribbon Setting (sys_aw_ribbon_setting)

**Category:** SYSTEM
**SysID:** 54a23e82187a32108bb255f46a373a53

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `component` | Ribbon component | reference | sys_aw_ribbon_component | ✅ |
| `workspace` | Workspace | reference | sys_aw_master_config | - |
| `width` | Width | integer | - | ✅ |
| `sys_domain_path` | Domain Path | domain_path | - | - |
| `active` | Active | boolean | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `sys_overrides` | Overrides | reference | sys_aw_ribbon_setting | - |
| `name` | Name | translated_field | - | ✅ |
| `is_inheritable` | Inherit | boolean | - | - |
| `tag` | Tag | string | - | - |
| `order` | Order | integer | - | - |
| `sys_domain` | Domain | domain_id | - | - |
| `experience_restricted` | Experience restricted | boolean | - | - |
| `attrs` | Attributes | glide_var | sys_aw_ribbon_component_opt | - |
| `table` | Table | table_name | - | ✅ |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:46.193Z*