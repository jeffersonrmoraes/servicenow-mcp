# ServiceNow Table: Configuration Item (cmdb_ci)

**Category:** CORE
**SysID:** eccc26c218b232108bb255f46a373ab9

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `first_discovered` | First discovered | glide_date_time | - | - |
| `model_number` | Model number | string | - | - |
| `managed_by_group` | Managed By Group | reference | sys_user_group | - |
| `product_instance_id` | Product instance identifier | string | - | - |
| `attestation_status` | Attestation Status | string | - | - |
| `subcategory` | Subcategory | string | - | - |
| `attestation_score` | Attestation Score | integer | - | - |
| `life_cycle_stage` | Life Cycle Stage | reference | life_cycle_stage | - |
| `discovery_source` | Discovery source | string | - | - |
| `fqdn` | Fully qualified domain name | string | - | - |
| `fault_count` | Fault count | integer | - | - |
| `attributes` | Attributes | string | - | - |
| `skip_sync` | Skip sync | boolean | - | - |
| `managed_by` | Managed by | reference | sys_user | - |
| `po_number` | PO number | string | - | - |
| `sys_class_path` | Sys class path | sys_class_path | - | - |
| `company` | Company | reference | core_company | - |
| `invoice_number` | Invoice number | string | - | - |
| `warranty_expiration` | Warranty expiration | glide_date | - | - |
| `serial_number` | Serial number | string | - | - |
| `sys_domain_path` | Domain Path | domain_path | - | - |
| `assignment_group` | Change Group | reference | sys_user_group | - |
| `manufacturer` | Manufacturer | reference | core_company | - |
| `checked_in` | Checked in | glide_date_time | - | - |
| `sys_domain` | Domain | domain_id | - | - |
| `department` | Department | reference | cmn_department | - |
| `assigned_to` | Assigned to | reference | sys_user | - |
| `sys_mod_count` | Updates | integer | - | - |
| `checked_out` | Checked out | glide_date_time | - | - |
| `support_group` | Support group | reference | sys_user_group | - |
| `sys_class_name` | Class | sys_class_name | - | - |
| `due_in` | Due in | string | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `justification` | Justification | string | - | - |
| `sys_created_by` | Created by | string | - | - |
| `cost` | Cost | float | - | - |
| `model_id` | Model ID | reference | cmdb_model | - |
| `order_date` | Ordered | glide_date_time | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `vendor` | Vendor | reference | core_company | - |
| `install_date` | Installed | glide_date_time | - | - |
| `gl_account` | GL account | string | - | - |
| `asset_tag` | Asset tag | string | - | - |
| `owned_by` | Owned by | reference | sys_user | - |
| `cost_cc` | Cost currency | string | - | - |
| `delivery_date` | Order received | glide_date_time | - | - |
| `supported_by` | Supported by | reference | sys_user | - |
| `location` | Location | reference | cmn_location | - |
| `cost_center` | Cost center | reference | cmn_cost_center | - |
| `assigned` | Assigned | glide_date_time | - | - |
| `lease_id` | Lease contract | string | - | - |
| `category` | Category | string | - | - |
| `start_date` | Start date | glide_date_time | - | - |
| `ip_address` | IP Address | ip_addr | - | - |
| `dns_domain` | DNS Domain | string | - | - |
| `attested_date` | Attested Date | glide_date_time | - | - |
| `due` | Due | glide_date_time | - | - |
| `unverified` | Requires verification | boolean | - | - |
| `asset` | Asset | reference | alm_asset | - |
| `comments` | Comments | string | - | - |
| `install_status` | Install Status | integer | - | - |
| `name` | Name | string | - | - |
| `purchase_date` | Purchased | glide_date | - | - |
| `operational_status` | Operational status | integer | - | - |
| `monitor` | Monitor | boolean | - | - |
| `can_print` | Can Print | boolean | - | - |
| `attested` | Attested | boolean | - | - |
| `life_cycle_stage_status` | Life Cycle Stage Status | reference | life_cycle_stage_status | - |
| `maintenance_schedule` | Maintenance schedule | reference | cmn_schedule | - |
| `schedule` | Schedule | reference | cmn_schedule | - |
| `change_control` | Approval group | reference | sys_user_group | - |
| `mac_address` | MAC Address | string | - | - |
| `duplicate_of` | Duplicate Of | reference | cmdb_ci | - |
| `environment` | Environment | string | - | - |
| `last_discovered` | Most recent discovery | glide_date_time | - | - |
| `correlation_id` | Correlation ID | string | - | - |
| `attested_by` | Attested By | reference | sys_user | - |
| `business_unit` | Business Unit | reference | business_unit | - |
| `short_description` | Description | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:25:11.270Z*