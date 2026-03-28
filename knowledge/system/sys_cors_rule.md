# ServiceNow Table: CORS Rule (sys_cors_rule)

**Category:** SYSTEM
**SysID:** bd5f6686187632108bb255f46a373ac5

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `access_control_allow_headers` | Access-Control-Allow-Headers | string | - | - |
| `patch` | PATCH | boolean | - | - |
| `domain` | Domain | string | - | ✅ |
| `for_embeddables` | For Embeddables | boolean | - | - |
| `access_control_allow_credentials` | Access-Control-Allow-Credentials | boolean | - | - |
| `put` | PUT | boolean | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `use_resource_path` | Use Resource Path | boolean | - | - |
| `rest_api` | REST API | choice | - | ✅ |
| `active` | Active | boolean | - | - |
| `exposed_headers` | Access-Control-Expose-Headers | string | - | - |
| `post` | POST | boolean | - | - |
| `resource_path` | Web Resource Path | string | - | - |
| `get` | GET | boolean | - | - |
| `name` | Name | string | - | ✅ |
| `max_age` | Max age | integer | - | - |
| `delete` | DELETE | boolean | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:56.337Z*