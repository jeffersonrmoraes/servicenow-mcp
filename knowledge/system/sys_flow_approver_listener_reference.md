# ServiceNow Table: Approver Listener Reference (sys_flow_approver_listener_reference)

**Category:** SYSTEM
**SysID:** e8b1f602183a32108bb255f46a373aea

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `listener` | Flow listener | reference | sys_flow_listener | ✅ |
| `sys_created_on` | Created | glide_date_time | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `approval` | Approval | reference | sysapproval_approver | ✅ |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:26.489Z*