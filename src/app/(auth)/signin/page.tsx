import GoogleButton from "@/components/fragments/Googlebutton";
import LoginForm from "./LoginForm";
import Link from "next/link";
import fotologin from "@/assets/ilustrasi/gambarLogin.webp";
import Image from "next/image";

const Page = () => {
  return (
    <section className="min-h-screen flex flex-col lg:flex-row justify-center items-center">
      <div className="flex-shrink-0 h-screen w-full lg:w-1/2 md:flex hidden">
        <Image
          src={fotologin}
          layout="responsive"
          width={500}
          height={500}
          alt="Login Illustration"
          className="w-full h-full"
        />
      </div>

      {/* Login Form Section */}
      <div className="flex flex-col items-center gap-6 w-full px-8">
        <div className="text-center">
          <h1 className="font-bold text-2xl flex items-center gap-2">
            <Image
              src="/icons/icon logo.png"
              width={30}
              height={30}
              alt="icon Logo"
              className="w-full h-full object-cover"
            />{" "}
            BelanjaYukk!
          </h1>
          <h3 className="text-md font-semibold mb-3">Silahkan Login</h3>
        </div>
        <LoginForm />
        <p className="text-sm mt-4">
          <span className="mr-1">Belum punya akun?</span>
          <Link
            href="/signup"
            className="hover:underline text-blue-600 transition-colors duration-200 ease-in-out"
          >
            Daftar
          </Link>
        </p>
        <div className="w-full lg:w-[50%] flex items-center my-2">
          <div className="w-full border-t border-gray-300"></div>
          <span className="px-2 text-gray-500">or</span>
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="lg:w-[50%] w-full">
          <GoogleButton />
        </div>
      </div>
    </section>
  );
};

export default Page;
