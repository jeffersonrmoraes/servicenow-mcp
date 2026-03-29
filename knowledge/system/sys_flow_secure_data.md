# ServiceNow Table: Process Flow Secure Data (sys_flow_secure_data)

**Category:** SYSTEM
**SysID:** ffa1b602183a32108bb255f46a373ab7

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `context_table` | Context Table | table_name | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `sys_domain` | Domain | domain_id | - | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `secure_data` | Secure Data | password2 | - | ✅ |
| `sys_domain_path` | Domain Path | domain_path | - | - |
| `context_id` | Context Id | document_id | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `source_table` | Source table | table_name | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `delete_policy` | Delete policy | choice | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:29.431Z*