# ServiceNow Table: Application Server (cmdb_ci_app_server)

**Category:** CORE
**SysID:** c7cc220618b232108bb255f46a373a8b

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `sys_id` | Sys ID | GUID | - | - |
| `schedule` | Schedule | reference | cmn_schedule | - |
| `tcp_port` | TCP port(s) | string | - | - |
| `container` | Container | string | - | - |
| `attested_date` | Attested Date | glide_date_time | - | - |
| `running_process_command` | Running process command | string | - | - |
| `running_process_key_parameters` | Running process key parameters | string | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `sys_domain` | Domain | domain_id | - | - |
| `invoice_number` | Invoice number | string | - | - |
| `asset_tag` | Asset tag | string | - | - |
| `rp_key_parameters_hash` | Running process key parameters hash | string | - | - |
| `version` | Version | string | - | - |
| `attested_by` | Attested By | reference | sys_user | - |
| `assigned` | Assigned | glide_date_time | - | - |
| `short_description` | Description | string | - | - |
| `managed_by_group` | Managed By Group | reference | sys_user_group | - |
| `manufacturer` | Manufacturer | reference | core_company | - |
| `sys_class_path` | Sys class path | sys_class_path | - | - |
| `company` | Company | reference | core_company | - |
| `config_file` | Configuration file | string | - | - |
| `comments` | Comments | string | - | - |
| `monitor` | Monitor | boolean | - | - |
| `cost_cc` | Cost currency | string | - | - |
| `due` | Due | glide_date_time | - | - |
| `attributes` | Attributes | string | - | - |
| `fault_count` | Fault count | integer | - | - |
| `product_instance_id` | Product instance identifier | string | - | - |
| `attestation_score` | Attestation Score | integer | - | - |
| `first_discovered` | First discovered | glide_date_time | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `is_clustered` | Is clustered | boolean | - | - |
| `warranty_expiration` | Warranty expiration | glide_date | - | - |
| `owned_by` | Owned by | reference | sys_user | - |
| `business_unit` | Business Unit | reference | business_unit | - |
| `cost_center` | Cost center | reference | cmn_cost_center | - |
| `name` | Name | string | - | - |
| `subcategory` | Subcategory | string | - | - |
| `edition` | Edition | string | - | - |
| `sys_class_name` | Class | sys_class_name | - | - |
| `checked_in` | Checked in | glide_date_time | - | - |
| `mac_address` | MAC Address | string | - | - |
| `department` | Department | reference | cmn_department | - |
| `cost` | Cost | float | - | - |
| `serial_number` | Serial number | string | - | - |
| `duplicate_of` | Duplicate Of | reference | cmdb_ci | - |
| `environment` | Environment | string | - | - |
| `correlation_id` | Correlation ID | string | - | - |
| `category` | Category | string | - | - |
| `maintenance_schedule` | Maintenance schedule | reference | cmn_schedule | - |
| `operational_status` | Operational status | integer | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `discovery_source` | Discovery source | string | - | - |
| `install_directory` | Installation directory | string | - | - |
| `install_date` | Installed | glide_date_time | - | - |
| `sys_created_by` | Created by | string | - | - |
| `change_control` | Approval group | reference | sys_user_group | - |
| `sys_domain_path` | Domain Path | domain_path | - | - |
| `install_status` | Install Status | integer | - | - |
| `dns_domain` | DNS Domain | string | - | - |
| `life_cycle_stage` | Life Cycle Stage | reference | life_cycle_stage | - |
| `managed_by` | Managed by | reference | sys_user | - |
| `can_print` | Can Print | boolean | - | - |
| `cl_port` | Credentialless Discovery Port | integer | - | - |
| `life_cycle_stage_status` | Life Cycle Stage Status | reference | life_cycle_stage_status | - |
| `justification` | Justification | string | - | - |
| `start_date` | Start date | glide_date_time | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `ip_address` | IP Address | ip_addr | - | - |
| `order_date` | Ordered | glide_date_time | - | - |
| `unverified` | Requires verification | boolean | - | - |
| `asset` | Asset | reference | alm_asset | - |
| `lease_id` | Lease contract | string | - | - |
| `skip_sync` | Skip sync | boolean | - | - |
| `pid` | PID | integer | - | - |
| `rp_command_hash` | Running process command hash | string | - | - |
| `due_in` | Due in | string | - | - |
| `used_for` | Used for | string | - | - |
| `gl_account` | GL account | string | - | - |
| `fqdn` | Fully qualified domain name | string | - | - |
| `checked_out` | Checked out | glide_date_time | - | - |
| `delivery_date` | Order received | glide_date_time | - | - |
| `supported_by` | Supported by | reference | sys_user | - |
| `purchase_date` | Purchased | glide_date | - | - |
| `assignment_group` | Change Group | reference | sys_user_group | - |
| `last_discovered` | Most recent discovery | glide_date_time | - | - |
| `po_number` | PO number | string | - | - |
| `vendor` | Vendor | reference | core_company | - |
| `model_number` | Model number | string | - | - |
| `assigned_to` | Assigned to | reference | sys_user | - |
| `attestation_status` | Attestation Status | string | - | - |
| `model_id` | Model ID | reference | cmdb_model | - |
| `support_group` | Support group | reference | sys_user_group | - |
| `attested` | Attested | boolean | - | - |
| `location` | Location | reference | cmn_location | - |
| `config_directory` | Configuration directory | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:25:13.263Z*