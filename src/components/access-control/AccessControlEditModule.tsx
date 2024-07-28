// components/AccessControlEditDataModule.tsx

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Edit, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";

import { toast } from "sonner";
import { TaccessControlValdiators } from "@/lib/validators/access-control-validators";
import { apiClient } from "@/lib/utils";
import EditRoleTable from "./EditRoleTable";
import { RoleDataItem } from "./RoleTable";

interface EditDataModuleProps {
  id: string;
  form: UseFormReturn<TaccessControlValdiators>;
  data: Array<{
    id: string;
    EmployeeCode: string;
    first_name: string;
    last_name: string;
    roles: RoleDataItem[];
  }>;
  onUpdate: (
    id: string,
    values: TaccessControlValdiators,
    roleData: RoleDataItem[]
  ) => Promise<void>;
  pagename: string;
  formFields: Array<{
    name: keyof TaccessControlValdiators;
    label: string;
    type: "text" | "date" | "number" | "select";
  }>;
}

export default function AccessControlEditDataModule({
  id,
  form,
  data,
  onUpdate,
  pagename,
  formFields,
}: EditDataModuleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [roleData, setRoleData] = useState<RoleDataItem[]>([]);
  const [employeeOptions, setEmployeeOptions] = useState<
    {
      id: string;
      code: string;
      employeeCode: string;
      firstName: string;
      lastName: string;
    }[]
  >([]);
  const [companyOptions, setCompanyOptions] = useState<string[]>([]);

  useEffect(() => {
    const fetchCompanyOptions = async () => {
      try {
        const response = await apiClient.get(
          "/commonMaster/companyDetails/allCompanyDetails"
        );
        if (response.data.success) {
          const activeCompanies = response.data.allCompanyDetails
            .filter((company: any) => company.Tags === "Active")
            .map((company: any) => company.CompanyName);
          setCompanyOptions(activeCompanies);
        }
      } catch (error) {
        console.error("Error fetching company options:", error);
        toast.error("Failed to load company options. Please try again.");
      }
    };

    const fetchEmployeeOptions = async () => {
      try {
        const response = await apiClient.get(
          "/commonMaster/employeeMaster/allEmployeeMaster"
        );
        if (response.data.success) {
          const activeEmployees = response.data.allEmployeeMaster
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
        console.error("Error fetching employee options:", error);
        toast.error("Failed to load employee options. Please try again.");
      }
    };

    fetchCompanyOptions();
    fetchEmployeeOptions();
  }, []);

  const findItem = (id: string) => {
    const item = data.find((item) => item.id === id);
    if (item) {
      const employeeCode = `${item.EmployeeCode}-${item.first_name}-${item.last_name}`;
      form.setValue("EmployeeCode", employeeCode);
      setRoleData(item.roles);
    }
    setIsOpen(true);
  };

  const handleSubmit = async (values: TaccessControlValdiators) => {
    try {
      const selectedEmployee = employeeOptions.find(
        (emp) => emp.code === values.EmployeeCode
      );

      const formattedData = {
        userId: selectedEmployee?.id,
        employeeCode: selectedEmployee?.employeeCode,
        firstName: selectedEmployee?.firstName,
        lastName: selectedEmployee?.lastName,
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

      const response = await apiClient.put(
        `/accessControl/accessRequest/update/${id}`,
        formattedData
      );

      if (response.data.success) {
        setIsOpen(false);
        toast.success("Access Control updated successfully!");
        if (onUpdate) {
          await onUpdate(id, values, roleData);
        }
      } else {
        throw new Error(
          response.data.message || "Failed to update Access Control"
        );
      }
    } catch (error) {
      console.error("Error updating Access Control:", error);
      toast.error("Failed to update Access Control. Please try again.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => findItem(id)}
                className="flex -mr-2 mx-3 h-[28px] w-[28px] rounded-[8px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 hover:bg-blue-600 group"
              >
                <Edit
                  className="text-grey-800 group-hover:text-white transition-colors duration-200"
                  size={20}
                />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit Access Control</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[770px]">
        <DialogHeader>
          <DialogTitle>{pagename}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <ScrollArea className="mt-4 max-h-[calc(90vh-200px)]">
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-8"
            >
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
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-1/2 ml-1">
                            <SelectValue placeholder={`Select ${item.label}`} />
                          </SelectTrigger>
                          <SelectContent>
                            {employeeOptions.map((option) => (
                              <SelectItem key={option.id} value={option.code}>
                                {option.code}
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

              <EditRoleTable
                roleData={roleData}
                setRoleData={setRoleData}
                companyOptions={companyOptions}
              />

              <div className="flex justify-end space-x-4 mr-10">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {form.formState.isSubmitting ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Update"
                  )}
                </Button>
              </div>
            </form>
          </ScrollArea>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
