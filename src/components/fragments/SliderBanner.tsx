"use client";

import Image from "next/image";
import Link from "next/link";
import { bannerImages } from "@/libs/data/bannerImage";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export default function SliderBanner() {
  return (
    <div className="relative w-full">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{ clickable: true }}
        className="w-full relative"
      >
        {bannerImages.map((image: any, index: number) => (
          <SwiperSlide key={index}>
            {/* CONTAINER RESPONSIVE */}
            <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] group overflow-hidden rounded-xl">
              {/* IMAGE */}
              <Image
                src={image.imageUrl}
                alt={image.title}
                fill
                priority
                className="
                  object-cover
                  transition-transform duration-700 ease-out
                  group-hover:scale-110
                "
              />

              {/* OVERLAY + CTA */}
              <div className="absolute inset-0 flex items-center justify-start px-8 sm:px-4 bg-black/0 group-hover:bg-black/30 transition-all duration-300">
                <Link href="/products">
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg text-sm">
                    Belanja Sekarang
                  </button>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
