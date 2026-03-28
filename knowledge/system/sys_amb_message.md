# ServiceNow Table: AMB Message (sys_amb_message)

**Category:** SYSTEM
**SysID:** f9bb6eca183232108bb255f46a373a29

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `channel` | Channel | string | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `record_created_on` | Record created on | long | - | - |
| `sys_created_by` | Created by | string | - | - |
| `number` | Number | auto_increment | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `from_user` | From user | string | - | - |
| `from_node` | From node | string | - | - |
| `to_user` | To user | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `serialized_cometd_message` | Serialized cometd message | string_full_utf8 | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `message_received_on` | Message received on | long | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:18.627Z*