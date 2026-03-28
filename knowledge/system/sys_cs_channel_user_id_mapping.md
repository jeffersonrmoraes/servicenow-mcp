# ServiceNow Table: Channel User ID Mapping (sys_cs_channel_user_id_mapping)

**Category:** SYSTEM
**SysID:** b607be8a183e32108bb255f46a373aa0

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `channel_user_table` | Channel user table | table_name | - | - |
| `channel` | Channel | reference | sys_cs_channel | ✅ |
| `order` | Order | integer | - | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `channel_user_id_field` | Channel user ID field | field_name | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:00.730Z*