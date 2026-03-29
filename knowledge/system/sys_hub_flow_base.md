# ServiceNow Table: Flow Base (sys_hub_flow_base)

**Category:** SYSTEM
**SysID:** 6ac13e42183a32108bb255f46a373a03

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `callable_by_client_api` | Callable by Client API | boolean | - | - |
| `status` | Status | string | - | ✅ |
| `internal_name` | Internal name | string | - | - |
| `sc_callable` | Sc callable | boolean | - | - |
| `natlang` | Natural Language Title | string | - | - |
| `authored_on_release_version` | Authored on release version | integer | - | - |
| `annotation` | Annotation | translated_text | - | - |
| `flow_priority` | Flow Priority | string | - | - |
| `run_with_roles` | Run flow with roles | glide_list | sys_user_role | - |
| `run_as` | Run As | string | - | - |
| `remote_trigger_id` | Remote trigger ID | string | - | - |
| `outputs` | Outputs | glide_var | sys_hub_flow_output | - |
| `active` | Active | boolean | - | ✅ |
| `attributes` | Attributes | string | - | - |
| `access` | Accessible From | string | - | ✅ |
| `copied_from_name` | Copied from name | string | - | - |
| `copied_from` | Copied from | string | - | - |
| `category` | Category | reference | sys_hub_category | - |
| `version` | Version | string | - | - |
| `description` | Description | string | - | - |
| `acls` | ACLs | glide_list | sys_security_acl | - |
| `type` | Flow Type | string | - | ✅ |
| `sys_id` | Sys ID | GUID | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:22.022Z*