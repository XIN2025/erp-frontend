// components/access-control/AccessControlForm.tsx

import React, { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { Path, UseFormReturn, PathValue } from "react-hook-form";
import RoleTable, { RoleDataItem } from "./RoleTable";
import LoadingDots from "../Loading";
import { apiClient } from "@/lib/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface FormModuleProps<T extends Record<string, any>> {
  form: UseFormReturn<T>;
  onClose: () => void;
  formFields: Array<{
    name: Path<T>;
    label: string;
    type: "text" | "date" | "number" | "select";
  }>;
  onFormSubmitSuccess: () => void;
}

export const calculateScrollAreaHeight = (fieldCount: number) => {
  const baseHeight = 350;
  const heightPerField = 70;
  const maxHeight = window.innerHeight * 0.8;
  return `${Math.min(baseHeight + fieldCount * heightPerField, maxHeight)}px`;
};

function AccessControlForm<T extends Record<string, any>>({
  form,
  onClose,
  formFields,
  onFormSubmitSuccess,
}: FormModuleProps<T>) {
  const scrollAreaHeight = calculateScrollAreaHeight(formFields.length);
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [companyOptions, setCompanyOptions] = useState<string[]>([]);
  const [employeeOptions, setEmployeeOptions] = useState<
    {
      id: string;
      code: string;
      employeeCode: string;
      firstName: string;
      lastName: string;
    }[]
  >([]);

  const [roleData, setRoleData] = useState<RoleDataItem[]>([
    {
      CompanyName: "",
      BusinessUnit: "",
      Role: "",
      ProjectCodeName: "",
      Modules: [],
    },
  ]);

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoading(true);
      try {
        const [companyResponse, employeeResponse] = await Promise.all([
          apiClient.get("/commonMaster/companyDetails/allCompanyDetails"),
          apiClient.get("/commonMaster/employeeMaster/allEmployeeMaster"),
        ]);

        if (companyResponse.data.success) {
          const activeCompanies = companyResponse.data.allCompanyDetails
            .filter((company: any) => company.Tags === "Active")
            .map((company: any) => company.CompanyName);
          setCompanyOptions(activeCompanies);
        }

        if (employeeResponse.data.success) {
          const activeEmployees = employeeResponse.data.allEmployeeMaster
            .filter((employee: any) => employee.Tags === "Active")
            .map((employee: any) => ({
              id: employee.id,
              code: `${employee.EmployeeCode}-${employee.EmployeeFirstName}-${employee.EmployeeLastName}`,
              employeeCode: employee.EmployeeCode,
              firstName: employee.EmployeeFirstName,
              lastName: employee.EmployeeLastName,
            }));
          setEmployeeOptions(activeEmployees);
        }
      } catch (error) {
        console.error("Error fetching initial data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  const handleSubmit = async (data: T) => {
    const selectedEmployee = employeeOptions.find(
      (emp) => emp.code === data.EmployeeCode
    );
    const userId = selectedEmployee ? selectedEmployee.id : undefined;
    const employeeCode = selectedEmployee
      ? selectedEmployee.employeeCode
      : undefined;
    const firstName = selectedEmployee ? selectedEmployee.firstName : undefined;
    const lastName = selectedEmployee ? selectedEmployee.lastName : undefined;

    const formattedData = {
      userId,
      employeeCode,
      firstName,
      lastName,
      workingOnArray: roleData.map(
        ({ CompanyName, BusinessUnit, Role, ProjectCodeName, Modules }) => ({
          CompanyName,
          BusinessUnit,
          Role,
          ProjectCodeName,
          Modules,
        })
      ),
    };

    console.log(" sending form data", formattedData);
    try {
      const response = await apiClient.post(
        "/accessControl/accessRequest/create",
        formattedData
      );
      console.log("access form response", response);
      toast.success("Access request sent successfully!");
      onClose();
      onFormSubmitSuccess();
    } catch (error) {
      toast.error("Something went wrong! Please try again later.");
    }
  };

  if (loading) {
    return <LoadingDots />;
  }

  return (
    <Form {...form}>
      <ScrollArea
        className="overflow-y-auto"
        style={{ height: scrollAreaHeight }}
      >
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          {formFields.map((item) => (
            <FormField
              key={item.name}
              control={form.control}
              name={item.name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{item.label}</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        form.setValue(
                          item.name,
                          value as PathValue<T, Path<T>>,
                          {
                            shouldValidate: true,
                          }
                        );
                      }}
                      value={field.value as string}
                    >
                      <SelectTrigger className="w-1/2 ml-1">
                        <SelectValue placeholder={`Select ${item.label}`} />
                      </SelectTrigger>
                      <SelectContent>
                        {item.name === "EmployeeCode" &&
                          employeeOptions.map((employee) => (
                            <SelectItem key={employee.id} value={employee.code}>
                              {employee.code}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <RoleTable
            roleData={roleData}
            setRoleData={setRoleData}
            companyOptions={companyOptions}
          />

          <div className="flex justify-end space-x-4 mr-10">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {form.formState.isSubmitting ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </form>
      </ScrollArea>
    </Form>
  );
}

export default AccessControlForm;
