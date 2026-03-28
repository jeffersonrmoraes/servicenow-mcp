# ServiceNow Table: Template Dependency (sys_app_template_dependency)

**Category:** SYSTEM
**SysID:** 5b0236c6183a32108bb255f46a373abd

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `template` | Template | reference | sys_app_template | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `input` | Input | simple_name_values | - | - |
| `dependency_definition` | Dependency definition | reference | sys_app_template_dependency_definition | ✅ |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:27.331Z*