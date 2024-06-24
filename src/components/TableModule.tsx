"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usePathname, useRouter } from "next/navigation";
import { Input } from "./ui/input";
import {
  CalendarFold,
  CirclePlus,
  FilePlus2,
  Plus,
  Search,
} from "lucide-react";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Header {
  label: string;
  id: string;
}

interface TableModuleProps {
  header: Header[];
  tableName: string;
}

export default function TableModule({ header, tableName }: TableModuleProps) {
  const pathname = usePathname();

  const router = useRouter();
  const accountingSystemTable = pathname
    .toLowerCase()
    .includes("accounting-system");
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });

  return (
    <MaxWidthWrapper className="mt-5">
      <div className="flex flex-wrap justify-between items-center space-x-2 my-3">
        <div className="flex flex-1 space-x-2 max-w-xs items-center w-full mb-2 sm:mb-0">
          <Input
            className="bg-zinc-100 flex-1 border border-stone-300"
            type="text"
            placeholder="Search"
          />
          <Button className="" type="submit">
            <Search />
          </Button>
        </div>

        <div className="flex space-x-2 items-center w-full sm:w-auto mb-2 sm:mb-0">
          <div className="flex-1">
            <Select>
              <SelectTrigger className="w-full sm:w-[180px] bg-zinc-100 border-stone-300">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="accepted">Accepted</SelectItem>
                <SelectItem value="not-accepted">Not Accepted</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1 sm:w-auto">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={"outline"}
                  className={cn(
                    "w-full sm:w-[300px] bg-zinc-100 rounded-md border-stone-300 justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarFold className="mr-2 h-4 w-4" />
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, "LLL dd, y")} -{" "}
                        {format(date.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(date.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
      <div className="border border-stone-700 rounded-lg p-1 overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-400/10">
            <TableRow>
              {!accountingSystemTable && (
                <TableHead className="text-blue-600 text-base">
                  {tableName}
                </TableHead>
              )}
              {header.map((header) => (
                <TableHead
                  key={header.id}
                  className="text-blue-600     text-base"
                >
                  {header.label}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">
                HINDUSTHAN ENGINEERING CORPORATION
              </TableCell>
              <TableCell>admin</TableCell>
              <TableCell>23/08/2022, 12:00 pm</TableCell>
              <TableCell className="text-right">read write edit</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </MaxWidthWrapper>
  );
}
