// ViewDataModule.tsx

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { FileQuestion, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface ViewDataModuleProps<T> {
  id: string;
  data: T[];
  pagename: string;
  formFields: Array<{
    name: keyof T;
    label: string;
    type: "text" | "date" | "number" | "select";
  }>;
  onApprove: () => void;
  onReject: () => void;
}

export default function ViewDataModule<T extends Record<string, any>>({
  id,
  data,
  pagename,
  formFields,
  onApprove,
  onReject,
}: ViewDataModuleProps<T>) {
  const [formData, setFormData] = useState<T | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  console.log("formData", formData);
  const findItem = (id: string) => {
    const item = data.find((item) => item.id === id);
    if (item) {
      setFormData(item);
    }
    setIsOpen(true);
  };

  const handleApprove = () => {
    onApprove();
    setIsOpen(false);
  };

  const handleReject = () => {
    onReject();
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => findItem(id)}
                className="flex -mr-2 mx-3 h-[28px] w-[28px] rounded-[8px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 hover:bg-blue-600 group"
              >
                <FileQuestion
                  className="text-grey-800 group-hover:text-white transition-colors duration-200"
                  size={20}
                />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>View Details</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[770px] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>{`${pagename} (View)`}</DialogTitle>
        </DialogHeader>
        <ScrollArea className="mt-4 max-h-[calc(90vh-200px)]">
          <div className="space-y-4 p-4">
            {formFields.map((item) => (
              <div key={item.name as string} className="flex flex-col">
                <label className="font-medium">{item.label}</label>
                <div className="mt-1">
                  {item.type === "date" && formData?.[item.name] ? (
                    format(new Date(formData[item.name] as string), "PPP")
                  ) : (
                    <span className="text-gray-700">
                      {formData?.[item.name]?.toString() || "N/A"}
                    </span>
                  )}
                </div>
              </div>
            ))}

            {formData && formData.roles && formData.roles.length > 0 && (
              <div>
                <h3 className="font-medium mb-2">Role Details</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Company Name</TableHead>
                      <TableHead>Business Unit</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Project Code Name</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {formData.roles.map((role: any, index: number) => (
                      <TableRow key={index}>
                        <TableCell>{role.CompanyName}</TableCell>
                        <TableCell>
                          {role.BusinessUnit.map((unit: any) => `${unit}  `)}
                        </TableCell>
                        <TableCell>{role.Role}</TableCell>
                        <TableCell>{role.ProjectCodeName}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        </ScrollArea>
        <div className="mt-4 flex justify-end space-x-2">
          <Button onClick={handleReject} variant="destructive">
            <XCircle className="mr-2 h-4 w-4" />
            Reject
          </Button>
          <Button onClick={handleApprove} className="bg-green-500">
            <CheckCircle className="mr-2 h-4 w-4" />
            Approve
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
