# ServiceNow Table: List Applicability (sys_ux_applicability_m2m_list)

**Category:** SYSTEM
**SysID:** 8a7b6a46183232108bb255f46a373a2e

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `active` | Active | boolean | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `order` | Order [DO NOT USE] | integer | - | - |
| `list` | List | reference | sys_ux_list | - |
| `applicability` | Applicability | reference | sys_ux_applicability | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:31.784Z*