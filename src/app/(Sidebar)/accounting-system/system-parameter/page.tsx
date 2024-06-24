import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import TableModule from "@/components/TableModule";

import React from "react";

const header = [
  {
    label: "System Parameter No.",
    id: "systemPrameterNo.",
  },
  {
    label: "Request By",
    id: "requestBy",
  },
  {
    label: "Date",
    id: "date",
  },

  {
    label: "Oeration",
    id: "operation",
  },
  {
    label: "Status",
    id: "status",
  },
  {
    label: "Approved By",
    id: "approvedBy",
  },
  {
    label: "Approved At",
    id: "approvedAt",
  },
  {
    label: "Comment",
    id: "comment",
  },
];

function page() {
  return (
    <MaxWidthWrapper className="  ">
      <h1 className=" text-5xl my-12 tracking-tighter font-bold text-center w-full text-zinc-700">
        System Parameter
      </h1>
      <div className="mt-10 ">
        <TableModule tableName="System Parameter" header={header} />
      </div>
    </MaxWidthWrapper>
  );
}

export default page;
