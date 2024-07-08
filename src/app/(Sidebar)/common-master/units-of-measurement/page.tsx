"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import TableModule from "@/components/TableModule";

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
  BusinessUnit,
  CompanyDetails,
  GoodsReceipt,
  InvoiceType,
  RecoveryType,
  UnitsOfMeasurement,
} from "@/config/common-master/formFields";
import { ApiError, apiClient } from "@/lib/utils";
import {
  TunitsOFMeasurementValidators,
  unitsOFMeasurementValidators,
} from "@/lib/validators/common-master-form-validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, UseFormReturn, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  RecoveryTypeHeaders,
  UnitsOfMeasurementHeaders,
} from "@/config/common-master/common-master-headers";
import LoadingDots from "@/components/Loading";
import { useRouter } from "next/navigation";

const PAGENAME: string = "Units of Measurement";

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
  const [unitsOfMeasurementData, setUnitsOfMeasurementData] = useState<
    undefined | []
  >();
  const [mounted, setMounted] = useState(false);
  const [date, setDate] = useState<Date>();
  const [currentItemID, setCurrentItemID] = useState<string | undefined>("");
  const [isLoading, setIsloading] = useState<boolean>(false);
  const form = useForm<TunitsOFMeasurementValidators>({
    resolver: zodResolver(unitsOFMeasurementValidators),
    defaultValues: {
      UOMCode: "",
      UOMDescription: "",
      AllowableDecimal: 0,
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
    values: TunitsOFMeasurementValidators,
    gstData?: GSTDataItem[]
  ) => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const response = await apiClient.put(
          `/commonMaster/unitOfMeasurement/update/${id}`,
          values
        );
        console.log("Response:", response);
        if (response.data.success) {
          await new Promise<void>((resolveToast) => {
            toast.success("Unit of Measurement updated successfully!", {
              onAutoClose: () => resolveToast(),
            });
          });
          closeDialog();
          resolve();
        } else {
          toast.error("Failed to update Unit of Measurement");
          reject(new Error("Failed to update Unit of Measurement"));
        }
        fetchUnitsofMeanurement();
      } catch (error) {
        console.error("Error updating Unit of Measurement:", error);
        toast.error("An error occurred while updating Unit of Measurement");
        reject(error);
      }
    });
  };
  const handleCreate = async (values: TunitsOFMeasurementValidators) => {
    try {
      console.log("requestdata", values);

      const response = await apiClient.post(
        "/commonMaster/unitOfMeasurement/create",
        values
      );
      if (response.data.success) {
        await new Promise<void>((resolve) => {
          toast.success("Unit of Measurement created successfully!", {
            onAutoClose: () => resolve(),
          });
        });
        closeDialog();
        fetchUnitsofMeanurement();
      } else {
        toast.error("Failed to create Unit of Measurement");
      }
    } catch (error) {
      console.log("error", error);
      toast.error("An error occurred while creating Unit of Measurement");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await apiClient.delete(
        `/commonMaster/unitOfMeasurement/delete/${id}`
      );
      if (response.data.success) {
        await new Promise<void>((resolve) => {
          toast.success("Unit of Measurement deleted successfully!", {
            onAutoClose: () => resolve(),
          });
        });

        closeDialog();
        fetchUnitsofMeanurement();
      } else {
        toast.error("Failed to delete Unit of Measurement");
      }
    } catch (error: unknown) {
      console.log("error", error);
      toast.error("An error occurred while deleting Unit of Measurement");
    }
  };

  const handleApprove = () => {};
  const handleReject = () => {};

  const fetchUnitsofMeanurement = async () => {
    try {
      setIsloading(true);
      const response = await apiClient.get(
        "/commonMaster/unitOfMeasurement/allUnitOfMeasurement"
      );
      setIsloading(false);
      console.log("get Unit of Measurement response", response);
      setUnitsOfMeasurementData(response.data.allUnitOfMeasurements);
    } catch (error) {
      setIsloading(false);
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchUnitsofMeanurement();
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
              <FormModule<TunitsOFMeasurementValidators>
                form={form}
                onSubmit={handleCreate}
                date={date}
                setDate={setDate}
                formFields={UnitsOfMeasurement}
              />
            </DialogContent>
          </Dialog>
        </div>

        <TableModule<TunitsOFMeasurementValidators>
          data={unitsOfMeasurementData}
          tableName={PAGENAME}
          header={UnitsOfMeasurementHeaders}
          includeGSTTable={false}
          form={form}
          // onSubmit={handleCreate}
          onUpdate={handleUpdate}
          currentItemID={currentItemID}
          setCurrentItemID={setCurrentItemID}
          onDelete={handleDelete}
          // setData={setData}
          onAprrove={handleApprove}
          onReject={handleReject}
          date={date}
          setDate={setDate}
          formFields={UnitsOfMeasurement}
        />
      </div>
    </MaxWidthWrapper>
  );
}

export default Page;
