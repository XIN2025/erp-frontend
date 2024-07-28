import { z } from "zod";

export const projectValidators = z.object({
  CompanyName: z.string().min(1, "Company Name is required!"),
  ProjectStatus: z.string().min(1, "Project Status is required!"),
  CompanyGSTNo: z.string().optional(),
  BusinessUnit: z.string().min(1, "Business Unit is required!"),
  Currency: z.string().min(1, "Currency is required!"),
  CustomerName: z.string().min(1, "Customer Name is required!"),
  CustomerGST: z.string().optional(),
  CostCentre: z.string().min(1, "Cost Centre is required!"),
  CostCentreGST: z.string().min(1, "Cost Centre GST is required!"),
  WareHouse: z.string().min(1, "WareHouse is required!"),
  WareHouseGST: z.string().min(1, "WareHouse GST is required!"),
  DirectSub: z.string().min(1, "Direct/Sub selection is required!"),
  Owner: z.string().optional(),
  ProjectOrderValue: z.number().positive(),
  OrderReferenceNo: z.string(),
  OrderReferenceDate: z.date(),
  OrderType: z.string().min(1, "Order Type is required!"),
  TenderRefNo: z.string().optional(),
  ProjectStartDate: z.date(),
  ProjectEndDate: z.date(),
  Duration: z.string().min(1, "Duration is required!"),
  ProjectShortDescription: z.string().min(1, "Short Description is required!"),
  ProjectLongDescription: z.string().optional(),
  InvoiceTo: z.string().min(1, "Invoice To is required!"),
  ConsigneeName: z.string().optional(),
  InvoiceAddress: z.string().min(1, "Invoice Address is required!"),
  DeliveryAddress: z.string().min(1, "Delivery Address is required!"),
});

export type TProjectValidators = z.infer<typeof projectValidators>;
