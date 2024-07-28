import React, { useState, useCallback, useEffect } from "react";
import { format, parse, isValid, getYear } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { UseFormReturn, Path } from "react-hook-form";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

interface DatePickerFieldProps<T extends Record<string, any>> {
  item: {
    name: Path<T>;
    label: string;
  };
  editForm: UseFormReturn<T>;
}

function DatePickerField<T extends Record<string, any>>({
  item,
  editForm,
}: DatePickerFieldProps<T>): JSX.Element {
  const [inputValue, setInputValue] = useState("");

  const formatDate = (date: Date | null | undefined): string => {
    if (!date) return "";
    const year = getYear(date);
    return format(date, year < 2000 ? "MMM-dd-yyyy" : "MMM-dd-yy");
  };

  const parseDate = (value: string): Date | null => {
    let parsedDate = parse(value, "MMM-dd-yy", new Date());
    if (!isValid(parsedDate)) {
      parsedDate = parse(value, "MMM-dd-yyyy", new Date());
    }
    return isValid(parsedDate) ? parsedDate : null;
  };

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setInputValue(value);

      const parsedDate = parseDate(value);
      if (parsedDate) {
        editForm.setValue(item.name, parsedDate as any);
      }
    },
    [editForm, item.name]
  );

  useEffect(() => {
    const fieldValue = editForm.getValues(item.name) as Date | undefined;
    setInputValue(formatDate(fieldValue));
  }, [editForm, item.name]);

  return (
    <FormField
      control={editForm.control}
      name={item.name}
      render={({ field }) => (
        <FormItem className="flex flex-col ml-1 w-3/4">
          <FormLabel>{item.label}</FormLabel>
          <div className="flex">
            <FormControl>
              <input
                type="text"
                placeholder="MMM-dd-yyyy"
                value={inputValue}
                onChange={handleInputChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </FormControl>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="ml-2 px-3">
                  <CalendarIcon className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value as Date}
                  onSelect={(date: Date | undefined) => {
                    field.onChange(date);
                    setInputValue(formatDate(date));
                  }}
                  disabled={(date) =>
                    date > new Date() || date < new Date("1900-01-01")
                  }
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default DatePickerField;
