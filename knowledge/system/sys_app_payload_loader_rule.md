# ServiceNow Table: Payload Loader Rule (sys_app_payload_loader_rule)

**Category:** SYSTEM
**SysID:** 7602f2c6183a32108bb255f46a373af2

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `script` | Loader script | script | - | - |
| `name` | Name | string | - | - |
| `table` | Table | table_name | - | ✅ |
| `active` | Active | boolean | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `order` | Order | integer | - | ✅ |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:25.906Z*