# ServiceNow Table: Audit Deleted Record (sys_audit_delete)

**Category:** SYSTEM
**SysID:** 5b1ba202183232108bb255f46a373a0d

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `delete_recovery` | Delete recovery | reference | sys_delete_recovery | - |
| `tablename` | Table name | short_table_name | - | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `display_value` | Display value | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `payload` | Payload | string | - | - |
| `documentkey` | Document key | char | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `transaction` | Transaction | reference | syslog_transaction | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:40.454Z*