# ServiceNow Table: Variable Ownership (sc_item_option_mtom)

**Category:** CORE
**SysID:** 827f660a187632108bb255f46a373abb

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_id` | Sys ID | GUID | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `sc_item_option` | Dependent Item | reference | sc_item_option | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `request_item` | Parent Item | reference | sc_req_item | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `sys_updated_by` | Updated by | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:24:38.922Z*