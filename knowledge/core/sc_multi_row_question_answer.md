# ServiceNow Table: Multi Row Question Answer (sc_multi_row_question_answer)

**Category:** CORE
**SysID:** 8e7fa60a187632108bb255f46a373a2e

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `value` | Value | string | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `question_answer` | Question Answer | reference | question_answer | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `parent_id` | Parent ID | document_id | - | - |
| `variable_set` | Multi Row Set | reference | item_option_new_set | - |
| `sys_id` | Sys ID | GUID | - | - |
| `item_option_new` | Question | reference | item_option_new | - |
| `row_index` | Row index | long | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `sc_item_option` | SC Item Option | reference | sc_item_option | - |
| `sys_created_by` | Created by | string | - | - |
| `parent_table_name` | Parent table name | table_name | - | - |
| `sys_mod_count` | Updates | integer | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:14:38.197Z*