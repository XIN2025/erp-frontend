import { Edit, Loader2, Trash2, View } from "lucide-react";
import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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

interface DeleteDataModuleProps {
  id: string;
  onDelete: (id: string) => void;
}

export default function DeleteDataModule({
  id,
  onDelete,
}: DeleteDataModuleProps) {
  const [isLoading, setIsloading] = useState<boolean>(false);
  const handleDelete = async () => {
    setIsloading(true);
    try {
      await onDelete(id);
    } finally {
      setIsloading(false);
    }
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button variant="ghost" size="icon">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <div className="flex -mr-2 mx-3 h-[28px] w-[28px] rounded-[8px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 hover:bg-white group">
                    <Trash2
                      className="text-grey-800 group-hover:text-red-500 transition-colors duration-200"
                      size={20}
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View Full Document</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete this
              item and remove the data from our servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-6">
            <div className="flex justify-between space-x-4">
              <Button
                onClick={() => handleDelete()}
                className="bg-red-500 hover:bg-red-400"
              >
                {isLoading ? <Loader2 className="animate-spin  " /> : "Delete"}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
