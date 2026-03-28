# ServiceNow Table: Allowed Error (sys_atf_whitelist)

**Category:** SYSTEM
**SysID:** e580bac618b632108bb255f46a373a69

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `test` | Created from test | reference | sys_atf_test | - |
| `report_level` | Report level | choice | - | - |
| `active` | Active | boolean | - | - |
| `description` | Description | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `error_location` | Error Location | choice | - | - |
| `error_message` | Error message | string | - | ✅ |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:38.935Z*