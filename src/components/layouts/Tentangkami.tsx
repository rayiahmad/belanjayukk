import Image from "next/image";
import ilustrasi from "../../assets/ilustrasi/Ecommerce.svg";
import Link from "next/link";

const TentangKami = () => {
  return (
    <>
      {/* Breadcrumb */}
      <div className="flex flex-col lg:flex-row gap-5 px-4 md:px-8 pt-6">
        <nav className="text-sm text-zinc-500 mb-4">
          <Link href="/" className="hover:text-orange-500">
            Home
          </Link>{" "}
          / <span>Tentang Kami</span>
        </nav>
      </div>

      <section className="flex flex-col lg:flex-row gap-5 md:px-8 md:py-14 py-4 px-4 items-center justify-between container mx-auto">
        <div className="w-full">
          {/* Judul highlight */}
          <h1 className="animate__animated animate__fadeInUp animate__delay-1.5s mb-4 text-3xl md:text-4xl lg:text-4xl font-bold text-orange-500 border-b-2 border-orange-500 inline-block pb-1">
            Tentang Kami
          </h1>

          <p className="animate__animated animate__fadeInUp animate__delay-1.5s pb-5 text-md pt-2 text-zinc-900">
            <span className="text-orange-500 font-medium">BelanjaYukk </span>
            adalah platform e-commerce yang memudahkan Anda menemukan segala
            jenis pakaian dengan cepat dan nyaman. Mulai dari pakaian kasual,
            formal, hingga koleksi terbaru yang sedang tren, kami hadir untuk
            memenuhi semua kebutuhan fashion Anda. Dengan produk berkualitas dan
            harga terjangkau, BelanjaYukk memastikan transaksi Anda aman dan
            pengiriman selalu tepat waktu – membuat pengalaman belanja online
            jadi praktis, aman, dan menyenangkan.
          </p>

          <p className="animate__animated animate__fadeInUp animate__delay-1.5s pb-5 text-md pt-2 text-zinc-900">
            Di BelanjaYukk, kepuasan pelanggan adalah prioritas utama, dan kami
            juga terus berinovasi menghadirkan layanan yang lebih cepat, nyaman,
            dan fleksibel, agar setiap perjalanan belanja Anda terasa lebih seru
            dan menyenangkan. Jelajahi koleksi kami, temukan gaya Anda, dan
            rasakan pengalaman belanja pakaian terbaik bersama BelanjaYukk!!
          </p>

          <p className="animate__animated animate__fadeInUp animate__delay-1.5s pb-5 text-md pt-2 text-zinc-900 font-bold text-lg">
            <span className="text-zinc-900"> IN </span>
            <span className="text-orange-500">BELANJAYUKK</span>,
            <span className="text-zinc-900"> WE </span>
            <span className="text-orange-500">BUILT</span>
            <span className="text-zinc-900"> YOUR </span>
            <span className="text-orange-500">LOOK</span>
            <span className="text-zinc-900"> SO SMOOTH</span>
          </p>
        </div>

        <div className="w-full rounded-lg animate__animated animate__fadeInUp">
          <Image
            className="mx-auto"
            src={ilustrasi}
            width={500}
            height={500}
            alt="hero"
          />
        </div>
      </section>
    </>
  );
};

export default TentangKami;
