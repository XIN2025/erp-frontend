import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import TableModule from "@/components/TableModule";

import React from "react";

const header = [
  {
    label: "Disbursement Sub Contractor No",
    id: "subContractorNo",
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
        Disbursement Sub Contractor
      </h1>
      <div className="mt-10 ">
        <TableModule tableName="Disbursement Sub Contractor" header={header} />
      </div>
    </MaxWidthWrapper>
  );
}

export default page;
