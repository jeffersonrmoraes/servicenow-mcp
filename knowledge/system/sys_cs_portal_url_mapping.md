# ServiceNow Table: URL Navigation (sys_cs_portal_url_mapping)

**Category:** SYSTEM
**SysID:** 9bf6f68a183e32108bb255f46a373ad8

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_domain` | Domain | domain_id | - | - |
| `portal` | Portal | reference | sp_portal | - |
| `type` | Type | choice | - | ✅ |
| `description` | Description | string | - | - |
| `url_template` | Value | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `device_type` | Device Type | string | - | - |
| `table_name` | Table | table_name | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:15.212Z*