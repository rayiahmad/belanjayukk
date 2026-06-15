import Footer from "@/components/layouts/Footer";
import Navbar from "@/components/layouts/Navbar";
import RiwayatOrder from "@/components/layouts/order/RiwayatOrder";
import { authOptions } from "@/libs/auth";
import { getServerSession } from "next-auth";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  return (
    <>
    <Navbar session={session} />
      <div className="md:px-8 px-4 md:py-10 py-6 bg-gray-100">
        <RiwayatOrder />
      </div>
      <Footer />
    </>
  );
}
