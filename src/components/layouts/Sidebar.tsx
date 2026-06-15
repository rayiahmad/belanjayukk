"use client";
import { useState } from "react";
import { BiSolidHome, BiMenu, BiX } from "react-icons/bi";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaProductHunt } from "react-icons/fa6";
import { ShoppingBag } from "lucide-react";
import { BsCartCheckFill } from "react-icons/bs";
import ButtonLogout from "../fragments/ButtonLogout";
import { MdMessage } from "react-icons/md";
import { HiUserGroup } from "react-icons/hi";
import { IoIosSettings } from "react-icons/io";

const Sidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Hamburger Icon for mobile view */}
      <div className="lg:hidden z-[300] fixed top-4 left-4 ">
        <BiMenu className="text-3xl cursor-pointer" onClick={toggleSidebar} />
      </div>

      {/* Sidebar for desktop */}
      <div className="bg-gray-800 w-64 flex-shrink-0 top-0 z-20 h-full hidden lg:block sticky">
        <div className="bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-400 rounded-b-lg h-[110px] relative z-10 flex flex-col items-center justify-center">
          <h3 className="text-md text-center font-bold text-black">
            Admin Dashboard
          </h3>
          <p className="text-black md:text-xl justify-center text-base font-bold flex items-center gap-1">
            <ShoppingBag className="text-white" /> BelanjaYukk🚀
          </p>
        </div>
        <ul className="py-5 px-3">
          <li className="p-2 cursor-pointer rounded">
            <Link
              href="/admin"
              className={`flex items-center gap-2.5 rounded-lg py-2 px-4 font-medium text-white duration-300 ease-in-out hover:text-white hover:bg-orange-500 ${
                pathname === "/admin" && "bg-orange-600 text-white"
              }`}
            >
              <BiSolidHome /> Dashboard
            </Link>
          </li>
          <li className="p-2 cursor-pointer rounded">
            <Link
              href="/admin/products"
              className={`flex items-center gap-2.5 rounded-lg py-2 px-4 font-medium text-white duration-300 ease-in-out hover:text-white hover:bg-orange-500 ${
                pathname === "/admin/products" && "bg-orange-600 text-white"
              }`}
            >
              <FaProductHunt />
              Products
            </Link>
          </li>
          <li className="p-2 cursor-pointer rounded">
            <Link
              href="/admin/order"
              className={`flex items-center gap-2.5 rounded-lg py-2 px-4 font-medium text-white duration-300 ease-in-out hover:text-white hover:bg-orange-500 ${
                pathname === "/admin/order" && "bg-orange-600 text-white"
              }`}
            >
              <BsCartCheckFill />
              Order
            </Link>
          </li>
          <li className="p-2 cursor-pointer rounded">
            <Link
              href="/admin/customers"
              className={`flex items-center gap-2.5 rounded-lg py-2 px-4 font-medium text-white duration-300 ease-in-out hover:text-white hover:bg-orange-500 ${
                pathname === "/admin/customers" && "bg-orange-600 text-white"
              }`}
            >
              <HiUserGroup />
              Customers
            </Link>
          </li>
          {/* <li className="p-2 cursor-pointer rounded">
            <Link
              href="/admin/pesan"
              className={`flex items-center gap-2.5 rounded-lg py-2 px-4 font-medium text-white duration-300 ease-in-out hover:text-white hover:bg-orange-500 ${
                pathname === "/pesan" && "bg-orange-600 text-white"
              }`}
            >
              <MdMessage />
              Pesan
            </Link>
          </li>
          <li className="p-2 cursor-pointer rounded">
            <Link
              href="/admin/setting-admin"
              className={`flex items-center gap-2.5 rounded-lg py-2 px-4 font-medium text-white duration-300 ease-in-out hover:text-white hover:bg-orange-500 ${
                pathname === "/admin/setting-admin" && "bg-orange-600 text-white"
              }`}
            >
              <IoIosSettings />
              Setting
            </Link>
          </li> */}
          <li className="p-2 cursor-pointer rounded">
            <ButtonLogout />
          </li>
        </ul>
      </div>

      {/* Sidebar for mobile */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-gray-800 z-[300] transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:hidden`}
      >
        <div className="flex justify-between items-center bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-400 rounded-b-lg h-[110px] px-4">
          <h3 className="text-xl font-bold text-white">Dashboard🚀</h3>
          <BiX
            className="text-3xl text-white cursor-pointer"
            onClick={toggleSidebar}
          />
        </div>
        <ul className="py-5 px-3">
          <li className="p-2 cursor-pointer rounded">
            <Link
              href="/admin"
              className={`flex items-center gap-2.5 rounded-lg py-2 px-4 font-medium text-white duration-300 ease-in-out hover:text-white hover:bg-orange-500 ${
                pathname === "/admin" && "bg-orange-600 text-white"
              }`}
              onClick={toggleSidebar}
            >
              <BiSolidHome /> Dashboard
            </Link>
          </li>
          <li className="p-2 cursor-pointer rounded">
            <Link
              href="/admin/products"
              className={`flex items-center gap-2.5 rounded-lg py-2 px-4 font-medium text-white duration-300 ease-in-out hover:text-white hover:bg-orange-500 ${
                pathname === "/products" && "bg-orange-600 text-white"
              }`}
              onClick={toggleSidebar}
            >
              <FaProductHunt />
              Products
            </Link>
          </li>
          <li className="p-2 cursor-pointer rounded">
            <Link
              href="/admin/order"
              className={`flex items-center gap-2.5 rounded-lg py-2 px-4 font-medium text-white duration-300 ease-in-out hover:text-white hover:bg-orange-500 ${
                pathname === "/servis" && "bg-orange-600 text-white"
              }`}
              onClick={toggleSidebar}
            >
              <BsCartCheckFill />
              Orders
            </Link>
          </li>
          <li className="p-2 cursor-pointer rounded">
            <Link
              href="/admin/customers"
              className={`flex items-center gap-2.5 rounded-lg py-2 px-4 font-medium text-white duration-300 ease-in-out hover:text-white hover:bg-orange-500 ${
                pathname === "/customers" && "bg-orange-600 text-white"
              }`}
              onClick={toggleSidebar}
            >
              <MdMessage />
              Customers
            </Link>
          </li>
          {/* <li className="p-2 cursor-pointer rounded">
            <Link
              href="/admin/pesan"
              className={`flex items-center gap-2.5 rounded-lg py-2 px-4 font-medium text-white duration-300 ease-in-out hover:text-white hover:bg-orange-500 ${
                pathname === "/pesan" && "bg-orange-600 text-white"
              }`}
              onClick={toggleSidebar}
            >
              <MdMessage />
              Pesan
            </Link>
          </li>
          <li className="p-2 cursor-pointer rounded">
            <Link
              href="/admin/setting"
              className={`flex items-center gap-2.5 rounded-lg py-2 px-4 font-medium text-white duration-300 ease-in-out hover:text-white hover:bg-orange-500 ${
                pathname === "/setting" && "bg-orange-600 text-white"
              }`}
              onClick={toggleSidebar}
            >
              <IoIosSettings />
              Setting
            </Link>
          </li> */}
          <li className="p-2 cursor-pointer rounded">
            <ButtonLogout />
          </li>
        </ul>
      </div>

      {/* Backdrop for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
