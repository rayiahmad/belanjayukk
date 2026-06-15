import React from "react";
import Navbar from "@/components/layouts/Navbar";
import ProductsList from "@/components/layouts/product/ProductsList";
import Footer from "@/components/layouts/Footer";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";

const page = async () => {
  const session = await getServerSession(authOptions);
  return (
    <>
      <Navbar session={session} />
      <div className="bg-gray-100">
        <ProductsList/>
      </div>
      <Footer />
    </>
  );
};

export default page;
