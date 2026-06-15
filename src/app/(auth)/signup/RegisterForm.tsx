"use client";

import { signUpFormSchema, signUpFormType } from "@/schema/register-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoEye, IoEyeOff } from "react-icons/io5";
import toast from "react-hot-toast";
import { CgSpinner } from "react-icons/cg";

const RegisterForm = () => {
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<signUpFormType>({
    resolver: zodResolver(signUpFormSchema),
  });

  const onSubmit = async (data: signUpFormType) => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/auth/signup", data);
      if (response.status === 200) {
        toast.success("Berhasil mendaftar! Silahkan login untuk melanjutkan.");
        reset();
        router.push("/signin");
        setIsLoading(false);
      }
    } catch (error) {
      toast.error("Terjadi kesalahan. Silakan coba lagi.");
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 md:w-[50%] w-full">
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Nama
          </label>
          <input
            id="name"
            type="text"
            {...register("name")}
            className="mt-1 w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            {...register("email")}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              type={isPasswordVisible ? "text" : "password"}
              {...register("password")}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center px-2"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              {isPasswordVisible ? <IoEyeOff /> : <IoEye />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>
        <button
          type="submit"
          className={`w-full bg-blue-500 text-white py-3 px-4 rounded-md shadow-sm flex items-center justify-center ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isLoading}
        >
          {isLoading ? (
            <div className="flex items-center gap-1">
              <CgSpinner className="animate-spin h-5 w-5 mr-3 text-white" />
              Loading...
            </div>
          ) : (
            "Daftar"
          )}
        </button>
      </form>
    </>
  );
};

export default RegisterForm;
