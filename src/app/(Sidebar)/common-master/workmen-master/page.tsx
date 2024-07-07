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
  Machine,
  MachineClass,
  RecoveryType,
  WorkmenDetails,
} from "@/config/common-master-forms";
import {
  MachineClassHeaders,
  MachineHeaders,
  RecoveryTypeHeaders,
  WorkmenMasterHeaders,
} from "@/config/common-master-headers";
import { apiClient } from "@/lib/utils";
import {
  TWorkmenDetailsValidators,
  workmenDetailsValidators,
} from "@/lib/validators/common-master-form-validators/form-validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const PAGENAME: string = "Workmen Master";

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
  const [workmenValidatorData, seTWorkmenDetailsValidatorsData] = useState<
    undefined | []
  >();
  const [mounted, setMounted] = useState(false);
  const [date, setDate] = useState<Date>();
  const [currentItemID, setCurrentItemID] = useState<string | undefined>("");
  const [isLoading, setIsloading] = useState<boolean>(false);
  const form = useForm<TWorkmenDetailsValidators>({
    resolver: zodResolver(workmenDetailsValidators),
    defaultValues: {
      WorkmenCode: "",
      WorkmenType: "",
      WorkmenName: "",
      FatherHusbandName: "",
      DateOfBirth: undefined,
      Gender: "",
      Religion: "",
      MotherTongue: "",
      PresentAddress: "",
      PermanentAddress: "",
      Phone: "",
      EmergencyContactNumber: "",
      MaritalStatus: "",
      IdentificationMark: "",
      HeightCm: 0,
      WeightKg: 0,
      Vision: "",
      LeftEye: "",
      RightEye: "",
      EducationalQualification: "",
      PastExperienceInYears: 0,
      PastExperienceInMonths: 0,
      DateOfJoining: undefined,
      DateOfExit: undefined,
      Designation: "",
      SkillCategory: "",
      PfAccountNo: "",
      UniversalAccountNo: "",
      Esic: "",
      BankAccountNo: "",
      BankName: "",
      Ifsc: "",
      Aadhar: "",
      Pan: "",
      Wages: 0,
      WagesType: "",
      OTType: "",
      Benefits: "",
    },
  });

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const handleDialogChange = (open: boolean) => {
    setIsDialogOpen(open);
  };

  const handleUpdate = (
    id: string,
    values: TWorkmenDetailsValidators,
    gstData?: GSTDataItem[]
  ) => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const response = await apiClient.put(
          `/commonMaster/workmenMaster/update/${id}`,
          values
        );
        console.log("Response:", response);
        if (response.data.success) {
          await new Promise<void>((resolveToast) => {
            toast.success("Workmen updated successfully!", {
              onAutoClose: () => resolveToast(),
            });
          });
          closeDialog();
          resolve();
        } else {
          toast.error("Failed to update Workmen");
          reject(new Error("Failed to update Workmen"));
        }
        fetchWorkmen();
      } catch (error) {
        console.error("Error updating Workmen:", error);
        toast.error("An error occurred while updating Workmen");
        reject(error);
      }
    });
  };
  const handleCreate = async (values: TWorkmenDetailsValidators) => {
    try {
      console.log("workmen request", values);
      const response = await apiClient.post(
        "/commonMaster/workmenMaster/create",
        values
      );

      if (response.data.success) {
        await new Promise<void>((resolve) => {
          toast.success("Workmen created successfully!", {
            onAutoClose: () => resolve(),
          });
        });
        closeDialog();
        fetchWorkmen();
      } else {
        toast.error(response.data.error || "Failed to create Workmen");
      }
    } catch (error: any) {
      console.error("error", error);
      if (error.response && error.response.data) {
        toast.error(
          error.response.data.error ||
            "An error occurred while creating Workmen"
        );
      } else {
        toast.error("An error occurred while creating Workmen");
      }
    }
  };
  const handleDelete = async (id: string) => {
    try {
      const response = await apiClient.delete(
        `/commonMaster/workmenMaster/delete/${id}`
      );
      if (response.data.success) {
        await new Promise<void>((resolve) => {
          toast.success("Workmen deleted successfully!", {
            onAutoClose: () => resolve(),
          });
        });

        closeDialog();
        fetchWorkmen();
      } else {
        toast.error("Failed to delete Workmen");
      }
    } catch (error: unknown) {
      console.log("error", error);
      toast.error("An error occurred while deleting Workmen");
    }
  };

  const handleApprove = () => {};
  const handleReject = () => {};

  const fetchWorkmen = async () => {
    try {
      setIsloading(true);
      const response = await apiClient.get(
        "/commonMaster/workmenMaster/allWorkmenMaster"
      );
      setIsloading(false);
      console.log("get Workmen response", response);
      seTWorkmenDetailsValidatorsData(response.data.allWorkmenMaster);
    } catch (error) {
      setIsloading(false);
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchWorkmen();
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
              <FormModule<TWorkmenDetailsValidators>
                form={form}
                onSubmit={handleCreate}
                date={date}
                setDate={setDate}
                formFields={WorkmenDetails}
              />
            </DialogContent>
          </Dialog>
        </div>

        <TableModule<TWorkmenDetailsValidators>
          data={workmenValidatorData}
          tableName={PAGENAME}
          header={WorkmenMasterHeaders}
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
          formFields={WorkmenDetails}
        />
      </div>
    </MaxWidthWrapper>
  );
}

export default Page;
