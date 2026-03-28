# ServiceNow Table: Sys Customer Trend (sys_customer_trend)

**Category:** SYSTEM
**SysID:** d82b2602183232108bb255f46a373a46

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `customer` | Customer | reference | cmdb_ci_service | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `collected` | Collected | glide_date_time | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `value` | Value | float | - | - |
| `name` | Name | string | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:18.084Z*