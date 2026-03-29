# ServiceNow Table: Action Type Base (sys_hub_action_type_base)

**Category:** SYSTEM
**SysID:** 83c17e42183a32108bb255f46a373a15

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_domain` | Domain | domain_id | - | - |
| `type` | Type | string | - | - |
| `access` | Accessible From | string | - | ✅ |
| `natlang` | Natural Language Title | string | - | - |
| `authored_on_release_version` | Authored on release version | integer | - | - |
| `description` | Description | translated_text | - | - |
| `attributes` | Attributes | string | - | - |
| `sys_overrides` | Sys overrides | reference | sys_hub_action_type_base | - |
| `name` | Name | translated_text | - | ✅ |
| `system_level` | System level | boolean | - | - |
| `copied_from_name` | Copied from name | string | - | - |
| `sys_domain_path` | Domain Path | domain_path | - | - |
| `copied_from` | Copied from | string | - | - |
| `annotation` | Annotation | translated_text | - | - |
| `action_status` | Action Status | string | - | - |
| `acls` | ACLs | glide_list | sys_security_acl | - |
| `outputs` | Outputs | glide_var | sys_hub_action_output | - |
| `label_cache` | Label Cache | string | - | - |
| `category` | Category | reference | sys_hub_category | - |
| `flow_priority` | Flow Priority | string | - | - |
| `internal_name` | Internal name | string | - | - |
| `action_template` | Action Template | string | - | - |
| `callable_by_client_api` | Callable by Client API | boolean | - | - |
| `sys_id` | Sys ID | GUID | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:21.299Z*