# ServiceNow Table: UX App Configuration (sys_ux_app_config)

**Category:** SYSTEM
**SysID:** 9f7b2286183232108bb255f46a373a76

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `description` | Description | translated_text | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `disable_auto_reflow` | Disable Auto Reflow | boolean | - | - |
| `landing_path` | Landing Path | string | - | ✅ |
| `active` | Active | boolean | - | - |
| `prefetch_limits` | Prefetch Limits | json | - | - |
| `encode_query_string` | Encode Query String | boolean | - | - |
| `custom_icon` | Custom Icon | user_image | - | - |
| `name` | Name | translated_field | - | ✅ |
| `default_route_type` | Default Route Type | string | - | - |
| `icon` | Icon | reference | st_sys_design_system_icon | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:31.789Z*