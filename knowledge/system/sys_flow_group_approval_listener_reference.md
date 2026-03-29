# ServiceNow Table: Group Approval Listener Reference (sys_flow_group_approval_listener_reference)

**Category:** SYSTEM
**SysID:** 37a1b602183a32108bb255f46a373ad4

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_updated_by` | Updated by | string | - | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `approval` | Approval | reference | sysapproval_group | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `listener` | Flow listener | reference | sys_flow_listener | ✅ |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:27.980Z*