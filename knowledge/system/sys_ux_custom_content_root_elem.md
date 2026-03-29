# ServiceNow Table: UX Custom Content Extension (sys_ux_custom_content_root_elem)

**Category:** SYSTEM
**SysID:** 0b7bee46183232108bb255f46a373a93

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `applicable_page` | Applicable Page Registry | reference | sys_ux_page_registry | - |
| `sys_domain_path` | Domain Path | domain_path | - | - |
| `sys_overrides` | Overrides | reference | sys_ux_custom_content_root_elem | - |
| `applicability` | Applicability | string | - | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `sys_domain` | Domain | domain_id | - | - |
| `placeholder` | Placeholder | reference | sys_ux_content_placeholder_elem | ✅ |
| `active` | Active | boolean | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:34.651Z*