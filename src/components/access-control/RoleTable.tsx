// components/access-control/RoleTable.tsx

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Minus, Settings } from "lucide-react";
import PermissionsDialog from "./PermissionsDialog";
import { apiClient } from "@/lib/utils";

export interface Module {
  ModuleName: string;
  Permissions: string[];
}

export interface RoleDataItem {
  CompanyName: string;
  BusinessUnit: string[];
  Role: string;
  ProjectCodeName: string;
  Modules: Module[];
}

interface RoleTableProps {
  roleData: RoleDataItem[];
  setRoleData: React.Dispatch<React.SetStateAction<RoleDataItem[]>>;
  companyOptions: string[];
}

const validRoles = [
  "Site Supervisor",
  "Site Incharge",
  "Site Storekeeper",
  "BU Commercial",
  "Commercial Assistant",
  "Accounts & Admin Head",
  "Cashier",
  "BU Head",
  "Director",
];

export const RoleTable: React.FC<RoleTableProps> = ({
  roleData,
  setRoleData,
  companyOptions,
}) => {
  const [isPermissionsDialogOpen, setIsPermissionsDialogOpen] = useState(false);
  const [currentRowIndex, setCurrentRowIndex] = useState<number | null>(null);
  const [businessUnitOptions, setBusinessUnitOptions] = useState<
    Record<string, string[]>
  >({});

  const fetchBusinessUnits = async (companyName: string) => {
    try {
      const response = await apiClient.get(
        "/commonMaster/businessUnit/allBusinessUnit"
      );
      if (response.data.success) {
        const filteredBusinessUnits = response.data.allBusinessUnit
          .filter(
            (unit: any) =>
              unit.CompanyName === companyName && unit.Tags === "Active"
          )
          .map((unit: any) => unit.BusinessUnit);
        setBusinessUnitOptions((prev) => ({
          ...prev,
          [companyName]: filteredBusinessUnits,
        }));
      }
    } catch (error) {
      console.error("Error fetching business units:", error);
    }
  };

  const addRow = () => {
    setRoleData([
      ...roleData,
      {
        CompanyName: "",
        BusinessUnit: [],
        Role: "",
        ProjectCodeName: "",
        Modules: [],
      },
    ]);
  };

  const removeRow = (index: number) => {
    const updatedData = roleData.filter((_, i) => i !== index);
    setRoleData(updatedData);
  };

  const updateField = (
    index: number,
    field: keyof RoleDataItem,
    value: string | string[]
  ) => {
    const updatedData = roleData.map((row, i) =>
      i === index ? { ...row, [field]: value } : row
    );
    setRoleData(updatedData);

    if (field === "CompanyName") {
      fetchBusinessUnits(value as string);
    }
  };

  const openPermissionsDialog = (index: number) => {
    setCurrentRowIndex(index);
    setIsPermissionsDialogOpen(true);
  };

  const closePermissionsDialog = () => {
    setIsPermissionsDialogOpen(false);
    setCurrentRowIndex(null);
  };

  const updatePermissions = (updatedModules: Module[]) => {
    if (currentRowIndex !== null) {
      const updatedData = roleData.map((row, i) =>
        i === currentRowIndex ? { ...row, Modules: updatedModules } : row
      );
      setRoleData(updatedData);
    }
    closePermissionsDialog();
  };
  const handleBusinessUnitChange = (index: number, value: string) => {
    const companyName = roleData[index].CompanyName;
    const availableUnits = businessUnitOptions[companyName] || [];

    let updatedBusinessUnits: string[];

    if (value === "All") {
      updatedBusinessUnits = [...availableUnits];
    } else if (roleData[index].BusinessUnit.includes(value)) {
      updatedBusinessUnits = roleData[index].BusinessUnit.filter(
        (unit) => unit !== value
      );
    } else {
      updatedBusinessUnits = [...roleData[index].BusinessUnit, value];
    }

    updateField(index, "BusinessUnit", updatedBusinessUnits);
  };

  return (
    <div className="w-full overflow-x-auto">
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[20%]">
              <span className="text-blue-600">Company Name</span>
            </TableHead>
            <TableHead className="w-[20%]">
              <span className="text-blue-600">Business Unit</span>
            </TableHead>
            <TableHead className="w-[20%]">
              <span className="text-blue-600">Role</span>
            </TableHead>
            <TableHead className="w-[20%]">
              <span className="text-blue-600">Project Code</span>
            </TableHead>
            <TableHead className="w-[20%]">
              <span className="text-blue-600">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {roleData.map((row, index) => (
            <TableRow key={index}>
              <TableCell>
                <Select
                  value={row.CompanyName}
                  onValueChange={(value) =>
                    updateField(index, "CompanyName", value)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Company" />
                  </SelectTrigger>
                  <SelectContent>
                    {companyOptions.map((company) => (
                      <SelectItem key={company} value={company}>
                        {company}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <Select
                  value={
                    row.BusinessUnit.length ===
                    businessUnitOptions[row.CompanyName]?.length
                      ? "All"
                      : row.BusinessUnit.join(",")
                  }
                  onValueChange={(value) =>
                    handleBusinessUnitChange(index, value)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Business Unit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="All">All</SelectItem>
                    {businessUnitOptions[row.CompanyName]?.map((unit) => (
                      <SelectItem key={unit} value={unit}>
                        {unit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <Select
                  value={row.Role}
                  onValueChange={(value) => updateField(index, "Role", value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Role" />
                  </SelectTrigger>
                  <SelectContent>
                    {validRoles.map((role) => (
                      <SelectItem key={role} value={role}>
                        {role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell>
                <Input
                  value={row.ProjectCodeName}
                  onChange={(e) =>
                    updateField(index, "ProjectCodeName", e.target.value)
                  }
                  placeholder="Enter Project Code"
                  className="w-full"
                />
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Button
                    type="button"
                    onClick={() => openPermissionsDialog(index)}
                    variant="outline"
                    size="sm"
                    className="px-2 py-1"
                  >
                    <Settings className="w-4 h-4 mr-1" />
                    Permissions
                  </Button>
                  <Button
                    onClick={() => removeRow(index)}
                    variant="outline"
                    size="sm"
                    className="px-2 py-1 text-red-500 hover:text-red-700"
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-end mt-4">
        <Button onClick={addRow} variant="outline" size="sm">
          <Plus className="w-4 h-4 mr-1" />
          Add Row
        </Button>
      </div>
      {isPermissionsDialogOpen && currentRowIndex !== null && (
        <PermissionsDialog
          isOpen={isPermissionsDialogOpen}
          onClose={closePermissionsDialog}
          onConfirm={updatePermissions}
          initialModules={roleData[currentRowIndex].Modules}
        />
      )}
    </div>
  );
};

export default RoleTable;
