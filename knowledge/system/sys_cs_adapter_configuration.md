# ServiceNow Table: Configuration (sys_cs_adapter_configuration)

**Category:** SYSTEM
**SysID:** 9a077e8a183e32108bb255f46a373aaf

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `attribute_name` | Attribute Name | string | - | - |
| `default_attribute_value` | Default Attribute Value | string | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `message_type` | Message Type | choice | - | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `sys_domain` | Domain | domain_id | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `sys_cs_adapter_configuration_page` | Configuration Page | reference | sys_cs_adapter_configuration_page | - |
| `attribute_value` | Attribute Value | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `description` | Description | string | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:56.308Z*