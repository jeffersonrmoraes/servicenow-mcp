# ServiceNow Table: Data Egress Source (sys_data_egress_source)

**Category:** SYSTEM
**SysID:** 3e69f68e18be32108bb255f46a373a23

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `sys_created_by` | Created by | string | - | - |
| `source` | Source | string | - | ✅ |
| `active` | Active | boolean | - | - |
| `type` | Type | choice | - | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `dashboard_url` | Dashboard URL | string | - | ✅ |
| `sys_updated_by` | Updated by | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:19.474Z*