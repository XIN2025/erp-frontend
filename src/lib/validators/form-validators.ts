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

// Gsts: z.array(
//     z.object({
//       id: z.string(),
//       SerialNo: z.number(),
//       GSTRegNo: z.string().min(1, "GST reg. no. is required!"),
//       GSTState: z.string().min(1, "GST state is required!"),
//       GSTAddress: z.string().min(1, "GST address is required!"),
//       companyDetailsID: z.string().min(1, "Company Name is required!"),
//     })
//   ),

// Define the schema for the table data

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
