import Dashboard from "@/components/layouts/Dashboard";
import React from "react";
export const dynamic = "force-dynamic";

const page = () => {
  return (
    <>
      <div className="w-full pt-3 pb-10 container mx-auto">
        <Dashboard />
      </div>
    </>
  );
};

export default page;
