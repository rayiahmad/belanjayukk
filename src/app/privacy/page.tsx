"use client";
import Navbar from "../../components/layouts/Navbar";
import Footer from "../../components/layouts/Footer";
import Link from "next/link";
import "animate.css";

const Privacy = () => {
  return (
    <>
      <Navbar session={null} />

      {/* Breadcrumb */}
      <div className="bg-white px-4 md:px-8 pt-6">
        <nav className="text-sm text-zinc-500 mb-4">
          <Link href="/" className="hover:text-orange-500">
            Home
          </Link>{" "}
          / <span>Privacy Policy</span>
        </nav>
      </div>

      <main className="bg-white min-h-screen text-zinc-900 px-4 md:px-8 py-10">
        <div className="container mx-auto max-w-5xl">
          {/* Judul utama */}
          <h1 className="animate__animated animate__fadeInUp animate__delay-1.5s mb-8 text-4xl md:text-5xl font-bold text-orange-500 border-b-2 border-orange-500 inline-block pb-1">
            Privacy Policy
          </h1>

          <p className="animate__animated animate__fadeInUp animate__delay-1.8s mb-6 leading-relaxed text-zinc-900">
            BelanjaYukk menghargai privasi Anda dan berkomitmen untuk melindungi
            data pribadi Anda. Semua informasi pribadi yang dikumpulkan akan
            digunakan untuk keperluan transaksi, layanan pelanggan, dan
            perbaikan layanan sesuai kebijakan kami dan hukum yang berlaku.
          </p>

          <h2 className="animate__animated animate__fadeInUp animate__delay-2.4s text-2xl font-semibold mt-6 mb-3 text-zinc-900">
            Informasi yang Dikumpulkan
          </h2>
          <p className="animate__animated animate__fadeInUp animate__delay-2.7s mb-4 leading-relaxed text-zinc-900">
            Kami mengumpulkan data seperti nama, email, alamat, dan data
            transaksi untuk memastikan pengalaman belanja online yang aman dan
            nyaman.
          </p>

          <h2 className="animate__animated animate__fadeInUp animate__delay-3.0s text-2xl font-semibold mt-6 mb-3 text-zinc-900">
            Penggunaan Data
          </h2>
          <p className="animate__animated animate__fadeInUp animate__delay-3.3s mb-4 leading-relaxed text-zinc-900">
            Informasi yang dikumpulkan digunakan untuk:
          </p>
          <ul className="animate__animated animate__fadeInUp animate__delay-3.6s mb-4 list-disc pl-6 text-zinc-900">
            <li>Memproses pesanan dan mengelola transaksi</li>
            <li>Mengirimkan informasi terkait produk dan layanan</li>
            <li>Meningkatkan pengalaman belanja pelanggan</li>
          </ul>

          <h2 className="animate__animated animate__fadeInUp animate__delay-3.8s text-2xl font-semibold mt-6 mb-3 text-zinc-900">
            Keamanan Data
          </h2>
          <p className="animate__animated animate__fadeInUp animate__delay-4.1s mb-4 leading-relaxed text-zinc-900">
            Kami menjaga keamanan data pengguna menggunakan standar industri
            untuk menghindari akses tidak sah.
          </p>

          <h2 className="animate__animated animate__fadeInUp animate__delay-4.4s text-2xl font-semibold mt-6 mb-3 text-zinc-900">
            Hak Pengguna
          </h2>
          <p className="animate__animated animate__fadeInUp animate__delay-4.7s mb-4 leading-relaxed text-zinc-900">
            Pengguna dapat meminta data pribadi mereka diperbaiki atau dihapus
            sesuai hukum yang berlaku.
          </p>

          <h2 className="animate__animated animate__fadeInUp animate__delay-5.0s text-2xl font-semibold mt-6 mb-3 text-zinc-900">
            Perubahan Kebijakan
          </h2>
          <p className="animate__animated animate__fadeInUp animate__delay-5.3s mb-4 leading-relaxed text-zinc-900">
            Kebijakan ini dapat diperbarui dari waktu ke waktu. Setiap perubahan
            akan diumumkan di website.
          </p>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default Privacy;
