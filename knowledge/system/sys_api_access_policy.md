# ServiceNow Table: API Access Policies (sys_api_access_policy)

**Category:** SYSTEM
**SysID:** 3a727ece183a32108bb255f46a373a71

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `name` | Name | string | - | ✅ |
| `apply_all_tables` | Apply to all tables | boolean | - | - |
| `apply_global` | Global | boolean | - | - |
| `api_tablename` | Tables | glide_list | - | - |
| `api_resource` | Resource | choice | - | - |
| `apply_all_resources` | Apply to all resources | boolean | - | - |
| `apply_all` | Apply policy to all methods, versions, and resources in this API | boolean | - | - |
| `active` | Active | boolean | - | - |
| `version` | Version | choice | - | - |
| `apply_all_versions` | Apply to all versions | boolean | - | - |
| `api` | REST API | choice | - | - |
| `apply_all_methods` | Apply to all methods | boolean | - | - |
| `http_method` | HTTP Method | choice | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `api_path` | REST API PATH | string | - | - |
| `all_authn_scheme_authenticate_header` | Advertise all auth schemes | boolean | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:21.548Z*