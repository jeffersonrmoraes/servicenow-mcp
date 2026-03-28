# ServiceNow Table: Module (sys_app_module)

**Category:** SYSTEM
**SysID:** 383b2e02183232108bb255f46a373aa5

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `timeline_page` | Timeline page | reference | cmn_timeline_page | - |
| `hint` | Hint | translated_field | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `name` | Table | table_name | - | - |
| `view_name` | View name | string | - | - |
| `override_menu_roles` | Override application menu roles | boolean | - | - |
| `active` | Active | boolean | - | - |
| `sys_overrides` | Overrides | reference | sys_app_module | - |
| `map_page` | Map page | reference | cmn_map_page | - |
| `sys_domain_path` | Domain Path | domain_path | - | - |
| `image` | Image (UI11) | image | - | - |
| `roles` | Roles | user_roles | - | - |
| `mobile_view_name` | Mobile view name | string | - | - |
| `application` | Application menu | reference | sys_app_application | - |
| `sys_domain` | Domain | domain_id | - | - |
| `report` | Report | reference | sys_report | - |
| `order` | Order | decimal | - | - |
| `filter` | Filter | conditions | - | - |
| `mobile_title` | Mobile title | translated_field | - | - |
| `title` | Title | translated_field | - | - |
| `link_type` | Link type | string | - | - |
| `require_confirmation` | Require confirmation | boolean | - | - |
| `assessment` | Assessment | reference | asmt_metric_type | - |
| `window_name` | Window name | string | - | - |
| `query` | Arguments | string | - | - |
| `device_type` | Device type | string | - | - |
| `homepage` | Homepage | reference | sys_portal_page | - |
| `uncancelable` | Uncancelable by Other Modules | boolean | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:25.912Z*