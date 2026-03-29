# ServiceNow Table: Activity Configuration (sn_ex_sp_activity_configuration)

**Category:** CORE
**SysID:** 13b63a86183e32108bb255f46a373a7f

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `target_page` | Activity navigation | choice | - | - |
| `active` | Active | boolean | - | - |
| `sort_order` | Sort Order | choice | - | - |
| `advanced` | Advanced | boolean | - | - |
| `external_link` | External URL | url | - | - |
| `order` | Order | integer | - | ✅ |
| `sys_domain` | Domain | domain_id | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `items_count_script` | Summary view script | script_plain | - | - |
| `icon` | Icon | glyphicon | - | - |
| `list_view_script` | List view script | script_plain | - | - |
| `sys_overrides` | Overrides | reference | sn_ex_sp_activity_configuration | - |
| `activity_name` | Activity Name | translated_text | - | ✅ |
| `sort_by` | Sort By | string | - | - |
| `primary` | Primary | boolean | - | - |
| `internal_link` | Activity portal page | reference | sp_page | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:16.632Z*