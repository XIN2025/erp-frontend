import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import TableModule from "@/components/TableModule";

import React from "react";

const header = [
  {
    label: "Sub Supplier No",
    id: "subSupplierNo",
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
    label: "Status",
    id: "status",
  },
  {
    label: "Approved By",
    id: "aproovedBy",
  },
  {
    label: "Approved At",
    id: "aproovedAt",
  },
  {
    label: "Comment",
    id: "comment",
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
        Journal Sub Supplier
      </h1>
      <div className="mt-10 ">
        <TableModule tableName="Journal Sub Supplier" header={header} />
      </div>
    </MaxWidthWrapper>
  );
}

export default page;
