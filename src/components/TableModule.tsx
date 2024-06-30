"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usePathname } from "next/navigation";
import { Input } from "./ui/input";
import { CalendarFold, Edit, Search, View } from "lucide-react";
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
import ViewDataModule from "./ViewDataModule";
import EditDataModule from "./EditDataModule";
import DeleteDataModule from "./DeleteDataModule";
import { Path, UseFormReturn } from "react-hook-form";
import { GSTDataItem } from "@/app/(Sidebar)/common-master/company-details/page";
import { ScrollArea } from "./ui/scroll-area";

interface Header {
  label: string;
  id: string;
}

interface TableModuleProps<T extends Record<string, any>> {
  header: Header[];
  tableName: string;
  data?: Record<string, any>[];
  form: UseFormReturn<T>;
  onDelete: (id: string) => void;
  onUpdate: (id: string, values: T, gstData?: GSTDataItem[]) => Promise<void>;
  date?: Date | undefined;
  setDate?: React.Dispatch<React.SetStateAction<Date | undefined>>;
  currentItemID?: string;
  setCurrentItemID?: (id: string) => void;
  onAprrove: () => void;
  onReject: () => void;
  includeGSTTable: boolean;
  formFields: Array<{
    name: Path<T>;
    label: string;
    type: "text" | "date" | "number" | "select";
  }>;
}

export default function TableModule<T extends Record<string, any>>({
  header,
  tableName,
  includeGSTTable,
  form,
  data,
  onUpdate,
  onDelete,
  date,
  currentItemID,
  onAprrove,
  onReject,
  setCurrentItemID,
  setDate,
  formFields,
}: TableModuleProps<T>) {
  const pathname = usePathname();

  const [tableData, setTableData] = useState<Record<string, any>>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filterDataByDateRange = (
    data: Record<string, any>[],
    range: DateRange | undefined
  ) => {
    if (!range || !range.from) return data;

    return data.filter((item) => {
      const itemDate = new Date(item.created_at);
      return itemDate >= range.from! && (!range.to || itemDate <= range.to);
    });
  };

  const filterDataBySearch = (data: Record<string, any>[], term: string) => {
    if (!term) return data;

    const firstColumnId = header[0].id;
    return data.filter((item) =>
      item[firstColumnId].toLowerCase().includes(term.toLowerCase())
    );
  };

  useEffect(() => {
    if (data) {
      let filteredData = filterDataByDateRange(data, dateRange);
      filteredData = filterDataBySearch(filteredData, searchTerm);
      setTableData(filteredData);
    }
  }, [data, dateRange, searchTerm]);

  const findDataById = (id: string): GSTDataItem | undefined => {
    return tableData.find((item: any) => item.id === id);
  };

  const getDataValue = (item: any, colId: string) => {
    switch (colId) {
      case "requestBy":
        return item.created_by;
      case "date":
        return new Date(item.created_at).toLocaleString();
      case "operation":
        return (
          <>
            {data && (
              <div className="flex -ml-4 sm:-ml-10 justify-center">
                {(() => {
                  const id = item.id;
                  setCurrentItemID && setCurrentItemID(id);
                  return id ? (
                    <ViewDataModule
                      onApprove={onAprrove}
                      onReject={onReject}
                      incudeGSTTable={includeGSTTable}
                      pagename={tableName}
                      formFields={formFields}
                      data={data}
                      id={item.id}
                    />
                  ) : null;
                })()}
                {(() => {
                  const foundItem = findDataById(item.id);
                  return foundItem ? (
                    <EditDataModule
                      id={item.id}
                      form={form}
                      includeGSTTable={includeGSTTable}
                      data={data}
                      onUpdate={onUpdate}
                      pagename={tableName}
                      formFields={formFields}
                    />
                  ) : null;
                })()}
                <DeleteDataModule id={item.id} onDelete={onDelete} />
              </div>
            )}
          </>
        );
      default:
        return item[colId] || "N/A";
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <MaxWidthWrapper className="mt-5">
      <div className="flex flex-col space-y-3 my-3 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between space-x-1">
        <div className="flex w-full sm:w-auto sm:space-x-2 sm:max-w-xs">
          <Input
            className="bg-zinc-100 flex-1 border border-stone-300 rounded-md"
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button className="rounded-md" type="submit">
            <Search />
          </Button>
        </div>

        <div className="flex flex-col space-x-1 space-y-2 sm:flex-row sm:space-y-0  ">
          <Select>
            <SelectTrigger className="w-full sm:w-[100px] bg-zinc-100 border-stone-300">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="accepted">Accepted</SelectItem>
              <SelectItem value="not-accepted">Not Accepted</SelectItem>
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-full sm:w-[300px] bg-zinc-100 rounded-md border-stone-300 justify-start text-left font-normal",
                  !dateRange && "text-muted-foreground"
                )}
              >
                <CalendarFold className="mr-2 h-4 w-4" />
                {dateRange?.from ? (
                  dateRange.to ? (
                    <>
                      {format(dateRange.from, "LLL dd, y")} -{" "}
                      {format(dateRange.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(dateRange.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a Date Range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={dateRange?.from}
                selected={dateRange}
                onSelect={setDateRange}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <ScrollArea className="h-[500px] ">
        <div className="border border-stone-700 rounded-lg p-1 overflow-hidden">
          <Table>
            <TableHeader className="bg-gray-400/10">
              <TableRow>
                {header.map((header) => (
                  <TableHead
                    key={header.id}
                    className="text-blue-600 text-base"
                  >
                    {header.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableData?.map((item: any, index: any) => (
                <TableRow key={index}>
                  {header.map((col) => (
                    <TableCell key={col.id}>
                      {getDataValue(item, col.id)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </ScrollArea>
    </MaxWidthWrapper>
  );
}
