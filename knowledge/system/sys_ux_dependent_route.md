# ServiceNow Table: UX App linked routes (sys_ux_dependent_route)

**Category:** SYSTEM
**SysID:** bb7ba286183232108bb255f46a373a94

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `dependent_route_table` | Linked route table | table_list | - | - |
| `route` | Route | reference | sys_ux_app_route | ✅ |
| `dependent_route` | Linked route | document_id | - | ✅ |
| `sys_id` | Sys ID | GUID | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:35.374Z*