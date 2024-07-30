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
import {
  Machine,
  MachineClass,
  RecoveryType,
  Vendor,
} from "@/config/common-master/formFields";
import {
  MachineClassHeaders,
  MachineHeaders,
  RecoveryTypeHeaders,
  VendorHeaders,
} from "@/config/common-master/common-master-headers";
import { apiClient } from "@/lib/utils";
import {
  TvendorValidators,
  vendorValidators,
} from "@/lib/validators/common-master-form-validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const PAGENAME: string = "Vendor";

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
  const [vendorData, setvendorData] = useState<undefined | []>();
  const [mounted, setMounted] = useState(false);
  const [date, setDate] = useState<Date>();
  const [currentItemID, setCurrentItemID] = useState<string | undefined>("");
  const [isLoading, setIsloading] = useState<boolean>(false);
  const form = useForm<TvendorValidators>({
    resolver: zodResolver(vendorValidators),
    defaultValues: {
      VendorCode: "",
      VendorName: "",
      CorporateOffice: "",
      RegisteredOffice: "",
      Phone: "",
      Email: "",
      GSTStatus: "",
      Website: "",
      PAN: "",
      ServiceTaxRegNo: "",
      CINLLPIN: "",

      VendorTag: "",
      BankName: "",
      IFSCCode: "",
      AccountNo: "",
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
    values: TvendorValidators,
    gstData?: GSTDataItem[]
  ) => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const response = await apiClient.put(
          `/commonMaster/vendor/update/${id}`,
          values
        );
        console.log("Response:", response);
        if (response.data.success) {
          await new Promise<void>((resolveToast) => {
            toast.success("Vendor updated successfully!", {
              onAutoClose: () => resolveToast(),
            });
          });
          closeDialog();
          resolve();
        } else {
          toast.error("Failed to update Vendor");
          reject(new Error("Failed to update Vendor"));
        }
        fetchVendor();
      } catch (error) {
        console.error("Error updating Vendor:", error);
        toast.error("An error occurred while updating Vendor");
        reject(error);
      }
    });
  };
  const handleCreate = async (values: TvendorValidators) => {
    try {
      const response = await apiClient.post(
        "/commonMaster/vendor/create",
        values
      );
      if (response.data.success) {
        await new Promise<void>((resolve) => {
          toast.success("Vendor created successfully!", {
            onAutoClose: () => resolve(),
          });
        });
        closeDialog();
        fetchVendor();
      } else {
        toast.error("Failed to create Vendor");
      }
    } catch (error) {
      console.log("error", error);
      toast.error("An error occurred while creating Vendor");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await apiClient.delete(
        `/commonMaster/vendor/delete/${id}`
      );
      if (response.data.success) {
        await new Promise<void>((resolve) => {
          toast.success("Vendor deleted successfully!", {
            onAutoClose: () => resolve(),
          });
        });

        closeDialog();
        fetchVendor();
      } else {
        toast.error("Failed to delete Vendor");
      }
    } catch (error: unknown) {
      console.log("error", error);
      toast.error("An error occurred while deleting Vendor");
    }
  };

  const handleApprove = () => {};
  const handleReject = () => {};

  const fetchVendor = async () => {
    try {
      setIsloading(true);
      const response = await apiClient.get("/commonMaster/vendor/allVendor");
      setIsloading(false);
      console.log("get Vendor response", response);
      setvendorData(response.data.allVendor);
    } catch (error) {
      setIsloading(false);
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchVendor();
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
              <FormModule<TvendorValidators>
                form={form}
                onSubmit={handleCreate}
                date={date}
                setDate={setDate}
                formFields={Vendor}
              />
            </DialogContent>
          </Dialog>
        </div>

        <TableModule<TvendorValidators>
          data={vendorData}
          tableName={PAGENAME}
          header={VendorHeaders}
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
          formFields={Vendor}
        />
      </div>
    </MaxWidthWrapper>
  );
}

export default Page;
