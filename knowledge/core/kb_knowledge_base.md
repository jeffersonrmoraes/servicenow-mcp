# ServiceNow Table: Knowledge Base (kb_knowledge_base)

**Category:** CORE
**SysID:** 264f2646187632108bb255f46a373a3d

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `kb_publish_flow` | Publish flow | reference | sys_hub_flow | - |
| `mandatory_fields` | Mandatory fields | slushbucket | - | - |
| `disable_suggesting` | Disable suggesting | boolean | - | - |
| `approval_description` | Approval description | translated_text | - | - |
| `kb_version` | Release version | choice | - | - |
| `disable_mark_as_helpful` | Disable mark as helpful | boolean | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `template` | Set default knowledge field values | template_value | - | - |
| `card_color` | Card color | color | - | - |
| `question_annotation` | Question annotation | translated_html | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `kb_retire_flow` | Retire flow | reference | sys_hub_flow | - |
| `description` | Description | translated_text | - | - |
| `owner` | Owner | reference | sys_user | ✅ |
| `sys_domain` | Domain | domain_id | - | - |
| `application` | Application | reference | sys_scope | ✅ |
| `sys_created_on` | Created | glide_date_time | - | - |
| `checklist` | Checklist | reference | kb_quality_checklist | - |
| `sys_domain_path` | Domain Path | domain_path | - | - |
| `title` | Title | translated_text | - | ✅ |
| `disable_category_editing` | Disable category editing | boolean | - | - |
| `order` | Order | integer | - | - |
| `article_validity` | Article Validity | integer | - | - |
| `sys_created_by` | Created by | string | - | - |
| `active` | Active | boolean | - | - |
| `kb_managers` | Managers | glide_list | sys_user | - |
| `disable_commenting` | Disable commenting | boolean | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `data_policy` | Data policy | reference | sys_data_policy2 | - |
| `disable_rating` | Disable rating | boolean | - | - |
| `table` | Table | table_name | - | - |
| `icon` | Icon | user_image | - | - |
| `enable_socialqa` | Enable social questions and answers | boolean | - | - |
| `sys_updated_by` | Updated by | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:24:33.404Z*