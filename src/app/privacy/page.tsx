import Navbar from "../../components/layouts/Navbar";
import Footer from "../../components/layouts/Footer";

export default function Privacy() {
  return (
    <>
      <Navbar session={null} />

      <main className="min-h-screen bg-white flex items-center justify-center">
        <h1 className="text-xl font-semibold text-gray-500">Privacy Page</h1>
      </main>

      <Footer />
    </>
  );
}
