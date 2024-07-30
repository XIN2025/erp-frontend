import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Eye, CheckCircle, XCircle, FileQuestion } from "lucide-react";
import { GSTDataItem } from "@/app/(Sidebar)/common-master/company-details/page";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useEffect, useState } from "react";
import { format } from "date-fns";

import { ViewOnlyGSTTable } from "./ViewOnlyGSTTable";
import { calculateScrollAreaHeight } from "../FormModule";

interface ViewDataModuleProps<T> {
  id: string;
  data: T[];
  includeGSTTable: boolean;
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
  includeGSTTable,
  pagename,

  formFields,
  onApprove,
  onReject,
}: ViewDataModuleProps<T>) {
  const scrollAreaHeight: string = calculateScrollAreaHeight(formFields.length);
  const [formData, setFormData] = useState<T | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [gstData, setGSTData] = useState<GSTDataItem[]>([
    {
      SerialNo: 1,
      GSTRegNo: " ",
      GSTState: " ",
      GSTAddress: " ",
    },
  ]);
  console.log("compnay data ", data);
  const extractAndSetGSTData = (formData: any) => {
    if (formData && formData.Gsts && Array.isArray(formData.Gsts)) {
      const extractedGSTData = formData.Gsts.map((gst: any) => ({
        SerialNo: gst.SerialNo,
        GSTRegNo: gst.GSTRegNo,
        GSTState: gst.GSTState,
        GSTAddress: gst.GSTAddress,
      }));
      setGSTData(extractedGSTData);
    } else {
      setGSTData([
        {
          SerialNo: 1,
          GSTRegNo: " ",
          GSTState: " ",
          GSTAddress: " ",
        },
      ]);
    }
  };
  const findItem = (id: string) => {
    const item = data.find((item) => item.id === id);

    if (item) {
      setFormData(item);
      extractAndSetGSTData(item);
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
        <Button variant="ghost" size="icon" onClick={() => findItem(id)}>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="flex -mr-2 mx-3 h-[28px] w-[28px] rounded-[8px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 hover:bg-blue-600 group">
                  <FileQuestion
                    className="text-grey-800 group-hover:text-white transition-colors duration-200"
                    size={20}
                  />
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>View Details</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[770px] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-center">{`${pagename} (View)`}</DialogTitle>
        </DialogHeader>
        <ScrollArea
          className={`overflow-y-auto`}
          style={{ height: scrollAreaHeight }}
        >
          <div className="space-y-8">
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

            {includeGSTTable && gstData && gstData.length > 0 && (
              <div>
                <h3 className="font-medium mb-2">GST Details</h3>
                <ViewOnlyGSTTable data={gstData} />
              </div>
            )}
          </div>
        </ScrollArea>
        <DialogFooter className="mt-6">
          <div className="flex justify-between space-x-4">
            <Button
              onClick={handleApprove}
              className="bg-green-500 hover:bg-green-400"
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Approve
            </Button>
            <Button
              className="bg-red-500 hover:bg-red-400"
              onClick={handleReject}
            >
              <XCircle className="mr-2 h-4 w-4" />
              Reject
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
