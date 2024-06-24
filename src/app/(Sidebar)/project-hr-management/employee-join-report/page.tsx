import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import TableModule from "@/components/TableModule";
import { commonmaster } from "@/config";
import React from "react";

const header = [
  {
    label: "Project",
    id: "project",
  },

  {
    label: "Employee Join Report Code",
    id: "employeeJoinReportCode",
  },
  {
    label: "Employee Join Report Code",
    id: "employeeJoinReportCode",
  },
  {
    label: "Employee Join Report Code",
    id: "employeeJoinReportCode",
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
        Employee Join Report
      </h1>
      <div className="mt-10 ">
        <TableModule tableName="Employee Join Report" header={header} />
      </div>
    </MaxWidthWrapper>
  );
}

export default page;
