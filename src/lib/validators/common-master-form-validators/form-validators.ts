import { z } from "zod";

export const companyDetailsValidtor = z.object({
  CompanyName: z.string().min(1, "Company Name is required!"),
  RegisteredOfficeAddress: z.string().optional(),
  CertificateOfIncorporationNo: z.string().optional(),
  COIDate: z.date().optional(), // Add the date field
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
  Status: z.string(),
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
  CINLLPN: z.string().min(1, "CIN/LLPN number is required!"),
  Tags: z.string().min(1, "At least one Tag is required!"),
});

export type TcustomerValidator = z.infer<typeof customerValidator>;

export const employeeMasterValidator = z.object({
  EmployeeCode: z.string().trim().min(1, "Employee Code is required!"),
  EmployeeType: z.string().trim().min(1, "Employee Type is required!"),
  Email: z.string().email("Invalid email format!").optional(),
  FatherHusbandName: z.string().trim().optional(),
  DateOfBirth: z.string().optional(),
  EmployeeFirstName: z.string().trim().optional(),
  EmployeeLastName: z.string().trim().optional(),
  Gender: z.string().optional(),
  Religion: z.string().optional(),
  MotherTongue: z.string().optional(),
  PresentAddress: z.string().optional(),
  PermanentAddress: z.string().optional(),
  Phone: z.string().optional(),
  EmergencyContactNumber: z.string().optional(),
  MaritalStatus: z.string().optional(),
  IdentificationMark: z.string().optional(),
  HeightInCM: z.number().optional(),
  WeightInKG: z.number().optional(),
  Vision: z.string().optional(),
  EducationalQualification: z.string().optional(),
  PastExperience: z.string().optional(),
  DateOfJoining: z.string().optional(),
  DateOfExit: z.string().optional(),
  Designation: z.string().optional(),
  RoleDescription: z.string().optional(),
  PfAccountNumber: z.string().optional(),
  UniversalAccountNumber: z.string().optional(),
  Esic: z.string().optional(),
  BankAccountNumber: z.string().optional(),
  BankName: z.string().optional(),
  Ifsc: z.string().optional(),
  Aadhar: z.string().optional(),
  Pan: z.string().optional(),
  WagesInRupees: z.number().optional(),
  OTType: z.string().optional(),
  Benefits: z.string(),
  CompanyName: z.string().min(1, "Company Name is required!"),
  Tags: z.string().min(1, "At least one Tag is required!"),
});

export type TemployeeMasterValidator = z.infer<typeof employeeMasterValidator>;

export const costCenterValidator = z.object({
  CompanyName: z.string().min(1, "Company Name is required!"),
  CostCenterName: z.string().min(1, "Cost Center Name is requried! "),
  ProjectSiteAddress: z.string().min(1, "Project Site Address is requried! "),
  Tags: z.string().min(1, "At least one Tag is required!"),
});

export type TcostCenterValidator = z.infer<typeof costCenterValidator>;
