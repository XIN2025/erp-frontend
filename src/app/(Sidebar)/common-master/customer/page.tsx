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
import { commonmaster } from "@/config";
import { FilePlus2 } from "lucide-react";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import FormModule from "@/components/FormModule";
import { CompanyDetails, Customer } from "@/config/common-master-forms";
import { apiClient } from "@/lib/utils";
import {
  TcustomerValidator,
  companyDetailsValidtor,
} from "@/lib/validators/common-master-form-validators/form-validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

const PAGENAME: string = "Customer";

export interface GSTDataItem {
  SerialNo: number;
  GSTRegNo: string;
  GSTState: string;
  GSTAddress: string;
  [key: string]: string | number;
}

function Page() {
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);
  const [date, setDate] = useState<Date>();
  const form = useForm<TcustomerValidator>({
    resolver: zodResolver(companyDetailsValidtor),
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
      CINLLPN: "",
      Tags: "",
    },
  });
  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const handleDialogChange = (open: boolean) => {
    setIsDialogOpen(open);
  };
  const { handleSubmit, control } = form;

  const [data, setData] = useState<GSTDataItem[]>([
    {
      SerialNo: 1,
      GSTRegNo: " ",
      GSTState: " ",
      GSTAddress: " ",
    },
  ]);

  const onSubmit: SubmitHandler<TcustomerValidator> = async (values) => {
    try {
      console.log("values", values);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    setDate(new Date());
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
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
                  <TooltipTrigger>
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
                //@ts-ignore
                onSubmit={onSubmit}
                data={data}
                setData={setData}
                date={date}
                setDate={setDate}
                formFields={Customer}
              />
            </DialogContent>
          </Dialog>
        </div>

        <TableModule tableName={PAGENAME} header={commonmaster} />
      </div>
    </MaxWidthWrapper>
  );
}

export default Page;
