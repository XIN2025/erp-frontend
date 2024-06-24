import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import TableModule from "@/components/TableModule";
import { commonmaster } from "@/config";
import React from "react";

const header = [
  {
    label: "Employee",
    id: "empployee",
  },
  {
    label: "Project",
    id: "project",
  },
  {
    label: "Allowances",
    id: "allowances",
  },
  {
    label: "Wage Type",
    id: "wageType",
  },
  {
    label: "Action",
    id: "action",
  },
];

function page() {
  return (
    <MaxWidthWrapper className="  ">
      <h1 className=" text-5xl my-12 tracking-tighter font-bold text-center w-full text-zinc-700">
        Daily Attendance
      </h1>
      <div className="mt-10 ">
        <TableModule tableName="Daily Attnedance" header={header} />
      </div>
    </MaxWidthWrapper>
  );
}

export default page;
