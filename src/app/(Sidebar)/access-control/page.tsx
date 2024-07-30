// pages/access-control.tsx

"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
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
import LoadingDots from "@/components/Loading";
import { AccessControl } from "@/config/access-control/formFields";
import { AccessControlHeaders } from "@/config/access-control/headers";
import { apiClient } from "@/lib/utils";
import {
  accessControlValdiators,
  TaccessControlValdiators,
} from "@/lib/validators/access-control-validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import AccessControlTable from "@/components/access-control/AccessControlTable";
import AccessControlForm from "@/components/access-control/AccessControlForm";
import { RoleDataItem } from "@/components/access-control/RoleTable";
import { formTableHeaders } from "@/config/common-master/formFields";

const PAGENAME: string = "Access Control";

function Page() {
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [accessControlData, setAccessControlData] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);
  const [date, setDate] = useState<Date>();
  const [currentItemID, setCurrentItemID] = useState<string | undefined>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<TaccessControlValdiators>({
    resolver: zodResolver(accessControlValdiators),
    defaultValues: {
      EmployeeCode: "",
    },
  });

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const handleDialogChange = (open: boolean) => {
    setIsDialogOpen(open);
  };

  const onFormSubmitSuccess = () => {
    fetchAccessControl();
  };

  const handleUpdate = (
    id: string,
    values: TaccessControlValdiators,
    roleData?: RoleDataItem[]
  ) => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        const response = await apiClient.put(
          `/accessControl/accessRequest/update/${id}`,
          values
        );
        console.log("Response:", response);
        if (response.data.success) {
          await new Promise<void>((resolveToast) => {
            toast.success("Access Control updated successfully!", {
              onAutoClose: () => resolveToast(),
            });
          });
          closeDialog();
          await fetchAccessControl();
          router.refresh();
          window.location.reload();
          resolve();
        } else {
          // toast.error("Failed to update Access Control");
          reject(new Error("Failed to update Access Control"));
        }
      } catch (error) {
        console.error("Error updating Access Control:", error);
        // toast.error("An error occurred while updating Access Control");
        reject(error);
      }
    });
  };

  // const handleCreate = async (
  //   values: TaccessControlValdiators,
  //   roleData: RoleDataItem[]
  // ) => {
  //   try {
  //     const response = await apiClient.post(
  //       "/accessControl/accessRequest/create",
  //       {
  //         ...values,
  //         roleData,
  //       }
  //     );
  //     if (response.data.success) {
  //       await new Promise<void>((resolve) => {
  //         toast.success("Access Control created successfully!", {
  //           onAutoClose: () => resolve(),
  //         });
  //       });
  //       closeDialog();
  //       fetchAccessControl();
  //     } else {
  //       toast.error("Failed to create Access Control");
  //     }
  //   } catch (error) {
  //     console.log("error", error);
  //     toast.error("An error occurred while creating Access Control");
  //   }
  // };

  const handleDelete = async (id: string) => {
    try {
      const response = await apiClient.delete(
        `/accessControl/accessRequest/delete/${id}`
      );
      if (response.data.success) {
        await new Promise<void>((resolve) => {
          toast.success("Access Control deleted successfully!", {
            onAutoClose: () => resolve(),
          });
        });

        closeDialog();
        fetchAccessControl();
      } else {
        toast.error("Failed to delete Access Control");
      }
    } catch (error: unknown) {
      console.log("error", error);
      toast.error("An error occurred while deleting Access Control");
    }
  };

  const handleApprove = () => {};
  const handleReject = () => {};

  const fetchAccessControl = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.get(
        "/accessControl/accessRequest/getAllUser"
      );
      setIsLoading(false);
      console.log("get Access Control response", response.data.allUsers);
      const userWithRoles = response.data.allUsers.filter(
        (user: any) => user.roles.length !== 0
      );
      setAccessControlData(userWithRoles);
    } catch (error) {
      setIsLoading(false);
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchAccessControl();
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
            <DialogContent className="max-w-[950px]">
              <DialogHeader>
                <DialogTitle className="text-center">{`${PAGENAME} (Create)`}</DialogTitle>
              </DialogHeader>
              <AccessControlForm<TaccessControlValdiators>
                form={form}
                onClose={closeDialog}
                formFields={AccessControl}
                onFormSubmitSuccess={onFormSubmitSuccess}
              />
            </DialogContent>
          </Dialog>
        </div>

        <AccessControlTable
          data={accessControlData}
          tableName={PAGENAME}
          header={AccessControlHeaders}
          form={form}
          onUpdate={handleUpdate}
          currentItemID={currentItemID}
          setCurrentItemID={setCurrentItemID}
          onDelete={handleDelete}
          onApprove={handleApprove}
          onReject={handleReject}
          date={date}
          setDate={setDate}
          formFields={AccessControl}
        />
      </div>
    </MaxWidthWrapper>
  );
}

export default Page;
