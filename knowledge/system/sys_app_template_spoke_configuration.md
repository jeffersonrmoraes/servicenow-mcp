# ServiceNow Table: Spoke Configuration (sys_app_template_spoke_configuration)

**Category:** SYSTEM
**SysID:** 2b0276c6183a32108bb255f46a373a41

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `spoke_name` | Spoke Name | string | - | ✅ |
| `action_name` | Action Name | translated_text | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `spoke` | Spoke | reference | sys_store_app | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:30.171Z*