# ServiceNow Table: Sp Approval Configuration (sp_approval_configuration)

**Category:** CORE
**SysID:** dca0b64a18b632108bb255f46a373a1d

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `order` | Order | integer | - | - |
| `name` | Name | string | - | - |
| `display_fields` | Display fields | field_list | - | ✅ |
| `active` | Active | boolean | - | - |
| `sys_domain_path` | Domain Path | domain_path | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `sys_overrides` | Overrides | reference | sp_approval_configuration | - |
| `sys_domain` | Domain | domain_id | domain | - |
| `table` | Table | table_name | - | ✅ |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:11.876Z*