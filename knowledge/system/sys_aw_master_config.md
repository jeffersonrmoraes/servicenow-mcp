# ServiceNow Table: Workspace (sys_aw_master_config)

**Category:** SYSTEM
**SysID:** 6de0b2ce18b632108bb255f46a373a83

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `compiled_page` | UX page | reference | sys_ux_page | - |
| `name` | Name | string | - | ✅ |
| `description` | Description | string | - | - |
| `navigation_type` | Navigation | string | - | ✅ |
| `hide_search_results_count` | Hide Search Results Count | boolean | - | - |
| `global_search_data` | Global Search Data Config | reference | sys_search_context_config | ✅ |
| `primary_color` | Brand color 2 | color | - | - |
| `search_enabled` | Search enabled | boolean | - | - |
| `workspace_url` | Workspace URL | string | - | ✅ |
| `active` | Active | boolean | - | - |
| `global_search` | Global Search View Config | reference | sys_aw_global_search_config | ✅ |
| `brand_color` | Brand color 1 | color | - | - |
| `notifications_enabled` | Notifications enabled | boolean | - | - |
| `user_preference_controls_enabled` | User Preference Controls enabled | boolean | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `show_search_result_redaction_warning` | Show Search Result Redaction Warning | boolean | - | - |
| `compiled_page_registry` | UX page registry | reference | sys_ux_page_registry | - |
| `workspace_logo` | Custom Logo | user_image | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:44.746Z*