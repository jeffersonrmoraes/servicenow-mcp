# ServiceNow Table: Advanced Portal Navigation (sn_ex_sp_portal_extensible_navigation)

**Category:** CORE
**SysID:** 6cc6ba86183e32108bb255f46a373aa5

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `active` | Active | boolean | - | - |
| `portal` | Portal | reference | sp_portal | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `last_synced` | Last synced | glide_date_time | - | - |
| `sync_status` | Sync status | choice | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:18.099Z*