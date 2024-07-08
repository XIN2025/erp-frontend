import {
  TEmployeeJoinValidators,
  TEmployeeReleaseValidators,
} from "@/lib/validators/project-hr-form-validators";

export const EmployeeJoin: Array<{
  name: keyof TEmployeeJoinValidators;
  label: string;
  type: "text" | "number" | "select" | "date";
  conditional?: boolean;
}> = [
  { name: "ProjectCodeOrName", label: "Project Code / Name", type: "text" },
  { name: "CustomerName", label: "Customer Name", type: "text" },
  { name: "CostCentre", label: "Cost Centre", type: "text" },
  { name: "Allowances", label: "Allowances", type: "select" },
  { name: "WagesType", label: "Wages Type", type: "select" },
  { name: "NameOfEmployee", label: "Employee Name", type: "text" },
  { name: "EmployeeType", label: "Employee Type", type: "select" },
  { name: "FatherHusbandName", label: "Father/Husband Name", type: "text" },
  { name: "DateOfBirth", label: "Date of Birth", type: "date" },
  { name: "EmployeeFirstName", label: "Employee First Name", type: "text" },
  { name: "EmployeeLastName", label: "Employee Last Name", type: "text" },
  { name: "Email", label: "Email", type: "text" },
  { name: "Gender", label: "Gender", type: "select" },
  { name: "Religion", label: "Religion", type: "text" },
  { name: "MotherTongue", label: "Mother Tongue", type: "text" },
  { name: "PresentAddress", label: "Present Address", type: "text" },
  { name: "PermanentAddress", label: "Permanent Address", type: "text" },
  { name: "Phone", label: "Phone Number", type: "text" },
  {
    name: "EmergencyContactNumber",
    label: "Emergency Contact Number",
    type: "text",
  },
  { name: "MaritalStatus", label: "Marital Status", type: "select" },
  { name: "IdentificationMark", label: "Identification Mark", type: "text" },
  { name: "HeightCm", label: "Height (cm)", type: "number" },
  { name: "WeightKg", label: "Weight (kg)", type: "number" },
  { name: "Vision", label: "Vision", type: "select" },
  {
    name: "LeftEye",
    label: "Left Eye",
    type: "text",
    conditional: true,
  },
  {
    name: "RightEye",
    label: "Right Eye",
    type: "text",
    conditional: true,
  },
  {
    name: "EducationalQualification",
    label: "Educational Qualification",
    type: "text",
  },
  { name: "PastExperience", label: "Past Experience", type: "text" },
  { name: "Designation", label: "Designation", type: "text" },
  { name: "FunctionalRole", label: "Functional Role", type: "text" },
  { name: "PFAccountNumber", label: "PF Account Number", type: "text" },
  {
    name: "UniversalAccountNumber",
    label: "Universal Account Number",
    type: "text",
  },
  { name: "ESIC", label: "ESIC", type: "text" },
  { name: "BankAccountNumber", label: "Bank Account Number", type: "text" },
  { name: "BankName", label: "Bank Name", type: "text" },
  { name: "IFSC", label: "IFSC", type: "text" },
  { name: "Aadhar", label: "Aadhar", type: "text" },
  { name: "PAN", label: "PAN", type: "text" },
  { name: "Wages", label: "Wages (₹)", type: "number" },
  { name: "OTType", label: "OT Type", type: "select" },
  { name: "ProjectBenefits", label: "Project Benefits", type: "text" },
  { name: "Company", label: "Company", type: "select" },
  { name: "DateOfJoining", label: "Date of Joining", type: "date" },
  { name: "DateOfExit", label: "Date of Exit", type: "date" },
  { name: "ProjectJoiningDate", label: "Project Joining Date", type: "date" },
  { name: "Benefits", label: "Benefits", type: "select" },
  { name: "Tags", label: "Tags", type: "select" },
];

export const EmployeeRelease: Array<{
  name: keyof TEmployeeReleaseValidators;
  label: string;
  type: "text" | "number" | "select" | "date";
  conditional?: boolean;
}> = [
  { name: "ProjectCodeOrName", label: "Project Code / Name", type: "text" },
  { name: "CustomerName", label: "Customer Name", type: "text" },
  { name: "CostCentre", label: "Cost Centre", type: "text" },
  { name: "EmployeeCodeOrName", label: "Employee Code/Name", type: "text" },
  { name: "ReleaseDate", label: "Release Date", type: "date" },
];
