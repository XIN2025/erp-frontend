"use client";

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

import { GSTDataItem } from "@/app/(Sidebar)/common-master/company-details/page";
import { GSTTable } from "@/components/GSTTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Path, UseFormReturn } from "react-hook-form";

interface FormModuleProps<T extends Record<string, any>> {
  form: UseFormReturn<T>;
  onSubmit: (values: T) => Promise<void>;
  data?: GSTDataItem[];
  setData?: (newData: GSTDataItem[]) => void;
  date?: Date | undefined;
  setDate?: React.Dispatch<React.SetStateAction<Date | undefined>>;

  formFields: Array<{
    name: Path<T>;
    label: string;
    type: "text" | "date" | "number" | "select";
  }>;
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
  data,
  setData,
  date,
  setDate,
  formFields,
}: FormModuleProps<T>) {
  const scrollAreaHeight = calculateScrollAreaHeight(formFields.length);
   
  return (
    <Form {...form}>
      <ScrollArea
        className={`overflow-y-auto`}
        style={{ height: scrollAreaHeight }}
      >
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {formFields.map((item) => {
            if (item.type === "date") {
              return (
                <div key={item.name} className="flex flex-col gap-2">
                  <Label>{item.label}</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-[240px] justify-start text-left ml-1 font-normal",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <CalendarFold className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto" align="start">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              );
            }

            if (
              item.name === "CompanyName" ||
              item.name === "Tags" ||
              item.name == "OTType" ||
              item.name == "Benefits"
            ) {
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
                            form.setValue(item.name as Path<T>, value as any, {
                              shouldValidate: true,
                            });
                          }}
                          value={field.value as string}
                        >
                          <SelectTrigger className="w-1/2 ml-1">
                            <SelectValue placeholder={`Select ${item.label}`} />
                          </SelectTrigger>
                          <SelectContent>
                            {optionsForSelection
                              .find((option) => option.id === item.name)
                              ?.values.map((value, i) => (
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
          {data && setData && <GSTTable data={data} setData={setData} />}

          <div className="flex justify-end mr-10">
            <Button type="submit" className=" items-center ">
              {form.formState.isSubmitting ? (
                <Loader2 className=" animate-spin" />
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
