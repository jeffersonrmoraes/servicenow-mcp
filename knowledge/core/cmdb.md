# ServiceNow Table: Base Configuration Item (cmdb)

**Category:** CORE
**SysID:** eccc26c218b232108bb255f46a373a3a

## Schema Definition

| Field | Label | Type | Reference | Mandatory |
|---|---|---|---|---|
| `serial_number` | Serial number | string | - | - |
| `delivery_date` | Order received | glide_date_time | - | - |
| `lease_id` | Lease contract | string | - | - |
| `checked_out` | Checked out | glide_date_time | - | - |
| `sys_domain_path` | Domain Path | domain_path | - | - |
| `sys_id` | Sys ID | GUID | - | - |
| `sys_created_on` | Created | glide_date_time | - | - |
| `company` | Company | reference | core_company | - |
| `manufacturer` | Manufacturer | reference | core_company | - |
| `po_number` | PO number | string | - | - |
| `due_in` | Due in | string | - | - |
| `asset` | Asset | reference | alm_asset | - |
| `assignment_group` | Change Group | reference | sys_user_group | - |
| `model_id` | Model ID | reference | cmdb_model | - |
| `gl_account` | GL account | string | - | - |
| `supported_by` | Supported by | reference | sys_user | - |
| `unverified` | Requires verification | boolean | - | - |
| `sys_class_path` | Sys class path | sys_class_path | - | - |
| `name` | Name | string | - | - |
| `purchase_date` | Purchased | glide_date | - | - |
| `location` | Location | reference | cmn_location | - |
| `cost_cc` | Cost currency | string | - | - |
| `managed_by` | Managed by | reference | sys_user | - |
| `sys_updated_on` | Updated | glide_date_time | - | - |
| `install_status` | Install Status | integer | - | - |
| `justification` | Justification | string | - | - |
| `cost` | Cost | float | - | - |
| `owned_by` | Owned by | reference | sys_user | - |
| `sys_updated_by` | Updated by | string | - | - |
| `asset_tag` | Asset tag | string | - | - |
| `order_date` | Ordered | glide_date_time | - | - |
| `department` | Department | reference | cmn_department | - |
| `checked_in` | Checked in | glide_date_time | - | - |
| `sys_domain` | Domain | domain_id | - | - |
| `sys_created_by` | Created by | string | - | - |
| `assigned_to` | Assigned to | reference | sys_user | - |
| `install_date` | Installed | glide_date_time | - | - |
| `warranty_expiration` | Warranty expiration | glide_date | - | - |
| `due` | Due | glide_date_time | - | - |
| `cost_center` | Cost center | reference | cmn_cost_center | - |
| `sys_mod_count` | Updates | integer | - | - |
| `assigned` | Assigned | glide_date_time | - | - |
| `vendor` | Vendor | reference | core_company | - |
| `invoice_number` | Invoice number | string | - | - |
| `support_group` | Support group | reference | sys_user_group | - |
| `skip_sync` | Skip sync | boolean | - | - |
| `sys_class_name` | Class | sys_class_name | - | - |


---
*Knowledge harvested by ServiceNow MCP v3.8.0 on 2026-03-29T19:25:10.864Z*