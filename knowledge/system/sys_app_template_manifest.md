# ServiceNow Table: Template Manifest (sys_app_template_manifest)

**Category:** SYSTEM
**SysID:** d70236c6183a32108bb255f46a373afc

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `table_name` | Table name | reference | sys_db_object | - |
| `order` | Order | integer | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `description` | Description | translated_text | - | - |
| `template` | Template | reference | sys_app_template | - |
| `table` | Table name | table_name | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:28.776Z*