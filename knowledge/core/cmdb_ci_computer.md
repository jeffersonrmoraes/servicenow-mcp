# ServiceNow Table: Computer (cmdb_ci_computer)

**Category:** CORE
**SysID:** 6eec6a8618b232108bb255f46a373ae5

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `attested_date` | Attested Date | glide_date_time | - | - |
| `floppy` | Floppy | string | - | - |
| `cpu_core_count` | CPU core count | integer | - | - |
| `disk_space` | Disk space (GB) | decimal | - | - |
| `os_service_pack` | OS Service Pack | string | - | - |
| `cd_speed` | CD Speed | integer | - | - |
| `maintenance_schedule` | Maintenance schedule | reference | cmn_schedule | - |
| `cd_rom` | CD | boolean | - | - |
| `cpu_manufacturer` | CPU manufacturer | reference | core_company | - |
| `cpu_count` | CPU count | integer | - | - |
| `object_id` | Object ID | string | - | - |
| `ram` | RAM (MB) | integer | - | - |
| `os_version` | OS Version | string | - | - |
| `schedule` | Schedule | reference | cmn_schedule | - |
| `operational_status` | Operational status | integer | - | - |
| `attestation_score` | Attestation Score | integer | - | - |
| `due_in` | Due in | string | - | - |
| `invoice_number` | Invoice number | string | - | - |
| `asset_tag` | Asset tag | string | - | - |
| `owned_by` | Owned by | reference | sys_user | - |
| `business_unit` | Business Unit | reference | business_unit | - |
| `cost_center` | Cost center | reference | cmn_cost_center | - |
| `name` | Name | string | - | - |
| `subcategory` | Subcategory | string | - | - |
| `managed_by` | Managed by | reference | sys_user | - |
| `sys_class_name` | Class | sys_class_name | - | - |
| `sys_class_path` | Sys class path | sys_class_path | - | - |
| `company` | Company | reference | core_company | - |
| `assigned_to` | Assigned to | reference | sys_user | - |
| `attestation_status` | Attestation Status | string | - | - |
| `model_id` | Model ID | reference | cmdb_model | - |
| `support_group` | Support group | reference | sys_user_group | - |
| `attested` | Attested | boolean | - | - |
| `location` | Location | reference | cmn_location | - |
| `lease_id` | Lease contract | string | - | - |
| `os_address_width` | OS Address Width (bits) | integer | - | - |
| `skip_sync` | Skip sync | boolean | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `install_date` | Installed | glide_date_time | - | - |
| `warranty_expiration` | Warranty expiration | glide_date | - | - |
| `change_control` | Approval group | reference | sys_user_group | - |
| `sys_domain_path` | Domain Path | domain_path | - | - |
| `install_status` | Install Status | integer | - | - |
| `dns_domain` | DNS Domain | string | - | - |
| `life_cycle_stage` | Life Cycle Stage | reference | life_cycle_stage | - |
| `assignment_group` | Change Group | reference | sys_user_group | - |
| `can_print` | Can Print | boolean | - | - |
| `checked_in` | Checked in | glide_date_time | - | - |
| `mac_address` | MAC Address | string | - | - |
| `department` | Department | reference | cmn_department | - |
| `comments` | Comments | string | - | - |
| `monitor` | Monitor | boolean | - | - |
| `cost_cc` | Cost currency | string | - | - |
| `due` | Due | glide_date_time | - | - |
| `attributes` | Attributes | string | - | - |
| `fault_count` | Fault count | integer | - | - |
| `chassis_type` | Chassis type | string | - | - |
| `most_frequent_user` | Most frequent logged in user | reference | sys_user | - |
| `first_discovered` | First discovered | glide_date_time | - | - |
| `sys_domain` | Domain | domain_id | - | - |
| `sys_created_by` | Created by | string | - | - |
| `fqdn` | Fully qualified domain name | string | - | - |
| `checked_out` | Checked out | glide_date_time | - | - |
| `hardware_status` | Hardware Status | string | - | - |
| `supported_by` | Supported by | reference | sys_user | - |
| `purchase_date` | Purchased | glide_date | - | - |
| `short_description` | Description | string | - | - |
| `last_discovered` | Most recent discovery | glide_date_time | - | - |
| `po_number` | PO number | string | - | - |
| `life_cycle_stage_status` | Life Cycle Stage Status | reference | life_cycle_stage_status | - |
| `justification` | Justification | string | - | - |
| `cost` | Cost | float | - | - |
| `serial_number` | Serial number | string | - | - |
| `duplicate_of` | Duplicate Of | reference | cmdb_ci | - |
| `environment` | Environment | string | - | - |
| `correlation_id` | Correlation ID | string | - | - |
| `category` | Category | string | - | - |
| `cpu_speed` | CPU speed (MHz) | decimal | - | - |
| `product_instance_id` | Product instance identifier | string | - | - |
| `discovery_source` | Discovery source | string | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `gl_account` | GL account | string | - | - |
| `hardware_substatus` | Substatus | string | - | - |
| `internet_facing` | Internet Facing | boolean | - | - |
| `delivery_date` | Order received | glide_date_time | - | - |
| `attested_by` | Attested By | reference | sys_user | - |
| `assigned` | Assigned | glide_date_time | - | - |
| `default_gateway` | Default Gateway | string | - | - |
| `managed_by_group` | Managed By Group | reference | sys_user_group | - |
| `manufacturer` | Manufacturer | reference | core_company | - |
| `vendor` | Vendor | reference | core_company | - |
| `model_number` | Model number | string | - | - |
| `start_date` | Start date | glide_date_time | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `ip_address` | IP Address | ip_addr | - | - |
| `order_date` | Ordered | glide_date_time | - | - |
| `unverified` | Requires verification | boolean | - | - |
| `asset` | Asset | reference | alm_asset | - |
| `cpu_type` | CPU type | string | - | - |
| `virtual` | Is Virtual | boolean | - | - |
| `cpu_name` | CPU name | string | - | - |
| `os_domain` | OS Domain | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `os` | Operating System | string | - | - |
| `form_factor` | Form factor | string | - | - |
| `cpu_core_thread` | CPU core thread | integer | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:25:12.381Z*