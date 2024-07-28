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
  BusinessUnit,
  CompanyDetails,
  GoodsReceipt,
  InvoiceType,
} from "@/config/common-master/formFields";
import { ApiError, apiClient } from "@/lib/utils";
import {
  TinvoiceTypeValidators,
  invoiceTypeValidators,
} from "@/lib/validators/common-master-form-validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, UseFormReturn, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  BusinessUnitHeaders,
  CompanyDetailsHeaders,
  GoodsReceiptHeader,
  InvoiceTypeHeaders,
} from "@/config/common-master/common-master-headers";
import LoadingDots from "@/components/Loading";
import { useRouter } from "next/navigation";

const PAGENAME: string = "Invoice Type";

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
  const [invoiceTypeData, setinvoiceTypeData] = useState<undefined | []>();
  const [mounted, setMounted] = useState(false);
  const [date, setDate] = useState<Date>();
  const [currentItemID, setCurrentItemID] = useState<string | undefined>("");
  const [isLoading, setIsloading] = useState<boolean>(false);
  const form = useForm<TinvoiceTypeValidators>({
    resolver: zodResolver(invoiceTypeValidators),
    defaultValues: {
      AccountCode: "",
      InvoiceType: "",
      InvoiceTypeCode: "",
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
    values: TinvoiceTypeValidators,
    gstData?: GSTDataItem[]
  ) => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const response = await apiClient.put(
          `/commonMaster/invoiceType/update/${id}`,
          values
        );
        console.log("Response:", response);
        if (response.data.success) {
          await new Promise<void>((resolveToast) => {
            toast.success("Inovice Type updated successfully!", {
              onAutoClose: () => resolveToast(),
            });
          });
          closeDialog();
          resolve();
        } else {
          toast.error("Failed to update Inovice Type");
          reject(new Error("Failed to update Inovice Type"));
        }
        fetchInvoiceType();
      } catch (error) {
        console.error("Error updating Inovice Type:", error);
        toast.error("An error occurred while updating Inovice Type");
        reject(error);
      }
    });
  };
  const handleCreate = async (values: TinvoiceTypeValidators) => {
    try {
      const response = await apiClient.post(
        "/commonMaster/invoiceType/create",
        values
      );
      if (response.data.success) {
        await new Promise<void>((resolve) => {
          toast.success("Inovice Type created successfully!", {
            onAutoClose: () => resolve(),
          });
        });
        closeDialog();
        fetchInvoiceType();
      } else {
        toast.error("Failed to create Inovice Type");
      }
    } catch (error) {
      console.log("error", error);
      toast.error("An error occurred while creating Inovice Type");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await apiClient.delete(
        `/commonMaster/invoiceType/delete/${id}`
      );
      if (response.data.success) {
        await new Promise<void>((resolve) => {
          toast.success("Inovice Type deleted successfully!", {
            onAutoClose: () => resolve(),
          });
        });

        closeDialog();
        fetchInvoiceType();
      } else {
        toast.error("Failed to delete Inovice Type");
      }
    } catch (error: unknown) {
      console.log("error", error);
      toast.error("An error occurred while deleting Inovice Type");
    }
  };

  const handleApprove = () => {};
  const handleReject = () => {};

  const fetchInvoiceType = async () => {
    try {
      setIsloading(true);
      const response = await apiClient.get(
        "/commonMaster/invoiceType/allInvoiceType"
      );
      setIsloading(false);
      console.log("get Inovice Type response", response);
      setinvoiceTypeData(response.data.allInvoiceTypes);
    } catch (error) {
      setIsloading(false);
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchInvoiceType();
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
              <FormModule<TinvoiceTypeValidators>
                form={form}
                onSubmit={handleCreate}
                date={date}
                setDate={setDate}
                formFields={InvoiceType}
              />
            </DialogContent>
          </Dialog>
        </div>

        <TableModule<TinvoiceTypeValidators>
          data={invoiceTypeData}
          tableName={PAGENAME}
          header={InvoiceTypeHeaders}
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
          formFields={InvoiceType}
        />
      </div>
    </MaxWidthWrapper>
  );
}

export default Page;
