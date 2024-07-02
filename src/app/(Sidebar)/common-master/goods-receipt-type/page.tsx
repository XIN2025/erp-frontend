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
} from "@/config/common-master-forms";
import { ApiError, apiClient } from "@/lib/utils";
import {
  TgoodsReceiptValidators,
  goodsReceiptValidators,
} from "@/lib/validators/common-master-form-validators/form-validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, UseFormReturn, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  BusinessUnitHeaders,
  CompanyDetailsHeaders,
  GoodsReceiptHeader,
} from "@/config/common-master-headers";
import LoadingDots from "@/components/Loading";
import { useRouter } from "next/navigation";

const PAGENAME: string = "Goods Receipt";

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
  const [goodsReceiptData, setGoodsReceiptData] = useState<undefined | []>();
  const [mounted, setMounted] = useState(false);
  const [date, setDate] = useState<Date>();
  const [currentItemID, setCurrentItemID] = useState<string | undefined>("");
  const [isLoading, setIsloading] = useState<boolean>(false);
  const form = useForm<TgoodsReceiptValidators>({
    resolver: zodResolver(goodsReceiptValidators),
    defaultValues: {
      ReceiptCode: "",
      ReceiptDescription: "",
    },
  });

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const handleDialogChange = (open: boolean) => {
    setIsDialogOpen(open);
  };

  const handleUpdate = (
    id: string,
    values: TgoodsReceiptValidators,
    gstData?: GSTDataItem[]
  ) => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const response = await apiClient.put(
          `/commonMaster/goodsReceiptType/update/${id}`,
          values
        );
        console.log("Response:", response);
        if (response.data.success) {
          await new Promise<void>((resolveToast) => {
            toast.success("Goods Receipt updated successfully!", {
              onAutoClose: () => resolveToast(),
            });
          });
          closeDialog();
          resolve();
        } else {
          toast.error("Failed to update Goods Receipt");
          reject(new Error("Failed to update Goods Receipt"));
        }
        fetchBusiness();
      } catch (error) {
        console.error("Error updating Goods Receipt:", error);
        toast.error("An error occurred while updating Goods Receipt");
        reject(error);
      }
    });
  };
  const handleCreate = async (values: TgoodsReceiptValidators) => {
    try {
      const response = await apiClient.post(
        "/commonMaster/goodsReceiptType/create",
        values
      );
      if (response.data.success) {
        await new Promise<void>((resolve) => {
          toast.success("Goods Receipt created successfully!", {
            onAutoClose: () => resolve(),
          });
        });
        closeDialog();
        fetchBusiness();
      } else {
        toast.error("Failed to create Goods Receipt");
      }
    } catch (error) {
      console.log("error", error);
      toast.error("An error occurred while creating Goods Receipt");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await apiClient.delete(
        `/commonMaster/goodsReceiptType/delete/${id}`
      );
      if (response.data.success) {
        await new Promise<void>((resolve) => {
          toast.success("Goods Receipt deleted successfully!", {
            onAutoClose: () => resolve(),
          });
        });

        closeDialog();
        fetchBusiness();
      } else {
        toast.error("Failed to delete Goods Receipt");
      }
    } catch (error: unknown) {
      console.log("error", error);
      toast.error("An error occurred while deleting Goods Receipt");
    }
  };

  const handleApprove = () => {};
  const handleReject = () => {};

  const fetchBusiness = async () => {
    try {
      setIsloading(true);
      const response = await apiClient.get(
        "/commonMaster/goodsReceiptType/allGoodsReceiptType"
      );
      setIsloading(false);
      console.log("get Goods Receipt response", response);
      setGoodsReceiptData(response.data.allGoodsReceiptTypes);
    } catch (error) {
      setIsloading(false);
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchBusiness();
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
              <FormModule<TgoodsReceiptValidators>
                form={form}
                onSubmit={handleCreate}
                date={date}
                setDate={setDate}
                formFields={GoodsReceipt}
              />
            </DialogContent>
          </Dialog>
        </div>

        <TableModule<TgoodsReceiptValidators>
          data={goodsReceiptData}
          tableName={PAGENAME}
          header={GoodsReceiptHeader}
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
          formFields={GoodsReceipt}
        />
      </div>
    </MaxWidthWrapper>
  );
}

export default Page;
