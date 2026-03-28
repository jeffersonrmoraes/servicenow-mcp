# ServiceNow Table: Collaboration Chat Provider (sys_cs_collab_provider_application)

**Category:** SYSTEM
**SysID:** a21736ca183e32108bb255f46a373a9b

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `name` | Name | string | - | ✅ |
| `oauth_scopes` | OAuth Entity Scopes | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `admin_connection` | Admin Connection | reference | http_connection | ✅ |
| `sys_domain` | Domain | domain_id | - | - |
| `app_id` | App ID | string | - | - |
| `setup_status` | Setup Status | choice | - | - |
| `directory_id` | Directory (tenant) ID | string | - | - |
| `application_id` | Application (client) ID | string | - | - |
| `redirect_url` | Redirect URL | url | - | - |
| `provider` | Provider | reference | sys_cs_collab_provider | ✅ |
| `signing_secret` | Signing Secret | password2 | - | - |
| `active` | Active | boolean | - | - |
| `sys_overrides` | Overrides | reference | sys_cs_collab_settings | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:03.642Z*