import Link from "next/link";
import { FaInstagram, FaWhatsapp } from "react-icons/fa6";
import { AiOutlineMail } from "react-icons/ai";
import Image from "next/image";
import bca from "@/assets/icons/icon-bca.33ef4819.svg";
import bri from "@/assets/icons/icon-bri.76a9992c.svg";
import mandiri from "@/assets/icons/icon-mandiri.6df7fc3a.svg";
import qris from "@/assets/icons/icon-qris.8902b6c1.svg";
import gopay from "@/assets/icons/icon-gopay.f60be1f0.svg";
import indomaret from "@/assets/icons/icon-indomaret.54fc8a6a.svg";
import shopeepay from "@/assets/icons/icon-shopeepay.245932aa.svg";

const paymentMethods = [
  { id: 1, name: "Bank BCA", icon: bca },
  { id: 2, name: "Bank BNI", icon: bri },
  { id: 3, name: "Bank Mandiri", icon: mandiri },
  { id: 4, name: "QRIS", icon: qris },
  { id: 5, name: "GoPay", icon: gopay },
  { id: 6, name: "Indomaret", icon: indomaret },
  { id: 7, name: "ShopeePay", icon: shopeepay },
];

const Footer = () => {
  return (
    <>
      <footer className="w-full md:px-8 md:py-10 py-6 px-4 bg-white text-black">
        <div className="container mx-auto">
          <div className="flex lg:flex-row flex-col justify-between gap-5">
            <div className="">
              <div className="">
                <Image
                  src="/icons/icon logo.png"
                  width={100}
                  height={150}
                  alt="Logo"
                  className="lg:w-[70px] lg:h-[70px] w-[60px] h-[60px] p-1 mb-3 bg-white rounded-lg"
                />

                <p className="md:w-[500px] w-full">
                  BelanjaYukk adalah platform e-commerce yang menyediakan
                  berbagai kebutuhan Anda dengan mudah, cepat, dan aman.
                </p>
              </div>
              <div className="flex flex-col mt-4">
                {/* WhatsApp */}
                <Link
                  aria-label="Whatsapp"
                  href="https://wa.me/6281384794070"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none flex items-center"
                >
                  <FaWhatsapp className="text-xl" />
                  <p className="m-0 ml-2">+62 813 8479 4070</p>
                </Link>

                {/* Email */}
                <Link
                  aria-label="Email"
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=belanjayukkstore@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-decoration-none flex items-center mt-1"
                >
                  <AiOutlineMail className="text-xl" />
                  <p className="m-0 ml-2">belanjayukkstore@gmail.com</p>
                </Link>
              </div>
            </div>

            <div className="">
              <div className="flex flex-col gap-2">
                <h5 className="font-bold text-lg mb-2">Metode Pembayaran</h5>
                <div className="grid grid-cols-4 gap-2">
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="">
                      <Image
                        src={method.icon}
                        alt={method.name}
                        width={20}
                        height={20}
                        className="w-14 h-w-14 rounded-lg"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="">
              <h5 className="font-bold mb-3 text-lg">Layanan Pelanggan</h5>
              <div className="flex flex-col gap-5 mt-3 text-2xl">
                {/* Email clickable */}
                <Link
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=belanjayukkstore@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Email"
                >
                  <p className="hover:text-gray-900 hover:underline font-medium text-sm transition duration-200">
                    belanjayukkstore@gmail.com
                  </p>
                </Link>

                {/* Icon WA clickable */}
                <div className="flex gap-4">
                  <Link
                    href="https://wa.me/6281384794070"
                    target="_blank"
                    aria-label="WhatsApp"
                  >
                    <FaWhatsapp className="hover:text-black transition duration-200" />
                  </Link>
                  <Link
                    href="https://www.instagram.com/reydust2/"
                    target="_blank"
                    aria-label="Instagram"
                  >
                    <FaInstagram className="hover:text-black transition duration-200" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="md:px-8 md:py-6 py-4 px-4 border-t border-gray-300 bg-white font-medium">
        <div className="container mx-auto flex md:flex-row md:justify-between flex-col gap-3">
          <div className="flex text-sm justify-start">
            <Link href="/privacy">
              <p className="hover:text-orange-500 font-semibold transition duration-200 ml-5">
                Privacy Policy
              </p>
            </Link>
            <Link href="/terms-conditions">
              <p className="hover:text-orange-500 font-semibold transition duration-200 ml-5">
                Terms & Conditions
              </p>
            </Link>
          </div>
          <p className="text-center lg:text-start text-md">
            &copy; Copyright {new Date().getFullYear()} - BelanjaYukk All right
            reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
