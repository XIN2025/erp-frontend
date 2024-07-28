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

import { FilePlus2, Loader2, Loader2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import FormModule from "@/components/FormModule";
import {
  Activity,
  BusinessUnit,
  CompanyDetails,
  GoodsReceipt,
  InvoiceType,
  RecoveryType,
  UnitsOfMeasurement,
} from "@/config/common-master/formFields";
import { ApiError, apiClient } from "@/lib/utils";
import {
  TactivityValidators,
  activityValidators,
} from "@/lib/validators/common-master-form-validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, UseFormReturn, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  AcitvityHeaders,
  RecoveryTypeHeaders,
  UnitsOfMeasurementHeaders,
} from "@/config/common-master/common-master-headers";
import LoadingDots from "@/components/Loading";
import { useRouter } from "next/navigation";

const PAGENAME: string = "Activity";

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
  const [activityData, setActivityData] = useState<undefined | []>();
  const [mounted, setMounted] = useState(false);
  const [date, setDate] = useState<Date>();
  const [currentItemID, setCurrentItemID] = useState<string | undefined>("");
  const [isLoading, setIsloading] = useState<boolean>(false);
  const form = useForm<TactivityValidators>({
    resolver: zodResolver(activityValidators),
    defaultValues: {
      ActivityCode: "",
      ActivityDescription: "",
      CostType: "",
      UOM: "",
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
    values: TactivityValidators,
    gstData?: GSTDataItem[]
  ) => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const response = await apiClient.put(
          `/commonMaster/activity/update/${id}`,
          values
        );
        console.log("Response:", response);
        if (response.data.success) {
          await new Promise<void>((resolveToast) => {
            toast.success("Activity updated successfully!", {
              onAutoClose: () => resolveToast(),
            });
          });
          closeDialog();
          resolve();
        } else {
          toast.error("Failed to update Activity");
          reject(new Error("Failed to update Activity"));
        }
        fetchActivity();
      } catch (error) {
        console.error("Error updating Activity:", error);
        toast.error("An error occurred while updating Activity");
        reject(error);
      }
    });
  };
  const handleCreate = async (values: TactivityValidators) => {
    try {
      console.log("requestdata", values);

      const response = await apiClient.post(
        "/commonMaster/activity/create",
        values
      );
      if (response.data.success) {
        await new Promise<void>((resolve) => {
          toast.success("Activity created successfully!", {
            onAutoClose: () => resolve(),
          });
        });
        closeDialog();
        fetchActivity();
      } else {
        toast.error("Failed to create Activity");
      }
    } catch (error) {
      console.log("error", error);
      toast.error("An error occurred while creating Activity");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await apiClient.delete(
        `/commonMaster/activity/delete/${id}`
      );
      if (response.data.success) {
        await new Promise<void>((resolve) => {
          toast.success("Activity deleted successfully!", {
            onAutoClose: () => resolve(),
          });
        });

        closeDialog();
        fetchActivity();
      } else {
        toast.error("Failed to delete Activity");
      }
    } catch (error: unknown) {
      console.log("error", error);
      toast.error("An error occurred while deleting Activity");
    }
  };

  const handleApprove = () => {};
  const handleReject = () => {};

  const fetchActivity = async () => {
    try {
      setIsloading(true);
      const response = await apiClient.get(
        "/commonMaster/activity/allActivity"
      );
      setIsloading(false);
      console.log("get Activity response", response);
      setActivityData(response.data.allActivities);
    } catch (error) {
      setIsloading(false);
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchActivity();
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
              <FormModule<TactivityValidators>
                form={form}
                onSubmit={handleCreate}
                date={date}
                setDate={setDate}
                formFields={Activity}
              />
            </DialogContent>
          </Dialog>
        </div>

        <TableModule<TactivityValidators>
          data={activityData}
          tableName={PAGENAME}
          header={AcitvityHeaders}
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
          formFields={Activity}
        />
      </div>
    </MaxWidthWrapper>
  );
}

export default Page;
