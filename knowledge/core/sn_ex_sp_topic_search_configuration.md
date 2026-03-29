# ServiceNow Table: Topic Search Configuration (sn_ex_sp_topic_search_configuration)

**Category:** CORE
**SysID:** d4c6ba86183e32108bb255f46a373a3c

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `search_filters` | Search filters | glide_list | sys_search_filter | ✅ |
| `sys_domain` | Domain | domain_id | - | - |
| `search_application` | Search application | reference | sys_search_context_config | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `active` | Active | boolean | - | - |
| `widget_instance` | Widget instance | reference | sp_instance | ✅ |
| `portal` | Portal | reference | sp_portal | ✅ |
| `order` | Order | integer | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:19.545Z*