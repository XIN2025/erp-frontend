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
import { Account, MaterialGroup } from "@/config/common-master-forms";
import {
  AccountHeaders,
  MaterialGroupHeaders,
} from "@/config/common-master-headers";
import { apiClient } from "@/lib/utils";
import {
  TmaterialGroupValidators,
  materialGroupValidators,
} from "@/lib/validators/common-master-form-validators/form-validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const PAGENAME: string = "Material Group";

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
  const [materialGroupData, setMaterialGroupData] = useState<undefined | []>();
  const [mounted, setMounted] = useState(false);
  const [date, setDate] = useState<Date>();
  const [currentItemID, setCurrentItemID] = useState<string | undefined>("");
  const [isLoading, setIsloading] = useState<boolean>(false);
  const form = useForm<TmaterialGroupValidators>({
    resolver: zodResolver(materialGroupValidators),
    defaultValues: {
      MaterialGroupCode: "",
      MaterialMajorGroupDescription: "",
      MaterialMinorGroupDescription: "",
      MaterialSubGroupDescription: "",
      MaterialSubSubGroupDescription: "",
      CategoryTag: "",
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
    values: TmaterialGroupValidators,
    gstData?: GSTDataItem[]
  ) => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const response = await apiClient.put(
          `/commonMaster/materialGroup/update/${id}`,
          values
        );
        console.log("Response:", response);
        if (response.data.success) {
          await new Promise<void>((resolveToast) => {
            toast.success("Material Group updated successfully!", {
              onAutoClose: () => resolveToast(),
            });
          });
          closeDialog();
          resolve();
        } else {
          toast.error("Failed to update Material Group");
          reject(new Error("Failed to update Material Group"));
        }
        fetchMaterialGroup();
      } catch (error) {
        console.error("Error updating Material Group:", error);
        toast.error("An error occurred while updating Material Group");
        reject(error);
      }
    });
  };
  const handleCreate = async (values: TmaterialGroupValidators) => {
    try {
      console.log("requestdata", values);
      const response = await apiClient.post(
        "/commonMaster/materialGroup/create",
        values
      );
      if (response.data.success) {
        await new Promise<void>((resolve) => {
          toast.success("Material Group created successfully!", {
            onAutoClose: () => resolve(),
          });
        });
        closeDialog();
        fetchMaterialGroup();
      } else {
        toast.error("Failed to create Material Group");
      }
    } catch (error) {
      console.log("error", error);
      toast.error("An error occurred while creating Material Group");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await apiClient.delete(
        `/commonMaster/materialGroup/delete/${id}`
      );
      if (response.data.success) {
        await new Promise<void>((resolve) => {
          toast.success("Material Group deleted successfully!", {
            onAutoClose: () => resolve(),
          });
        });

        closeDialog();
        fetchMaterialGroup();
      } else {
        toast.error("Failed to delete Material Group");
      }
    } catch (error: unknown) {
      console.log("error", error);
      toast.error("An error occurred while deleting Material Group");
    }
  };

  const handleApprove = () => {};
  const handleReject = () => {};

  const fetchMaterialGroup = async () => {
    try {
      setIsloading(true);
      const response = await apiClient.get(
        "/commonMaster/materialGroup/allMaterialGroup"
      );
      setIsloading(false);
      console.log("get Material Group response", response);
      setMaterialGroupData(response.data.allMaterialGroup);
    } catch (error) {
      setIsloading(false);
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchMaterialGroup();
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
              <FormModule<TmaterialGroupValidators>
                form={form}
                onSubmit={handleCreate}
                date={date}
                setDate={setDate}
                formFields={MaterialGroup}
              />
            </DialogContent>
          </Dialog>
        </div>

        <TableModule<TmaterialGroupValidators>
          data={materialGroupData}
          tableName={PAGENAME}
          header={MaterialGroupHeaders}
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
          formFields={MaterialGroup}
        />
      </div>
    </MaxWidthWrapper>
  );
}

export default Page;
