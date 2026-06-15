import Checkout from "@/components/layouts/checkout/CheckoutPage";
import Navbar from "@/components/layouts/Navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import Footer from "@/components/layouts/Footer";

const page = async () => {
  const session = await getServerSession(authOptions);

  return (
    <>
      <Navbar session={session} />
      <Checkout />
      <Footer />
    </>
  );
};

export default page;
