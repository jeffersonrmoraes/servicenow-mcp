# ServiceNow Table: UX Macroponent Rules (sys_ux_macroponent_rule)

**Category:** SYSTEM
**SysID:** 35f5be8a18fa32108bb255f46a373a41

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `target_type` | Target type | choice | - | - |
| `target_table` | Target table | table_name | - | - |
| `target_id` | Target id | document_id | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `run_once` | Run once | boolean | - | - |
| `tests` | Tests | json | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:39.948Z*