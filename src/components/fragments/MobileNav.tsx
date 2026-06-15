"use client";

import { AlignJustify } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import Image from "next/image";

const MobileNav = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const pathname = usePathname();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Promo", path: "/promo" },
    { name: "Tentang Kami", path: "/tentang-kami" },
  ];

  return (
    <div className="flex lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <AlignJustify className="text-2xl" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader className="mb-2">
            <Link
              href="/"
              className="flex gap-2 items-center"
              onClick={() => setMenuOpen(false)}
            >
              <Image
                src="/icons/icon logo.png"
                width={30}
                height={30}
                alt="icon Logo"
                className=""
              />
              <span className="font-bold">BelanjaYukk</span>
              <span className="sr-only">Home</span>
            </Link>
          </SheetHeader>
          <div className="px-2 flex flex-col gap-3">
            <SheetHeader className="mb-2">
              <SheetTitle className="text-lg text-start font-semibold">
                Menu
              </SheetTitle>
            </SheetHeader>
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={`text-md font-medium w-[150px] transition-colors duration-300 flex ${
                  pathname === item.path
                    ? item.name === "Promo🎉"
                      ? "text-white bg-orange-500 shadow-lg animate-pulse"
                      : "text-orange-500 border-b-2 border-orange-500 bg-white"
                    : item.name === "Promo🎉"
                    ? "text-orange-500 border border-orange-500 hover:bg-orange-500 hover:text-white"
                    : "text-gray-700 hover:text-orange-500"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="mt-10 px-2">
            <SheetHeader className="mb-4">
              <SheetTitle className="text-lg text-start font-semibold">
                Informasi
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-2">
              <Link
                href="/tentang-kami"
                className="hover:underline transition duration-200"
              >
                Tentang Kami
              </Link>
              <Link
                href="/privacy"
                className="hover:underline transition duration-200"
              >
                Kebijakan Privasi
              </Link>
              <Link
                href="/terms-conditions"
                className="hover:underline transition duration-200"
              >
                Syarat & Ketentuan
              </Link>
            </div>
          </div>
          <div className="mt-10 px-2">
            <SheetHeader className="mb-4">
              <SheetTitle className="text-lg text-start font-semibold">
                Layanan Pelanggan
              </SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-2">
              <Link
                href="/"
                className="hover:underline transition duration-200"
                aria-label="Email"
              >
                csbelanjayukk@example.com
              </Link>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
