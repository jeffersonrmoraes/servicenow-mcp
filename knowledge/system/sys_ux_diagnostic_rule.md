# ServiceNow Table: UX Diagnostic Rules (sys_ux_diagnostic_rule)

**Category:** SYSTEM
**SysID:** e1f57e8a18fa32108bb255f46a373aef

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `notification_text` | Notification Text | translated_text | - | - |
| `severity` | Severity | choice | - | ✅ |
| `name` | Name | string | - | ✅ |
| `builder_context` | Builder Context | glide_list | - | ✅ |
| `test_script` | Test script | script | - | - |
| `category` | Category | choice | - | ✅ |
| `order` | Order | integer | - | ✅ |
| `description` | Description | translated_text | - | - |
| `active` | Active | boolean | - | - |
| `sys_id` | Sys ID | GUID | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:36.118Z*