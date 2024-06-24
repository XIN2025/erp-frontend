import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import TableModule from "@/components/TableModule";

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
        Employee Join
      </h1>
      <div className="mt-10 ">
        <TableModule tableName="Employee Join" header={header} />
      </div>
    </MaxWidthWrapper>
  );
}

export default page;
