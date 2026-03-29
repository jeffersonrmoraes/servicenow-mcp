# ServiceNow Table: Activity Configuration Detail (sn_ex_sp_activity_config_detail)

**Category:** CORE
**SysID:** 4cc67a86183e32108bb255f46a373ae2

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `list_view_mapping` | Activity card mapping | choice | - | - |
| `active` | Active | boolean | - | - |
| `action_group_record` | Action group | reference | sn_ex_sp_action_group | - |
| `card_mapping_script` | Card mapping script | script_plain | - | - |
| `title` | Title | field_name | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `image` | Image | field_name | - | - |
| `conditions` | Conditions | conditions | - | ✅ |
| `activity_configuration` | Activity Configuration | reference | sn_ex_sp_activity_configuration | ✅ |
| `external_link` | External URL | url | - | - |
| `field_2` | Field 2 | field_name | - | - |
| `field_1` | Field 1 | field_name | - | - |
| `badge_color` | Badge Color | color | - | - |
| `table` | Table | table_name | - | ✅ |
| `internal_link` | Activity detail portal page | reference | sp_page | - |
| `target_page` | Activity detail navigation | choice | - | - |
| `description` | Description | field_name | - | - |
| `badge` | Badge | field_name | - | - |
| `order` | Order | integer | - | ✅ |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:16.665Z*