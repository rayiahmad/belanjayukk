import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import DetailProduct from "@/components/layouts/product/DetailProduct";
import prisma from "@/libs/prisma";

const page = async () => {
  const session = await getServerSession(authOptions);
  const kategori = await prisma.kategori.findMany();
  return (
    <>
      <Navbar session={session} />
      <div className="bg-gray-100">
        <DetailProduct kategori={kategori}/>
      </div>
      <Footer />
    </>
  );
};

export default page;
