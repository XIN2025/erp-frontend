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
  Currency,
} from "@/config/common-master/formFields";
import { ApiError, apiClient } from "@/lib/utils";
import {
  TcurrencyValidator,
  businessUnitValidator,
  companyDetailsValidtor,
  currencyValidator,
} from "@/lib/validators/common-master-form-validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, UseFormReturn, useForm } from "react-hook-form";
import { toast } from "sonner";
import { CurrencyHeaders } from "@/config/common-master/common-master-headers";
import LoadingDots from "@/components/Loading";
import { useRouter } from "next/navigation";

const PAGENAME: string = "Currency";

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
  const [currencyData, setCurrencyData] = useState<undefined | []>();
  const [mounted, setMounted] = useState(false);
  const [date, setDate] = useState<Date>();
  const [currentItemID, setCurrentItemID] = useState<string | undefined>("");
  const [isLoading, setIsloading] = useState<boolean>(false);
  const form = useForm<TcurrencyValidator>({
    resolver: zodResolver(currencyValidator),
    defaultValues: {
      CurrencyCode: "",
      CurrencyName: "",
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
    values: TcurrencyValidator,
    gstData?: GSTDataItem[]
  ) => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const response = await apiClient.put(
          `/commonMaster/currency/update/${id}`,
          values
        );
        console.log("Response:", response);
        if (response.data.success) {
          await new Promise<void>((resolveToast) => {
            toast.success("Currency updated successfully!", {
              onAutoClose: () => resolveToast(),
            });
          });
          closeDialog();
          resolve();
        } else {
          toast.error("Failed to update Currency");
          reject(new Error("Failed to update Currency"));
        }
        fetchCurrency();
      } catch (error) {
        console.error("Error updating Currency:", error);
        toast.error("An error occurred while updating Currency");
        reject(error);
      }
    });
  };
  const handleCreate = async (values: TcurrencyValidator) => {
    try {
      const response = await apiClient.post(
        "/commonMaster/currency/create",
        values
      );
      if (response.data.success) {
        await new Promise<void>((resolve) => {
          toast.success("Currency created successfully!", {
            onAutoClose: () => resolve(),
          });
        });
        closeDialog();
        fetchCurrency();
      } else {
        toast.error("Failed to create Currency");
      }
    } catch (error) {
      console.log("error", error);
      toast.error("An error occurred while creating Currency");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await apiClient.delete(
        `/commonMaster/currency/delete/${id}`
      );
      if (response.data.success) {
        await new Promise<void>((resolve) => {
          toast.success("Currency deleted successfully!", {
            onAutoClose: () => resolve(),
          });
        });

        closeDialog();
        fetchCurrency();
      } else {
        toast.error("Failed to delete Currency");
      }
    } catch (error: unknown) {
      console.log("error", error);
      toast.error("An error occurred while deleting Currency");
    }
  };

  const handleApprove = () => {};
  const handleReject = () => {};

  const fetchCurrency = async () => {
    try {
      setIsloading(true);
      const response = await apiClient.get(
        "/commonMaster/currency/allCurrency"
      );
      setIsloading(false);
      console.log("get Currency response", response);
      setCurrencyData(response.data.allCurrency);
    } catch (error) {
      setIsloading(false);
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchCurrency();
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
              <FormModule<TcurrencyValidator>
                form={form}
                onSubmit={handleCreate}
                date={date}
                setDate={setDate}
                formFields={Currency}
              />
            </DialogContent>
          </Dialog>
        </div>

        <TableModule<TcurrencyValidator>
          data={currencyData}
          tableName={PAGENAME}
          header={CurrencyHeaders}
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
          formFields={Currency}
        />
      </div>
    </MaxWidthWrapper>
  );
}

export default Page;
