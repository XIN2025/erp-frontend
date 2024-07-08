import { z } from "zod";

export const EmployeeJoinValidators = z
  .object({
    ProjectCodeOrName: z.string().min(1, "Project Code or Name is required!"),
    CustomerName: z.string().min(1, "Customer Name is required!"),
    CostCentre: z.string().min(1, "Cost Centre is required!"),
    Allowances: z.string().min(1, "Allowances is required!"),
    WagesType: z.string().min(1, "Wages Type is required!"),
    NameOfEmployee: z.string().min(1, "Name of Employee is required!"),
    EmployeeType: z.string().min(1, "Employee Type is required!"),
    FatherHusbandName: z.string().min(1, "Father/Husband Name is required!"),
    DateOfBirth: z.string().min(1, "Date of Birth is required!"),
    EmployeeFirstName: z.string().min(1, "Employee First Name is required!"),
    EmployeeLastName: z.string().min(1, "Employee Last Name is required!"),
    Email: z
      .string()
      .email("Invalid email format")
      .min(1, "Email is required!"),
    Gender: z.string().min(1, "Gender is required!"),
    Religion: z.string().min(1, "Religion is required!"),
    MotherTongue: z.string().min(1, "Mother Tongue is required!"),
    PresentAddress: z.string().min(1, "Present Address is required!"),
    PermanentAddress: z.string().min(1, "Permanent Address is required!"),
    Phone: z.string().min(10, "Phone number must be at least 10 characters"),
    EmergencyContactNumber: z
      .string()
      .min(10, "Contact number must be at least 10 characters"),
    MaritalStatus: z.string().min(1, "Marital Status is required!"),
    IdentificationMark: z.string().min(1, "Identification Mark is required!"),
    HeightCm: z.coerce.number().min(1, "Height must be a positive number"),
    WeightKg: z.coerce.number().min(1, "Weight must be a positive number"),
    Vision: z.string().min(1, "Vision is required"),
    LeftEye: z.string().optional(),
    RightEye: z.string().optional(),
    EducationalQualification: z
      .string()
      .min(1, "Educational Qualification is required!"),
    PastExperience: z.string().min(1, "Past Experience is required!"),
    Designation: z.string().min(1, "Designation is required!"),
    FunctionalRole: z.string().min(1, "Functional Role is required!"),
    PFAccountNumber: z.string().min(1, "PF Account Number is required!"),
    UniversalAccountNumber: z
      .string()
      .min(1, "Universal Account Number is required!"),
    ESIC: z.string().min(1, "ESIC is required!"),
    BankAccountNumber: z.string().min(1, "Bank Account Number is required!"),
    BankName: z.string().min(1, "Bank Name is required!"),
    IFSC: z.string().min(1, "IFSC is required!"),
    Aadhar: z.string().min(1, "Aadhar is required!"),
    PAN: z.string().min(1, "PAN is required!"),
    Wages: z.coerce.number().min(1, "Wages in rupees is required!"),
    OTType: z.string().min(1, "OT Type is required!"),
    ProjectBenefits: z.string().min(1, "Project Benefits is required!"),
    Company: z.string().min(1, "Company is required!"),
    DateOfJoining: z.string().min(1, "Date of Joining is required!"),
    DateOfExit: z.string().optional(),
    ProjectJoiningDate: z.string().min(1, "Project Joining Date is required!"),

    Benefits: z.string().min(1, "Benefits is required!"),
    Tags: z.string().optional(),
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

export type TEmployeeJoinValidators = z.infer<typeof EmployeeJoinValidators>;

export const EmployeeReleaseValidators = z.object({
  ProjectCodeOrName: z.string().min(1, "Project Code or Name is required!"),
  CustomerName: z.string().min(1, "Customer Name is required!"),
  CostCentre: z.string().min(1, "Cost Centre is required!"),
  EmployeeCodeOrName: z.string().min(1, "Employee Code / Name is required!"),
  ReleaseDate: z.date(),
});

export type TEmployeeReleaseValidators = z.infer<
  typeof EmployeeReleaseValidators
>;
