import { z } from "zod";

export const companyDetailsValidtor = z.object({
  CompanyName: z.string().min(1, "Company Name is required!"),
  RegisteredOfficeAddress: z.string().optional(),
  CertificateOfIncorporationNo: z.string().optional(),
  COIDate: z.date().optional(),
  ServiceTaxRegistrationNo: z.string().optional(),
  VATRegistrationNo: z.string().optional(),
  PFRegistrationNo: z.string().optional(),
  PFState: z.string().optional(),
  PFSubRegistrationNo: z.string().optional(),
  PFSubState: z.string().optional(),
  ESIRegistrationNo: z.string().optional(),
  ESIState: z.string().optional(),
  ESISubRegistrationNo: z.string().optional(),
  ESISubState: z.string().optional(),
  PermanentAccountNumber: z.string().optional(),
  MSME: z.string().optional(),
  MSMEUdyam: z.string().optional(),

  Tags: z.string(),
});

export type TcompanyDetailsValidtor = z.infer<typeof companyDetailsValidtor>;

export const businessUnitValidator = z.object({
  CompanyName: z.string().min(1, "Company Name is required!"),
  BusinessUnit: z.string().min(1, "Buisness Unit is required"),
  BusinessDescription: z.string().min(1, "Buisness Description is required"),
  Tags: z.string().min(1, "Tag is required"),
});

export type TbusinessUnitValidator = z.infer<typeof businessUnitValidator>;

export const customerValidator = z.object({
  CustomerCode: z.string().min(1, "Customer Code is required!"),
  CustomerName: z.string().min(1, "Customer Name is required!"),
  CorporateOffice: z.string().min(1, "Corporate Office address is required!"),
  RegisteredOffice: z.string().min(1, "Registered Office address is required!"),

  Phone: z.string().min(1, "Phone number is required!"),
  Email: z
    .string()
    .email("Please enter a valid email address")
    .min(1, "Email is required!"),
  Website: z.string().min(1, "Website URL is required!"),
  PAN: z.string().min(1, "PAN number is required!"),
  ServiceTaxRegNo: z.string().min(1, "Service Tax Reg No is required!"),
  CINLLPIN: z.string().min(1, "CIN/LLPIN number is required!"),
  Tags: z.string().min(1, "At least one Tag is required!"),
});

export type TcustomerValidator = z.infer<typeof customerValidator>;

export const costCenterValidator = z.object({
  CompanyName: z.string().min(1, "Company Name is required!"),
  CostCenterName: z.string().min(1, "Cost Center Name is requried! "),
  ProjectSiteAddress: z.string().min(1, "Project Site Address is requried! "),
  Tags: z.string().min(1, "At least one Tag is required!"),
});

export type TcostCenterValidator = z.infer<typeof costCenterValidator>;

export const currencyValidator = z.object({
  CurrencyCode: z.string().min(1, "Currency Code is required!"),
  CurrencyName: z.string().min(1, "Currency Name is requried! "),

  Tags: z.string().min(1, "At least one Tag is required!"),
});

export type TcurrencyValidator = z.infer<typeof currencyValidator>;

export const warehouseValidators = z.object({
  CompanyName: z.string().min(1, "Company Name is required!"),
  CostCenterName: z.string().min(1, "Cost Center Name is requried! "),
  WareHouseName: z.string().min(1, "Warehouse Name is requried! "),
  ProjectSiteAddress: z.string().min(1, "Project Site Address is requried! "),

  Tags: z.string().min(1, "At least one Tag is required!"),
});

export type TwarehouseValidators = z.infer<typeof warehouseValidators>;

export const goodsReceiptValidators = z.object({
  ReceiptCode: z.string().min(1, "Receipt code is required!"),
  ReceiptDescription: z.string().min(1, "Receipt Description is requried! "),
});

export type TgoodsReceiptValidators = z.infer<typeof goodsReceiptValidators>;
export const machineClassValidators = z.object({
  MachineClassCode: z.string().min(1, "Machine Class Code is required!"),
  MaterialClassDescription: z
    .string()
    .min(1, "Machine Class Description is requried! "),
  Tags: z.string().min(1, "At least one Tag is required!"),
});

export type TmachineClassValidators = z.infer<typeof machineClassValidators>;
export const invoiceTypeValidators = z.object({
  InvoiceTypeCode: z.string().min(1, "Invoice Type Code is required!"),
  InvoiceType: z.string().min(1, "Invoice Type is required!"),
  AccountCode: z.string().min(1, " Account Code is required!"),

  Tags: z.string().min(1, "At least one Tag is required!"),
});

