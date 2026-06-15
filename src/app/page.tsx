import React from "react";
import Navbar from "@/components/layouts/Navbar";
import Hero from "@/components/layouts/Hero";
import Kategori from "@/components/layouts/Kategori";
import Footer from "@/components/layouts/Footer";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import ProductsRecomended from "@/components/layouts/product/ProductRecomended";

const page = async () => {
  const session = await getServerSession(authOptions);
  return (
    <>
      <Navbar session={session} />
      <div className="bg-gray-100">
        <Hero />
        <Kategori />
        <ProductsRecomended />
      </div>
      <Footer />
    </>
  );
};

export default page;
