import {
  TbusinessUnitValidator,
  TcompanyDetailsValidtor,
  TcostCenterValidator,
  TcurrencyValidator,
  TcustomerValidator,
  TemployeeMasterValidator,
  TgoodsReceiptValidators,
  TinvoiceTypeValidators,
  TmachineClassValidators,
  TrecoveryTypeValidators,
  TunitsOFMeasurementValidators,
  TwarehouseValidators,
  employeeMasterValidator,
} from "@/lib/validators/common-master-form-validators/form-validators";

export const optionsForSelection = [
  {
    id: "CompanyName",
    label: "Company Name",
    values: ["Hindustan Engineering Corporation", "F N Construction PVT LTD"],
  },
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
    id: "OTType",
    label: "OT Type",
    values: ["Single", "Double", "One and half time", "Not applicable"],
  },
  {
    id: "Benefits",
    label: "Benefits",
    values: ["BNF01"],
  },
];

export const CompanyDetails: Array<{
  name: keyof TcompanyDetailsValidtor;
  label: string;
  type: "text" | "date" | "number";
}> = [
  { name: "CompanyName", label: "Company Name", type: "text" },
  {
    name: "RegisteredOfficeAddress",
    label: "Registered Office Address",
    type: "text",
  },
  {
    name: "CertificateOfIncorporationNo",
    label: "Certificate of Incorporation No",
    type: "text",
  },
  { name: "COIDate", label: "COI Date", type: "date" },
  {
    name: "ServiceTaxRegistrationNo",
    label: "Service Tax Registration No",
    type: "text",
  },
  { name: "VATRegistrationNo", label: "VAT Registration No", type: "text" },
  { name: "PFRegistrationNo", label: "PF Registration No", type: "text" },
  { name: "PFState", label: "PF State", type: "text" },
  {
    name: "PFSubRegistrationNo",
    label: "PF Sub Registration No",
    type: "text",
  },
  { name: "PFSubState", label: "PF Sub State", type: "text" },
  { name: "ESIRegistrationNo", label: "ESI Registration No", type: "text" },
  { name: "ESIState", label: "ESI State", type: "text" },
  {
    name: "ESISubRegistrationNo",
    label: "ESI Sub Registration No",
    type: "text",
  },
  { name: "ESISubState", label: "ESI Sub State", type: "text" },
  {
    name: "PermanentAccountNumber",
    label: "Permanent Account Number",
    type: "text",
  },
  { name: "MSME", label: "MSME", type: "text" },
  { name: "MSMEUdyam", label: "MSME Udyam", type: "text" },

  { name: "Tags", label: "Tags", type: "text" },
];

interface Item {
  label: string;
  id: string;
}

export const formTableHeaders: Item[] = [
  {
    label: "Serial No.",
    id: "SerialNo",
  },
  {
    label: "GST Reg No.",
    id: "GSTRegNo",
  },
  {
    label: "GST State",
    id: "GSTState",
  },
  {
    label: "GST Address",
    id: "GSTAddress",
  },
];

export const states = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
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

export const BusinessUnit: Array<{
  name: keyof TbusinessUnitValidator;
  label: string;
  type: "text" | "date" | "number";
}> = [
  { name: "CompanyName", label: "Company Name", type: "text" },

  { name: "BusinessUnit", label: "Business Unit", type: "text" },
  { name: "BusinessDescription", label: "Business Description", type: "text" },
  { name: "Tags", label: "Tags", type: "text" },
];

export const Customer: Array<{
  name: keyof TcustomerValidator;
  label: string;
  type: "text" | "date" | "number";
}> = [
  { name: "CustomerCode", label: "Customer Code", type: "text" },
  { name: "CustomerName", label: "Customer Name", type: "text" },
  { name: "CorporateOffice", label: "Corporate Office", type: "text" },
  { name: "RegisteredOffice", label: "Registered Office", type: "text" },
  { name: "Phone", label: "Phone", type: "text" },
  { name: "Email", label: "Email", type: "text" },
  { name: "Website", label: "Website", type: "text" },
  { name: "PAN", label: "PAN", type: "text" },
  { name: "ServiceTaxRegNo", label: "Service Tax Reg No", type: "text" },
  { name: "CINLLPIN", label: "CIN/LLPIN", type: "text" },
  { name: "Tags", label: "Tags", type: "text" },
];

