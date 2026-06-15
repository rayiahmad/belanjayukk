"use client";
import React from "react";
import { signOut } from "next-auth/react";
import { MdLogout } from "react-icons/md";

const ButtonLogout = () => {
  const logout = () => signOut({ callbackUrl: "/" });
  return (
    <>
      <button
        className="flex text-gray-100 hover:text-white items-center justify-between gap-2 px-4 py-2 transition-all duration-150 bg-slate-600 hover:bg-slate-500 rounded-lg"
        onClick={logout}
      >
        <div className="flex  gap-2 ">
          <span className="text-xl">
            <MdLogout />
          </span>
          <span className="font-medium text-md">Logout</span>
        </div>
      </button>
    </>
  );
};

export default ButtonLogout;
