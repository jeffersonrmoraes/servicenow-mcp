# ServiceNow Table: Facet (sp_search_facet)

**Category:** CORE
**SysID:** cf90f24a18b632108bb255f46a373a67

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `search_source` | Search Source | reference | sp_search_source | - |
| `table` | Table | table_name | - | - |
| `sort` | Sort | string | - | - |
| `active` | Active | boolean | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `name` | Name | translated_text | - | ✅ |
| `mapped_facet` | Use mapped facet filters | boolean | - | - |
| `order` | Order | integer | - | ✅ |
| `field` | Field | field_name | - | ✅ |
| `selection_type` | Selection type | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:14.896Z*