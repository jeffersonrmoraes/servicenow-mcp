# ServiceNow Table: Theme (sp_theme)

**Category:** CORE
**SysID:** 8390f24a18b632108bb255f46a373a37

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `navbar_fixed` | Fixed header | boolean | - | - |
| `header` | Header | reference | sp_header_footer | - |
| `sys_id` | Sys ID | GUID | - | - |
| `name` | Name | string | - | - |
| `matching_now_experience_theme` | Matching Next Experience Theme | reference | sys_ux_theme | - |
| `turn_off_scss_compilation` | Turn off SCSS compilation | boolean | - | - |
| `footer` | Footer | reference | sp_header_footer | - |
| `footer_fixed` | Fixed footer | boolean | - | - |
| `css_variables` | CSS variables | properties | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:14.855Z*