export const EmployeeMaster: Array<{
  name: keyof TemployeeMasterValidator;
  label: string;
  type: "text" | "date" | "number";
}> = [
  { name: "EmployeeCode", label: "Employee Code", type: "text" },
  { name: "EmployeeType", label: "Employee Type", type: "text" },
  { name: "Email", label: "Email", type: "text" },
  { name: "FatherHusbandName", label: "Father/Husband Name", type: "text" },
  { name: "DateOfBirth", label: "Date of Birth", type: "date" },
  { name: "EmployeeFirstName", label: "First Name", type: "text" },
  { name: "EmployeeLastName", label: "Last Name", type: "text" },
  { name: "Gender", label: "Gender", type: "text" }, // Adjust type if needed (e.g., select for options)
  { name: "Religion", label: "Religion", type: "text" },
  { name: "MotherTongue", label: "Mother Tongue", type: "text" },
  { name: "PresentAddress", label: "Present Address", type: "text" },
  { name: "PermanentAddress", label: "Permanent Address", type: "text" },
  { name: "Phone", label: "Phone Number", type: "text" },
  {
    name: "EmergencyContactNumber",
    label: "Emergency Contact Number",
    type: "text",
  },
  { name: "MaritalStatus", label: "Marital Status", type: "text" }, // Adjust type if needed (e.g., select for options)
  { name: "IdentificationMark", label: "Identification Mark", type: "text" },
  { name: "HeightInCM", label: "Height (CM)", type: "number" }, // Add validation if needed
  { name: "WeightInKG", label: "Weight (KG)", type: "number" }, // Add validation if needed
  { name: "Vision", label: "Vision", type: "text" }, // Adjust type if needed (e.g., select for options)
  {
    name: "EducationalQualification",
    label: "Education Qualification",
    type: "text",
  },
  { name: "PastExperience", label: "Past Experience", type: "text" },
  { name: "DateOfJoining", label: "Date of Joining", type: "date" }, // Add validation if needed
  { name: "DateOfExit", label: "Date of Exit", type: "date" }, // Add validation if needed
  { name: "Designation", label: "Designation", type: "text" },
  { name: "RoleDescription", label: "Role Description", type: "text" },
  { name: "PfAccountNumber", label: "PF Account Number", type: "text" }, // Adjust validation if needed
  { name: "UniversalAccountNumber", label: "UAN", type: "text" }, // Adjust validation if needed
  { name: "Esic", label: "ESIC", type: "text" }, // Adjust validation if needed
  { name: "BankAccountNumber", label: "Bank Account Number", type: "text" }, // Adjust validation if needed
  { name: "BankName", label: "Bank Name", type: "text" },
  { name: "Ifsc", label: "IFSC Code", type: "text" }, // Adjust validation if needed
  { name: "Aadhar", label: "Aadhar Number", type: "text" }, // Adjust validation if needed
  { name: "Pan", label: "PAN Card Number", type: "text" }, // Adjust validation if needed
  { name: "WagesInRupees", label: "Wages (₹)", type: "number" }, // Add validation if needed
  { name: "OTType", label: "OT Type", type: "text" }, // Adjust type if needed (e.g., select for options)
  { name: "Benefits", label: "Benefits", type: "text" },
  { name: "CompanyName", label: "Company Name", type: "text" },
  { name: "Tags", label: "Tags", type: "text" }, // Adjust validation if needed (e.g., min length)
];

export const CostCenter: Array<{
  name: keyof TcostCenterValidator;
  label: string;
  type: "text" | "date" | "number";
}> = [
  { name: "CompanyName", label: "Company Name", type: "text" },

  { name: "CostCenterName", label: "Cost Center Name", type: "text" },
  { name: "ProjectSiteAddress", label: "Project Site Address", type: "text" },
  { name: "Tags", label: "Tags", type: "text" },
];

export const Currency: Array<{
  name: keyof TcurrencyValidator;
  label: string;
  type: "text" | "date" | "number";
}> = [
  { name: "CurrencyCode", label: "Currency Code", type: "text" },

  { name: "CurrencyName", label: "Currency Name", type: "text" },

  { name: "Tags", label: "Tags", type: "text" },
];
export const Warehouse: Array<{
  name: keyof TwarehouseValidators;
  label: string;
  type: "text" | "date" | "number";
}> = [
  { name: "CompanyName", label: "Company Name", type: "text" },

  { name: "CostCenterName", label: "Currency Name", type: "text" },
  { name: "WareHouseName", label: "Warehouse Name", type: "text" },
  { name: "ProjectSiteAddress", label: "Project Site Address", type: "text" },

  { name: "Tags", label: "Tags", type: "text" },
];
export const GoodsReceipt: Array<{
  name: keyof TgoodsReceiptValidators;
  label: string;
  type: "text" | "date" | "number";
}> = [
  { name: "ReceiptCode", label: "Receipt Code", type: "text" },

  { name: "ReceiptDescription", label: "Receipt Description", type: "text" },
];
export const MachineClass: Array<{
  name: keyof TmachineClassValidators;
  label: string;
  type: "text" | "date" | "number";
}> = [
  { name: "MachineClassCode", label: "Machine Class Code", type: "text" },

  {
    name: "MaterialClassDescription",
    label: "Machine Class Description",
    type: "text",
  },
  { name: "Tags", label: "Tags", type: "text" },
];
export const InvoiceType: Array<{
  name: keyof TinvoiceTypeValidators;
  label: string;
  type: "text" | "date" | "number";
}> = [
  { name: "AccountCode", label: "Account Code", type: "text" },
  { name: "InvoiceType", label: "Invoice Type ", type: "text" },
  { name: "InvoiceTypeCode", label: "Invoice Type Code", type: "text" },

  { name: "Tags", label: "Tags", type: "text" },
];
export const RecoveryType: Array<{
  name: keyof TrecoveryTypeValidators;
  label: string;
  type: "text" | "date" | "number";
}> = [
  { name: "AccountCode", label: "Account Code", type: "text" },
  { name: "RecoveryType", label: "Recovery Type ", type: "text" },
  { name: "RecoveryTypeCode", label: "Recovery Type Code", type: "text" },

  { name: "Tags", label: "Tags", type: "text" },
];
export const UnitsOfMeasurement: Array<{
  name: keyof TunitsOFMeasurementValidators;
  label: string;
  type: "text" | "date" | "number";
}> = [
  { name: "UOMCode", label: "UOM Code", type: "text" },
  { name: "UOMDescription", label: "UOM Description", type: "text" },
  { name: "AllowableDecimal", label: "Allowable Decimal ", type: "text" },

  { name: "Tags", label: "Tags", type: "text" },
];
