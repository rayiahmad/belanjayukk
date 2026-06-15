"use client";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function BreadcrumbComponent() {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter(Boolean);

  const breadcrumbItems = pathSegments.map((segment, index) => {
    const href = "/" + pathSegments.slice(0, index + 1).join("/");
    return { href, label: segment.charAt(0).toUpperCase() + segment.slice(1) };
  });

  return (
    <Breadcrumb className="container px-4 py-3 rounded-md text-sm font-medium">
      <BreadcrumbList className="flex items-center">
        {breadcrumbItems.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <BreadcrumbItem>
              {index === breadcrumbItems.length - 1 ? (
                // Jika item terakhir, tampilkan teks biasa
                <span className="text-gray-600 text-md">{item.label}</span>
              ) : (
                <BreadcrumbLink
                  href={item.href}
                  className="text-blue-500 hover:text-gray-600 hover:underline text-md"
                >
                  {item.label}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {/* Hanya tampilkan separator jika ini bukan item terakhir */}
            {index < breadcrumbItems.length - 1 && (
              <BreadcrumbSeparator className="text-md text-gray-500">
                {`>`}
              </BreadcrumbSeparator>
            )}
          </div>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
