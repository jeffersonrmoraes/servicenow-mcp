# ServiceNow Table: Auto-Resolution Configuration (sys_cs_auto_resolution_configuration)

**Category:** SYSTEM
**SysID:** 12873e42187e32108bb255f46a373a10

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `active` | Active | boolean | - | - |
| `notification_user` | Requester | field_name | - | ✅ |
| `training_language` | Training language | glide_list | - | ✅ |
| `portal` | Search results portal | reference | sp_portal | - |
| `catalog_submitted_email` | Catalog submitted email | reference | sysevent_email_action | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `iar_invocation` | Invocation type | choice | - | ✅ |
| `task_resolution_template` | Task resolution template | reference | sys_template | - |
| `prediction_fields` | Prediction fields | field_list | - | - |
| `pre_processing_extension` | Preprocessing extension | reference | sys_extension_instance | - |
| `condition` | Condition | conditions | - | - |
| `unresolved_task_template` | Unresolved task template | reference | sys_template | - |
| `ais_enabled` | Apply AI search | boolean | - | - |
| `prediction_table` | Prediction table | table_name | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `use_sla` | Use SLA engine | boolean | - | - |
| `retrain_scheduled_job` | Retrain scheduled job | reference | sysauto_script | - |
| `evam_definition` | EVAM definition | reference | sys_ux_composite_data | - |
| `response_channel_selection_mode` | Response channel selection mode | choice | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `task_sla` | Task SLA | glide_duration | - | - |
| `assign_to` | Assign to | reference | sys_user | ✅ |
| `search_application` | Search application | reference | sys_search_context_config | - |
| `exit_condition` | Exit condition | conditions | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `business_rule` | Business rule | reference | sys_script | - |
| `retrain_frequency` | Retrain frequency | choice | - | - |
| `ais_topic` | AI Search display topic | reference | sys_cs_topic | - |
| `initial_recommendation_email` | Initial recommendation email | reference | sysevent_email_action | - |
| `sys_created_by` | Created by | string | - | - |
| `sys_domain` | Domain | domain_id | - | ✅ |
| `task_assignment_template` | Task assignment template | reference | sys_template | - |
| `training_encoded_query` | Encoded query condition | conditions | - | - |
| `advanced` | Advanced | boolean | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `target_table_name` | Table | table_name | - | ✅ |
| `topic_completion_template` | Topic completion template | reference | sys_template | - |
| `nlu_model` | NLU model | glide_list | sys_nlu_model_status | - |
| `post_processing_extension` | Postprocessing extension | reference | sys_extension_instance | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:11:57.797Z*