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
  MachineGroup,
  RecoveryType,
} from "@/config/common-master/formFields";
import {
  MachineClassHeaders,
  MachineGroupHeaders,
  MachineHeaders,
  RecoveryTypeHeaders,
} from "@/config/common-master/common-master-headers";
import { apiClient } from "@/lib/utils";
import {
  machineGroupValidators,
  TmachineGroupValidators,
} from "@/lib/validators/common-master-form-validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const PAGENAME: string = "Machine Group";

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
  const [machineGroupData, setMachineGroupData] = useState<undefined | []>();
  const [mounted, setMounted] = useState(false);
  const [date, setDate] = useState<Date>();
  const [currentItemID, setCurrentItemID] = useState<string | undefined>("");
  const [isLoading, setIsloading] = useState<boolean>(false);
  const form = useForm<TmachineGroupValidators>({
    resolver: zodResolver(machineGroupValidators),
    defaultValues: {
      MachineGroupCode: "",
      MachineGroupDescription: "",
      MachineGroupLongDescription: "",
      MachineClassCode: "",
      MachineClassDescription: "",
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
    values: TmachineGroupValidators,
    gstData?: GSTDataItem[]
  ) => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const response = await apiClient.put(
          `/commonMaster/machineGroup/update/${id}`,
          values
        );
        console.log("Response:", response);
        if (response.data.success) {
          await new Promise<void>((resolveToast) => {
            toast.success("Machine Group updated successfully!", {
              onAutoClose: () => resolveToast(),
            });
          });
          closeDialog();
          resolve();
        } else {
          toast.error("Failed to update Machine Group");
          reject(new Error("Failed to update Machine Group"));
        }
        fetchMachine();
      } catch (error) {
        console.error("Error updating Machine Group:", error);
        toast.error("An error occurred while updating Machine Group");
        reject(error);
      }
    });
  };
  const handleCreate = async (values: TmachineGroupValidators) => {
    try {
      const response = await apiClient.post(
        "/commonMaster/machineGroup/create",
        values
      );
      if (response.data.success) {
        await new Promise<void>((resolve) => {
          toast.success("Machine Group created successfully!", {
            onAutoClose: () => resolve(),
          });
        });
        closeDialog();
        fetchMachine();
      } else {
        toast.error("Failed to create Machine Group");
      }
    } catch (error) {
      console.log("error", error);
      toast.error("An error occurred while creating Machine Group");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await apiClient.delete(
        `/commonMaster/machineGroup/delete/${id}`
      );
      if (response.data.success) {
        await new Promise<void>((resolve) => {
          toast.success("Machine Group deleted successfully!", {
            onAutoClose: () => resolve(),
          });
        });

        closeDialog();
        fetchMachine();
      } else {
        toast.error("Failed to delete Machine Group");
      }
    } catch (error: unknown) {
      console.log("error", error);
      toast.error("An error occurred while deleting Machine Group");
    }
  };

  const handleApprove = () => {};
  const handleReject = () => {};

  const fetchMachine = async () => {
    try {
      setIsloading(true);
      const response = await apiClient.get(
        "/commonMaster/machineGroup/allMachineGroup"
      );
      setIsloading(false);
      console.log("get Machine response", response);
      setMachineGroupData(response.data.allMachineGroup);
    } catch (error) {
      setIsloading(false);
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchMachine();
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
              <FormModule<TmachineGroupValidators>
                form={form}
                onSubmit={handleCreate}
                date={date}
                setDate={setDate}
                formFields={MachineGroup}
              />
            </DialogContent>
          </Dialog>
        </div>

        <TableModule<TmachineGroupValidators>
          data={machineGroupData}
          tableName={PAGENAME}
          header={MachineGroupHeaders}
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
          formFields={MachineGroup}
        />
      </div>
    </MaxWidthWrapper>
  );
}

export default Page;
