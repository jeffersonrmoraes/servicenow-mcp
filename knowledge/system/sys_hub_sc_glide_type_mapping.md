# ServiceNow Table: Service Catalog Glide Type Mapping (sys_hub_sc_glide_type_mapping)

**Category:** SYSTEM
**SysID:** 9ac1fa42183a32108bb255f46a373ae4

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_id` | Sys ID | GUID | - | - |
| `glide_type` | Glide Type | reference | sys_glide_object | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `sc_type` | Service Catalog Type | choice | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `co_type` | Complex Object Type | reference | sys_glide_object | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `sys_updated_by` | Updated by | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:23.423Z*