# ServiceNow Table: Archive Related Records (sys_archive_related)

**Category:** SYSTEM
**SysID:** c26b6ec2183232108bb255f46a373aba

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `table` | Reference table | table_name | - | - |
| `table_archive_rule` | Reference table rule | reference | sys_archive | - |
| `reference` | Reference | reference_name | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `action` | Action | string | - | - |
| `archive_map` | Archive map | reference | sys_archive | - |
| `element` | Reference element | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:31.681Z*