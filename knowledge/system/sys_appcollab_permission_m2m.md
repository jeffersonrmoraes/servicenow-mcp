# ServiceNow Table: App Collaboration Descriptor Permission (sys_appcollab_permission_m2m)

**Category:** SYSTEM
**SysID:** a68a0e79c37332101b4cd0dc050131be

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `descriptor` | Collaboration Descriptor | reference | sys_appcollab_descriptor | ✅ |
| `permission` | Collaboration Permission | reference | sys_development_permission_set | ✅ |
| `sys_id` | Sys ID | GUID | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:24.411Z*