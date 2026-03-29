# ServiceNow Table: Server (cmdb_ci_server)

**Category:** CORE
**SysID:** 2aecaa8618b232108bb255f46a373ad1

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `schedule` | Schedule | reference | cmn_schedule | - |
| `dr_backup` | Disaster backup | reference | cmdb_ci_server | - |
| `host_name` | Host name | string | - | - |
| `attested_date` | Attested Date | glide_date_time | - | - |
| `cpu_manufacturer` | CPU manufacturer | reference | core_company | - |
| `due_in` | Due in | string | - | - |
| `warranty_expiration` | Warranty expiration | glide_date | - | - |
| `owned_by` | Owned by | reference | sys_user | - |
| `object_id` | Object ID | string | - | - |
| `dns_domain` | DNS Domain | string | - | - |
| `short_description` | Description | string | - | - |
| `os_domain` | OS Domain | string | - | - |
| `manufacturer` | Manufacturer | reference | core_company | - |
| `model_number` | Model number | string | - | - |
| `serial_number` | Serial number | string | - | - |
| `correlation_id` | Correlation ID | string | - | - |
| `cpu_core_count` | CPU core count | integer | - | - |
| `attestation_score` | Attestation Score | integer | - | - |
| `cpu_type` | CPU type | string | - | - |
| `fqdn` | Fully qualified domain name | string | - | - |
| `hardware_status` | Hardware Status | string | - | - |
| `subcategory` | Subcategory | string | - | - |
| `assignment_group` | Change Group | reference | sys_user_group | - |
| `sys_class_path` | Sys class path | sys_class_path | - | - |
| `department` | Department | reference | cmn_department | - |
| `attestation_status` | Attestation Status | string | - | - |
| `ip_address` | IP Address | ip_addr | - | - |
| `environment` | Environment | string | - | - |
| `category` | Category | string | - | - |
| `cpu_core_thread` | CPU core thread | integer | - | - |
| `first_discovered` | First discovered | glide_date_time | - | - |
| `sys_created_by` | Created by | string | - | - |
| `cpu_speed` | CPU speed (MHz) | decimal | - | - |
| `disk_space` | Disk space (GB) | decimal | - | - |
| `attested_by` | Attested By | reference | sys_user | - |
| `life_cycle_stage` | Life Cycle Stage | reference | life_cycle_stage | - |
| `managed_by` | Managed by | reference | sys_user | - |
| `sys_class_name` | Class | sys_class_name | - | - |
| `life_cycle_stage_status` | Life Cycle Stage Status | reference | life_cycle_stage_status | - |
| `os_version` | OS Version | string | - | - |
| `unverified` | Requires verification | boolean | - | - |
| `form_factor` | Form factor | string | - | - |
| `most_frequent_user` | Most frequent logged in user | reference | sys_user | - |
| `sys_domain` | Domain | domain_id | - | - |
| `hardware_substatus` | Substatus | string | - | - |
| `delivery_date` | Order received | glide_date_time | - | - |
| `name` | Name | string | - | - |
| `virtual` | Is Virtual | boolean | - | - |
| `checked_in` | Checked in | glide_date_time | - | - |
| `justification` | Justification | string | - | - |
| `os` | Operating System | string | - | - |
| `model_id` | Model ID | reference | cmdb_model | - |
| `order_date` | Ordered | glide_date_time | - | - |
| `location` | Location | reference | cmn_location | - |
| `firewall_status` | Firewall status | string | - | - |
| `os_service_pack` | OS Service Pack | string | - | - |
| `discovery_source` | Discovery source | string | - | - |
| `gl_account` | GL account | string | - | - |
| `cpu_name` | CPU name | string | - | - |
| `sys_domain_path` | Domain Path | domain_path | - | - |
| `cost_center` | Cost center | reference | cmn_cost_center | - |
| `purchase_date` | Purchased | glide_date | - | - |
| `floppy` | Floppy | string | - | - |
| `can_print` | Can Print | boolean | - | - |
| `vendor` | Vendor | reference | core_company | - |
| `start_date` | Start date | glide_date_time | - | - |
| `support_group` | Support group | reference | sys_user_group | - |
| `asset` | Asset | reference | alm_asset | - |
| `product_instance_id` | Product instance identifier | string | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `asset_tag` | Asset tag | string | - | - |
| `internet_facing` | Internet Facing | boolean | - | - |
| `supported_by` | Supported by | reference | sys_user | - |
| `chassis_type` | Chassis type | string | - | - |
| `po_number` | PO number | string | - | - |
| `company` | Company | reference | core_company | - |
| `comments` | Comments | string | - | - |
| `monitor` | Monitor | boolean | - | - |
| `cost_cc` | Cost currency | string | - | - |
| `attested` | Attested | boolean | - | - |
| `lease_id` | Lease contract | string | - | - |
| `operational_status` | Operational status | integer | - | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `invoice_number` | Invoice number | string | - | - |
| `ram` | RAM (MB) | integer | - | - |
| `checked_out` | Checked out | glide_date_time | - | - |
| `business_unit` | Business Unit | reference | business_unit | - |
| `assigned` | Assigned | glide_date_time | - | - |
| `cd_speed` | CD Speed | integer | - | - |
| `last_discovered` | Most recent discovery | glide_date_time | - | - |
| `cpu_count` | CPU count | integer | - | - |
| `assigned_to` | Assigned to | reference | sys_user | - |
| `cd_rom` | CD | boolean | - | - |
| `attributes` | Attributes | string | - | - |
| `skip_sync` | Skip sync | boolean | - | - |
| `sys_updated_by` | Updated by | string | - | - |
| `install_date` | Installed | glide_date_time | - | - |
| `change_control` | Approval group | reference | sys_user_group | - |
| `install_status` | Install Status | integer | - | - |
| `default_gateway` | Default Gateway | string | - | - |
| `managed_by_group` | Managed By Group | reference | sys_user_group | - |
| `mac_address` | MAC Address | string | - | - |
| `cost` | Cost | float | - | - |
| `sys_mod_count` | Updates | integer | - | - |
| `duplicate_of` | Duplicate Of | reference | cmdb_ci | - |
| `due` | Due | glide_date_time | - | - |
| `fault_count` | Fault count | integer | - | - |
| `maintenance_schedule` | Maintenance schedule | reference | cmn_schedule | - |
| `os_address_width` | OS Address Width (bits) | integer | - | - |
| `used_for` | Used for | string | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `classification` | Classification | string | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:25:12.786Z*