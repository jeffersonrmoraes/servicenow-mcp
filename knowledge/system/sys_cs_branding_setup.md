# ServiceNow Table: Branding (sys_cs_branding_setup)

**Category:** SYSTEM
**SysID:** e72c6ac6187232108bb255f46a373a3a

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_domain_path` | Domain Path | domain_path | - | - |
| `header_label` | Chat Header | translated_field | - | ✅ |
| `va_profile` | Bot Profile | reference | live_profile | - |
| `header_font_name` | Chat Header URL Font Name | string | - | - |
| `button_primary_bg_color` | Button Primary Background | color | - | - |
| `overlay_area_color` | Overlay Area | color | - | - |
| `bot_bubble_font_color` | Bot Bubble Font | color | - | - |
| `menu_title` | Menu Title | translated_field | - | ✅ |
| `primary_button_action_text_color` | Primary Button Action Text | color | - | - |
| `highlight_color` | Highlight | color | - | - |
| `bubble_font_color` | User Bubble Font | color | - | - |
| `load_animation_color` | Loading Animation | color | - | - |
| `link_color_nonneutral_bg` | Link (Non-neutral background) | color | - | - |
| `tooltip_bg_color` | Tooltip Background | color | - | - |
| `bg_color` | Chat Background | color | - | - |
| `category_bg_color` | Category background | color | - | - |
| `input_placeholder_text_color` | Input Placeholder Text | color | - | - |
| `error_color` | Error | color | - | - |
| `citation_badge_background_hover_color` | Citation Badge Background Hover Color | color | - | - |
| `header_font_color` | Chat Header Font | color | - | - |
| `system_message_color` | System message | color | - | - |
| `chat_body_font_size` | Chat Body Font Size | float | - | - |
| `chat_icon_bg_color` | Chat Icon Background | color | - | - |
| `citation_badge_background_color` | Citation Badge Background Color | color | - | - |
| `placeholder_text` | Placeholder Text | translated_field | - | - |
| `button_bg_color` | Button Background | color | - | - |
| `body_font_src` | Chat Body Font Source | string | - | - |
| `focus_ring_color` | Focus Ring Color | color | - | - |
| `search_icon_color` | Search Icon | color | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `bot_bubble_bg_color` | Bot Bubble Background | color | - | - |
| `new_messages_notifications_enabled` | Enable showing the New Messages Below or New Messages Above notification | boolean | - | - |
| `secondary_text_color` | Secondary Text | color | - | - |
| `button_hover_bg_modal_color` | Button Hover Background (Modal) | color | - | - |
| `sys_domain` | Domain | domain_id | - | - |
| `bubble_bg_color` | User Bubble Background | color | - | - |
| `seperator_color` | Separator | color | - | - |
| `disabled_input_bg_color` | Disabled Input Background | color | - | - |
| `tooltip_text_color` | Tooltip Text | color | - | - |
| `unread_conversation_count_display_enabled` | Enable Unread Conversation Count Display | boolean | - | - |
| `menu_icon_color` | Menu Icon | color | - | - |
| `timestamp_color` | Time Stamp | color | - | - |
| `choicepicker_input_icon_color` | Choicepicker Input Search Icon | color | - | - |
| `input_field_text_color` | Input Field Text | color | - | - |
| `left_panel_header_label` | Left Panel Header Label | translated_field | - | - |
| `header_bg_color` | Chat Header Background | color | - | - |
| `notification_txt` | Notification Text | color | - | - |
| `chat_header_font_size` | Chat Header Font Size | float | - | - |
| `button_primary_bg_hover_color` | Button Primary Background Hover | color | - | - |
| `modal_body_bg_color` | Modal Body Background | color | - | - |
| `branding_key` | Branding key | string | - | - |
| `disabled_link_color` | Link disabled | color | - | - |
| `header_font_src` | Chat Header Font Source | string | - | - |
| `shadow_color` | Shadow | color | - | - |
| `close_icon_color` | Close Icon | color | - | - |
| `agent_bubble_font_color` | Agent Bubble Font | color | - | - |
| `type_presence_delay` | Minimum delay before displaying typing animation (ms) | integer | - | - |
| `button_selection_text_color` | Button Selection Text | color | - | - |
| `button_hover_bg_header_color` | Button Hover Background (Chat Header) | color | - | - |
| `agent_bubble_bg_color` | Agent Bubble Background | color | - | - |
| `msg_delay` | Minimum delay between bot messages (ms) | integer | - | - |
| `non_clickable_title_color` | Non Clickable Titles | color | - | - |
| `hover_bg_multichoice_color` | Multichoice Hover Background | color | - | - |
| `input_bg_color` | Input Background | color | - | - |
| `category_font_color` | Category font | color | - | - |
| `choicepicker_input_bg_color` | Choicepicker Input Background | color | - | - |
| `input_field_icon_color` | Input Field Icons | color | - | - |
| `search_toggle_button_label` | Search Toggle Button Label | translated_field | - | - |
| `va_logo` | Chat Header Logo | user_image | - | - |
| `notification_bg` | Notification Background | color | - | - |
| `body_font_name` | Chat Body URL Font Name | string | - | - |
| `button_primary_bg_active_color` | Button Primary Background Action | color | - | - |
| `modal_header_bg_color` | Modal Header Background | color | - | - |
| `branding_name` | Branding name | string | - | ✅ |
| `link_color` | Link | color | - | - |
| `sys_overrides` | Overrides | reference | sys_cs_branding_setup | - |
| `button_bg_action_color` | Button Background Action | color | - | - |
| `highlight_text_color` | Highlight Text | color | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:12:00.773Z*