import { TaccessControlValdiators } from "@/lib/validators/access-control-validators";

export const AccessControl: Array<{
  name: keyof TaccessControlValdiators;
  label: string;
  type: "text" | "date" | "number" | "select";
}> = [{ name: "EmployeeCode", label: "Employee Code", type: "select" }];
