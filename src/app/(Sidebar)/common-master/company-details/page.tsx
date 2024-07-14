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
import { CompanyDetails } from "@/config/common-master/formFields";
import { ApiError, apiClient } from "@/lib/utils";
import {
  TcompanyDetailsValidtor,
  companyDetailsValidtor,
} from "@/lib/validators/common-master-form-validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, UseFormReturn, useForm } from "react-hook-form";
import { toast } from "sonner";
import { CompanyDetailsHeaders } from "@/config/common-master/common-master-headers";
import LoadingDots from "@/components/Loading";
import { useRouter } from "next/navigation";

const PAGENAME: string = "Company Details";

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
  const [companyDetail, setCompanyDetail] = useState<undefined | []>();
  const [mounted, setMounted] = useState(false);
  const [date, setDate] = useState<Date>();
  const [currentItemID, setCurrentItemID] = useState<string | undefined>("");
  const [isLoading, setIsloading] = useState<boolean>(false);
  const form = useForm<TcompanyDetailsValidtor>({
    resolver: zodResolver(companyDetailsValidtor),
    defaultValues: {
      CompanyName: "",
      RegisteredOfficeAddress: "",
      CertificateOfIncorporationNo: "",
      COIDate: undefined,
      ServiceTaxRegistrationNo: "",
      VATRegistrationNo: "",
      PFRegistrationNo: "",
      PFState: "",
      PFSubRegistrationNo: "",
      PFSubState: "",
      ESIRegistrationNo: "",
      ESIState: "",
      ESISubRegistrationNo: "",
      ESISubState: "",
      PermanentAccountNumber: "",
      MSME: "",
      MSMEUdyam: "",

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
    values: TcompanyDetailsValidtor,
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

        const formData: Partial<TcompanyDetailsValidtor> & {
          Gsts: typeof formattedGstData;
        } = {
          ...values,
          COIDate: date || undefined,
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
          COIDate: formData.COIDate
            ? formData.COIDate.toISOString().split("T")[0]
            : undefined,
        };

        console.log("Request data:", backendData);

        const response = await apiClient.put(
          `/commonMaster/companyDetails/update/${id}`,
          backendData
        );

        console.log("Response:", response);

        if (response.data.success) {
          await new Promise<void>((resolveToast) => {
            toast.success("Company Details updated successfully!", {
              onAutoClose: () => resolveToast(),
            });
          });
          closeDialog();

          resolve();
          fetchCompanyDetails();
        } else {
          toast.error("Failed to update Company Details");
          reject(new Error("Failed to update Company Details"));
        }
      } catch (error) {
        console.error("Error updating Company Details:", error);
        toast.error("An error occurred while updating Company Details");
        reject(error);
      }
    });
  };
  const handleCreate = async (values: TcompanyDetailsValidtor) => {
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

      console.log("formdta", requestData);
      const response = await apiClient.post(
        "/commonMaster/companyDetails/create",
        requestData
      );
      console.log("response", response);
      if (response.data.success) {
        await new Promise<void>((resolve) => {
          toast.success("Company Details created successfully!", {
            onAutoClose: () => resolve(),
          });
        });

        fetchCompanyDetails();
        closeDialog();
      } else {
        toast.error("Failed to create Company Details");
      }
    } catch (error) {
      console.log("error", error);
      toast.error("An error occurred while creating Company Details");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await apiClient.delete(
        `/commonMaster/companyDetails/delete/${id}`
      );
      if (response.data.success) {
        await new Promise<void>((resolve) => {
          toast.success("Company Details deleted successfully!", {
            onAutoClose: () => resolve(),
          });
        });

        fetchCompanyDetails();
        closeDialog();
      } else {
        toast.error("Failed to delete Company Details");
      }
    } catch (error: unknown) {
      console.log("error", error);
      toast.error("An error occurred while deleting Company Details");
    }
  };

  const handleApprove = () => {};
  const handleReject = () => {};

  const fetchCompanyDetails = async () => {
    try {
      setIsloading(true);
      const response = await apiClient.get(
        "/commonMaster/companyDetails/allCompanyDetails"
      );
      setIsloading(false);
      console.log("get company detail response", response);
      setCompanyDetail(response.data.allCompanyDetails);
    } catch (error) {
      setIsloading(false);
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchCompanyDetails();
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
              <FormModule<TcompanyDetailsValidtor>
                form={form}
                onSubmit={handleCreate}
                gstData={gstData}
                isCompanyDetailsPage={true}
                setGSTData={setGSTData}
                date={date}
                setDate={setDate}
                formFields={CompanyDetails}
                companyDetails={companyDetail}
                includeGSTTable={true}
              />
            </DialogContent>
          </Dialog>
        </div>

        <TableModule<TcompanyDetailsValidtor>
          data={companyDetail}
          tableName={PAGENAME}
          header={CompanyDetailsHeaders}
          form={form}
          // onSubmit={handleCreate}
          onUpdate={handleUpdate}
          includeGSTTable={true}
          currentItemID={currentItemID}
          setCurrentItemID={setCurrentItemID}
          onDelete={handleDelete}
          // setData={setData}
          onApprove={handleApprove}
          onReject={handleReject}
          date={date}
          setDate={setDate}
          formFields={CompanyDetails}
        />
      </div>
    </MaxWidthWrapper>
  );
}

export default Page;
