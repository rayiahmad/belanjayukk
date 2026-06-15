"use client";
import { generatePagination } from "@/libs/utils";
import Link from "next/link";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { usePathname, useSearchParams } from "next/navigation";
import clsx from "clsx";

const Pagination = ({ totalPages }: { totalPages: number }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageUrl = (page: string | number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    return `${pathname}?${params.toString()}`;
  };
  const allPages = generatePagination(currentPage, totalPages);
  const PaginationNumber = ({
    page,
    href,
    position,
    isActive,
  }: {
    page: number | string;
    href: string;
    position?: "first" | "last" | "middle" | "single";
    isActive: boolean;
  }) => {
    const classes = clsx(
      "flex h-10 w-10 items-center justify-center text-sm border",
      {
        "rounded-1-sm": position === "first" || position === "single",
        "rounded-r-sm": position === "last" || position === "single",
        "z-10 bg-blue-100 border-blue-500 text-black": isActive,
        "hover:bg-gray-100": !isActive && position !== "middle",
        "text-gray-300 pointer-events-none": position === "middle",
      }
    );
    return isActive && position === "middle" ? (
      <div className={classes}>{page}</div>
    ) : (
      <Link href={href} className={classes}>
        {page}
      </Link>
    );
  };
  const PaginationArrow = ({
    href,
    direction,
    isDisabled,
  }: {
    href: string;
    direction: "left" | "right";
    isDisabled?: boolean;
  }) => {
    const classes = clsx(
      "flex items-center px-2 justify-center text-sm border border-gray-400 rounded-lg",
      {
        "hover:bg-gray-100": !isDisabled,
        "mr-2": direction === "left",
        "ml-2": direction === "right",
        "text-gray-300 pointer-events-none": isDisabled,
      }
    );
    const icon =
      direction === "left" ? (
        <>
          <HiChevronLeft size={20} />
          <p className="ml-1">Prev</p>
        </>
      ) : (
        <>
          <p className="ml-1">Next</p>
          <HiChevronRight size={20} />
        </>
      );
    return isDisabled ? (
      <div className={classes}>{icon}</div>
    ) : (
      <Link href={href} className={classes}>
        {icon}
      </Link>
    );
  };

  return (
    <>
      <div className="inline-flex">
        <PaginationArrow
          direction="left"
          href={createPageUrl(currentPage - 1)}
          isDisabled={currentPage <= 1}
        />
        <div className="flex -spacre-x-px">
          {allPages.map((page, index) => {
            let position: "first" | "last" | "middle" | "single" | undefined;

            if (index === 0) position = "first";
            if (index === allPages.length - 1) position = "last";
            if (allPages.length === 1) position = "single";
            if (page === "...") position = "middle";

            return (
              <PaginationNumber
                key={index}
                page={page}
                href={createPageUrl(page)}
                position={position}
                isActive={page === currentPage}
              />
            );
          })}
        </div>
        <PaginationArrow
          direction="right"
          href={createPageUrl(currentPage + 1)}
          isDisabled={currentPage >= totalPages}
        />
      </div>
    </>
  );
};

export default Pagination;