export type TinvoiceTypeValidators = z.infer<typeof invoiceTypeValidators>;
export const recoveryTypeValidators = z.object({
  RecoveryTypeCode: z.string().min(1, "Recovery Type Code is required!"),
  RecoveryType: z.string().min(1, "Recovery Type is required!"),
  AccountCode: z.string().min(1, " Account Code is required!"),

  Tags: z.string().min(1, "At least one Tag is required!"),
});

export type TrecoveryTypeValidators = z.infer<typeof recoveryTypeValidators>;
export const unitsOFMeasurementValidators = z.object({
  UOMCode: z.string().min(1, "UOM Code is required!"),
  UOMDescription: z.string().min(1, "UOM description is required!"),
  AllowableDecimal: z.coerce.number().min(1, "Allowable decimal is required!"),

  Tags: z.string().min(1, "At least one Tag is required!"),
});

export type TunitsOFMeasurementValidators = z.infer<
  typeof unitsOFMeasurementValidators
>;
export const activityValidators = z.object({
  ActivityCode: z.string().min(1, "Activity Code is required!"),
  ActivityDescription: z.string().min(1, "Activity description is required!"),

  CostType: z.string().min(1, "Cost Type is required!"),
  UOM: z.string().min(1, "UOM Code is required!"),

  Tags: z.string().min(1, "At least one Tag is required!"),
});

export type TactivityValidators = z.infer<typeof activityValidators>;
export const machineValidators = z.object({
  MachineCode: z.string().min(1, "Machine Code is required!"),
  MachineDescription: z.string().min(1, "Machine Description is required!"),
  MachineGroupCode: z.string().min(1, "Machine Group Code is required!"),
  MachineGroupDescription: z
    .string()
    .min(1, "Machine Group Description is required!"),
  MachineClassCode: z.string().min(1, "Machine Class Code is required!"),
  MachineClassDescription: z
    .string()
    .min(1, "Machine Class Description is required!"),
  MachineOwnership: z.string().min(1, "Machine Ownership is required!"),
});

export type TmachineValidators = z.infer<typeof machineValidators>;

export const bankValidators = z.object({
  BankCode: z.string().min(1, "Bank Code is required!"),
  BankName: z.string().min(1, "Bank Name is required!"),
  BankAddress: z.string().min(1, "Bank Address is required!"),
  City: z.string().min(1, "City is required!"),
  State: z.string().min(1, "State is required!"),

  PIN: z.string().optional(),
  AccountNo: z.string().min(1, "Account Number is required!"),
  IFSC: z.string().min(1, "IFSC Code is required!"),
  MICR: z.string().min(1, "MICR Code is required!"),
  AccountType: z.string().min(1, "Account Type is required!"),
  AuthorisedSignatory1: z
    .string()
    .min(1, "Authorised Signatory 1 is required!"),
  ChequeStartingNo: z.string().optional(),
  AuthorisedSignatory2: z.string().optional(),
  Tags: z.string().min(1, "At least one Tag is required!"),
});

export type TbankValidators = z.infer<typeof bankValidators>;

export const accountValidators = z.object({
  AccountCode: z.string().min(1, "Account Code is required!"),
  AccountDescription: z.string().min(1, "Account Description is required!"),
  AccountType: z.string().min(1, "Account Type is required!"),

  SubAccountType: z.string().optional(),
  Ledger: z.string().optional(),

  ActivityCode: z.string().min(1, "Activity Code is required!"),
  ActivityDescription: z.string().min(1, "Activity Description is required!"),
  CostHead: z.string().min(1, "Cost Head is required!"),
  Tags: z.string().min(1, "At least one Tag is required!"),
});

export type TaccountValidators = z.infer<typeof accountValidators>;

export const materialGroupValidators = z.object({
  MaterialGroupCode: z.string().min(1, "Material Group Code is required!"),
  MaterialMajorGroupDescription: z.string().optional(),
  MaterialMinorGroupDescription: z.string().optional(),
  MaterialSubGroupDescription: z.string().optional(),
  MaterialSubSubGroupDescription: z.string().optional(),
  CategoryTag: z.string().optional(),
  Tags: z.string().optional(),
});

export type TmaterialGroupValidators = z.infer<typeof materialGroupValidators>;

export const shiftMasterValidators = z.object({
  ShiftCode: z.string().min(1, "Shift Code is required!"),
  ShiftInTime: z.string().min(1, "Shift In Time is required!"),
  ShiftOutTime: z.string().min(1, "Shift Out Time is required!"),

  Tags: z.string().optional(),
});

export type TshiftMasterValidators = z.infer<typeof shiftMasterValidators>;

export const materialValidators = z.object({
  MaterialGroupCode: z.string().min(1, "Material Group Code is required!"),
  MaterialCode: z.string().min(1, "Material Code is required!"),
  MaterialDescription: z.string().optional(),
  MaterialAdditionalDescription: z.string().optional(),
  UOM: z.string().optional(),
  Tags: z.string().optional(),
});

