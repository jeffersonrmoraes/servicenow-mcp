# ServiceNow Table: EVAM View Config Bundle M2M (sys_ux_composite_data_m2m_predicate_bundle)

**Category:** SYSTEM
**SysID:** 656f66c6187632108bb255f46a373a9b

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `dataset` | EVAM Definition | reference | sys_ux_composite_data | - |
| `order` | Order | integer | - | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `predicate_bundle` | View Config Bundle | reference | sys_ux_composite_data_template_predicate_bundle | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:33.957Z*