import { apiClient } from "@/lib/utils";

export const states = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttarakhand",
  "Uttar Pradesh",
  "West Bengal",
];

export const staticOptions = [
  {
    id: "Tags",
    label: "Tag",
    values: ["Active", "Inactive"],
  },
  {
    id: "EmployeeType",
    label: "Employee Type",
    values: ["Permanent", "Temporary"],
  },
  {
    id: "GSTStatus",
    label: "GST Status",
    values: ["Registered", "Unregistered"],
  },
  {
    id: "AccountType",
    label: "Account Type",
    values: ["Equity", "Liabilities", "Assets", "Income", "Expanses"],
  },
  {
    id: "VendorTag",
    label: "Vendor Tag",
    values: ["Sub-Contractor", "Sub-Supplier"],
  },
  {
    id: "OTType",
    label: "OT Type",
    values: ["Single", "Double", "One and half time", "Not applicable"],
  },
  {
    id: "CostType",
    label: "Cost Type",
    values: ["Direct Cost", "Indirect Cost"],
  },
  {
    id: "MachineOwnership",
    label: "Machine Ownership",
    values: ["Hired", "Owned"],
  },
  {
    id: "State",
    label: "State",
    values: states,
  },
  {
    id: "ApplicableFor",
    label: "Applicable For",
    values: ["Employee", "Workmen", "Both"],
  },
  {
    id: "CategoryTag",
    label: "Category Tags",
    values: ["Material", "Machine", "Spare"],
  },
  {
    id: "Gender",
    label: "Gender",
    values: ["Male", "Female", "Other"],
  },
  {
    id: "MaritalStatus",
    label: "Marital Status",
    values: ["Married", "Unmarried"],
  },
  {
    id: "Component",
    label: "Component",
    values: ["Labour", "Material", "Machine", "Overhead", "Combined"],
  },
  {
    id: "SkillCategory",
    label: "Skill Category",
    values: ["Highly Skilled", "Semi Skilled", "Skilled", "Unskilled"],
  },
  {
    id: "Ledger",
    label: "Ledger",
    values: [
      "Capital",
      "Cash & Bank",
      "Customer",
      "Personnel",
      "Revenue",
      "Subcontractor",
      "Supplier",
    ],
  },
  {
    id: "Vision",
    label: "Vision",
    values: ["Normal", "Specs"],
  },
  {
    id: "WagesType",
    label: "Wages Type",
    values: ["Daily", "Monthly"],
  },
  {
    id: "Allowances",
    label: "Allowances",
    values: [
      "HRA",
      "Off Day",
      "Site",
      "Extra",
      "Special",
      "Conveyance",
      "Detention",
      "Education",
    ],
  },
  {
    id: "GroupCategory",
    label: "Group Category",
    values: ["Regular", "Service", "Machine"],
  },
  {
    id: "DirectSub",
    label: "Direct Sub",
    values: ["Direct", "Sub"],
  },
  {
    id: "OrderType",
    label: "Order Type",
    values: ["Lump Sum", "Unit Rate", "Rate Contract"],
  },
  {
    id: "Status",
    label: "Status",
    values: ["Active", "Inactive", "Closed"],
  },
];

type OptionItem = {
  id: string;
  label: string;
  values: string[];
};

export const optionsForSelection: OptionItem[] = [
  {
    id: "CompanyName",
    label: "Company Name",
    values: [],
  },
  {
    id: "Benefits",
    label: "Benefits",
    values: [],
  },
  // {
  //   id: "UOM",
  //   label: "UOM Code",
  //   values: [],
  // },
  {
    id: "CostCenterName",
    label: "Cost Center Name",
    values: [],
  },
];
