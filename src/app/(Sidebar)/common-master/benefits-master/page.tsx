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
  BenefitsMaster,
  Machine,
  MachineClass,
  RecoveryType,
} from "@/config/common-master/formFields";
import {
  BenefitsMasterHeaders,
  MachineClassHeaders,
  MachineHeaders,
  RecoveryTypeHeaders,
} from "@/config/common-master/common-master-headers";
import { apiClient } from "@/lib/utils";
import {
  benefitsMasterValidators,
  TbenefitsMastervalidators,
} from "@/lib/validators/common-master-form-validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const PAGENAME: string = "Benefits Master";

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
  const [benefitsMasterData, setBenefitsMasterData] = useState<
    undefined | []
  >();
  const [mounted, setMounted] = useState(false);
  const [date, setDate] = useState<Date>();
  const [currentItemID, setCurrentItemID] = useState<string | undefined>("");
  const [isLoading, setIsloading] = useState<boolean>(false);
  const form = useForm<TbenefitsMastervalidators>({
    resolver: zodResolver(benefitsMasterValidators),
    defaultValues: {
      BenefitCode: "",
      BenefitDescription: "",
      PercentageOfBasicWage: "",
      ApplicableFor: "",
      AccountCode: "",
      AccountDescription: "",
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
    values: TbenefitsMastervalidators,
    gstData?: GSTDataItem[]
  ) => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const response = await apiClient.put(
          `/commonMaster/benefitsMaster/update/${id}`,
          values
        );
        console.log("Response:", response);
        if (response.data.success) {
          await new Promise<void>((resolveToast) => {
            toast.success("Benefits Master updated successfully!", {
              onAutoClose: () => resolveToast(),
            });
          });
          closeDialog();
          resolve();
        } else {
          toast.error("Failed to update Benefits Master");
          reject(new Error("Failed to update Benefits Master"));
        }
        fetchBenefitsMaster();
      } catch (error) {
        console.error("Error updating Benefits Master:", error);
        toast.error("An error occurred while updating Benefits Master");
        reject(error);
      }
    });
  };
  const handleCreate = async (values: TbenefitsMastervalidators) => {
    try {
      const response = await apiClient.post(
        "/commonMaster/benefitsMaster/create",
        values
      );
      if (response.data.success) {
        await new Promise<void>((resolve) => {
          toast.success("Benefits Master created successfully!", {
            onAutoClose: () => resolve(),
          });
        });
        closeDialog();
        fetchBenefitsMaster();
      } else {
        toast.error("Failed to create Benefits Master");
      }
    } catch (error) {
      console.log("error", error);
      toast.error("An error occurred while creating Benefits Master");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await apiClient.delete(
        `/commonMaster/benefitsMaster/delete/${id}`
      );
      if (response.data.success) {
        await new Promise<void>((resolve) => {
          toast.success("Benefits Master deleted successfully!", {
            onAutoClose: () => resolve(),
          });
        });

        closeDialog();
        fetchBenefitsMaster();
      } else {
        toast.error("Failed to delete Benefits Master");
      }
    } catch (error: unknown) {
      console.log("error", error);
      toast.error("An error occurred while deleting Benefits Master");
    }
  };

  const handleApprove = () => {};
  const handleReject = () => {};

  const fetchBenefitsMaster = async () => {
    try {
      setIsloading(true);
      const response = await apiClient.get(
        "/commonMaster/benefitsMaster/allBenefitsMaster"
      );
      setIsloading(false);
      console.log("get Benefits Master response", response);
      setBenefitsMasterData(response.data.allBenefitsMaster);
    } catch (error) {
      setIsloading(false);
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchBenefitsMaster();
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
              <FormModule<TbenefitsMastervalidators>
                form={form}
                onSubmit={handleCreate}
                date={date}
                setDate={setDate}
                formFields={BenefitsMaster}
              />
            </DialogContent>
          </Dialog>
        </div>

        <TableModule<TbenefitsMastervalidators>
          data={benefitsMasterData}
          tableName={PAGENAME}
          header={BenefitsMasterHeaders}
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
          formFields={BenefitsMaster}
        />
      </div>
    </MaxWidthWrapper>
  );
}

export default Page;
