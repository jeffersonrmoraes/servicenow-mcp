# ServiceNow Table: Hostname allow list (sys_cs_hostname_allow_list)

**Category:** SYSTEM
**SysID:** 3807ba8a183e32108bb255f46a373ac1

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_created_on` | Created | glide_date_time | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `active` | Active | boolean | - | - |
| `hostname` | Hostname | string | - | ✅ |
| `sys_updated_by` | Updated by | string | - | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `sys_domain` | Domain | domain_id | - | ✅ |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:10.842Z*