# ServiceNow Table: Snapshot (sys_flow_report_snapshot)

**Category:** SYSTEM
**SysID:** 77b1b242183a32108bb255f46a373a7e

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_domain_path` | Domain Path | domain_path | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `source_table_id` | Source Table | document_id | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `sys_domain` | Domain | domain_id | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `payload` | Payload | json | - | - |
| `checksum` | Checksum | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `source_table` | Source Table Id | table_name | - | - |
| `sys_created_by` | Created by | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:29.437Z*