# ServiceNow Table: Group approval (sysapproval_group)

**Category:** CORE
**SysID:** 14feee4e183632108bb255f46a373ab1

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `admin_override` | Admin override | boolean | - | - |
| `wait_for` | Wait for | string | - | - |
| `approval_user` | Approval user | reference | sys_user | - |
| `reject_handling` | Handle a rejection by | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:25:07.019Z*