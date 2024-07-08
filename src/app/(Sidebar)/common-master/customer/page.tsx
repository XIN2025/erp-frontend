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
import { v4 as uuidv4 } from "uuid";

import FormModule from "@/components/FormModule";
import LoadingDots from "@/components/Loading";
import { Customer } from "@/config/common-master/formFields";
import { CustomerHeaders } from "@/config/common-master/common-master-headers";
import { apiClient } from "@/lib/utils";
import {
  TcustomerValidator,
  customerValidator,
} from "@/lib/validators/common-master-form-validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const PAGENAME: string = "Customer";

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
  const [customerData, setCustomerData] = useState<undefined | []>();
  const [mounted, setMounted] = useState(false);

  const [currentItemID, setCurrentItemID] = useState<string | undefined>("");
  const [isLoading, setIsloading] = useState<boolean>(false);
  const form = useForm<TcustomerValidator>({
    resolver: zodResolver(customerValidator),
    defaultValues: {
      CustomerCode: "",
      CustomerName: "",
      CorporateOffice: "",
      RegisteredOffice: "",
      ServiceTaxRegNo: "",
      Phone: "",
      Email: "",
      Website: "",
      PAN: "",
      CINLLPIN: "",
      Tags: "",
    },
  });

  const [gstData, setGSTData] = useState<GSTDataItem[]>([
    {
      SerialNo: 1,
      GSTRegNo: " ",
      GSTState: " ",
      GSTAddress: " ",
    },
  ]);
  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const handleDialogChange = (open: boolean) => {
    setIsDialogOpen(open);
  };
  const handleUpdate = async (
    id: string,
    values: TcustomerValidator,
    gstData?: GSTDataItem[]
  ): Promise<void> => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const formattedGstData = gstData?.map((item, index) => ({
          SerialNo: index + 1,
          GSTRegNo: item.GSTRegNo,
          GSTState: item.GSTState,
          GSTAddress: item.GSTAddress,
        }));

        const formData: Partial<TcustomerValidator> & {
          Gsts: typeof formattedGstData;
        } = {
          ...values,
          Gsts: formattedGstData,
        };

        (Object.keys(formData) as Array<keyof typeof formData>).forEach(
          (key) => {
            if (formData[key] === undefined || formData[key] === null) {
              delete formData[key];
            }
          }
        );

        console.log("Request update data:", formData);

        const response = await apiClient.put(
          `/commonMaster/customer/update/${id}`,
          formData
        );

        console.log("Response:", response);

        if (response.data.success) {
          await new Promise<void>((resolveToast) => {
            toast.success("Customer updated successfully!", {
              onAutoClose: () => resolveToast(),
            });
          });
          closeDialog();
          resolve();
          await fetchCustomer();
        } else {
          toast.error("Failed to update Customer");
          reject(new Error("Failed to update Customer"));
        }
      } catch (error) {
        console.error("Error updating Customer:", error);
        if (error instanceof Error) {
          toast.error(
            `An error occurred while updating Customer: ${error.message}`
          );
        } else {
          toast.error("An unexpected error occurred while updating Customer");
        }
        reject(error);
      }
    });
  };
  const handleCreate = async (values: TcustomerValidator) => {
    try {
      console.log("Invoking function");

      const filterData = (
        data: GSTDataItem[]
      ): Omit<GSTDataItem, "SerialNo">[] => {
        return data.map(({ SerialNo, ...rest }) => rest);
      };

      const filteredData = filterData(gstData);

      const formData = { ...values, created_by: uuidv4() };
      const requestData = {
        ...formData,
        Gsts: filteredData,
      };

      console.log("Form data", requestData);

      const response = await apiClient.post(
        "/commonMaster/customer/create",
        requestData
      );

      console.log("Response", response);

      if (response.data.success) {
        toast.success("Customer created successfully!");
        await fetchCustomer();
        closeDialog();
      } else {
        toast.error("Failed to create Customer");
      }
    } catch (error) {
      console.error("Error creating customer:", error);
      if (error instanceof Error) {
        toast.error(
          `An error occurred while creating Customer: ${error.message}`
        );
      } else {
        toast.error("An unexpected error occurred while creating Customer");
      }
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await apiClient.delete(
        `/commonMaster/customer/delete/${id}`
      );
      if (response.data.success) {
        await new Promise<void>((resolve) => {
          toast.success("Customer deleted successfully!", {
            onAutoClose: () => resolve(),
          });
        });

        fetchCustomer();
        closeDialog();
      } else {
        toast.error("Failed to delete Customer");
      }
    } catch (error: unknown) {
      console.log("error", error);
      toast.error("An error occurred while deleting Customer");
    }
  };

  const handleApprove = () => {};
  const handleReject = () => {};

  const fetchCustomer = async () => {
    try {
      setIsloading(true);
      const response = await apiClient.get(
        "/commonMaster/customer/allCustomer"
      );
      setIsloading(false);
      console.log("get company detail response", response);
      setCustomerData(response.data.allCustomer);
    } catch (error) {
      setIsloading(false);
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchCustomer();
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
              <FormModule<TcustomerValidator>
                form={form}
                onSubmit={handleCreate}
                data={gstData}
                setData={setGSTData}
                formFields={Customer}
              />
            </DialogContent>
          </Dialog>
        </div>

        <TableModule<TcustomerValidator>
          data={customerData}
          tableName={PAGENAME}
          header={CustomerHeaders}
          form={form}
          // onSubmit={handleCreate}
          onUpdate={handleUpdate}
          includeGSTTable={true}
          currentItemID={currentItemID}
          setCurrentItemID={setCurrentItemID}
          onDelete={handleDelete}
          // setData={setData}
          onAprrove={handleApprove}
          onReject={handleReject}
          formFields={Customer}
        />
      </div>
    </MaxWidthWrapper>
  );
}

export default Page;
