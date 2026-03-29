# ServiceNow Table: UX Interface (sys_ux_interface)

**Category:** SYSTEM
**SysID:** 077bee46183232108bb255f46a373aed

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `label` | Label | string | - | ✅ |
| `name` | Name | string | - | ✅ |
| `schema_version` | Schema version | string | - | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `schema` | JSON Schema | json | - | - |
| `from_type` | Schema Infered from Type | reference | sys_ux_type | - |
| `description` | Description | string | - | - |
| `api_name` | API Name | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:36.849Z*