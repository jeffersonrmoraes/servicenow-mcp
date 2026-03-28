# ServiceNow Table: REST API Auth Scope (sys_api_access_scope)

**Category:** SYSTEM
**SysID:** c772bece183a32108bb255f46a373afe

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `disable_client_restriction` | Disable client restriction | boolean | - | - |
| `active` | Active | boolean | - | - |
| `api_path` | REST API PATH | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `apply_all_methods` | Apply auth scope to all http methods in this API | boolean | - | - |
| `http_method` | HTTP Method | choice | - | - |
| `api` | REST API | choice | - | ✅ |
| `auth_scope` | Auth Scope | reference | sys_auth_scope | ✅ |
| `apply_all_resources` | Apply auth scope to all resources in this API | boolean | - | - |
| `api_resource` | Resource | choice | - | - |
| `version` | REST API Version | choice | - | - |
| `name` | Name | string | - | ✅ |
| `apply_all_versions` | Apply auth scope to all versions in this API | boolean | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:23.012Z*