# ServiceNow Table: Input Detail (sys_app_template_input_detail)

**Category:** SYSTEM
**SysID:** 4f0236c6183a32108bb255f46a373a99

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `template_page` | Template Page | reference | sys_app_template_page | ✅ |
| `condition` | Condition | condition_string | - | - |
| `order` | Order | integer | - | - |
| `configuration_id` | Configuration ID | document_id | - | - |
| `template_input` | Template Input | reference | sys_app_template_input_var | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `referenced_table` | Referenced Table | table_name | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:28.740Z*