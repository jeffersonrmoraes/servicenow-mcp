# ServiceNow Table: Template Dependency Definition (sys_app_template_dependency_definition)

**Category:** SYSTEM
**SysID:** db0276c6183a32108bb255f46a373a20

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_id` | Sys ID | GUID | - | - |
| `input` | Input | string | - | - |
| `script` | Script | script | - | - |
| `description` | Description | string | - | - |
| `severity` | Severity | choice | - | ✅ |
| `message_template` | Message Template | translated_text | - | - |
| `name` | Name | string | - | ✅ |
| `type` | Type | string | - | ✅ |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:27.366Z*