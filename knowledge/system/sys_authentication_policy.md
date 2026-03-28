# ServiceNow Table: Policy (sys_authentication_policy)

**Category:** SYSTEM
**SysID:** 11723ace183a32108bb255f46a373a0b

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `name` | Name | string | - | ✅ |
| `internal_name` | Internal name | string | - | - |
| `type` | Type | choice | - | - |
| `decision_table` | Decision Table | reference | sys_decision | ✅ |
| `active` | Active | boolean | - | - |
| `description` | Description | translated_text | - | - |
| `sys_id` | Sys ID | GUID | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:40.416Z*