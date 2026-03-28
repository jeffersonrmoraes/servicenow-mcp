# ServiceNow Table: Form Header (sys_aw_form_header)

**Category:** SYSTEM
**SysID:** 68a27e82187a32108bb255f46a373acb

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `specificity` | Specificity | integer | - | - |
| `workspace` | Workspace | reference | sys_aw_master_config | - |
| `order` | Order | integer | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `table` | Table | table_name | - | ✅ |
| `active` | Active | boolean | - | - |
| `hide_tags` | Hide Tags | boolean | - | - |
| `ignore_highlight` | Ignore Highlight | boolean | - | - |
| `sys_overrides` | Overrides | reference | sys_script_client | - |
| `header_image` | Header Image | field_name | - | - |
| `subheading` | Subheading | field_name | - | - |
| `sys_domain` | Domain | domain_id | - | - |
| `primary_field` | Primary field | field_name | - | - |
| `sys_domain_path` | Domain Path | domain_path | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:44.709Z*