# ServiceNow Table: Vendor Context Configuration (sys_cs_vendor_context_configuration)

**Category:** SYSTEM
**SysID:** a9073e8a183e32108bb255f46a373a34

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_id` | Sys ID | GUID | - | - |
| `vendor` | Vendor | reference | sys_cs_vendor | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `sys_domain` | Domain | domain_id | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `body` | Body | string | - | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `sys_updated_by` | Updated by | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:18.044Z*