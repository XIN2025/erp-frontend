import {
  TEmployeeMasterValidators,
  TScItemCodeValidators,
  TWorkmenDetailsValidators,
  TaccountValidators,
  TactivityValidators,
  TbankValidators,
  TbenefitsMastervalidators,
  TbusinessUnitValidator,
  TcompanyDetailsValidtor,
  TcostCenterValidator,
  TcurrencyValidator,
  TcustomerValidator,
  TgoodsReceiptValidators,
  TinvoiceTypeValidators,
  TmachineClassValidators,
  TmachineGroupValidators,
  TmachineValidators,
  TmajorScItemGroupValidators,
  TmaterialGroupValidators,
  TmaterialValidators,
  TrecoveryTypeValidators,
  TshiftMasterValidators,
  TunitsOFMeasurementValidators,
  TvendorValidators,
  TwarehouseValidators,
} from "@/lib/validators/common-master-form-validators";

export const CompanyDetails: Array<{
  name: keyof TcompanyDetailsValidtor;
  label: string;
  type: "text" | "date" | "number" | "select";
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

  { name: "Tags", label: "Tags", type: "select" },
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

export const BusinessUnit: Array<{
  name: keyof TbusinessUnitValidator;
  label: string;
  type: "text" | "date" | "number" | "select";
}> = [
  { name: "CompanyName", label: "Company Name", type: "select" },

  { name: "BusinessUnit", label: "Business Unit", type: "text" },
  { name: "BusinessDescription", label: "Business Description", type: "text" },
  { name: "Tags", label: "Tags", type: "select" },
];

export const Customer: Array<{
  name: keyof TcustomerValidator;
  label: string;
  type: "text" | "date" | "number" | "select";
}> = [
  { name: "CustomerCode", label: "Customer Code", type: "text" },
  { name: "CustomerName", label: "Customer Name", type: "text" },
  { name: "CorporateOffice", label: "Corporate Office", type: "text" },
  { name: "RegisteredOffice", label: "Registered Office", type: "text" },
  { name: "Phone", label: "Phone", type: "number" },
  { name: "Email", label: "Email", type: "text" },
  { name: "Website", label: "Website", type: "text" },
  { name: "PAN", label: "PAN", type: "text" },
  { name: "ServiceTaxRegNo", label: "Service Tax Reg No", type: "text" },
  { name: "CINLLPIN", label: "CIN/LLPIN", type: "text" },
  { name: "Tags", label: "Tags", type: "select" },
];

export const CostCenter: Array<{
  name: keyof TcostCenterValidator;
  label: string;
  type: "text" | "date" | "number" | "select";
}> = [
  { name: "CompanyName", label: "Company Name", type: "select" },

  { name: "CostCenterName", label: "Cost Center Name", type: "text" },
  { name: "ProjectSiteAddress", label: "Project Site Address", type: "text" },
  { name: "Tags", label: "Tags", type: "select" },
];

export const Currency: Array<{
  name: keyof TcurrencyValidator;
  label: string;
  type: "text" | "date" | "number" | "select";
}> = [
  { name: "CurrencyCode", label: "Currency Code", type: "text" },

  { name: "CurrencyName", label: "Currency Name", type: "text" },

  { name: "Tags", label: "Tags", type: "select" },
];
export const Warehouse: Array<{
  name: keyof TwarehouseValidators;
  label: string;
  type: "text" | "date" | "number" | "select";
}> = [
  { name: "CompanyName", label: "Company Name", type: "select" },

  { name: "CostCenterName", label: "Cost Center Name", type: "select" },
  { name: "WareHouseName", label: "Warehouse Name", type: "text" },
  { name: "ProjectSiteAddress", label: "Project Site Address", type: "text" },

  { name: "Tags", label: "Tags", type: "select" },
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
  type: "text" | "date" | "number" | "select";
}> = [
  { name: "MachineClassCode", label: "Machine Class Code", type: "text" },

  {
    name: "MaterialClassDescription",
    label: "Machine Class Description",
    type: "text",
  },
  { name: "Tags", label: "Tags", type: "select" },
];
export const InvoiceType: Array<{
  name: keyof TinvoiceTypeValidators;
  label: string;
  type: "text" | "date" | "number" | "select";
}> = [
  { name: "AccountCode", label: "Account Code", type: "select" },
  { name: "InvoiceType", label: "Invoice Type ", type: "text" },
  { name: "InvoiceTypeCode", label: "Invoice Type Code", type: "text" },

  { name: "Tags", label: "Tags", type: "select" },
];
export const RecoveryType: Array<{
  name: keyof TrecoveryTypeValidators;
  label: string;
  type: "text" | "date" | "number" | "select";
}> = [
  { name: "AccountCode", label: "Account Code", type: "select" },
  { name: "RecoveryType", label: "Recovery Type ", type: "text" },
  { name: "RecoveryTypeCode", label: "Recovery Type Code", type: "text" },

  { name: "Tags", label: "Tags", type: "select" },
];
export const UnitsOfMeasurement: Array<{
  name: keyof TunitsOFMeasurementValidators;
  label: string;
  type: "text" | "date" | "number" | "select";
}> = [
  { name: "UOMCode", label: "UOM Code", type: "text" },
  { name: "UOMDescription", label: "UOM Description", type: "text" },
  { name: "AllowableDecimal", label: "Allowable Decimal ", type: "number" },

  { name: "Tags", label: "Tags", type: "select" },
];
export const Activity: Array<{
  name: keyof TactivityValidators;
  label: string;
  type: "text" | "date" | "number" | "select";
}> = [
  { name: "ActivityCode", label: "Activity Code", type: "text" },
  { name: "ActivityDescription", label: "Activity Description", type: "text" },
  { name: "CostType", label: "Cost Type ", type: "select" },
  { name: "UOM", label: "UOM Code", type: "select" },

  { name: "Tags", label: "Tags", type: "select" },
];
export const SCItemCode: Array<{
  name: keyof TScItemCodeValidators;
  label: string;
  type: "text" | "date" | "number" | "select";
}> = [
  {
    name: "MajorSCItemGroupCode",
    label: "Major SC Item Group Code",
    type: "select",
  },
  {
    name: "MajorSCItemGroupDescription",
    label: "Major SC Item Group  Description",
    type: "text",
  },
  { name: "Component", label: "Component", type: "select" },
  { name: "ComponentPercentage", label: "Component Percentage", type: "text" },
  { name: "UOM", label: "UOM Code", type: "select" },
  { name: "Tags", label: "Tags", type: "select" },
];

export const Machine: Array<{
  name: keyof TmachineValidators;
  label: string;
  type: "text" | "date" | "number" | "select";
}> = [
  { name: "MachineCode", label: "Machine Code", type: "text" },
  { name: "MachineDescription", label: "Machine Description", type: "text" },
  { name: "MachineGroupCode", label: "Machine Group Code", type: "select" },
  {
    name: "MachineGroupDescription",
    label: "Machine Group Description",
    type: "text",
  },
  { name: "MachineClassCode", label: "Machine Class Code", type: "text" },
  {
    name: "MachineClassDescription",
    label: "Machine Class Description",
    type: "text",
  },
  { name: "MachineOwnership", label: "Machine Ownership", type: "select" },
];

export const Bank: Array<{
  name: keyof TbankValidators;
  label: string;
  type: "text" | "number" | "select";
}> = [
  { name: "BankCode", label: "Bank Code", type: "text" },
  { name: "BankName", label: "Bank Name", type: "text" },
  { name: "BankAddress", label: "Bank Address", type: "text" },
  { name: "City", label: "City", type: "text" },
  { name: "State", label: "State", type: "select" },

  { name: "PIN", label: "PIN", type: "text" },
  { name: "AccountNo", label: "Account Number", type: "text" },
  { name: "IFSC", label: "IFSC Code", type: "text" },
  { name: "MICR", label: "MICR Code", type: "text" },
  { name: "AccountType", label: "Account Type", type: "text" },
  {
    name: "AuthorisedSignatory1",
    label: "Authorised Signatory 1",
    type: "text",
  },
  { name: "ChequeStartingNo", label: "Cheque Starting Number", type: "text" },
  {
    name: "AuthorisedSignatory2",
    label: "Authorised Signatory 2",
    type: "text",
  },
  { name: "Tags", label: "Tags", type: "select" },
];

export const Account: Array<{
  name: keyof TaccountValidators;
  label: string;
  type: "text" | "number" | "select";
}> = [
  {
    name: "AccountCode",
    label: "Account Code",
    type: "text",
  },
  {
    name: "AccountDescription",
    label: "Account Description",
    type: "text",
  },
  {
    name: "AccountType",
    label: "Account Type",
    type: "select",
  },
  {
    name: "SubAccountType",
    label: "Sub Account Type",
    type: "text",
  },
  {
    name: "Ledger",
    label: "Ledger",
    type: "select",
  },
  {
    name: "ActivityCode",
    label: "Activity Code",
    type: "select",
  },
  {
    name: "ActivityDescription",
    label: "Activity Description",
    type: "text",
  },
  {
    name: "CostHead",
    label: "Cost Head",
    type: "text",
  },
  {
    name: "Tags",
    label: "Tags",
    type: "select",
  },
];
export const MaterialGroup: Array<{
  name: keyof TmaterialGroupValidators;
  label: string;
  type: "text" | "number" | "select";
}> = [
  {
    name: "MaterialGroupCode",
    label: "Material Group Code",
    type: "text",
  },
  {
    name: "MaterialMajorGroupDescription",
    label: "Material Major Group Description",
    type: "text",
  },
  {
    name: "MaterialMinorGroupDescription",
    label: "Material Minor Group Description",
    type: "text",
  },
  {
    name: "MaterialSubGroupDescription",
    label: "Material Sub Group Description",
    type: "text",
  },
  {
    name: "MaterialSubSubGroupDescription",
    label: "Material Sub Sub Group Description",
    type: "text",
  },
  {
    name: "CategoryTag",
    label: "Category Tag",
    type: "select",
  },
  { name: "Tags", label: "Tags", type: "select" },
];

export const Material: Array<{
  name: keyof TmaterialValidators;
  label: string;
  type: "text" | "number" | "select";
}> = [
  { name: "MaterialGroupCode", label: "Material Group Code", type: "select" },
  { name: "MaterialCode", label: "Material Code", type: "text" },
  { name: "MaterialDescription", label: "Material Description", type: "text" },
  {
    name: "MaterialAdditionalDescription",
    label: "Material Additional Description",
    type: "text",
  },
  { name: "UOM", label: "Unit of Measure", type: "select" },
  { name: "Tags", label: "Tags", type: "select" },
];

export const MachineGroup: Array<{
  name: keyof TmachineGroupValidators;
  label: string;
  type: "text" | "number" | "select";
}> = [
  { name: "MachineGroupCode", label: "Machine Group Code", type: "text" },
  {
    name: "MachineGroupDescription",
    label: "Machine Group Description",
    type: "text",
  },
  {
    name: "MachineGroupLongDescription",
    label: "Machine Group Long Description",
    type: "text",
  },
  { name: "MachineClassCode", label: "Machine Class Code", type: "select" },
  {
    name: "MachineClassDescription",
    label: "Machine Class Description",
    type: "text",
  },
  { name: "Tags", label: "Tag", type: "select" },
];

export const BenefitsMaster: Array<{
  name: keyof TbenefitsMastervalidators;
  label: string;
  type: "text" | "number" | "select";
}> = [
  { name: "BenefitCode", label: "Benefit Code", type: "text" },
  { name: "BenefitDescription", label: "Benefit Description", type: "text" },
  {
    name: "PercentageOfBasicWage",
    label: "Percentage of Basic Wage",
    type: "number",
  },
  { name: "ApplicableFor", label: "Applicable For", type: "select" },
  { name: "AccountCode", label: "Account", type: "select" },
  { name: "AccountDescription", label: "Account Description", type: "text" },
  { name: "Tags", label: "Tags", type: "select" },
];

export const MajorScItemGroup: Array<{
  name: keyof TmajorScItemGroupValidators;
  label: string;
  type: "text" | "select";
}> = [
  {
    name: "MajorSCItemGroupCode",
    label: "Major SC Item Group Code",
    type: "text",
  },
  {
    name: "MajorSCItemGroupStatus",
    label: "Major SC Item Group Status",
    type: "text",
  },
  {
    name: "MajorSCItemGroupDescription",
    label: "Major SC Item Group Description",
    type: "text",
  },
  { name: "UOM", label: "Unit of Measure", type: "select" },
  { name: "GroupCategory", label: "Group Category", type: "select" },
  { name: "Tags", label: "Tags", type: "select" },
];
export const ShiftMaster: Array<{
  name: keyof TshiftMasterValidators;
  label: string;
  type: "text" | "select";
}> = [
  {
    name: "ShiftCode",
    label: "Shift Code",
    type: "text",
  },
  { name: "ShiftInTime", label: "Shift In Time (24 hr format)", type: "text" },
  {
    name: "ShiftOutTime",
    label: "Shift Out Time (24 hr format) ",
    type: "text",
  },
  { name: "Tags", label: "Tags", type: "select" },
];

export const WorkmenDetails: Array<{
  name: keyof TWorkmenDetailsValidators;
  label: string;
  type: "text" | "number" | "select" | "date";
  conditional?: boolean;
}> = [
  { name: "WorkmenCode", label: "Workmen Code", type: "text" },
  { name: "WorkmenType", label: "Workmen Type", type: "text" },
  { name: "WorkmenName", label: "Workmen Name", type: "text" },
  { name: "FatherHusbandName", label: "Father/Husband Name", type: "text" },
  { name: "DateOfBirth", label: "Date Of Birth", type: "date" },
  { name: "Gender", label: "Gender", type: "select" },
  { name: "Religion", label: "Religion", type: "text" },
  { name: "MotherTongue", label: "Mother Tongue", type: "text" },
  { name: "PresentAddress", label: "Present Address", type: "text" },
  { name: "PermanentAddress", label: "Permanent Address", type: "text" },
  { name: "Phone", label: "Phone Number", type: "number" },
  {
    name: "EmergencyContactNumber",
    label: "Emergency Contact Number",
    type: "number",
  },
  { name: "MaritalStatus", label: "Marital Status", type: "select" },
  { name: "IdentificationMark", label: "Identification Mark", type: "text" },
  { name: "HeightCm", label: "Height (cm)", type: "number" },
  { name: "WeightKg", label: "Weight (kg)", type: "number" },
  { name: "Vision", label: "Vision", type: "select" },
  { name: "LeftEye", label: "Left Eye", type: "number", conditional: true },
  { name: "RightEye", label: "Right Eye", type: "number", conditional: true },
  {
    name: "EducationalQualification",
    label: "Educational Qualification",
    type: "text",
  },
  {
    name: "PastExperienceInYears",
    label: "Past Experience (Years)",
    type: "number",
  },
  {
    name: "PastExperienceInMonths",
    label: "Past Experience (Months)",
    type: "number",
  },
  { name: "DateOfJoining", label: "Date Of Joining", type: "date" },
  { name: "DateOfExit", label: "Date Of Exit", type: "date" },
  { name: "Designation", label: "Designation", type: "text" },
  { name: "SkillCategory", label: "Skill Category", type: "select" },
  { name: "PfAccountNo", label: "PF Account Number", type: "text" },
  {
    name: "UniversalAccountNo",
    label: "Universal Account Number",
    type: "text",
  },
  { name: "Esic", label: "ESIC", type: "text" },
  { name: "BankAccountNo", label: "Bank Account Number", type: "text" },
  { name: "BankName", label: "Bank Name", type: "text" },
  { name: "Ifsc", label: "IFSC code", type: "text" },
  { name: "Aadhar", label: "Aadhar Number", type: "number" },
  { name: "Pan", label: "PAN Card Number", type: "text" },
  { name: "Wages", label: "Wages (in rupees)", type: "number" },
  { name: "WagesType", label: "Wages Type", type: "select" },
  { name: "OTType", label: "OT Type", type: "select" },
  { name: "Benefits", label: "Benefits", type: "select" },
];

export const Vendor: Array<{
  name: keyof TvendorValidators;
  label: string;
  type: "text" | "select" | "number";
}> = [
  {
    name: "VendorCode",
    label: "Vendor Code",
    type: "text",
  },
  {
    name: "VendorName",
    label: "Vendor Name",
    type: "text",
  },
  {
    name: "CorporateOffice",
    label: "Corporate Office",
    type: "text",
  },
  {
    name: "RegisteredOffice",
    label: "Registered Office",
    type: "text",
  },
  {
    name: "Phone",
    label: "Phone",
    type: "number",
  },
  {
    name: "Email",
    label: "Email",
    type: "text",
  },
  {
    name: "GSTStatus",
    label: "GST Status",
    type: "select",
  },
  {
    name: "Website",
    label: "Website",
    type: "text",
  },
  {
    name: "PAN",
    label: "PAN",
    type: "text",
  },
  {
    name: "ServiceTaxRegNo",
    label: "Service Tax Reg. No.",
    type: "text",
  },
  {
    name: "CINLLPIN",
    label: "CIN/LLPN",
    type: "text",
  },

  {
    name: "VendorTag",
    label: "Vendor Tag",
    type: "select",
  },
  {
    name: "BankName",
    label: "Bank Name",
    type: "text",
  },
  {
    name: "IFSCCode",
    label: "IFSC Code",
    type: "text",
  },
  {
    name: "AccountNo",
    label: "Account No.",
    type: "text",
  },
  {
    name: "Tags",
    label: "Tags",
    type: "select",
  },
];

export const EmployeeMaster: Array<{
  name: keyof TEmployeeMasterValidators;
  label: string;
  type: "text" | "number" | "select" | "date";
  conditional?: boolean;
}> = [
  { name: "EmployeeCode", label: "Employee Code", type: "text" },
  { name: "FatherHusbandName", label: "Father/Husband Name", type: "text" },
  { name: "EmployeeType", label: "Employee Type", type: "select" },
  { name: "DateOfBirth", label: "Date Of Birth", type: "date" },
  { name: "EmployeeFirstName", label: "Employee First Name", type: "text" },
  { name: "EmployeeLastName", label: "Employee Last Name", type: "text" },
  { name: "Email", label: "Email", type: "text" },
  { name: "Password", label: "Password", type: "text" },
  { name: "Gender", label: "Gender", type: "select" },
  { name: "Religion", label: "Religion", type: "text" },
  { name: "MotherTongue", label: "Mother Tongue", type: "text" },
  { name: "PresentAddress", label: "Present Address", type: "text" },
  { name: "PermanentAddress", label: "Permanent Address", type: "text" },
  { name: "Phone", label: "Phone Number", type: "number" },
  {
    name: "EmergencyContactNumber",
    label: "Emergency Contact Number",
    type: "number",
  },
  { name: "MaritalStatus", label: "Marital Status", type: "select" },
  { name: "IdentificationMark", label: "Identification Mark", type: "text" },
  { name: "HeightCm", label: "Height (cm)", type: "number" },
  { name: "WeightKg", label: "Weight (kg)", type: "number" },
  { name: "Vision", label: "Vision", type: "select" },
  { name: "LeftEye", label: "Left Eye", type: "text", conditional: true },
  { name: "RightEye", label: "Right Eye", type: "text", conditional: true },
  {
    name: "EducationalQualification",
    label: "Educational Qualification",
    type: "text",
  },
  { name: "PastExperience", label: "Past Experience", type: "text" },
  { name: "DateOfJoining", label: "Date Of Joining", type: "date" },
  { name: "DateOfExit", label: "Date Of Exit", type: "date" },
  { name: "Designation", label: "Designation", type: "text" },
  { name: "RoleDescription", label: "Role Description", type: "text" },
  { name: "PfAccountNo", label: "PF Account Number", type: "text" },
  {
    name: "UniversalAccountNo",
    label: "Universal Account Number",
    type: "text",
  },
  { name: "Esic", label: "ESIC", type: "text" },
  { name: "BankAccountNo", label: "Bank Account Number", type: "text" },
  { name: "BankName", label: "Bank Name", type: "text" },
  { name: "Ifsc", label: "IFSC code", type: "text" },
  { name: "Aadhar", label: "Aadhar Number", type: "number" },
  { name: "Pan", label: "PAN Card Number", type: "text" },
  { name: "Wages", label: "Wages (in rupees)", type: "number" },
  { name: "OTType", label: "OT Type", type: "select" },
  { name: "Benefits", label: "Benefits", type: "select" },
  { name: "CompanyName", label: "Company Name", type: "select" },
  { name: "Tags", label: "Tags", type: "select" },
];
