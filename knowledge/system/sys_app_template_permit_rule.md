# ServiceNow Table: Template Permit Rule (sys_app_template_permit_rule)

**Category:** SYSTEM
**SysID:** d70236c6183a32108bb255f46a373aca

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `description` | Description | string | - | - |
| `script` | Script | script | - | - |
| `group_name` | Group Name | translated_text | - | - |
| `message` | Message | translated_text | - | - |
| `silent` | Silent | boolean | - | - |
| `advanced` | Advanced | boolean | - | - |
| `table` | Table Name | table_name | - | - |
| `name` | Name | string | - | - |
| `run_per_record` | Run Per Record | boolean | - | - |
| `order` | Order | integer | - | - |
| `permission_type` | Permission type | string | - | ✅ |
| `sys_id` | Sys ID | GUID | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:30.176Z*