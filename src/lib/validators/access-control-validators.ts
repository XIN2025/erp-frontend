import { z } from "zod";

export const accessControlValdiators = z.object({
  EmployeeCode: z.string().min(1, "Employee Code is required!"),

  email: z.string().email().optional(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  phone_number: z.string().optional(),
});

export type TaccessControlValdiators = z.infer<typeof accessControlValdiators>;
