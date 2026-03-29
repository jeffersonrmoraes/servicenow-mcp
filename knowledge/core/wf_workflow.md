# ServiceNow Table: Workflow (wf_workflow)

**Category:** CORE
**SysID:** d0feee4e183632108bb255f46a373a72

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `template` | Template | boolean | - | - |
| `sys_overrides` | Sys overrides | reference | wf_workflow | - |
| `sys_domain_path` | Domain Path | domain_path | - | - |
| `description` | Description | string | - | - |
| `access` | Accessible from | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `name` | Name | string | - | - |
| `table` | Table | table_name | - | - |
| `preview` | Preview | user_image | - | - |
| `sys_domain` | Domain | domain_id | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:25:09.418Z*