# ServiceNow Table: New Button List Exclusion (sys_aw_crud_exclusions)

**Category:** SYSTEM
**SysID:** 6a927682187a32108bb255f46a373ab5

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_domain_path` | Domain Path | domain_path | - | - |
| `sys_domain` | Domain | domain_id | - | - |
| `table` | Table | table_name | - | ✅ |
| `sys_overrides` | Overrides | reference | sys_aw_crud_exclusions | - |
| `sys_id` | Sys ID | GUID | - | - |
| `workspace_settings` | Agent Workspace | reference | sys_aw_master_config | - |
| `active` | Active | boolean | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:43.319Z*