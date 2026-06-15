import Navbar from "@/components/layouts/Navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import Footer from "@/components/layouts/Footer";

const page = async () => {
  const session = await getServerSession(authOptions);

  return (
    <>
      <Navbar session={session} />
      <div className="flex justify-center pb-10 items-center h-screen">
        <h3 className="text-2xl font-medium">Coming Soon Yaaah ^-^</h3>
      </div>
      <Footer />
    </>
  );
};

export default page;
