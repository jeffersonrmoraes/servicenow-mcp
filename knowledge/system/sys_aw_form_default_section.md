# ServiceNow Table: Default Form Section (sys_aw_form_default_section)

**Category:** SYSTEM
**SysID:** 38a2be82187a32108bb255f46a373a22

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `name` | Name | string | - | - |
| `order` | Order | integer | - | - |
| `condition` | Conditions | conditions | - | - |
| `form_section` | Form Section | reference | sys_ui_form_section | ✅ |
| `view_rule` | View rule | reference | sysrule_view_workspace | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `active` | Active | boolean | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:44.748Z*