export type TmaterialValidators = z.infer<typeof materialValidators>;

export const machineGroupValidators = z.object({
  MachineGroupCode: z.string().min(1, "Machine Group Code is required!"),
  MachineGroupDescription: z
    .string()
    .min(1, "Machine Group Description is required!"),
  MachineGroupLongDescription: z
    .string()
    .min(1, "Machine Group Long Description is required!"),
  MachineClassCode: z.string().min(1, "Machine Class Code is required!"),
  MachineClassDescription: z
    .string()
    .min(1, "Machine Class Description is required!"),
  Tags: z.string().min(1, "Tag is required!"),
});

export type TmachineGroupValidators = z.infer<typeof machineGroupValidators>;

export const benefitsMasterValidators = z.object({
  BenefitCode: z.string().min(1, "Benefit Code is required!"),
  BenefitDescription: z.string().min(1, "Benefit Description is required!"),
  PercentageOfBasicWage: z
    .string()
    .min(1, "Percentage of Basic Wage is required!"),
  ApplicableFor: z.string().min(1, "Applicable For is required!"),
  AccountCode: z.string().min(1, "Account field is required!"),
  AccountDescription: z.string().min(1, "Account Description is required!"),
  Tags: z.string().optional(),
});

export type TbenefitsMastervalidators = z.infer<
  typeof benefitsMasterValidators
>;

export const majorScItemGroupValidators = z.object({
  MajorSCItemGroupCode: z
    .string()
    .min(1, "Major SC Item Group Code is required!"),
  MajorSCItemGroupStatus: z.string().min(1, "Status is required!"),
  MajorSCItemGroupDescription: z.string().min(1, "Description is required!"),
  UOM: z.string().min(1, "Unit of Measure is required!"),
  GroupCategory: z.string().min(1, "Group Category is required!"),

  Tags: z.string().optional(),
});

export type TmajorScItemGroupValidators = z.infer<
  typeof majorScItemGroupValidators
>;

export const ScItemCodeValidators = z.object({
  MajorSCItemGroupCode: z
    .string()
    .min(1, "Major SC Item Group Code is required!"),
  MajorSCItemGroupDescription: z.string().optional(),
  SCItemDescription: z.string().optional(),
  UOM: z.string().min(1, "Unit of Measure is required!"),
  Component: z.string().optional(),
  ComponentPercentage: z.string().optional(),

  Tags: z.string().optional(),
});

export type TScItemCodeValidators = z.infer<typeof ScItemCodeValidators>;

export const workmenDetailsValidators = z
  .object({
    WorkmenCode: z.string().min(1, "Workmen Code is required"),
    WorkmenType: z.string().min(1, "Workmen Type is required"),
    WorkmenName: z.string().min(1, "Workmen Name is required"),
    FatherHusbandName: z.string().min(1, "Father/Husband Name is required"),
    DateOfBirth: z.coerce.date().optional(),
    Gender: z.string().min(1, "Gender is required"),
    Religion: z.string().min(1, "Religion is required"),
    MotherTongue: z.string().min(1, "Mother Tongue is required"),
    PresentAddress: z.string().min(1, "Present Address is required"),
    PermanentAddress: z.string().min(1, "Permanent Address is required"),
    Phone: z.string().min(1, "Phone Number is required"),
    EmergencyContactNumber: z
      .string()
      .min(1, "Emergency Contact Number is required"),
    MaritalStatus: z.string().min(1, "Marital Status is required"),
    IdentificationMark: z.string().min(1, "Identification Mark is required"),
    HeightCm: z.coerce.number().min(1, "Height must be a positive number"),
    WeightKg: z.coerce.number().min(1, "Weight must be a positive number"),
    Vision: z.string().min(1, "Vision is required"),
    LeftEye: z.string().optional(),
    RightEye: z.string().optional(),
    EducationalQualification: z
      .string()
      .min(1, "Educational Qualification is required"),
    PastExperienceInYears: z.coerce
      .number()
      .min(1, "Past Experience in Years must be non-negative"),
    PastExperienceInMonths: z.coerce
      .number()
      .min(1, "Past Experience in Months must be non-negative"),

    DateOfJoining: z.coerce.date(),
    DateOfExit: z.coerce.date(),
    Designation: z.string().min(1, "Designation is required"),
    SkillCategory: z.string().min(1, "Skill Category is required"),
    PfAccountNo: z.string().min(1, "PF Account Number is required"),
    UniversalAccountNo: z
      .string()
      .min(1, "Universal Account Number is required"),
    Esic: z.string().min(1, "ESIC is required"),
    BankAccountNo: z.string().min(1, "Bank Account Number is required"),
    BankName: z.string().min(1, "Bank Name is required"),
    Ifsc: z.string().min(1, "IFSC code is required"),
    Aadhar: z.string().min(1, "Aadhar Number is required"),
    Pan: z.string().min(1, "PAN Card Number is required"),
    Wages: z.coerce.number().min(1, "Wages must be a positive number"),
    WagesType: z.string().min(1, "Wages Type is required"),
    OTType: z.string().min(1, "OT Type is required"),
    Benefits: z.string().min(1, "Benefits is required"),
  })
  .refine(
    (data) => {
      if (data.Vision === "Specs") {
        return !!data.LeftEye && !!data.RightEye;
      }
      return true;
    },
    {
      message: "Left Eye and Right Eye are required when Vision is Specs",
      path: ["LeftEye", "RightEye"],
    }
  );
