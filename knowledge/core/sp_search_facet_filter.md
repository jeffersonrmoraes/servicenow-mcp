# ServiceNow Table: Mapped Facet Filter (sp_search_facet_filter)

**Category:** CORE
**SysID:** c5a0f64a18b632108bb255f46a373aad

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `table` | Table | table_name | - | - |
| `mapped_query` | Mapped query | conditions | - | ✅ |
| `sys_id` | Sys ID | GUID | - | - |
| `facet` | Facet | reference | sp_search_facet | - |
| `name` | Name | translated_text | - | ✅ |
| `order` | Order | integer | - | ✅ |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:14.860Z*