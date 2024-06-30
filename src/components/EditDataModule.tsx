"use client";

import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
import { CalendarFold, Edit, Loader2 } from "lucide-react";

import { GSTDataItem } from "@/app/(Sidebar)/common-master/company-details/page";
import { GSTTable, GSTTableData } from "@/components/GSTTable";
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
import { optionsForSelection } from "@/config/common-master-forms";
import { cn } from "@/lib/utils";
import {
  DefaultValues,
  Path,
  SubmitHandler,
  UseFormReturn,
  useForm,
} from "react-hook-form";
import { calculateScrollAreaHeight } from "./FormModule";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

interface EditDataModuleProps<T extends Record<string, any>> {
  id: string;
  form: UseFormReturn<T>;
  // onSubmit: (values: T) => Promise<void>;
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
}: EditDataModuleProps<T>) {
  const router = useRouter();
  const pathname = usePathname();
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

  const [mounted, setMounted] = useState(false);

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
  const editForm = useForm<T>({
    defaultValues: originalForm.getValues() as DefaultValues<T>,
  });

  const findItem = (id: string) => {
    const item = data.find((item: any) => item.id === id);
    if (item) {
      setFormData(item);
      extractAndSetGSTData(item);
      Object.keys(item).forEach((key) => {
        if (key in editForm.getValues()) {
          if (key === "COIDate") {
            const dateValue = item[key] ? new Date(item[key]) : undefined;
            setDate(dateValue);
            editForm.setValue(key as Path<T>, dateValue as any);
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
            editForm.setValue(key as Path<T>, dateValue as any);
          } else {
            editForm.setValue(key as Path<T>, formData[key] as any);
          }
        }
      });
    }
  }, [formData, isOpen, editForm]);
  const handleSubmit = async (values: T) => {
    try {
      if (includeGSTTable) {
        await onUpdate(id, values, gstData);
      } else {
        await onUpdate(id, values);
      }
      setIsOpen(false);
    } catch (error) {
      console.log("error during updating data", error);
    }
  };

  if (!mounted) {
    return null;
  }

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
          <DialogTitle className="text-center">{pagename}</DialogTitle>
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
                                    format(field.value, "PPP")
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
                                selected={field.value}
                                onSelect={field.onChange}
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

                if (
                  item.name === "CompanyName" ||
                  item.name === "Tags" ||
                  item.name === "OTType" ||
                  item.name === "Benefits"
                ) {
                  return (
                    <FormField
                      key={item.name}
                      control={editForm.control}
                      name={item.name}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{item.label}</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="w-3/4 ml-1">
                                <SelectValue
                                  placeholder={`Select ${item.label}`}
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {optionsForSelection
                                .find((option) => option.id === item.name)
                                ?.values.map((value) => (
                                  <SelectItem key={value} value={value}>
                                    {value}
                                  </SelectItem>
                                ))}
                            </SelectContent>
                          </Select>
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

              {includeGSTTable && gstData && setGSTData && (
                <div>
                  <h3 className="font-medium mb-2">GST Details</h3>
                  <GSTTable data={gstData} setData={setGSTData} />
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
