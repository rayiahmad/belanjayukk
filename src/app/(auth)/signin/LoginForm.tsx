"use client";

import { IoEye, IoEyeOff } from "react-icons/io5";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { signInFormSchema, signInFormType } from "@/schema/login-schema";
import toast from "react-hot-toast";
import { CgSpinner } from "react-icons/cg";

const FormLogin = () => {
  const router = useRouter();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<signInFormType>({
    resolver: zodResolver(signInFormSchema),
  });

  const onSubmit = async (data: signInFormType) => {
    setIsLoading(true);
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result && !result.error) {
        const response = await fetch("/api/auth/session");
        const session = await response.json();

        toast.success("Login berhasil! 🚀");

        if (session?.user?.isAdmin) {
          router.push("/admin");
        } else {
          router.push("/");
        }
      } else {
        reset();
        toast.error("Akun Anda Belum Terdaftar");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="md:w-[50%] w-full space-y-6 "
      >
        <div className="">
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
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:border-blue-500 focus:ring-blue-500"
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
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:border-blue-500 focus:ring-blue-500"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center px-3"
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
            "Login"
          )}
        </button>
      </form>
    </>
  );
};

export default FormLogin;
