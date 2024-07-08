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
  Bank,
  Machine,
  MachineClass,
  RecoveryType,
} from "@/config/common-master/formFields";
import {
  BankHeaders,
  MachineClassHeaders,
  RecoveryTypeHeaders,
} from "@/config/common-master/common-master-headers";
import { apiClient } from "@/lib/utils";
import {
  TbankValidators,
  bankValidators,
} from "@/lib/validators/common-master-form-validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const PAGENAME: string = "Bank";

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
  const [bankData, setBankData] = useState<undefined | []>();
  const [mounted, setMounted] = useState(false);
  const [date, setDate] = useState<Date>();
  const [currentItemID, setCurrentItemID] = useState<string | undefined>("");
  const [isLoading, setIsloading] = useState<boolean>(false);
  const form = useForm<TbankValidators>({
    resolver: zodResolver(bankValidators),
    defaultValues: {
      BankCode: "",
      BankName: "",
      BankAddress: "",
      City: "",
      State: "",
      PIN: "",
      AccountNo: "",
      IFSC: "",
      MICR: "",
      AccountType: "",
      AuthorisedSignatory1: "",
      ChequeStartingNo: "",
      AuthorisedSignatory2: "",
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
    values: TbankValidators,
    gstData?: GSTDataItem[]
  ) => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const response = await apiClient.put(
          `/commonMaster/bank/update/${id}`,
          values
        );
        console.log("Response:", response);
        if (response.data.success) {
          await new Promise<void>((resolveToast) => {
            toast.success("bank updated successfully!", {
              onAutoClose: () => resolveToast(),
            });
          });
          closeDialog();
          resolve();
        } else {
          toast.error("Failed to update bank");
          reject(new Error("Failed to update bank"));
        }
        fetchBank();
      } catch (error) {
        console.error("Error updating bank:", error);
        toast.error("An error occurred while updating bank");
        reject(error);
      }
    });
  };
  const handleCreate = async (values: TbankValidators) => {
    try {
      const response = await apiClient.post(
        "/commonMaster/bank/create",
        values
      );
      if (response.data.success) {
        await new Promise<void>((resolve) => {
          toast.success("Bank created successfully!", {
            onAutoClose: () => resolve(),
          });
        });
        closeDialog();
        fetchBank();
      } else {
        toast.error("Failed to create bank");
      }
    } catch (error) {
      console.log("error", error);
      toast.error("An error occurred while creating bank");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await apiClient.delete(
        `/commonMaster/bank/delete/${id}`
      );
      if (response.data.success) {
        await new Promise<void>((resolve) => {
          toast.success("Bank deleted successfully!", {
            onAutoClose: () => resolve(),
          });
        });

        closeDialog();
        fetchBank();
      } else {
        toast.error("Failed to delete bank");
      }
    } catch (error: unknown) {
      console.log("error", error);
      toast.error("An error occurred while deleting bank");
    }
  };

  const handleApprove = () => {};
  const handleReject = () => {};

  const fetchBank = async () => {
    try {
      setIsloading(true);
      const response = await apiClient.get("/commonMaster/bank/allBank");
      setIsloading(false);
      console.log("get bank response", response);
      setBankData(response.data.allBanks);
    } catch (error) {
      setIsloading(false);
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchBank();
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
              <FormModule<TbankValidators>
                form={form}
                onSubmit={handleCreate}
                date={date}
                setDate={setDate}
                formFields={Bank}
              />
            </DialogContent>
          </Dialog>
        </div>

        <TableModule<TbankValidators>
          data={bankData}
          tableName={PAGENAME}
          header={BankHeaders}
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
          formFields={Bank}
        />
      </div>
    </MaxWidthWrapper>
  );
}

export default Page;
