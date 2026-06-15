"use client";
import Cart from "./Cart";
import Link from "next/link";
import Search from "../fragments/Search";
import { usePathname } from "next/navigation";
import { CiLogin } from "react-icons/ci";
import { Session } from "next-auth";
import MobileNav from "../fragments/MobileNav";
import Image from "next/image";
import { useEffect, useState } from "react";
import { DropdownUser } from "../fragments/DropdownUser";

interface NavbarProps {
  session: Session | null;
}

const Navbar: React.FC<NavbarProps> = ({ session }) => {
  const pathname = usePathname();
  const [kategori, setKategori] = useState([]);

  useEffect(() => {
    const fetchKategori = async () => {
      try {
        const response = await fetch("/api/kategori");
        const data = await response.json();
        setKategori(data);
      } catch (error) {
        console.error("Error fetching kategori:", error);
      }
    };

    fetchKategori();
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Promo🎉", path: "/promo" },
    { name: "Tentang Kami", path: "/tentang-kami" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full md:py-3 py-4 md:px-4 px-0 border-b bg-white">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="items-center gap-8 lg:flex hidden">
            <Link href="/" className="flex items-center gap-1">
              <Image
                src="/icons/icon logo.png"
                width={30}
                height={30}
                alt="icon Logo"
                className="w-full h-full object-cover"
              />
              <h1 className="text-black md:text-lg text-base font-semibold">
                Belanja
                <span className="text-orange-600">Yukk</span>
              </h1>
            </Link>
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={`text-md font-semibold transition-colors duration-300 lg:flex hidden ${
                  pathname === item.path
                    ? "text-white bg-orange-500 py-1 px-3 shadow-lg rounded-lg"
                    : item.name === "Promo🎉"
                    ? "text-orange-500 bg-white py-1 px-3 border border-orange-500 rounded-lg hover:bg-orange-500 hover:text-white"
                    : "text-gray-700 hover:text-orange-500 py-1 px-3"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <MobileNav />
          <div className="flex items-center md:space-x-4 space-x-0">
            <Search />
            <Cart kategori={kategori} />
            {session ? (
              <DropdownUser session={session} />
            ) : (
              <Link
                href="/signin"
                className="text-white font-medium px-2 py-1 transition-all duration-200 bg-orange-500 hover:bg-orange-600 rounded-xl flex items-center gap-2"
              >
                <CiLogin className="text-lg font-medium" /> Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
