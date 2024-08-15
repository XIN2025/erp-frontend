import { TProjectValidators } from "@/lib/validators/sales-accounting-system-validators";

export const ProjectFields: Array<{
  name: keyof TProjectValidators;
  label: string;
  type: "text" | "number" | "select" | "date";
}> = [
  {
    name: "CompanyName",
    label: "Company Name",
    type: "select",
  },

  {
    name: "CompanyGSTNo",
    label: "Company GST No",
    type: "select",
  },
  {
    name: "BusinessUnit",
    label: "Business Unit",
    type: "select",
  },
  {
    name: "Currency",
    label: "Currency",
    type: "select",
  },
  {
    name: "CustomerName",
    label: "Customer Name",
    type: "select",
  },
  {
    name: "CustomerGSTNo",
    label: "Customer GST No",
    type: "select",
  },
  {
    name: "CostCenterName",
    label: "Cost Centre",
    type: "select",
  },
  {
    name: "CostCenterGSTNo",
    label: "Cost Centre GST No",
    type: "select",
  },
  {
    name: "WareHouse",
    label: "WareHouse",
    type: "select",
  },
  {
    name: "WareHouseGSTNo",
    label: "WareHouse GST No",
    type: "select",
  },
  {
    name: "DirectSub",
    label: "Direct/Sub  ",
    type: "select",
  },
  {
    name: "Owner",
    label: "Owner (If Sub) ",
    type: "text",
  },
  {
    name: "ProjectOrderValue",
    label: "Project Order Value",
    type: "number",
  },
  {
    name: "OrderReferenceNo",
    label: "Order Reference No",
    type: "text",
  },
  {
    name: "OrderReferenceDate",
    label: "Order Reference Date",
    type: "date",
  },
  {
    name: "OrderType",
    label: "Order Type",
    type: "select",
  },
  {
    name: "TenderRefNo",
    label: "Tender Ref No (If Any) ",
    type: "text",
  },
  {
    name: "ProjectStartDate",
    label: "Project Start Date",
    type: "date",
  },
  {
    name: "ProjectEndDate",
    label: "Project End Date",
    type: "date",
  },
  {
    name: "Duration",
    label: "Duration",
    type: "text",
  },
  {
    name: "ProjectShortDescription",
    label: "Short Description",
    type: "text",
  },
  {
    name: "ProjectLongDescription",
    label: "Long Description",
    type: "text",
  },
  {
    name: "InvoiceTo",
    label: "Invoice To",
    type: "text",
  },
  {
    name: "ConsigneeName",
    label: "Consignee Name",
    type: "text",
  },
  {
    name: "InvoiceAddress",
    label: "Invoice Address",
    type: "text",
  },
  {
    name: "DeliveryAddress",
    label: "Delivery Address",
    type: "text",
  },
  {
    name: "ProjectCode",
    label: "Project Code  ",
    type: "text",
  },
  {
    name: "Status",
    label: "Project Status",
    type: "select",
  },
];
