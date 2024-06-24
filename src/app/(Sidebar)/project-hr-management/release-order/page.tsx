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
    label: "Release Date",
    id: "releaseDate",
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
        Employee Release
      </h1>
      <div className="mt-10 ">
        <TableModule tableName="Employee Release" header={header} />
      </div>
    </MaxWidthWrapper>
  );
}

export default page;
