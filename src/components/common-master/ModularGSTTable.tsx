import React, { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { states } from "@/config/OptionsForSelection";
import { formTableHeaders } from "@/config/common-master/formFields";
import { CirclePlus, CircleMinus } from "lucide-react";

export interface GSTTableData {
  SerialNo: number;
  GSTRegNo: string;
  GSTState: string;
  GSTAddress: string;
  [key: string]: string | number;
}

interface ModularGSTTableProps {
  gstData: GSTTableData[];
  setGSTData: (newData: GSTTableData[]) => void;
  companyDetails?: any[];
  selectedCompany?: string;
}

export const ModularGSTTable: React.FC<ModularGSTTableProps> = ({
  gstData,
  setGSTData,
  companyDetails,
  selectedCompany,
}) => {
  useEffect(() => {
    if (selectedCompany && companyDetails) {
      const selectedCompanyDetails = companyDetails.find(
        (company) => company.CompanyName === selectedCompany
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
      } else if (gstData.length === 0) {
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
  }, [selectedCompany, companyDetails, setGSTData, gstData.length]);

  const addRow = () => {
    setGSTData([
      ...gstData,
      {
        SerialNo: gstData.length + 1,
        GSTRegNo: "",
        GSTState: "",
        GSTAddress: "",
      },
    ]);
  };

  const removeRow = (index: number) => {
    const updatedData = gstData.filter((_, i) => i !== index);
    setGSTData(updatedData.map((row, i) => ({ ...row, SerialNo: i + 1 })));
  };

  const updateField = (index: number, field: string, value: string) => {
    const updatedData = gstData.map((row, i) =>
      i === index ? { ...row, [field]: value } : row
    );
    setGSTData(updatedData);
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
            <TableHead className="w-[50px]">
              <span className="text-blue-600">Action</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {gstData.map((row, index) => (
            <TableRow key={index}>
              {formTableHeaders.map((header) => (
                <TableCell key={header.id}>
                  {header.id === "SerialNo" ? (
                    row[header.id]
                  ) : header.id === "GSTState" ? (
                    <Select
                      value={row.GSTState}
                      onValueChange={(selectedState: string) =>
                        updateField(index, "GSTState", selectedState)
                      }
                    >
                      <SelectTrigger className="">
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
                  ) : (
                    <Input
                      type="text"
                      value={row[header.id]}
                      onChange={(e) =>
                        updateField(index, header.id, e.target.value)
                      }
                    />
                  )}
                </TableCell>
              ))}
              <TableCell>
                <button
                  type="button"
                  onClick={() => removeRow(index)}
                  className="text-red-500"
                >
                  <CircleMinus />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end gap-3 mr-2 mt-2">
        <button type="button" onClick={addRow} className="py-2 rounded">
          <CirclePlus className="text-green-500" />
        </button>
      </div>
    </div>
  );
};

export default ModularGSTTable;
