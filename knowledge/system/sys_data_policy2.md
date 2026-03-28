# ServiceNow Table: Data Policy (sys_data_policy2)

**Category:** SYSTEM
**SysID:** 0f4baa42183232108bb255f46a373add

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `model_id` | Model ID | document_id | - | - |
| `conditions` | Conditions | conditions | - | - |
| `apply_import_set` | Apply to import sets | boolean | - | - |
| `apply_soap` | Apply to SOAP | boolean | - | - |
| `enforce_ui` | Use as UI Policy on client | boolean | - | - |
| `short_description` | Short description | string | - | - |
| `description` | Description | string | - | - |
| `inherit` | Inherit | boolean | - | - |
| `reverse_if_false` | Reverse if false | boolean | - | - |
| `active` | Active | boolean | - | - |
| `sys_domain` | Domain | domain_id | - | - |
| `sys_overrides` | Overrides | reference | sys_data_policy2 | - |
| `sys_domain_path` | Domain Path | domain_path | - | - |
| `model_table` | Table | table_name | - | ✅ |
| `sys_id` | Sys ID | GUID | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:19.477Z*