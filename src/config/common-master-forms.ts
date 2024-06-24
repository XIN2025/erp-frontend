import {
  TbusinessUnitValidator,
  TcompanyDetailsValidtor,
  TcustomerValidator,
} from "@/lib/validators/form-validators";

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
  { name: "Status", label: "Status", type: "text" },
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
  { name: "CINLLPN", label: "CIN/LLPN", type: "text" },
  { name: "Tags", label: "Tags", type: "text" },
];
