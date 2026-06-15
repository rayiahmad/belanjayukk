import Image from "next/image";
import { authOptions } from "@/libs/auth";
import { getServerSession } from "next-auth";
import iconUser from "@/assets/icons/iconUser.png";

export default async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <>
      <div className="sticky z-50 top-0 left-0 bg-white py-2 w-full shadow-md ">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 h-full">
            <div className="hidden sm:block ">
              <h2 className="font-semibold text-lg">
                Selamat datang &quot;{session?.user?.name}&quot;
              </h2>
            </div>
          </div>

          <div className="flex items-center">
            <div className="flex items-center gap-3">
              <div className=" leading-5">
                <h1 className="md:text-md text-[14px] text-slate-600 font-medium">
                  {session?.user?.name}
                </h1>
                <p className="text-[14px] md:flex hidden font-normal text-slate-400">
                  Administrator
                </p>
              </div>
              <div className="w-12 h-12 rounded-full">
                <span className="flex items-center top-2">
                  {session?.user?.image ? (
                    <Image
                      src={session.user.image}
                      alt={`${session.user.name}'s Profile`}
                      className="rounded-full mr-2"
                      width={40}
                      height={40}
                    />
                  ) : (
                    <Image
                      src={iconUser}
                      alt="Profile Picture"
                      className="rounded-full mr-2"
                      width={40}
                      height={40}
                    />
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
