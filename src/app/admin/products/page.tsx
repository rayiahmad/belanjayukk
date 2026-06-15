import { TableProducts } from "@/components/tables/TableProducts";
import { getProductPages } from "@/libs/data/dataProducts";
export const dynamic = "force-dynamic";
import Pagination from "@/components/fragments/Pagination";
import SkeletonProductAdmin from "@/components/fragments/sekeleton/SekeletonProductAdmin";
import { Suspense } from "react";

const page = async ({
  searchParams,
}: {
  searchParams?: {
    q?: string;
    page?: string;
  };
}) => {
  const q = searchParams?.q || "";
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await getProductPages(q);
  return (
    <>
      <div className="w-full px-4 py-5 container mx-auto">
        <Suspense key={q + currentPage} fallback={<SkeletonProductAdmin />}>
          <TableProducts currentPage={currentPage} query={q} />
        </Suspense>
      </div>
      <div className="flex justify-center mb-8">
        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
};

export default page;
