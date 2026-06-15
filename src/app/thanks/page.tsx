import Link from "next/link";
import React from "react";
import { FaCheck } from "react-icons/fa";

const Thanks: React.FC = () => {
  return (
    <div className="container mx-auto">
      <div className="flex flex-col gap-4 justify-center items-center min-h-screen">
        <FaCheck className="text-8xl bg-green-500 text-white p-4 rounded-full" />
        <h3 className="text-4xl font-bold">
          Terima Kasih!
        </h3>
        <p className="text-md text-center md:w-[60%] w-full">Telah melakukan pemesanan di BelanjaYukk. Kami sangat menghargai kepercayaan yang Anda berikan kepada kami. Pesanan Anda sedang kami proses dan akan segera dikirimkan.</p>
        <Link href="/" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-3 md:px-6 py-2 rounded transition-all duration-200">Kembali ke home</Link>
      </div>
    </div>
  );
};

export default Thanks;
