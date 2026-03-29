# ServiceNow Table: UX Screen (sys_ux_screen)

**Category:** SYSTEM
**SysID:** f67bae46183232108bb255f46a373a33

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `macroponent` | Page Definition | reference | sys_ux_macroponent | ✅ |
| `app_config` | App Configuration | reference | sys_ux_app_config | - |
| `rollback_screen` | Rollback screen | reference | sys_ux_screen | - |
| `order` | Order | integer | - | - |
| `screen_condition` | Screen Condition | string | - | - |
| `active` | Active | boolean | - | - |
| `description` | Description | translated_text | - | - |
| `required_translations` | Required translations | json_translations | - | - |
| `sys_domain_path` | Domain Path | domain_path | - | - |
| `sys_overrides` | Override | reference | sys_ux_screen | - |
| `event_mappings` | Event Mappings | json | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `screen_type` | Screen Collection | reference | sys_ux_screen_type | - |
| `disable_interoperable` | Restrict use across experiences | boolean | - | - |
| `disable_auto_reflow` | Disable Auto Reflow | boolean | - | - |
| `name` | Screen Name | translated_field | - | ✅ |
| `sys_domain` | Domain | domain_id | - | - |
| `macroponent_config` | Macroponent Configuration | json | - | - |
| `parent_macroponent` | Parent Macroponent | reference | sys_ux_macroponent | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:41.358Z*