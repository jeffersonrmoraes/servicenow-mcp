# ServiceNow Table: Trigger Flow Definition (sys_hub_trigger_definition)

**Category:** SYSTEM
**SysID:** 96b17e02183a32108bb255f46a373a7f

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_domain_path` | Domain Path | domain_path | - | - |
| `description` | Description | translated_text | - | - |
| `sys_domain` | Domain | domain_id | - | - |
| `state` | Status | choice | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `attributes` | Attributes | string | - | - |
| `order` | Order | integer | - | - |
| `sys_overrides` | Sys overrides | reference | sys_hub_trigger_definition | - |
| `source_trigger` | Source Trigger | reference | sys_hub_trigger_definition | - |
| `name` | Name | translated_text | - | - |
| `active` | Active | boolean | - | - |
| `type` | Type | string | - | - |
| `accessible_from` | Accessible From | choice | - | ✅ |
| `published_trigger_id` | Published Trigger ID | string | - | - |
| `trigger_category` | Trigger Category | reference | sys_hub_category | - |
| `comment` | Comment | string | - | - |
| `category` | Category | reference | sys_hub_trigger_category | - |
| `annotation` | Annotation | translated_text | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:24.915Z*