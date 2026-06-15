"use client";
import Navbar from "../../components/layouts/Navbar";
import Footer from "../../components/layouts/Footer";
import Link from "next/link";
import "animate.css";

const TermsConditions = () => {
  return (
    <>
      <Navbar session={null} />

      {/* Breadcrumb */}
      <div className="bg-white px-4 md:px-8 pt-6">
        <nav className="text-sm text-zinc-500 mb-4">
          <Link href="/" className="hover:text-orange-500">
            Home
          </Link>{" "}
          / <span>Terms & Conditions</span>
        </nav>
      </div>

      <main className="bg-white min-h-screen text-zinc-900 px-4 md:px-8 py-10">
        <div className="container mx-auto max-w-5xl">
          {/* Judul utama */}
          <h1 className="animate__animated animate__fadeInUp animate__delay-1.5s mb-8 text-4xl md:text-5xl font-bold text-orange-500 border-b-2 border-orange-500 inline-block pb-1">
            Terms & Conditions
          </h1>

          <p className="animate__animated animate__fadeInUp animate__delay-1.8s mb-6 leading-relaxed text-zinc-900">
            Dengan menggunakan website BelanjaYukk, Anda menyetujui semua
            ketentuan yang berlaku di platform ini.
          </p>

          <h2 className="animate__animated animate__fadeInUp animate__delay-2.4s text-2xl font-semibold mt-6 mb-3 text-zinc-900">
            Penggunaan Layanan
          </h2>
          <p className="animate__animated animate__fadeInUp animate__delay-2.7s mb-4 leading-relaxed text-zinc-900">
            Pengguna wajib menggunakan website sesuai hukum yang berlaku dan
            tidak melakukan tindakan yang merugikan pihak lain.
          </p>

          <h2 className="animate__animated animate__fadeInUp animate__delay-3.0s text-2xl font-semibold mt-6 mb-3 text-zinc-900">
            Akun Pengguna
          </h2>
          <p className="animate__animated animate__fadeInUp animate__delay-3.3s mb-4 leading-relaxed text-zinc-900">
            Setiap pengguna bertanggung jawab atas keamanan akun masing-masing
            dan tidak boleh memberikan akses akun kepada pihak lain.
          </p>

          <h2 className="animate__animated animate__fadeInUp animate__delay-3.6s text-2xl font-semibold mt-6 mb-3 text-zinc-900">
            Hak Kekayaan Intelektual
          </h2>
          <p className="animate__animated animate__fadeInUp animate__delay-3.9s mb-4 leading-relaxed text-zinc-900">
            Semua konten, logo, dan materi di website adalah milik BelanjaYukk
            dan dilarang digunakan tanpa izin.
          </p>

          <h2 className="animate__animated animate__fadeInUp animate__delay-4.2s text-2xl font-semibold mt-6 mb-3 text-zinc-900">
            Batasan Tanggung Jawab
          </h2>
          <p className="animate__animated animate__fadeInUp animate__delay-4.5s mb-4 leading-relaxed text-zinc-900">
            BelanjaYukk tidak bertanggung jawab atas kerugian langsung maupun
            tidak langsung akibat penggunaan website.
          </p>

          <h2 className="animate__animated animate__fadeInUp animate__delay-4.8s text-2xl font-semibold mt-6 mb-3 text-zinc-900">
            Perubahan Ketentuan
          </h2>
          <p className="animate__animated animate__fadeInUp animate__delay-5.1s mb-4 leading-relaxed text-zinc-900">
            Kami berhak mengubah ketentuan kapan saja. Setiap perubahan akan
            diumumkan di website.
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default TermsConditions;
