# ServiceNow Table: Profile and Document Mapping (sys_cb_document_context_profile)

**Category:** SYSTEM
**SysID:** c3f6f68a183e32108bb255f46a373a81

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_domain` | Domain | domain_id | - | - |
| `document` | Document | document_id | - | ✅ |
| `document_table` | Document Table | table_name | - | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `sys_overrides` | Overrides | reference | sys_cb_document_context_profile | - |
| `context_profile` | Chat Experience | reference | sys_cs_context_profile | ✅ |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:50.506Z*