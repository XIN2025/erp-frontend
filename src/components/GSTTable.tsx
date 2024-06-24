import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formTableHeaders, states } from "@/config/common-master-forms";
import { CircleMinus, CirclePlus } from "lucide-react";
import { Fragment } from "react";
import { z } from "zod";
import { Input } from "./ui/input";

export interface GSTTableData {
  SerialNo: number;
  GSTRegNo: string;
  GSTState: string;
  GSTAddress: string;
  [key: string]: string | number;
}

interface GSTTableProps {
  data: GSTTableData[];
  setData: (newData: GSTTableData[]) => void;
}
const GSTSchema = z.object({
  SerialNo: z.number(),
  GSTRegNo: z.string().min(1, "GST reg. no. is required"),
  GSTState: z.string().min(1, "GST state is required"),
  GSTAddress: z.string().min(1, "GST address is required"),
});

export const GSTTable = ({ data, setData }: GSTTableProps) => {
  const addRow = () => {
    setData([
      ...data,
      {
        SerialNo: data.length + 1,
        GSTRegNo: "",
        GSTState: "",
        GSTAddress: "",
      },
    ]);
  };

  const removeRow = (index: number) => {
    const updatedData = [...data];
    updatedData.splice(index, 1);
    setData(updatedData);
  };

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
            <Fragment key={index}>
              <TableRow>
                {/* <TableCell className=" ">{data.length}</TableCell> */}
                {formTableHeaders.map((header, i) => {
                  const dataObj = data[index];

                  return (
                    <Fragment key={i}>
                      {header.id !== "SerialNo" ? (
                        <TableCell>
                          {header.id !== "GSTState" ? (
                            <Input
                              type="text"
                              value={dataObj[header.id]}
                              onChange={(e) => {
                                const updatedData = [...data];
                                const currentHeaderId = header.id;
                                updatedData[index][currentHeaderId] =
                                  e.target.value;

                                setData(updatedData);
                              }}
                            />
                          ) : (
                            <Select
                              onValueChange={(selectedState: string) => {
                                const updatedData = [...data];
                                updatedData[index]["GSTState"] = selectedState;
                                setData(updatedData);
                              }}
                            >
                              <SelectTrigger className=" ">
                                <SelectValue placeholder="State" />
                              </SelectTrigger>
                              <SelectContent>
                                {states.map((state) => (
                                  <SelectItem key={state} value={state}>
                                    {state}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          )}
                        </TableCell>
                      ) : (
                        <TableCell style={{ width: "10%" }}>
                          {dataObj[header.id]}
                        </TableCell>
                      )}
                    </Fragment>
                  );
                })}
              </TableRow>
            </Fragment>
          ))}
        </TableBody>
      </Table>

      <div className=" flex items-center justify-end gap-3 mr-2">
        <button type="button" onClick={addRow} className="   py-2 rounded  ">
          <CirclePlus className="text-green-500" />
        </button>
        <button type="button" onClick={() => removeRow(data.length - 1)}>
          <CircleMinus className="text-red-500" />
        </button>
      </div>
    </div>
  );
};

{
  /* <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border">Serial No.</th>
            <th className="py-2 px-4 border">GST Reg. No.</th>
            <th className="py-2 px-4 border">GST State</th>
            <th className="py-2 px-4 border">GST Address</th>
            <th className="py-2 px-4 border">Company Name</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={row.id} className="border-b">
              <td className="py-2 px-4 border">
                <button
                  onClick={() => removeRow(index)}
                  className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                >
                  ×
                </button>
              </td>

              <td className="py-2 px-4 border">
                <input
                  type="text"
                  value={row.GSTRegNo}
                  onChange={(e) => {
                    const updatedData = [...data];
                    updatedData[index].GSTRegNo = e.target.value;
                    setData(updatedData);
                  }}
                  className="w-full border rounded px-2 py-1"
                />
              </td>
              <td className="py-2 px-4 border">
                <input
                  type="text"
                  value={row.GSTState}
                  onChange={(e) => {
                    const updatedData = [...data];
                    updatedData[index].GSTState = e.target.value;
                    setData(updatedData);
                  }}
                  className="w-full border rounded px-2 py-1"
                />
              </td>
              <td className="py-2 px-4 border">
                <input
                  type="text"
                  value={row.GSTAddress}
                  onChange={(e) => {
                    const updatedData = [...data];
                    updatedData[index].GSTAddress = e.target.value;
                    setData(updatedData);
                  }}
                  className="w-full border rounded px-2 py-1"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table> */
}
