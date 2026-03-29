# ServiceNow Table: UX Diagnostic Rule Subscription (sys_ux_diagnostic_rule_m2m_document)

**Category:** SYSTEM
**SysID:** e9f5be8a18fa32108bb255f46a373a33

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_id` | Sys ID | GUID | - | - |
| `subscribed_id` | Subscribed Table ID | document_id | - | - |
| `subscribed_table` | Subscribed Table | table_name | - | - |
| `diagnostic_rule` | Diagnostic Rule | reference | sys_ux_diagnostic_rule | ✅ |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:36.110Z*