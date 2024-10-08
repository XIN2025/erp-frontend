import React, { useState, useEffect } from "react";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "../ui/input";
import { CalendarFold, Search } from "lucide-react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { UseFormReturn } from "react-hook-form";
import { ScrollArea } from "../ui/scroll-area";
import { RoleDataItem } from "./RoleTable";

import AccessControlEditDataModule from "./AccessControlEditModule";
import DeleteDataModule from "../DeleteDataModule";
import { TaccessControlValdiators } from "@/lib/validators/access-control-validators";
import ViewDataModule from "./ViewRoleDataModule";

interface Header {
  label: string;
  id: string;
}

interface AccessControlTableProps {
  header: Header[];
  tableName: string;
  data?: AccessControlData[];
  form: UseFormReturn<TaccessControlValdiators>;
  onDelete: (id: string) => void;
  onUpdate: (
    id: string,
    values: TaccessControlValdiators,
    roleData: RoleDataItem[]
  ) => Promise<void>;
  date?: Date | undefined;
  setDate?: React.Dispatch<React.SetStateAction<Date | undefined>>;
  currentItemID?: string;
  setCurrentItemID?: (id: string) => void;
  onApprove: () => void;
  onReject: () => void;
  formFields: Array<{
    name: keyof TaccessControlValdiators;
    label: string;
    type: "text" | "date" | "number" | "select";
  }>;
}

interface AccessControlData {
  id: string;
  EmployeeCode: string;
  first_name: string;
  last_name: string;
  roles: RoleDataItem[];
  [key: string]: any;
}
export default function AccessControlTable({
  header,
  tableName,
  form,
  data = [],
  onUpdate,
  onDelete,
  date,
  currentItemID,
  onApprove,
  onReject,
  setCurrentItemID,
  setDate,
  formFields,
}: AccessControlTableProps) {
  const [tableData, setTableData] = useState<AccessControlData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });
  const [status, setStatus] = useState<string | undefined>(undefined);

  useEffect(() => {
    let filteredData = filterDataByDateRange(data, dateRange);
    filteredData = filterDataBySearch(filteredData, searchTerm);
    filteredData = filterDataByStatus(filteredData, status);
    setTableData(filteredData);
  }, [data, dateRange, searchTerm, status]);

  const filterDataByDateRange = (
    data: AccessControlData[],
    range: DateRange | undefined
  ) => {
    if (!range || !range.from) return data;

    return data.filter((item) => {
      const itemDate = new Date(item.created_at);
      return itemDate >= range.from! && (!range.to || itemDate <= range.to);
    });
  };

  const filterDataBySearch = (data: AccessControlData[], term: string) => {
    if (!term) return data;

    const firstColumnId = header[0].id;
    return data.filter((item) =>
      item[firstColumnId].toLowerCase().includes(term.toLowerCase())
    );
  };

  const filterDataByStatus = (
    data: AccessControlData[],
    status: string | undefined
  ) => {
    if (!status) return data;
    return data.filter((item) => item.status === status);
  };

  const getDataValue = (item: AccessControlData, colId: string) => {
    switch (colId) {
      case "requested_by":
        return item.requested_by;
      case "date":
        //@ts-ignore
        return format(new Date(item.roles[0]?.created_at), "MMM-dd-yyyy");
      case "operation":
        return (
          <div className="flex -ml-4 sm:-ml-10 items-center justify-center">
            <ViewDataModule
              onApprove={onApprove}
              onReject={onReject}
              pagename={tableName}
              formFields={formFields}
              data={data}
              id={item.id}
            />
            <AccessControlEditDataModule
              id={item.id}
              form={form}
              //@ts-ignore
              data={data}
              //@ts-ignore
              onUpdate={onUpdate}
              pagename={tableName}
              formFields={formFields}
            />
            <DeleteDataModule id={item.id} onDelete={onDelete} />
          </div>
        );
      default:
        return item[colId] || "N/A";
    }
  };

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

        <div className="flex flex-col space-x-1 space-y-2 sm:flex-row sm:space-y-0">
          <Select onValueChange={(value) => setStatus(value)}>
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
