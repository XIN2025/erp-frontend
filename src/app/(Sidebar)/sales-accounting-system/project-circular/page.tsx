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
import { Account } from "@/config/common-master/formFields";
import { AccountHeaders } from "@/config/common-master/common-master-headers";
import { apiClient } from "@/lib/utils";
import {} from "@/lib/validators/common-master-form-validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  projectValidators,
  TProjectValidators,
} from "@/lib/validators/sales-accounting-system-validators";
import { ProjectFields } from "@/config/sales-accounting-system/formfields";
import { ProjectHeaders } from "@/config/sales-accounting-system/headers";

const PAGENAME: string = "Project Circular";

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
  const [accountData, setAccountData] = useState<undefined | []>();
  const [mounted, setMounted] = useState(false);
  const [date, setDate] = useState<Date>();
  const [currentItemID, setCurrentItemID] = useState<string | undefined>("");
  const [isLoading, setIsloading] = useState<boolean>(false);
  const form = useForm<TProjectValidators>({
    resolver: zodResolver(projectValidators),
    defaultValues: {
      CompanyName: "",

      CompanyGSTNo: "",
      BusinessUnit: "",
      Currency: "",
      CustomerName: "",
      CustomerGSTNo: "",
      CostCenterName: "",
      CostCenterGSTNo: "",
      WareHouse: "",
      WareHouseGSTNo: "",
      DirectSub: "",
      Owner: "",
      ProjectOrderValue: 0,
      OrderReferenceNo: "",
      OrderReferenceDate: undefined,
      OrderType: "",
      TenderRefNo: "",
      ProjectStartDate: undefined,
      ProjectEndDate: undefined,
      Duration: "",
      ProjectShortDescription: "",
      ProjectLongDescription: "",
      InvoiceTo: "",
      ConsigneeName: "",
      InvoiceAddress: "",
      DeliveryAddress: "",
      ProjectCode: "",
      Status: "",
    },
  });

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const handleDialogChange = (open: boolean) => {
    setIsDialogOpen(open);
  };

  const handleUpdate = (
    id: string,
    values: TProjectValidators,
    gstData?: GSTDataItem[]
  ) => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const response = await apiClient.put(
          `/commonMaster/account/update/${id}`,
          values
        );
        console.log("Response:", response);
        if (response.data.success) {
          await new Promise<void>((resolveToast) => {
            toast.success("account updated successfully!", {
              onAutoClose: () => resolveToast(),
            });
          });
          closeDialog();
          resolve();
        } else {
          toast.error("Failed to update Account");
          reject(new Error("Failed to update Account"));
        }
        fetchAccount();
      } catch (error) {
        console.error("Error updating Account:", error);
        toast.error("An error occurred while updating account");
        reject(error);
      }
    });
  };
  const handleCreate = async (values: TProjectValidators) => {
    try {
      console.log("values", values);
      const response = await apiClient.post(
        "salesAccountingSystem/projectCircular/create",
        values
      );
      if (response.data.success) {
        await new Promise<void>((resolve) => {
          toast.success("Project Circular created successfully!", {
            onAutoClose: () => resolve(),
          });
        });
        closeDialog();
        fetchAccount();
      } else {
        toast.error("Failed to create Project Circular");
      }
    } catch (error) {
      console.log("error", error);
      toast.error("An error occurred while creating Project Circular");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await apiClient.delete(
        `/commonMaster/account/delete/${id}`
      );
      if (response.data.success) {
        await new Promise<void>((resolve) => {
          toast.success("Account deleted successfully!", {
            onAutoClose: () => resolve(),
          });
        });

        closeDialog();
        fetchAccount();
      } else {
        toast.error("Failed to delete account");
      }
    } catch (error: unknown) {
      console.log("error", error);
      toast.error("An error occurred while deleting account");
    }
  };

  const handleApprove = () => {};
  const handleReject = () => {};

  const fetchAccount = async () => {
    try {
      setIsloading(true);
      const response = await apiClient.get("/commonMaster/account/allAccount");
      setIsloading(false);
      console.log("get Account response", response);
      setAccountData(response.data.allAccounts);
    } catch (error) {
      setIsloading(false);
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchAccount();
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
                <DialogTitle className="text-center">{`${PAGENAME} (Create)`}</DialogTitle>
              </DialogHeader>
              <FormModule<TProjectValidators>
                form={form}
                onSubmit={handleCreate}
                date={date}
                setDate={setDate}
                formFields={ProjectFields}
              />
            </DialogContent>
          </Dialog>
        </div>

        <TableModule<TProjectValidators>
          data={accountData}
          tableName={PAGENAME}
          header={ProjectHeaders}
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
          formFields={ProjectFields}
        />
      </div>
    </MaxWidthWrapper>
  );
}

export default Page;
