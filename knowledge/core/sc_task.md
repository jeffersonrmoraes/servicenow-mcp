# ServiceNow Table: Catalog Task (sc_task)

**Category:** CORE
**SysID:** 397f660a187632108bb255f46a373a2d

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sc_catalog` | Catalog | reference | sc_catalog | - |
| `request` | Request | reference | sc_request | - |
| `calendar_stc` | Resolve Time | integer | - | - |
| `cat_item` | Item | reference | sc_cat_item | - |
| `sys_id` | Sys ID | GUID | - | - |
| `request_item` | Request item | reference | sc_req_item | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:14:36.040Z*