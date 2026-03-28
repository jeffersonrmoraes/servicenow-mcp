# ServiceNow Table: Search Profile (sys_cs_context_profile_search)

**Category:** SYSTEM
**SysID:** c0073a8a183e32108bb255f46a373afc

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `search_context_config` | Search Application Configuration | reference | sys_search_context_config | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `sys_overrides` | Overrides | reference | sys_cs_context_profile_search | - |
| `context_profile` | Chat Experience | reference | sys_cs_context_profile | ✅ |
| `active` | Active | boolean | - | - |
| `sys_domain` | Domain | domain_id | - | - |
| `search_result_config` | Search UI (EVAM) Configuration | reference | sys_ux_composite_data | ✅ |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:06.581Z*