export type TWorkmenDetailsValidators = z.infer<
  typeof workmenDetailsValidators
>;

export const vendorValidators = z.object({
  VendorCode: z.string().min(1, "Vendor Code is required!"),
  VendorName: z.string().min(1, "Vendor Name is required!"),
  CorporateOffice: z.string(),
  RegisteredOffice: z.string(),
  Phone: z.string(),
  Email: z.string().email("Invalid email format!"),
  GSTStatus: z.string(),
  Website: z.string().min(1, "Invalid website URL format!"),
  PAN: z.string().min(1, "PAN must be 10 characters long!"),
  ServiceTaxRegNo: z.string(),
  CINLLPIN: z.string(),

  VendorTag: z.string(),
  BankName: z.string(),
  IFSCCode: z.string().min(1, "IFSC Code must be 11 characters long!"),
  AccountNo: z.string(),
  Tags: z.string(),
});

export type TvendorValidators = z.infer<typeof vendorValidators>;

export const employeeMasterValidators = z
  .object({
    EmployeeCode: z.string().min(1, "Employee Code is required"),
    FatherHusbandName: z.string().min(1, "Father/Husband Name is required"),
    EmployeeType: z.string().min(1, "Employee Type is required"),
    DateOfBirth: z.date().optional(),
    EmployeeFirstName: z.string().min(1, "Employee First Name is required"),
    EmployeeLastName: z.string().min(1, "Employee Last Name is required"),
    Email: z
      .string()
      .email("Please enter a valid email address")
      .min(1, "Email is required!"),
    Gender: z.string().min(1, "Gender is required"),
    Religion: z.string().min(1, "Religion is required"),
    MotherTongue: z.string().min(1, "Mother Tongue is required"),
    PresentAddress: z.string().min(1, "Present Address is required"),
    PermanentAddress: z.string().min(1, "Permanent Address is required"),
    Phone: z.string().min(1, "Phone Number is required"),
    EmergencyContactNumber: z
      .string()
      .min(1, "Emergency Contact Number is required"),
    MaritalStatus: z.string().min(1, "Marital Status is required"),
    IdentificationMark: z.string().min(1, "Identification Mark is required"),
    HeightCm: z.coerce.number().min(1, "Height must be a positive number"),
    WeightKg: z.coerce.number().min(1, "Weight must be a positive number"),
    Vision: z.string().min(1, "Vision is required"),
    LeftEye: z.string().optional(),
    RightEye: z.string().optional(),
    EducationalQualification: z
      .string()
      .min(1, "Educational Qualification is required"),
    PastExperience: z.string().min(1, "Past Experience is required"),
    DateOfJoining: z.date().optional(),
    DateOfExit: z.date().optional(),
    Designation: z.string().min(1, "Designation is required"),
    RoleDescription: z.string().min(1, "Role Description is required"),
    PfAccountNo: z.string().min(1, "PF Account Number is required"),
    UniversalAccountNo: z
      .string()
      .min(1, "Universal Account Number is required"),
    Esic: z.string().min(1, "ESIC is required"),
    BankAccountNo: z.string().min(1, "Bank Account Number is required"),
    BankName: z.string().min(1, "Bank Name is required"),
    Ifsc: z.string().min(1, "IFSC code is required"),
    Aadhar: z.string().min(1, "Aadhar Number is required"),
    Pan: z.string().min(1, "PAN Card Number is required"),
    Wages: z.coerce.number().min(1, "Wages must be a positive number"),
    OTType: z.string().min(1, "OT Type is required"),
    Benefits: z.string().optional(),
    // Benefits: z.string().min(1, "Benefits is required"),
    CompanyName: z.string().min(1, "Company is required"),
    Tags: z.string().min(1, "Tag is required"),
  })
  .refine(
    (data) => {
      if (data.Vision === "Specs") {
        return !!data.LeftEye && !!data.RightEye;
      }
      return true;
    },
    {
      message: "Left Eye and Right Eye are required when Vision is Specs",
      path: ["LeftEye", "RightEye"],
    }
  );

export type TEmployeeMasterValidators = z.infer<
  typeof employeeMasterValidators
>;
