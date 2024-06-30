import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formTableHeaders } from "@/config/common-master-forms";

export interface GSTTableData {
  SerialNo: number;
  GSTRegNo: string;
  GSTState: string;
  GSTAddress: string;
  [key: string]: string | number;
}

interface ViewOnlyGSTTableProps {
  data: GSTTableData[];
}

export const ViewOnlyGSTTable = ({ data }: ViewOnlyGSTTableProps) => {
  return (
    <div
      style={{ width: "90%" }}
      className="border mx-auto border-stone-700 rounded-lg p-1 overflow-hidden"
    >
      <Table>
        <TableHeader>
          <TableRow>
            {formTableHeaders.map((header) => (
              <TableHead key={header.id} className="w-[100px]">
                <span className="text-blue-600">{header.label}</span>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index}>
              {formTableHeaders.map((header) => (
                <TableCell key={header.id}>{row[header.id]}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
