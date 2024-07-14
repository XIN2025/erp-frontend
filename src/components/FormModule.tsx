// import React from "react";
// import { format } from "date-fns";
// import { Calendar } from "@/components/ui/calendar";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { CalendarFold, Loader2 } from "lucide-react";
// import { GSTDataItem } from "@/app/(Sidebar)/common-master/company-details/page";
// import { GSTTable } from "@/components/GSTTable";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { cn } from "@/lib/utils";
// import { Path, UseFormReturn, PathValue } from "react-hook-form";
// import { staticOptions } from "@/config/OptionsForSelection";

// interface FormModuleProps<T extends Record<string, any>> {
//   form: UseFormReturn<T>;
//   onSubmit: (values: T) => Promise<void>;
//   data?: GSTDataItem[];
//   setData?: (newData: GSTDataItem[]) => void;
//   date?: Date | undefined;
//   setDate?: React.Dispatch<React.SetStateAction<Date | undefined>>;
//   formFields: Array<{
//     name: Path<T>;
//     label: string;
//     type: "text" | "date" | "number" | "select";
//     conditional?: boolean;
//   }>;
//   dynamicOptions?: Record<string, string[]>; // Dynamic options passed from parent
// }

// export const calculateScrollAreaHeight = (fieldCount: number) => {
//   const baseHeight = 200;
//   const heightPerField = 70;
//   const maxHeight = window.innerHeight * 0.8;

//   const calculatedHeight = Math.min(
//     baseHeight + fieldCount * heightPerField,
//     maxHeight
//   );
//   return `${calculatedHeight}px`;
// };

// function FormModule<T extends Record<string, any>>({
//   form,
//   onSubmit,
//   data,
//   setData,
//   date,
//   setDate,
//   formFields,
//   dynamicOptions,
// }: FormModuleProps<T>) {
//   const scrollAreaHeight = calculateScrollAreaHeight(formFields.length);
//   const watchAllFields = form.watch();
//   const watchVision = form.watch("Vision" as Path<T>);

//   const allOptions = {
//     ...Object.fromEntries(
//       staticOptions.map((opt: any) => [opt.id, opt.values])
//     ),
//     ...dynamicOptions,
//   };

//   return (
//     <Form {...form}>
//       <ScrollArea
//         className={`overflow-y-auto`}
//         style={{ height: scrollAreaHeight }}
//       >
//         <form
//           onSubmit={form.handleSubmit(async (data) => {
//             try {
//               console.log("Form data before submission:", data);
//               await onSubmit(data);
//             } catch (error) {
//               console.error("Error submitting form:", error);
//             }
//           })}
//           className="space-y-8"
//         >
//           {formFields.map((item) => {
//             if (
//               (item.name === "LeftEye" || item.name === "RightEye") &&
//               watchVision !== "Specs"
//             ) {
//               return null;
//             }

//             if (item.type === "date") {
//               return (
//                 <FormField
//                   key={item.name}
//                   control={form.control}
//                   name={item.name}
//                   render={({ field }) => (
//                     <FormItem className="flex flex-col">
//                       <FormLabel>{item.label}</FormLabel>
//                       <Popover>
//                         <PopoverTrigger asChild>
//                           <FormControl>
//                             <Button
//                               variant="outline"
//                               className={cn(
//                                 "w-[240px] pl-3 text-left font-normal",
//                                 !field.value && "text-muted-foreground"
//                               )}
//                             >
//                               {field.value ? (
//                                 format(field.value, "PPP")
//                               ) : (
//                                 <span>Pick a date</span>
//                               )}
//                               <CalendarFold className="ml-auto h-4 w-4 opacity-50" />
//                             </Button>
//                           </FormControl>
//                         </PopoverTrigger>
//                         <PopoverContent className="w-auto p-0" align="start">
//                           <Calendar
//                             mode="single"
//                             selected={field.value}
//                             onSelect={field.onChange}
//                             initialFocus
//                           />
//                         </PopoverContent>
//                       </Popover>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               );
//             }

//             if (item.type === "select") {
//               return (
//                 <FormField
//                   key={item.name}
//                   control={form.control}
//                   name={item.name}
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormLabel>{item.label}</FormLabel>
//                       <FormControl>
//                         <Select
//                           onValueChange={(value) => {
//                             form.setValue(
//                               item.name,
//                               value as PathValue<T, Path<T>>,
//                               {
//                                 shouldValidate: true,
//                               }
//                             );
//                           }}
//                           value={field.value as string}
//                         >
//                           <SelectTrigger className="w-1/2 ml-1">
//                             <SelectValue placeholder={`Select ${item.label}`} />
//                           </SelectTrigger>
//                           <SelectContent>
//                             {allOptions[item.name as string]?.map(
//                               (value: any, i: any) => (
//                                 <SelectItem key={i} value={value}>
//                                   {value}
//                                 </SelectItem>
//                               )
//                             )}
//                           </SelectContent>
//                         </Select>
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               );
//             }

