import React, { useEffect, useState } from "react";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { format } from "date-fns";
import { CalendarFold, Edit, Loader2 } from "lucide-react";
import { GSTDataItem } from "@/app/(Sidebar)/common-master/company-details/page";
import GSTTableCompanyDetails from "@/components/common-master/GSTTableCompanyDetails";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  DefaultValues,
  Path,
  PathValue,
  UseFormReturn,
  useForm,
} from "react-hook-form";
import { calculateScrollAreaHeight } from "../FormModule";
import { Calendar } from "@/components/ui/calendar";

import { staticOptions } from "@/config/OptionsForSelection";
import { useCompanyDetailsOrOptions } from "@/hooks/useCompanyDetailsOrOptions";
import LoadingDots from "../Loading";
import ModularGSTTable from "./ModularGSTTable";
import DatePickerField from "../DatePickerField";

interface EditDataModuleProps<T extends Record<string, any>> {
  id: string;
  form: UseFormReturn<T>;
  data: Record<string, any>;
  setData?: (newData: GSTDataItem[]) => void;
  onUpdate: (id: string, values: T, gstData?: GSTDataItem[]) => Promise<void>;
  includeGSTTable: boolean;
  pagename: string;
  formFields: Array<{
    name: Path<T>;
    label: string;
    type: "text" | "date" | "number" | "select";
  }>;
  isCompanyDetailsPage?: boolean;
  companyDetails?: any[];
  dynamicOptions?: Record<string, string[]>;
}

