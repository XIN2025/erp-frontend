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
  Activity,
  BusinessUnit,
  CompanyDetails,
  GoodsReceipt,
  InvoiceType,
  MajorScItemGroup,
  RecoveryType,
  UnitsOfMeasurement,
} from "@/config/common-master/formFields";
import { ApiError, apiClient } from "@/lib/utils";
import {
  majorScItemGroupValidators,
  TmajorScItemGroupValidators,
} from "@/lib/validators/common-master-form-validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, UseFormReturn, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  AcitvityHeaders,
  MajorSCItemGroupHeaders,
  RecoveryTypeHeaders,
  UnitsOfMeasurementHeaders,
} from "@/config/common-master/common-master-headers";
import LoadingDots from "@/components/Loading";
import { useRouter } from "next/navigation";

const PAGENAME: string = "Major SC Item Group";

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
  const [majorSCItemData, setmajorSCItemData] = useState<undefined | []>();
  const [mounted, setMounted] = useState(false);
  const [date, setDate] = useState<Date>();
  const [currentItemID, setCurrentItemID] = useState<string | undefined>("");
  const [isLoading, setIsloading] = useState<boolean>(false);
  const form = useForm<TmajorScItemGroupValidators>({
    resolver: zodResolver(majorScItemGroupValidators),
    defaultValues: {
      MajorSCItemGroupCode: "",
      MajorSCItemGroupStatus: "",
      MajorSCItemGroupDescription: "",
      UOM: "",
      GroupCategory: "",
      Tags: "",
    },
  });

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);
  console.log("majhorsc item group fata", majorSCItemData);
  const handleDialogChange = (open: boolean) => {
    setIsDialogOpen(open);
  };

  const handleUpdate = (
    id: string,
    values: TmajorScItemGroupValidators,
    gstData?: GSTDataItem[]
  ) => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const response = await apiClient.put(
          `/commonMaster/majorSCItemGroup/update/${id}`,
          values
        );
        console.log("Response:", response);
        if (response.data.success) {
          await new Promise<void>((resolveToast) => {
            toast.success("Major SC Item Group updated successfully!", {
              onAutoClose: () => resolveToast(),
            });
          });
          closeDialog();
          resolve();
        } else {
          toast.error("Failed to update majorSCItemGroup");
          reject(new Error("Failed to update majorSCItemGroup"));
        }
        fetchMajorSCItemGroup();
      } catch (error) {
        console.error("Error updating majorSCItemGroup:", error);
        toast.error("An error occurred while updating majorSCItemGroup");
        reject(error);
      }
    });
  };
  const handleCreate = async (values: TmajorScItemGroupValidators) => {
    try {
      console.log("requestdata", values);

      const response = await apiClient.post(
        "/commonMaster/majorSCItemGroup/create",
        values
      );
      if (response.data.success) {
        await new Promise<void>((resolve) => {
          toast.success("Major SC Item Group created successfully!", {
            onAutoClose: () => resolve(),
          });
        });
        closeDialog();
        fetchMajorSCItemGroup();
      } else {
        toast.error("Failed to create majorSCItemGroup");
      }
    } catch (error) {
      console.log("error", error);
      toast.error("An error occurred while creating majorSCItemGroup");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await apiClient.delete(
        `/commonMaster/majorSCItemGroup/delete/${id}`
      );
      if (response.data.success) {
        await new Promise<void>((resolve) => {
          toast.success("Major SC Item Group deleted successfully!", {
            onAutoClose: () => resolve(),
          });
        });

        closeDialog();
        fetchMajorSCItemGroup();
      } else {
        toast.error("Failed to delete majorSCItemGroup");
      }
    } catch (error: unknown) {
      console.log("error", error);
      toast.error("An error occurred while deleting majorSCItemGroup");
    }
  };

  const handleApprove = () => {};
  const handleReject = () => {};

  const fetchMajorSCItemGroup = async () => {
    try {
      setIsloading(true);
      const response = await apiClient.get(
        "/commonMaster/majorSCItemGroup/allMajorSCItemGroup"
      );
      setIsloading(false);
      console.log("get Major SC Item Group response", response);
      setmajorSCItemData(response.data.allMajorSCItemGroup);
    } catch (error) {
      setIsloading(false);
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchMajorSCItemGroup();
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
              <FormModule<TmajorScItemGroupValidators>
                form={form}
                onSubmit={handleCreate}
                date={date}
                setDate={setDate}
                formFields={MajorScItemGroup}
              />
            </DialogContent>
          </Dialog>
        </div>

        <TableModule<TmajorScItemGroupValidators>
          data={majorSCItemData}
          tableName={PAGENAME}
          header={MajorSCItemGroupHeaders}
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
          formFields={MajorScItemGroup}
        />
      </div>
    </MaxWidthWrapper>
  );
}

export default Page;
