import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import TableModule from "@/components/TableModule";
import { commonmaster } from "@/config";
import React from "react";

function page() {
  return (
    <MaxWidthWrapper className="  ">
      <h1 className=" text-5xl my-12 tracking-tighter font-bold text-center w-full text-zinc-700">
        Units of Measurement
      </h1>
      <div className="mt-10 ">
        <TableModule tableName="Units of Measurement" header={commonmaster} />
      </div>
    </MaxWidthWrapper>
  );
}

export default page;
