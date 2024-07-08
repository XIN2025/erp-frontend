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

import { EmployeeMasterHeaders } from "@/config/common-master/common-master-headers";
import { apiClient } from "@/lib/utils";
import {
  employeeMasterValidators,
  TEmployeeMasterValidators,
} from "@/lib/validators/common-master-form-validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { EmployeeMaster } from "@/config/common-master/formFields";

const PAGENAME: string = "Employee Master";

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
  const [employeeValidatorData, seTEmployeeMasterValidatorsData] = useState<
    undefined | []
  >();
  const [mounted, setMounted] = useState(false);
  const [date, setDate] = useState<Date>();
  const [currentItemID, setCurrentItemID] = useState<string | undefined>("");
  const [isLoading, setIsloading] = useState<boolean>(false);
  const form = useForm<TEmployeeMasterValidators>({
    resolver: zodResolver(employeeMasterValidators),
    defaultValues: {
      EmployeeCode: "",
      FatherHusbandName: "",
      EmployeeType: "",
      DateOfBirth: undefined,
      EmployeeFirstName: "",
      EmployeeLastName: "",
      Email: "",
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
      PastExperience: "",
      DateOfJoining: undefined,
      DateOfExit: undefined,
      Designation: "",
      RoleDescription: "",
      PfAccountNo: "",
      UniversalAccountNo: "",
      Esic: "",
      BankAccountNo: "",
      BankName: "",
      Ifsc: "",
      Aadhar: "",
      Pan: "",
      Wages: 0,
      OTType: "",
      Benefits: "",
      CompanyName: "",
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
    values: TEmployeeMasterValidators,
    gstData?: GSTDataItem[]
  ) => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const response = await apiClient.put(
          `/commonMaster/employeeMaster/update/${id}`,
          values
        );
        console.log("Response:", response);
        if (response.data.success) {
          await new Promise<void>((resolveToast) => {
            toast.success("Employee updated successfully!", {
              onAutoClose: () => resolveToast(),
            });
          });
          closeDialog();
          resolve();
        } else {
          toast.error("Failed to update Employee");
          reject(new Error("Failed to update Employee"));
        }
        fetchEmployees();
      } catch (error) {
        console.error("Error updating Employee:", error);
        toast.error("An error occurred while updating Employee");
        reject(error);
      }
    });
  };

  const handleCreate = async (values: TEmployeeMasterValidators) => {
    try {
      // const formattedValues = {
      //   ...values,

      //   DateOfBirth: values.DateOfBirth
      //     ? values.DateOfBirth.toISOString()
      //     : null,
      //   DateOfJoining: values.DateOfJoining
      //     ? values.DateOfJoining.toISOString()
      //     : null,
      //   DateOfExit: values.DateOfExit ? values.DateOfExit.toISOString() : null,
      // };
      // console.log("fomatted calues", formattedValues);
      const response = await apiClient.post(
        "/commonMaster/employeeMaster/create",
        values
      );
      if (response.data.success) {
        await new Promise<void>((resolve) => {
          toast.success("Employee created successfully!", {
            onAutoClose: () => resolve(),
          });
        });
        closeDialog();
        fetchEmployees();
      } else {
        toast.error("Failed to create Employee");
      }
    } catch (error) {
      console.log("error", error);
      toast.error("An error occurred while creating Employee");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await apiClient.delete(
        `/commonMaster/employeeMaster/delete/${id}`
      );
      if (response.data.success) {
        await new Promise<void>((resolve) => {
          toast.success("Employee deleted successfully!", {
            onAutoClose: () => resolve(),
          });
        });

        closeDialog();
        fetchEmployees();
      } else {
        toast.error("Failed to delete Employee");
      }
    } catch (error: unknown) {
      console.log("error", error);
      toast.error("An error occurred while deleting Employee");
    }
  };

  const handleApprove = () => {};
  const handleReject = () => {};

  const fetchEmployees = async () => {
    try {
      setIsloading(true);
      const response = await apiClient.get(
        "/commonMaster/employeeMaster/allEmployeeMaster"
      );
      setIsloading(false);
      console.log("get Employee response", response);
      seTEmployeeMasterValidatorsData(response.data.allEmployeeMaster);
    } catch (error) {
      setIsloading(false);
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchEmployees();
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
              <FormModule<TEmployeeMasterValidators>
                form={form}
                onSubmit={handleCreate}
                date={date}
                setDate={setDate}
                formFields={EmployeeMaster}
              />
            </DialogContent>
          </Dialog>
        </div>

        <TableModule<TEmployeeMasterValidators>
          data={employeeValidatorData}
          tableName={PAGENAME}
          header={EmployeeMasterHeaders}
          includeGSTTable={false}
          form={form}
          onUpdate={handleUpdate}
          currentItemID={currentItemID}
          setCurrentItemID={setCurrentItemID}
          onDelete={handleDelete}
          onAprrove={handleApprove}
          onReject={handleReject}
          date={date}
          setDate={setDate}
          formFields={EmployeeMaster}
        />
      </div>
    </MaxWidthWrapper>
  );
}

export default Page;
