# ServiceNow Table: UX Component Prefetched Resource (sys_ux_lib_presource)

**Category:** SYSTEM
**SysID:** 877bee46183232108bb255f46a373a0a

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `component` | Component | reference | sys_ux_lib_component | ✅ |
| `key` | Resource key | string | - | ✅ |
| `graphql_query` | GraphQL query | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:38.457Z*