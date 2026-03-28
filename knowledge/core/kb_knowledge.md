# ServiceNow Table: Knowledge (kb_knowledge)

**Category:** CORE
**SysID:** 1e4fe246187632108bb255f46a373a82

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `cmdb_ci` | Configuration item | reference | cmdb_ci | - |
| `meta` | Meta | string | - | - |
| `rating` | Rating | decimal | - | - |
| `can_read_user_criteria` | Can Read | glide_list | user_criteria | - |
| `sys_mod_count` | Updates | integer | - | - |
| `published` | Published | glide_date | - | - |
| `category` | Category | string | - | - |
| `source` | Source task | reference | task | - |
| `kb_knowledge_base` | Knowledge base | reference | kb_knowledge_base | ✅ |
| `meta_description` | Meta Description | string | - | - |
| `active` | Active | boolean | - | - |
| `article_type` | Article type | string | - | - |
| `sys_domain` | Domain | domain_id | - | - |
| `retired` | Retired | glide_date | - | - |
| `replacement_article` | Replacement Article | reference | kb_knowledge | - |
| `sys_updated_by` | Updated by | string | - | - |
| `display_attachments` | Display attachments | boolean | - | - |
| `short_description` | Short description | string | - | ✅ |
| `author` | Author | reference | sys_user | - |
| `disable_suggesting` | Disable suggesting | boolean | - | - |
| `generated_with_now_assist` | Generated With Now Assist | boolean | - | - |
| `sys_created_by` | Created by | string | - | - |
| `scheduled_publish_date` | Scheduled publish date | glide_date_time | - | - |
| `version` | Version | reference | kb_version | - |
| `article_id` | Article ID | string | - | - |
| `revised_by` | Revised By | reference | sys_user | - |
| `display_number` | Display number | string | - | - |
| `latest` | Latest | boolean | - | - |
| `base_version` | Base Version | reference | kb_knowledge | - |
| `summary` | Summary | reference | kb_knowledge_summary | - |
| `latest_aqi` | Latest AQI | reference | kb_article_checklist_summary | - |
| `ownership_group` | Ownership Group | reference | sys_user_group | - |
| `direct` | Attachment link | boolean | - | - |
| `roles` | Roles | user_roles | - | - |
| `flagged` | Flagged | boolean | - | - |
| `disable_commenting` | Disable commenting | boolean | - | - |
| `instrumentation_metadata` | Instrumentation metadata | json | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `image` | Image | image | - | - |
| `text` | Article body | translated_html | - | - |
| `use_count` | Use count | integer | - | - |
| `view_as_allowed` | View as allowed | boolean | - | - |
| `editor_type` | Editor Type | choice | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `number` | Number | string | - | - |
| `topic` | Topic | string | - | - |
| `sys_view_count` | View count | integer | - | - |
| `description` | Description | string | - | - |
| `cannot_read_user_criteria` | Cannot Read | glide_list | user_criteria | - |
| `valid_to` | Valid to | glide_date | - | - |
| `workflow_state` | Workflow | workflow | - | - |
| `sys_class_name` | Class | sys_class_name | - | - |
| `kb_category` | Category | reference | kb_category | - |
| `helpful_count` | Helpful count | integer | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `taxonomy_topic` | Taxonomy topic | reference | topic | - |
| `sys_domain_path` | Domain Path | domain_path | - | - |
| `wiki` | Wiki | wiki_text | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:14:32.035Z*