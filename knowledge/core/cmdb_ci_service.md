# ServiceNow Table: Service (cmdb_ci_service)

**Category:** CORE
**SysID:** 80ec2e4618b232108bb255f46a373ac0

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `parent` | Parent | reference | cmdb_ci_service | - |
| `sys_id` | Sys ID | GUID | - | - |
| `user_group` | Users supported | reference | sys_user_group | - |
| `service_status` | Status | string | - | - |
| `spm_service_portfolio` | Service portfolio | reference | spm_service_portfolio | - |
| `stakeholders` | Stakeholders | glide_list | sys_user | - |
| `checkout` | Checkout | string | - | - |
| `attested_date` | Attested Date | glide_date_time | - | - |
| `used_for` | Used for | string | - | - |
| `number` | Number | string | - | - |
| `spm_taxonomy_node` | Taxonomy node | reference | spm_taxonomy_node | - |
| `schedule` | Schedule | reference | cmn_schedule | - |
| `skip_sync` | Skip sync | boolean | - | - |
| `attestation_score` | Attestation Score | integer | - | - |
| `due_in` | Due in | string | - | - |
| `invoice_number` | Invoice number | string | - | - |
| `asset_tag` | Asset tag | string | - | - |
| `checked_out` | Checked out | glide_date_time | - | - |
| `install_status` | Install Status | integer | - | - |
| `dns_domain` | DNS Domain | string | - | - |
| `life_cycle_stage` | Life Cycle Stage | reference | life_cycle_stage | - |
| `managed_by` | Managed by | reference | sys_user | - |
| `sys_class_name` | Class | sys_class_name | - | - |
| `sys_class_path` | Sys class path | sys_class_path | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `install_date` | Installed | glide_date_time | - | - |
| `warranty_expiration` | Warranty expiration | glide_date | - | - |
| `owned_by` | Owned by | reference | sys_user | - |
| `delivery_date` | Order received | glide_date_time | - | - |
| `supported_by` | Supported by | reference | sys_user | - |
| `purchase_date` | Purchased | glide_date | - | - |
| `assignment_group` | Change Group | reference | sys_user_group | - |
| `can_print` | Can Print | boolean | - | - |
| `checked_in` | Checked in | glide_date_time | - | - |
| `product_instance_id` | Product instance identifier | string | - | - |
| `first_discovered` | First discovered | glide_date_time | - | - |
| `sys_domain` | Domain | domain_id | - | - |
| `sys_created_by` | Created by | string | - | - |
| `change_control` | Approval group | reference | sys_user_group | - |
| `business_unit` | Business Unit | reference | business_unit | - |
| `attested_by` | Attested By | reference | sys_user | - |
| `assigned` | Assigned | glide_date_time | - | - |
| `short_description` | Description | string | - | - |
| `last_discovered` | Most recent discovery | glide_date_time | - | - |
| `po_number` | PO number | string | - | - |
| `operational_status` | Operational status | integer | - | - |
| `discovery_source` | Discovery source | string | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `gl_account` | GL account | string | - | - |
| `fqdn` | Fully qualified domain name | string | - | - |
| `sys_domain_path` | Domain Path | domain_path | - | - |
| `cost_center` | Cost center | reference | cmn_cost_center | - |
| `name` | Name | string | - | - |
| `subcategory` | Subcategory | string | - | - |
| `managed_by_group` | Managed By Group | reference | sys_user_group | - |
| `manufacturer` | Manufacturer | reference | core_company | - |
| `vendor` | Vendor | reference | core_company | - |
| `company` | Company | reference | core_company | - |
| `assigned_to` | Assigned to | reference | sys_user | - |
| `attestation_status` | Attestation Status | string | - | - |
| `model_id` | Model ID | reference | cmdb_model | - |
| `support_group` | Support group | reference | sys_user_group | - |
| `attested` | Attested | boolean | - | - |
| `location` | Location | reference | cmn_location | - |
| `lease_id` | Lease contract | string | - | - |
| `mac_address` | MAC Address | string | - | - |
| `department` | Department | reference | cmn_department | - |
| `comments` | Comments | string | - | - |
| `monitor` | Monitor | boolean | - | - |
| `cost_cc` | Cost currency | string | - | - |
| `due` | Due | glide_date_time | - | - |
| `attributes` | Attributes | string | - | - |
| `fault_count` | Fault count | integer | - | - |
| `life_cycle_stage_status` | Life Cycle Stage Status | reference | life_cycle_stage_status | - |
| `justification` | Justification | string | - | - |
| `cost` | Cost | float | - | - |
| `serial_number` | Serial number | string | - | - |
| `duplicate_of` | Duplicate Of | reference | cmdb_ci | - |
| `environment` | Environment | string | - | - |
| `correlation_id` | Correlation ID | string | - | - |
| `category` | Category | string | - | - |
| `service_classification` | Service classification | string | - | - |
| `maintenance_schedule` | Maintenance schedule | reference | cmn_schedule | - |
| `model_number` | Model number | string | - | - |
| `start_date` | Start date | glide_date_time | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `ip_address` | IP Address | ip_addr | - | - |
| `order_date` | Ordered | glide_date_time | - | - |
| `unverified` | Requires verification | boolean | - | - |
| `asset` | Asset | reference | alm_asset | - |
| `sla` | SLA | reference | sla | - |
| `consumer_type` | Consumer type | string | - | - |
| `portfolio_status` | Phase | string | - | - |
| `service_owner_delegate` | Delegate | reference | sys_user | - |
| `state` | State | string | - | - |
| `price_model` | Price model | string | - | - |
| `business_relation_manager` | Business relation manager | reference | sys_user | - |
| `service_level_requirement` | Service level requirement | translated_html | - | - |
| `delivery_manager` | Delivery manager | reference | sys_user | - |
| `monitoring_requirements` | Monitoring requirements | string | - | - |
| `business_need` | Business need | string | - | - |
| `prerequisites` | Prerequisites | translated_html | - | - |
| `compatibility_dependencies` | Compatibility dependencies | string | - | - |
| `last_review_date` | Last review date | glide_date_time | - | - |
| `price_unit` | Price unit | string | - | - |
| `unit_description` | Unit description | html | - | - |
| `end_date` | End date | glide_date_time | - | - |
| `business_contact` | Business contact | reference | sys_user | - |
| `aliases` | Aliases | string | - | - |
| `version` | Version | string | - | - |
| `busines_criticality` | Business Criticality | string | - | - |
| `published_ref` | Published Item | reference | cmdb_ci_service | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:25:14.055Z*