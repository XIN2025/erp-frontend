"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import TableModule from "@/components/common-master/TableModule";

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

import { FilePlus2 } from "lucide-react";
import { useEffect, useState } from "react";

import FormModule from "@/components/FormModule";
import LoadingDots from "@/components/Loading";
import { ShiftMaster } from "@/config/common-master/formFields";

import { apiClient } from "@/lib/utils";
import {
  shiftMasterValidators,
  TshiftMasterValidators,
} from "@/lib/validators/common-master-form-validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ShiftMasterHeaders } from "@/config/common-master/common-master-headers";

const PAGENAME: string = "Shift Master";

export interface GSTDataItem {
  SerialNo: number;
  GSTRegNo: string;
  GSTState: string;
  GSTAddress: string;
  [key: string]: string | number;
}

function Page() {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [shiftMasterData, setshiftMasterData] = useState<undefined | []>();
  const [mounted, setMounted] = useState(false);
  const [date, setDate] = useState<Date>();
  const [currentItemID, setCurrentItemID] = useState<string | undefined>("");
  const [isLoading, setIsloading] = useState<boolean>(false);
  const form = useForm<TshiftMasterValidators>({
    resolver: zodResolver(shiftMasterValidators),
    defaultValues: {
      ShiftCode: "",
      ShiftInTime: "",
      ShiftOutTime: "",

      Tags: "",
    },
  });

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const handleDialogChange = (open: boolean) => {
    setIsDialogOpen(open);
  };

  const handleUpdate = (
    id: string,
    values: TshiftMasterValidators,
    gstData?: GSTDataItem[]
  ) => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const response = await apiClient.put(
          `/commonMaster/shiftMaster/update/${id}`,
          values
        );
        console.log("Response:", response);
        if (response.data.success) {
          await new Promise<void>((resolveToast) => {
            toast.success("Shift updated successfully!", {
              onAutoClose: () => resolveToast(),
            });
          });
          closeDialog();
          resolve();
        } else {
          toast.error("Failed to update Shift");
          reject(new Error("Failed to update Shift"));
        }
        fetchShiftMaster();
      } catch (error) {
        console.error("Error updating Shift:", error);
        toast.error("An error occurred while updating Shift");
        reject(error);
      }
    });
  };
  const handleCreate = async (values: TshiftMasterValidators) => {
    try {
      const response = await apiClient.post(
        "/commonMaster/shiftMaster/create",
        values
      );
      if (response.data.success) {
        await new Promise<void>((resolve) => {
          toast.success("Shift created successfully!", {
            onAutoClose: () => resolve(),
          });
        });
        closeDialog();
        fetchShiftMaster();
      } else {
        toast.error(response.data.error || "Failed to create Shift");
      }
    } catch (error: any) {
      console.error("error", error);
      if (error.response && error.response.data) {
        toast.error(
          error.response.data.error || "An error occurred while creating Shift"
        );
      } else {
        toast.error("An error occurred while creating Shift");
      }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await apiClient.delete(
        `/commonMaster/shiftMaster/delete/${id}`
      );
      if (response.data.success) {
        await new Promise<void>((resolve) => {
          toast.success("Shift deleted successfully!", {
            onAutoClose: () => resolve(),
          });
        });

        closeDialog();
        fetchShiftMaster();
      } else {
        toast.error("Failed to delete Shift");
      }
    } catch (error: unknown) {
      console.log("error", error);
      toast.error("An error occurred while deleting Shift");
    }
  };

  const handleApprove = () => {};
  const handleReject = () => {};

  const fetchShiftMaster = async () => {
    try {
      setIsloading(true);
      const response = await apiClient.get(
        "/commonMaster/shiftMaster/allShiftMaster"
      );
      setIsloading(false);
      console.log("get Shift response", response);
      setshiftMasterData(response.data.allShiftMaster);
    } catch (error) {
      setIsloading(false);
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchShiftMaster();
  }, []);

  useEffect(() => {
    setDate(new Date());
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (isLoading) {
    return <LoadingDots />;
  }
  return (
    <MaxWidthWrapper className=" max-w-screen-2xl ">
      <h1 className=" text-5xl my-12 tracking-tighter font-bold text-center w-full text-zinc-700">
        {PAGENAME}
      </h1>
      <div className="mt-10   ">
        <div className="w-full flex  lg:pr-[8.2rem]  pr-[5.5rem] justify-end">
          <Dialog open={isDialogOpen} onOpenChange={handleDialogChange}>
            <DialogTrigger>
              <TooltipProvider delayDuration={300}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      className="group flex items-center  "
                      onClick={openDialog}
                    >
                      <div className="flex -mr-2  mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background  selection: dark:bg-neutral-700 group-hover:bg-blue-600">
                        <FilePlus2
                          className="group-hover:text-white transition text-blue-600"
                          size={25}
                        />
                      </div>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="top" align="center">
                    {`Add ${PAGENAME}`}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </DialogTrigger>
            <DialogContent className="max-w-[770px]">
              <DialogHeader>
                <DialogTitle className="text-center">{PAGENAME}</DialogTitle>
              </DialogHeader>
              <FormModule<TshiftMasterValidators>
                form={form}
                onSubmit={handleCreate}
                date={date}
                setDate={setDate}
                formFields={ShiftMaster}
              />
            </DialogContent>
          </Dialog>
        </div>

        <TableModule<TshiftMasterValidators>
          data={shiftMasterData}
          tableName={PAGENAME}
          header={ShiftMasterHeaders}
          includeGSTTable={false}
          form={form}
          // onSubmit={handleCreate}
          onUpdate={handleUpdate}
          currentItemID={currentItemID}
          setCurrentItemID={setCurrentItemID}
          onDelete={handleDelete}
          // setData={setData}
          onApprove={handleApprove}
          onReject={handleReject}
          date={date}
          setDate={setDate}
          formFields={ShiftMaster}
        />
      </div>
    </MaxWidthWrapper>
  );
}

export default Page;
