# ServiceNow Table: UX List (sys_ux_list)

**Category:** SYSTEM
**SysID:** 2c01be4218f632108bb255f46a373ae0

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `columns` | Columns | field_list | - | ✅ |
| `hide_menu_button` | Hide menu button | boolean | - | - |
| `hide_drag_and_drop` | Hide drag and drop | boolean | - | - |
| `hide_last_page` | Hide last page | boolean | - | - |
| `active` | Active | boolean | - | - |
| `hide_title` | Hide title | boolean | - | - |
| `hide_column_grouping` | Hide column grouping | boolean | - | - |
| `hide_range` | Hide range | boolean | - | - |
| `category` | Category | reference | sys_ux_list_category | ✅ |
| `highlight_content_pattern` | Highlight content pattern | string | - | - |
| `hide_quick_edit` | Hide quick edit | boolean | - | - |
| `hide_reference_links` | Hide reference links | boolean | - | - |
| `sys_overrides` | Overrides | reference | sys_ux_list | - |
| `hide_panel_footer` | Hide panel footer | boolean | - | - |
| `hide_links` | Hide links | boolean | - | - |
| `enable_infinite_scroll` | Enable Infinite Scroll | boolean | - | - |
| `sys_domain_path` | Domain Path | domain_path | - | - |
| `configuration` | Configuration | reference | sys_ux_list_menu_config | ✅ |
| `hide_panel_button` | Hide panel button | boolean | - | - |
| `hide_highlight_content` | Hide highlight content | boolean | - | - |
| `hide_personalization` | Hide column personalization | boolean | - | - |
| `groups` | Groups [DO NOT USE] | glide_list | sys_user_group | - |
| `hide_last_refreshed_text` | Hide "Last refreshed" text | boolean | - | - |
| `hide_column_sorting` | Hide column sorting | boolean | - | - |
| `hide_first_page` | Hide first page | boolean | - | - |
| `fixed_query` | Fixed query | conditions | - | - |
| `hide_list_actions` | Hide list actions | boolean | - | - |
| `hide_row_selector` | Hide row selector | boolean | - | - |
| `hide_pages` | Hide pages | boolean | - | - |
| `hide_highlighted_values` | Hide Highlighted Values | boolean | - | - |
| `hide_panel_condition_delete` | Hide panel condition delete | boolean | - | - |
| `max_characters` | Max characters | decimal | - | - |
| `view` | View | reference | sys_ui_view | - |
| `hide_panel_advanced` | Hide panel advanced | boolean | - | - |
| `word_wrap` | Word wrap | boolean | - | - |
| `title` | Title | translated_field | - | ✅ |
| `sys_domain` | Domain | domain_id | - | - |
| `hide_sharing_button` | Hide sharing button | boolean | - | - |
| `hide_inline_editing` | Hide inline editing | boolean | - | - |
| `hide_rows_per_page_selector` | Hide rows per page selector | boolean | - | - |
| `roles` | Roles [DO NOT USE] | user_roles | - | - |
| `hide_refresh_button` | Hide refresh button | boolean | - | - |
| `hide_column_filtering` | Hide column filtering | boolean | - | - |
| `hide_previous_page` | Hide previous page | boolean | - | - |
| `condition` | Conditions | conditions | - | - |
| `hide_header` | Hide header | boolean | - | - |
| `hide_checkbox_hover` | Show checkboxes on hover | boolean | - | - |
| `hide_pagination` | Hide pagination | boolean | - | - |
| `table` | Table | table_name | - | ✅ |
| `highlight_content_color` | Highlight content color | color | - | - |
| `hide_select_all` | Hide select all | boolean | - | - |
| `hide_empty_state_image` | Hide empty-state image | boolean | - | - |
| `list_attributes` | List Attributes | string | - | - |
| `hide_panel_restore` | Hide panel restore | boolean | - | - |
| `override_word_wrap_user_pref` | Override word wrap user preference | boolean | - | - |
| `live_updates` | Live Updates | choice | - | - |
| `group_by_column` | Group by column | field_name | - | - |
| `hide_option_to_save_as` | Hide option to save as | boolean | - | - |
| `hide_cell_filter` | Hide cell filter | boolean | - | - |
| `hide_next_page` | Hide next page | boolean | - | - |
| `order` | Order | decimal | - | ✅ |
| `hide_record_count_badge` | Hide record count badge | boolean | - | - |
| `hide_column_resizing` | Hide column resizing | boolean | - | - |
| `hide_row_count` | Hide row count | boolean | - | - |
| `sys_id` | Sys ID | GUID | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:28:39.193Z*