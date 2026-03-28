# ServiceNow Table: Catalog Item (sc_cat_item)

**Category:** CORE
**SysID:** 1c7f620a187632108bb255f46a373aa4

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sc_template` | Associated template | reference | sc_template | - |
| `meta` | Meta | string | - | - |
| `start_closed` | Start closed | boolean | - | - |
| `cost` | Cost | decimal | - | - |
| `category` | Category | reference | sc_category | - |
| `mobile_picture_type` | Classic Mobile Picture Type | string | - | - |
| `omit_price` | Omit price in cart | boolean | - | - |
| `owner` | Owner | reference | sys_user | - |
| `price` | Price | price | - | - |
| `roles` | Roles | user_roles | - | - |
| `entitlement_script` | Entitlement script | script_plain | - | - |
| `workflow` | Workflow | reference | wf_workflow | - |
| `access_type` | Access Type | string | - | - |
| `model` | Model | reference | cmdb_model | - |
| `no_search` | No search | boolean | - | - |
| `vendor` | Vendor | reference | core_company | - |
| `checked_out` | Checked out | string | - | - |
| `delivery_time` | Delivery time | glide_duration | - | - |
| `no_order` | No order | boolean | - | - |
| `ordered_item_link` | Ordered item link | reference | sc_ordered_item_link | - |
| `state` | State | string | - | - |
| `list_price` | List Price | currency | - | - |
| `description` | Description | translated_html | - | - |
| `order` | Order | integer | - | - |
| `preview` | Preview link | catalog_preview | - | - |
| `cc_render_type` | Render Type | choice | - | - |
| `image` | Image | image | - | - |
| `mobile_picture` | Classic Mobile Picture | user_image | - | - |
| `visible_guide` | Visible on Guides | boolean | - | - |
| `display_price_property` | Display price property | string | - | - |
| `active` | Active | boolean | - | - |
| `delivery_plan_script` | Delivery plan script | script_plain | - | - |
| `sc_ic_version` | Published version | integer | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `template` | Template | reference | sys_template | - |
| `use_sc_layout` | Use cart layout | boolean | - | - |
| `sc_ic_item_staging` | Created from item design | reference | sc_ic_item_staging | - |
| `name` | Name | translated_text | - | - |
| `group` | Fulfillment group | reference | sys_user_group | - |
| `no_order_now` | No order now | boolean | - | - |
| `recurring_frequency` | Recurring Price Frequency | choice | - | - |
| `published_ref` | Published item | reference | sc_cat_item | - |
| `fulfillment_automation_level` | Fulfillment automation level | string | - | - |
| `short_description` | Short description | translated_text | - | - |
| `icon` | Icon | user_image | - | - |
| `custom_cart` | Cart | reference | sys_ui_macro | - |
| `make_item_non_conversational` | Make the item non-conversational in VA | boolean | - | - |
| `billable` | Billable | boolean | - | - |
| `picture` | Picture | user_image | - | - |
| `visible_standalone` | Visible elsewhere | boolean | - | - |
| `hide_sp` | Hide on Service Portal | boolean | - | - |
| `taxonomy_topic` | Taxonomy topic | reference | topic | - |
| `flow_designer_flow` | Flow | reference | sys_hub_flow | - |
| `no_wishlist_v2` | Hide 'Add to Wish List' | boolean | - | - |
| `ignore_price` | Ignore price | boolean | - | - |
| `delivery_plan` | Execution Plan | reference | sc_cat_item_delivery_plan | - |
| `visible_bundle` | Visible on Bundles | boolean | - | - |
| `show_variable_help_on_load` | Expand help for all questions | boolean | - | - |
| `type` | Type | string | - | - |
| `no_cart` | No cart | boolean | - | - |
| `availability` | Availability | string | - | - |
| `location` | Location | reference | cmn_location | - |
| `no_proceed_checkout` | No proceed checkout | boolean | - | - |
| `recurring_price` | Recurring price | price | - | - |
| `sc_catalogs` | Catalogs | glide_list | sc_catalog | - |
| `mobile_hide_price` | Hide price (mobile listings) | boolean | - | - |
| `no_quantity` | No quantity | boolean | - | - |
| `version` | Version | integer | - | - |
| `template_manager_roles` | Template Manager roles | user_roles | - | - |
| `no_save_as_draft` | Hide 'Save as Draft' | boolean | - | - |
| `no_quantity_v2` | Hide Quantity | boolean | - | - |
| `request_method` | Request method | string | - | - |
| `no_delivery_time_v2` | Hide Delivery time | boolean | - | - |
| `mandatory_attachment` | Mandatory Attachment | boolean | - | - |
| `no_cart_v2` | Hide 'Add to Cart' | boolean | - | - |
| `no_attachment_v2` | Hide Attachment | boolean | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-28T00:14:34.613Z*