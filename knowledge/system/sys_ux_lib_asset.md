# ServiceNow Table: UX Asset (sys_ux_lib_asset)

**Category:** SYSTEM
**SysID:** 7a7bae46183232108bb255f46a373a6d

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `es_module` | ES Module | boolean | - | - |
| `checksum` | Checksum | string | - | - |
| `config_option` | Config Option | string | - | - |
| `name` | Name | string | - | ✅ |
| `is_attachment` | Is Attachment | boolean | - | - |
| `content_meta` | Content metadata | string | - | - |
| `category` | Category | string | - | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `bundled_asset` | Is Bundled Asset | boolean | - | - |
| `dependencies` | Dependencies | glide_list | sys_ux_lib_asset | - |
| `content` | Content | string | - | - |
| `mime_type` | MIME type | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:37.760Z*