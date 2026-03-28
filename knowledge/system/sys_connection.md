# ServiceNow Table: Connection (sys_connection)

**Category:** SYSTEM
**SysID:** a6ffeace187632108bb255f46a373a5d

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `active` | Active | boolean | - | - |
| `order` | Order | integer | - | - |
| `name` | Name | string | - | ✅ |
| `mid_selection` | MID Selection | string | - | - |
| `application` | MID Application | reference | ecc_agent_application | - |
| `sys_id` | Sys ID | GUID | - | - |
| `host` | Host | string | - | - |
| `credential` | Credential | reference | discovery_credentials | - |
| `mid_cluster` | MID Cluster | reference | ecc_agent_cluster | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `connection_timeout` | Connection timeout | integer | - | - |
| `sys_class_name` | Connection type | sys_class_name | - | - |
| `is_internal` | Is internal | boolean | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `sys_domain_path` | Domain Path | domain_path | - | - |
| `port` | Override default port | string | - | - |
| `sys_domain` | Domain | domain_id | domain | - |
| `app_scope` | Application | reference | sys_scope | ✅ |
| `sys_created_by` | Created by | string | - | - |
| `connection_retries` | Connection retries | integer | - | - |
| `extended_attributes` | Extended Attributes | glide_var | connection_attributes | - |
| `sys_mod_count` | Updates | integer | - | - |
| `use_mid` | Use MID server | boolean | - | - |
| `capabilities` | Capabilities | glide_list | ecc_agent_capability | - |
| `protocol` | Protocol | string | - | - |
| `connection_alias` | Connection alias | reference | sys_alias | ✅ |
| `mid_server` | MID Server | reference | ecc_agent | - |
| `sys_updated_by` | Updated by | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:54.896Z*