import Navbar from "@/components/layouts/Navbar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/libs/auth";
import Tentangkami from "@/components/layouts/Tentangkami";
import Footer from "@/components/layouts/Footer";
import Faq from "@/components/layouts/Faq";
import 'animate.css';

const page = async () => {
  const session = await getServerSession(authOptions);

  return (
    <>
      <Navbar session={session} />
      <div className="bg-gray-100">
        <Tentangkami />
        <Faq/>
      </div>
      <Footer />
    </>
  );
};

export default page;
