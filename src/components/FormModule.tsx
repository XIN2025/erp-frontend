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
import { GSTDataItem } from "@/app/(Sidebar)/common-master/company-details/page";
import { GSTTable } from "@/components/GSTTable";
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
import { Path, UseFormReturn, PathValue } from "react-hook-form";

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
    conditional?: boolean;
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
  const watchAllFields = form.watch();

  const watchVision = form.watch("Vision" as Path<T>);

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
                            // disabled={(date) =>
                            //   date > new Date() || date < new Date("1900-01-01")
                            // }
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
