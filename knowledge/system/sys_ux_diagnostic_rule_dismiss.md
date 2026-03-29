# ServiceNow Table: UX Diagnostic Rule Dismiss (sys_ux_diagnostic_rule_dismiss)

**Category:** SYSTEM
**SysID:** a9f5be8a18fa32108bb255f46a373a26

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `target_id` | Record | document_id | - | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `dismiss_targets` | Dismiss targets | json | - | - |
| `table_name` | Table | table_name | - | ✅ |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:36.101Z*