export default function EditDataModule<T extends Record<string, any>>({
  id,
  form: originalForm,
  includeGSTTable,
  data,
  onUpdate,
  setData,
  pagename,
  formFields,
  isCompanyDetailsPage,
}: EditDataModuleProps<T>) {
  const scrollAreaHeight = calculateScrollAreaHeight(formFields.length);
  const [formData, setFormData] = useState<Record<string, any> | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [gstData, setGSTData] = useState<GSTDataItem[]>([
    {
      SerialNo: 1,
      GSTRegNo: " ",
      GSTState: " ",
      GSTAddress: " ",
    },
  ]);

  const editForm = useForm<T>({
    defaultValues: originalForm.getValues() as DefaultValues<T>,
  });
  console.log(data);
  const watchCompanyName = editForm.watch("CompanyName" as Path<T>);
  const watchVision = editForm.watch("Vision" as Path<T>);
  const [mounted, setMounted] = useState(false);
  const watchActivityCode = editForm.watch("ActivityCode" as Path<T>);
  const watchMajorSCItemGroupCode = editForm.watch(
    "MajorSCItemGroupCode" as Path<T>
  );
  const watchMachineGroupCode = editForm.watch("MachineGroupCode" as Path<T>);
  const watchMachineClassCode = editForm.watch("MachineClassCode" as Path<T>);
  const watchAccountcode = editForm.watch("AccountCode" as Path<T>);

  const {
    loading,
    dynamicOptions,
    updateCostCenters,
    fetchRequiredData,
    companyDetails,
    allActivity,
    allAccounts,
    allMachineGroups,
    allMachineClasses,
    AllMajorScItemGroups,
  } = useCompanyDetailsOrOptions();

  useEffect(() => {
    if (watchAccountcode) {
      const selectedAccount = allAccounts.find(
        (account) => account.AccountCode === watchAccountcode.split("-")[0]
      );

      if (selectedAccount) {
        editForm.setValue(
          "AccountDescription" as Path<T>,
          selectedAccount.AccountDescription
        );
      }
    }
  }, [watchAccountcode, allAccounts, editForm]);
  useEffect(() => {
    if (watchActivityCode) {
      const selectedActivity = allActivity.find(
        (activity) => activity.ActivityCode === watchActivityCode
      );
      if (selectedActivity) {
        editForm.setValue(
          "ActivityDescription" as Path<T>,
          selectedActivity.ActivityDescription as any
        );
      }
    }
  }, [watchActivityCode, allActivity, editForm]);

  useEffect(() => {
    if (watchMachineGroupCode) {
      const selectedMachineGroup = allMachineGroups.find(
        (machineGroup) =>
          machineGroup.MachineGroupCode === watchMachineGroupCode.split("-")[0]
      );

      if (selectedMachineGroup) {
        editForm.setValue(
          "MachineGroupDescription" as Path<T>,
          selectedMachineGroup.MachineGroupDescription as any
        );
        editForm.setValue(
          "MachineClassCode" as Path<T>,
          selectedMachineGroup.MachineClassCode as any
        );
        editForm.setValue(
          "MachineClassDescription" as Path<T>,
          selectedMachineGroup.MachineClassDescription as any
        );
      }
    }
  }, [watchMachineGroupCode, allMachineGroups, editForm]);

  useEffect(() => {
    if (watchMajorSCItemGroupCode) {
      const selectedMajorSCItemGroup = AllMajorScItemGroups.find(
        (majorSCItemGroup) =>
          majorSCItemGroup.MajorSCItemGroupCode === watchMajorSCItemGroupCode
      );
      if (selectedMajorSCItemGroup) {
        editForm.setValue(
          "MajorSCItemGroupDescription" as Path<T>,
          selectedMajorSCItemGroup.MajorSCItemGroupDescription as any
        );
      }
    }
  }, [watchMajorSCItemGroupCode, AllMajorScItemGroups, editForm]);

  useEffect(() => {
    if (watchMachineClassCode) {
      const selectedMachineClass = allMachineClasses.find(
        (machineClass) =>
          machineClass.MachineClassCode === watchMachineClassCode
      );

      if (selectedMachineClass) {
        editForm.setValue(
          "MachineClassDescription" as Path<T>,
          selectedMachineClass.MaterialClassDescription as any
        );
      }
    }
  }, [watchMachineClassCode, allMachineClasses, editForm]);

  useEffect(() => {
    if (watchCompanyName) {
      updateCostCenters(watchCompanyName);
    }
  }, [watchCompanyName, updateCostCenters]);

  useEffect(() => {
    const requiredFields = formFields
      .filter((field) => field.type === "select")
      .map((field) => field.name as string);

    fetchRequiredData(requiredFields);
  }, [fetchRequiredData, formFields]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const extractAndSetGSTData = (formData: any) => {
    if (formData && formData.Gsts && Array.isArray(formData.Gsts)) {
      const extractedGSTData = formData.Gsts.map((gst: any) => ({
        SerialNo: gst.SerialNo,
        GSTRegNo: gst.GSTRegNo,
        GSTState: gst.GSTState,
        GSTAddress: gst.GSTAddress,
      }));
      setGSTData(extractedGSTData);
    } else {
      setGSTData([
        {
          SerialNo: 1,
          GSTRegNo: " ",
          GSTState: " ",
          GSTAddress: " ",
        },
      ]);
    }
  };

  const findItem = (id: string) => {
    const item = data.find((item: any) => item.id === id);
    if (item) {
      setFormData(item);
      extractAndSetGSTData(item);
      Object.keys(item).forEach((key) => {
        if (key in editForm.getValues()) {
          if (key === "COIDate") {
            const dateValue = item[key] ? new Date(item[key]) : undefined;

            editForm.setValue(key as Path<T>, dateValue?.toISOString() as any);
          } else {
            editForm.setValue(key as Path<T>, item[key] as any);
          }
        }
      });
    }
    setIsOpen(true);
  };
  useEffect(() => {
    if (formData && isOpen) {
      Object.keys(formData).forEach((key) => {
        if (key in editForm.getValues()) {
          if (key === "COIDate") {
            const dateValue = formData[key]
              ? new Date(formData[key])
              : undefined;
            setDate(dateValue);
            editForm.setValue(key as Path<T>, dateValue?.toISOString() as any);
          } else {
            editForm.setValue(key as Path<T>, formData[key] as any);
          }
        }
      });

      if (formData.CostCenterName) {
        editForm.setValue(
          "CostCenterName" as Path<T>,
          formData.CostCenterName as any
        );
      }

      if (formData.CompanyName) {
        updateCostCenters(formData.CompanyName);
      }
    }
  }, [formData, isOpen, editForm, updateCostCenters]);

  useEffect(() => {
    if (includeGSTTable && watchCompanyName && companyDetails) {
      const selectedCompanyDetails = companyDetails.find(
        (company) => company.CompanyName === watchCompanyName
      );
      if (selectedCompanyDetails && selectedCompanyDetails.Gsts) {
        setGSTData(selectedCompanyDetails.Gsts);
      }
    }
  }, [watchCompanyName, companyDetails, includeGSTTable]);

  const handleSubmit = async (values: T) => {
    try {
      const coiDate = editForm.getValues("COIDate" as Path<T>);
      const formattedCOIDate = coiDate
        ? new Date(coiDate).toISOString().split("T")[0]
        : undefined;
      console.log("formatttedCeeOjIDate", formattedCOIDate);
      const updatedValues = {
        ...values,
        COIDate: formattedCOIDate,
      } as T;
      console.log(updatedValues);
      if (includeGSTTable) {
        await onUpdate(id, updatedValues, gstData);
      } else {
        await onUpdate(id, updatedValues);
      }
      setIsOpen(false);
    } catch (error) {
      console.log("error during updating data", error);
    }
  };

  if (!mounted) {
    return null;
  }

  const allOptions = {
    ...Object.fromEntries(staticOptions.map((opt) => [opt.id, opt.values])),
    ...dynamicOptions,
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" onClick={() => findItem(id)}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="flex -mr-2 mx-3 h-[28px] w-[28px] rounded-[8px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 hover:bg-blue-600 group">
                  <Edit
                    className="text-grey-800 group-hover:text-white transition-colors duration-200"
                    size={20}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Edit Document</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[770px]">
        <DialogHeader>
          <DialogTitle className="text-center">{`${pagename} (Edit)`}</DialogTitle>
        </DialogHeader>
        <Form {...editForm}>
          <ScrollArea
            className={`overflow-y-auto`}
            style={{ height: scrollAreaHeight }}
          >
            <form
              onSubmit={editForm.handleSubmit(handleSubmit)}
              className="space-y-8"
            >
              {formFields.map((item) => {
                if (
                  (item.name === "LeftEye" || item.name === "RightEye") &&
                  watchVision !== "Specs"
                ) {
                  return null;
                }
                if (item.type === "date") {
                  return (
                    <FormField
                      key={item.name}
                      control={editForm.control}
                      name={item.name}
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>{item.label}</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant="outline"
                                  className={cn(
                                    "w-[240px] pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(new Date(field.value), "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarFold className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={
                                  field.value
                                    ? new Date(field.value)
                                    : undefined
                                }
                                onSelect={(date) =>
                                  field.onChange(date?.toISOString())
                                }
                                disabled={(date) =>
                                  date > new Date() ||
                                  date < new Date("1900-01-01")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  );
                }

                // if (item.type === "date") {
                //   return (
                //     <DatePickerField
                //       key={item.name}
                //       item={item}
                //       editForm={editForm}
                //     />
                //   );
                // }

                if (item.type === "select") {
                  return (
                    <FormField
                      key={item.name}
                      control={editForm.control}
                      name={item.name}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{item.label}</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={(value) => {
                                editForm.setValue(
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
                                <SelectValue
                                  placeholder={`Select ${item.label}`}
                                />
                              </SelectTrigger>
                              <SelectContent>
                                {allOptions[item.name]?.map((value, i) => (
                                  <SelectItem key={i} value={value}>
                                    {value}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  );
                }

                return (
                  <FormField
                    key={item.name}
                    control={editForm.control}
                    name={item.name}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{item.label}</FormLabel>
                        <FormControl>
                          <Input
                            className="w-3/4 ml-1"
                            {...field}
                            type={item.type}
                            placeholder={`Enter ${item.label}`}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                );
              })}

              {includeGSTTable && (
                <div>
                  <h3 className="font-medium mb-2">GST Details</h3>
                  {isCompanyDetailsPage ? (
                    <GSTTableCompanyDetails
                      data={gstData}
                      setData={setGSTData}
                    />
                  ) : (
                    <ModularGSTTable
                      gstData={gstData}
                      setGSTData={setGSTData}
                      companyDetails={companyDetails}
                      selectedCompany={watchCompanyName as string}
                    />
                  )}
                </div>
              )}

              <div className="flex justify-end items-center mr-10">
                <Button type="submit">
                  {editForm.formState.isSubmitting ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    "Submit"
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
