# ServiceNow Table: Widget (sp_widget)

**Category:** CORE
**SysID:** 7b90364a18b632108bb255f46a373adb

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `name` | Name | translated_field | - | ✅ |
| `controller_as` | controllerAs | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `servicenow` | Servicenow | boolean | - | - |
| `docs` | Docs | reference | sp_documentation | - |
| `category` | Category | string | - | - |
| `data_table` | Data table | table_name | - | ✅ |
| `option_schema` | Option schema | json | - | - |
| `script` | Server script | script | - | - |
| `internal` | Internal | boolean | - | - |
| `description` | Description | string | - | - |
| `has_preview` | Has preview | boolean | - | - |
| `id` | ID | string | - | - |
| `demo_data` | Demo data | json | - | - |
| `link` | Link | script | - | - |
| `template` | Body HTML template | html_template | - | - |
| `public` | Public | boolean | - | - |
| `roles` | Roles | user_roles | - | - |
| `field_list` | Fields | field_list | - | - |
| `client_script` | Client controller | script | - | - |
| `css` | CSS | css | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:15.749Z*