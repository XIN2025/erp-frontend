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
import { CompanyDetails, CostCenter } from "@/config/common-master-forms";
import { ApiError, apiClient } from "@/lib/utils";
import {
  TcostCenterValidator,
  costCenterValidator,
} from "@/lib/validators/common-master-form-validators/form-validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, UseFormReturn, useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  CompanyDetailsHeaders,
  CostCenterHeaders,
} from "@/config/common-master-headers";
import LoadingDots from "@/components/Loading";
import { useRouter } from "next/navigation";

const PAGENAME: string = "Cost Center";

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
  const [costCenter, setCostCenter] = useState<undefined | []>();
  const [mounted, setMounted] = useState(false);
  const [date, setDate] = useState<Date>();
  const [currentItemID, setCurrentItemID] = useState<string | undefined>("");
  const [isLoading, setIsloading] = useState<boolean>(false);
  const form = useForm<TcostCenterValidator>({
    resolver: zodResolver(costCenterValidator),
    defaultValues: {
      CompanyName: "",
      CostCenterName: "",
      ProjectSiteAddress: "",
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

  const handleUpdate = (
    id: string,
    values: TcostCenterValidator,
    gstData?: GSTDataItem[]
  ) => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const formattedGstData = gstData?.map((item, index) => ({
          SerialNo: index + 1,
          GSTRegNo: item.GSTRegNo,
          GSTState: item.GSTState,
          GSTAddress: item.GSTAddress,
        }));

        const formData: Partial<TcostCenterValidator> & {
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

        const backendData = {
          ...formData,
        };

        console.log("Request data:", backendData);

        const response = await apiClient.put(
          `/commonMaster/CostCenter/update/${id}`,
          backendData
        );

        console.log("Response:", response);

        if (response.data.success) {
          await new Promise<void>((resolveToast) => {
            toast.success("Cost Center updated successfully!", {
              onAutoClose: () => resolveToast(),
            });
          });
          closeDialog();

          resolve();
          fetchCostCenter();
        } else {
          toast.error("Failed to update Cost Center");
          reject(new Error("Failed to update Cost Center"));
        }
      } catch (error) {
        console.error("Error updating Cost Center:", error);
        toast.error("An error occurred while updating Cost Center");
        reject(error);
      }
    });
  };
  const handleCreate = async (values: TcostCenterValidator) => {
    try {
      const filterData = (data: GSTDataItem[]) => {
        return data.map((item) => {
          const { SerialNo, ...rest } = item;
          return rest;
        });
      };
      const filteredData = filterData(gstData);
      const formData = { ...values, COIDate: date, created_by: uuidv4() };
      const requestData = {
        ...formData,
        Gsts: [...filteredData],
      };

      console.log("formdata", requestData);
      const response = await apiClient.post(
        "/commonMaster/costCenter/create",
        requestData
      );
      console.log("response", response);
      if (response.data.success) {
        await new Promise<void>((resolve) => {
          toast.success("Cost Center created successfully!", {
            onAutoClose: () => resolve(),
          });
        });

        fetchCostCenter();
        closeDialog();
      } else {
        toast.error("Failed to create Cost Center");
      }
    } catch (error) {
      console.log("error", error);
      toast.error("An error occurred while creating Cost Center");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await apiClient.delete(
        `/commonMaster/costCenter/delete/${id}`
      );
      if (response.data.success) {
        await new Promise<void>((resolve) => {
          toast.success("Cost Center deleted successfully!", {
            onAutoClose: () => resolve(),
          });
        });

        fetchCostCenter();
        closeDialog();
      } else {
        toast.error("Failed to delete Cost Center");
      }
    } catch (error: unknown) {
      console.log("error", error);
      toast.error("An error occurred while deleting Cost Center");
    }
  };

  const handleApprove = () => {};
  const handleReject = () => {};

  const fetchCostCenter = async () => {
    try {
      setIsloading(true);
      const response = await apiClient.get(
        "/commonMaster/costCenter/allCostCenter"
      );
      setIsloading(false);
      console.log("get company detail response", response);
      setCostCenter(response.data.allCostCenter);
    } catch (error) {
      setIsloading(false);
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchCostCenter();
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
              <FormModule<TcostCenterValidator>
                form={form}
                onSubmit={handleCreate}
                data={gstData}
                setData={setGSTData}
                date={date}
                setDate={setDate}
                formFields={CostCenter}
              />
            </DialogContent>
          </Dialog>
        </div>

        <TableModule<TcostCenterValidator>
          data={costCenter}
          tableName={PAGENAME}
          header={CostCenterHeaders}
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
          date={date}
          setDate={setDate}
          formFields={CostCenter}
        />
      </div>
    </MaxWidthWrapper>
  );
}

export default Page;
