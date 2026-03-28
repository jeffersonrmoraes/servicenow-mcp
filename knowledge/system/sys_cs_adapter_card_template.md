# ServiceNow Table: Adapter Card Template (sys_cs_adapter_card_template)

**Category:** SYSTEM
**SysID:** 6df6368a183e32108bb255f46a373a98

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `template_name` | Template Name | string | - | - |
| `adapter_card` | Adapter Card | reference | sys_cs_adapter_card | - |
| `channel` | Channel | string | - | - |
| `content_type` | Content Type | choice | - | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `active` | Active | boolean | - | - |
| `sys_domain` | Domain | domain_id | - | - |
| `template_definition` | Template Definition | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:56.305Z*