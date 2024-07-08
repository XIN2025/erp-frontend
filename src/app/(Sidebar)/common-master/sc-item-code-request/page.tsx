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

import { FilePlus2 } from "lucide-react";
import { useEffect, useState } from "react";

import FormModule from "@/components/FormModule";
import LoadingDots from "@/components/Loading";
import {
  Machine,
  MachineClass,
  RecoveryType,
  SCItemCode,
} from "@/config/common-master/formFields";
import {
  MachineClassHeaders,
  MachineHeaders,
  RecoveryTypeHeaders,
  SCItemCodeHeaders,
} from "@/config/common-master/common-master-headers";
import { apiClient } from "@/lib/utils";
import {
  ScItemCodeValidators,
  TScItemCodeValidators,
} from "@/lib/validators/common-master-form-validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const PAGENAME: string = "SC Item Code Request";

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
  const [SCItemCodeData, setSCItemCodeData] = useState<undefined | []>();
  const [mounted, setMounted] = useState(false);
  const [date, setDate] = useState<Date>();
  const [currentItemID, setCurrentItemID] = useState<string | undefined>("");
  const [isLoading, setIsloading] = useState<boolean>(false);
  const form = useForm<TScItemCodeValidators>({
    resolver: zodResolver(ScItemCodeValidators),
    defaultValues: {
      MajorSCItemGroupCode: "",
      MajorSCItemGroupDescription: "",
      SCItemDescription: "",
      UOM: "",
      Component: "",
      ComponentPercentage: "",
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
    values: TScItemCodeValidators,
    gstData?: GSTDataItem[]
  ) => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const response = await apiClient.put(
          `/commonMaster/SCItemCodeRequest/update/${id}`,
          values
        );
        console.log("Response:", response);
        if (response.data.success) {
          await new Promise<void>((resolveToast) => {
            toast.success("SC Item Code updated successfully!", {
              onAutoClose: () => resolveToast(),
            });
          });
          closeDialog();
          resolve();
        } else {
          toast.error("Failed to update SC Item Code");
          reject(new Error("Failed to update SC Item Code"));
        }
        fetchSCItemCode();
      } catch (error) {
        console.error("Error updating SC Item Code:", error);
        toast.error("An error occurred while updating SC Item Code");
        reject(error);
      }
    });
  };
  const handleCreate = async (values: TScItemCodeValidators) => {
    try {
      console.log("valus", values);
      const response = await apiClient.post(
        "/commonMaster/SCItemCodeRequest/create",
        values
      );
      if (response.data.success) {
        await new Promise<void>((resolve) => {
          toast.success("SC Item Code created successfully!", {
            onAutoClose: () => resolve(),
          });
        });
        closeDialog();
        fetchSCItemCode();
      } else {
        toast.error("Failed to create SC Item Code");
      }
    } catch (error) {
      console.log("error", error);
      toast.error("An error occurred while creating SC Item Code");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await apiClient.delete(
        `/commonMaster/SCItemCodeRequest/delete/${id}`
      );
      if (response.data.success) {
        await new Promise<void>((resolve) => {
          toast.success("SC Item Code deleted successfully!", {
            onAutoClose: () => resolve(),
          });
        });

        closeDialog();
        fetchSCItemCode();
      } else {
        toast.error("Failed to delete SC Item Code");
      }
    } catch (error: unknown) {
      console.log("error", error);
      toast.error("An error occurred while deleting SC Item Code");
    }
  };

  const handleApprove = () => {};
  const handleReject = () => {};

  const fetchSCItemCode = async () => {
    try {
      setIsloading(true);
      const response = await apiClient.get(
        "/commonMaster/SCItemCodeRequest/allSCItemCodeRequest"
      );
      setIsloading(false);
      console.log("get SC Item Code response", response);
      setSCItemCodeData(response.data.allSCItemCodeRequest);
    } catch (error) {
      setIsloading(false);
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchSCItemCode();
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
                      className="Code flex items-center  "
                      onClick={openDialog}
                    >
                      <div className="flex -mr-2  mx-3 h-[48px] w-[48px] rounded-[24px] Code-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background  selection: dark:bg-neutral-700 Code-hover:bg-blue-600">
                        <FilePlus2
                          className="Code-hover:text-white transition text-blue-600"
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
              <FormModule<TScItemCodeValidators>
                form={form}
                onSubmit={handleCreate}
                date={date}
                setDate={setDate}
                formFields={SCItemCode}
              />
            </DialogContent>
          </Dialog>
        </div>

        <TableModule<TScItemCodeValidators>
          data={SCItemCodeData}
          tableName={PAGENAME}
          header={SCItemCodeHeaders}
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
          formFields={SCItemCode}
        />
      </div>
    </MaxWidthWrapper>
  );
}

export default Page;