//             return (
//               <FormField
//                 key={item.name}
//                 control={form.control}
//                 name={item.name}
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormLabel>{item.label}</FormLabel>
//                     <FormControl>
//                       <Input
//                         className="w-3/4 ml-1"
//                         placeholder={`Enter ${item.label}`}
//                         {...field}
//                         type={item.type}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             );
//           })}
//           {data && setData && <GSTTable data={data} setData={setData} />}

//           <div className="flex justify-end mr-10">
//             <Button type="submit" className="items-center">
//               {form.formState.isSubmitting ? (
//                 <Loader2 className="animate-spin" />
//               ) : (
//                 "Submit"
//               )}
//             </Button>
//           </div>
//         </form>
//       </ScrollArea>
//     </Form>
//   );
// }

// export default FormModule;
import React, { useEffect } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
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
import { CalendarFold, Loader2 } from "lucide-react";
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
import { Path, UseFormReturn, PathValue } from "react-hook-form";
import { staticOptions } from "@/config/OptionsForSelection";

import GSTTableCompanyDetails from "./GSTTableCompanyDetails";
import { ModularGSTTable } from "./ModularGSTTable";

import LoadingDots from "./Loading";
import { useCompanyDetailsOrOptions } from "@/hooks/useCompanyDetailsOrOptions";

export interface GSTDataItem {
  SerialNo: number;
  GSTRegNo: string;
  GSTState: string;
  GSTAddress: string;
  [key: string]: string | number;
}

interface FormModuleProps<T extends Record<string, any>> {
  form: UseFormReturn<T>;
  onSubmit: (values: T) => Promise<void>;
  gstData?: GSTDataItem[];
  setGSTData?: React.Dispatch<React.SetStateAction<GSTDataItem[]>>;
  date?: Date | undefined;
  setDate?: React.Dispatch<React.SetStateAction<Date | undefined>>;
  formFields: Array<{
    name: Path<T>;
    label: string;
    type: "text" | "date" | "number" | "select";
    conditional?: boolean;
  }>;
  dynamicOptions?: Record<string, string[]>;
  companyDetails?: any[];
  isCompanyDetailsPage?: boolean;
  includeGSTTable?: boolean;
}

export const calculateScrollAreaHeight = (fieldCount: number) => {
  const baseHeight = 200;
  const heightPerField = 70;
  const maxHeight = window.innerHeight * 0.8;

  const calculatedHeight = Math.min(
    baseHeight + fieldCount * heightPerField,
    maxHeight
  );
  return `${calculatedHeight}px`;
};

