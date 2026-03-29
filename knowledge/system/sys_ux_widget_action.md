# ServiceNow Table: UX Widget actions (sys_ux_widget_action)

**Category:** SYSTEM
**SysID:** fabb620e183232108bb255f46a373a66

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `payload_schema` | Payload schema | json | - | - |
| `name` | Name | string | - | - |
| `overrides` | Overrides | reference | sys_ux_widget_action | - |
| `widget` | Widget | reference | sys_ux_widget | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `action_handler` | Action handler | script | - | - |
| `description` | Description | translated_text | - | - |
| `type` | Action type | string | - | ✅ |
| `client_action` | Client action | boolean | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:43.570Z*