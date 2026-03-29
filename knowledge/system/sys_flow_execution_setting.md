# ServiceNow Table: Setting (sys_flow_execution_setting)

**Category:** SYSTEM
**SysID:** 62c13e42183a32108bb255f46a373a7e

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_domain_path` | Domain Path | domain_path | - | - |
| `source` | Flow/SubFlow/Action | document_id | - | ✅ |
| `report_all_iterations` | Report all iterations | boolean | - | - |
| `sys_overrides` | Sys overrides | document_id | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `engine_major_version` | Engine Major Version | string | - | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `source_type` | Type | short_table_name | - | - |
| `logging` | Logging | string | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `reporting` | Reporting | string | - | - |
| `sys_domain` | Domain | domain_id | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `flow_priority` | Flow Priority | string | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:27.970Z*