function FormModule<T extends Record<string, any>>({
  form,
  onSubmit,
  gstData,
  setGSTData,
  date,
  setDate,
  formFields,
  // companyDetails,
  isCompanyDetailsPage = false,
  includeGSTTable = false,
}: FormModuleProps<T>) {
  const scrollAreaHeight = calculateScrollAreaHeight(formFields.length);
  const watchAllFields = form.watch();
  const watchCompanyName = form.watch("CompanyName" as Path<T>);
  const watchVision = form.watch("Vision" as Path<T>);
  const watchActivityCode = form.watch("ActivityCode" as Path<T>);
  const watchMajorSCItemGroupCode = form.watch(
    "MajorSCItemGroupCode" as Path<T>
  );
  const watchMachineGroupCode = form.watch("MachineGroupCode" as Path<T>);
  const watchMachineClassCode = form.watch("MachineClassCode" as Path<T>);
  const watchAccountcode = form.watch("AccountCode" as Path<T>);

  const {
    loading,
    dynamicOptions,
    companyDetails,
    updateCostCenters,
    allActivity,
    allAccounts,
    allMachineGroups,
    allMachineClasses,
    AllMajorScItemGroups,
    fetchRequiredData,
  } = useCompanyDetailsOrOptions();

  //useffects for setting the feilds automatically on selcting one of the options

  useEffect(() => {
    if (watchCompanyName) {
      updateCostCenters(watchCompanyName);
    }
  }, [watchCompanyName, updateCostCenters]);

  useEffect(() => {
    if (watchAccountcode) {
      const selectedAccount = allAccounts.find(
        (account) => account.AccountCode === watchAccountcode.split("-")[0]
      );

      if (selectedAccount) {
        form.setValue(
          "AccountDescription" as Path<T>,
          selectedAccount.AccountDescription
        );
      }
    }
  }, [watchAccountcode, allAccounts, form]);

  useEffect(() => {
    if (watchActivityCode) {
      const selectedActivity = allActivity.find(
        (activity) => activity.ActivityCode === watchActivityCode
      );
      if (selectedActivity) {
        form.setValue(
          "ActivityDescription" as Path<T>,
          selectedActivity.ActivityDescription
        );
      }
    }
  }, [watchActivityCode, allActivity, form]);

  useEffect(() => {
    if (watchMachineGroupCode) {
      const selectedMachineGroup = allMachineGroups.find(
        (machineGroup) =>
          machineGroup.MachineGroupCode === watchMachineGroupCode.split("-")[0]
      );

      if (selectedMachineGroup) {
        form.setValue(
          "MachineGroupDescription" as Path<T>,
          selectedMachineGroup.MachineGroupDescription
        );
        form.setValue(
          "MachineClassCode" as Path<T>,
          selectedMachineGroup.MachineClassCode
        );
        form.setValue(
          "MachineClassDescription" as Path<T>,
          selectedMachineGroup.MachineClassDescription
        );
      }
    }
  }, [watchMachineGroupCode, allMachineGroups, form]);

  useEffect(() => {
    if (watchMajorSCItemGroupCode) {
      const selectedMajorSCItemGroup = AllMajorScItemGroups.find(
        (majorSCItemGroup) =>
          majorSCItemGroup.MajorSCItemGroupCode === watchMajorSCItemGroupCode
      );
      console.log("selectedMajorSCItemGroup", selectedMajorSCItemGroup);
      if (selectedMajorSCItemGroup) {
        form.setValue(
          "MajorSCItemGroupDescription" as Path<T>,
          selectedMajorSCItemGroup.MajorSCItemGroupDescription
        );
      }
    }
  }, [watchMajorSCItemGroupCode, AllMajorScItemGroups, form]);

  useEffect(() => {
    if (watchMachineClassCode) {
      const selectedMachineClass = allMachineClasses.find(
        (machineClass) =>
          machineClass.MachineClassCode === watchMachineClassCode
      );

      if (selectedMachineClass) {
        form.setValue(
          "MachineClassDescription" as Path<T>,
          selectedMachineClass.MaterialClassDescription
        );
      }
    }
  }, [watchMachineClassCode, allMachineClasses, form]);

  useEffect(() => {
    const requiredFields = formFields
      .filter((field) => field.type === "select")
      .map((field) => field.name as string);

    fetchRequiredData(requiredFields);
  }, [fetchRequiredData, formFields]);

  const allOptions = {
    ...Object.fromEntries(
      staticOptions.map((opt: any) => [opt.id, opt.values])
    ),
    ...dynamicOptions,
  };

  useEffect(() => {
    if (includeGSTTable && watchCompanyName && companyDetails && setGSTData) {
      const selectedCompanyDetails = companyDetails.find(
        (company) => company.CompanyName === watchCompanyName
      );
      if (selectedCompanyDetails && selectedCompanyDetails.Gsts) {
        setGSTData(
          selectedCompanyDetails.Gsts.map((gst: any, index: number) => ({
            SerialNo: index + 1,
            GSTRegNo: gst.GSTRegNo || "",
            GSTState: gst.GSTState || "",
            GSTAddress: gst.GSTAddress || "",
          }))
        );
      } else {
        setGSTData([
          {
            SerialNo: 1,
            GSTRegNo: "",
            GSTState: "",
            GSTAddress: "",
          },
        ]);
      }
    }
  }, [watchCompanyName, companyDetails, setGSTData, includeGSTTable]);

  if (loading) {
    return <LoadingDots />;
  }

  return (
    <Form {...form}>
      <ScrollArea
        className={`overflow-y-auto`}
        style={{ height: scrollAreaHeight }}
      >
        <form
          onSubmit={form.handleSubmit(async (data) => {
            try {
              console.log("Form data before submission:", data);
              await onSubmit(data);
            } catch (error) {
              console.error("Error submitting form:", error);
            }
          })}
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
                  control={form.control}
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
                                format(field.value, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <CalendarFold className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
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

            if (item.type === "select") {
              return (
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
                            {allOptions[item.name as string]?.map(
                              (value: any, i: any) => (
                                <SelectItem key={i} value={value}>
                                  {value}
                                </SelectItem>
                              )
                            )}
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
                control={form.control}
                name={item.name}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{item.label}</FormLabel>
                    <FormControl>
                      <Input
                        className="w-3/4 ml-1"
                        placeholder={`Enter ${item.label}`}
                        {...field}
                        type={item.type}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            );
          })}

          {includeGSTTable &&
            gstData &&
            setGSTData &&
            (isCompanyDetailsPage ? (
              <GSTTableCompanyDetails data={gstData} setData={setGSTData} />
            ) : (
              <ModularGSTTable
                gstData={gstData}
                setGSTData={setGSTData}
                companyDetails={companyDetails}
                selectedCompany={watchCompanyName as string}
              />
            ))}

          <div className="flex justify-end mr-10">
            <Button type="submit" className="items-center">
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

export default FormModule;
