"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { bannerImages } from "@/libs/data/bannerImage";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export default function SliderBanner() {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="relative w-full">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        onSwiper={(swiper) => {
          if (
            prevRef.current &&
            nextRef.current &&
            typeof swiper.params.navigation !== "boolean"
          ) {
            const nav = swiper.params.navigation as {
              prevEl?: HTMLElement | null;
              nextEl?: HTMLElement | null;
            };
            nav.prevEl = prevRef.current;
            nav.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }
        }}
        pagination={{ clickable: true }}
        className="w-full relative"
      >
        {bannerImages.map((image, index) => (
          <SwiperSlide key={index}>
            {/* ✅ FIX RESPONSIVE CONTAINER */}
            <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] group overflow-hidden rounded-xl">
              {/* IMAGE */}
              <Image
                src={image.imageUrl}
                alt={image.title}
                fill
                priority
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* OVERLAY + BUTTON */}
              <div className="absolute inset-0 flex items-center justify-start px-8 sm:px-4 bg-black/0 group-hover:bg-black/30 transition-all duration-300">
                <Link href="/products">
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg text-sm sm:text-sm">
                    Belanja Sekarang
                  </button>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* NAVIGATION LEFT */}
      <button
        ref={prevRef}
        className="absolute top-1/2 left-2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md z-50"
      >
        <svg
          className="w-4 h-4 text-black"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* NAVIGATION RIGHT */}
      <button
        ref={nextRef}
        className="absolute top-1/2 right-2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md z-50"
      >
        <svg
          className="w-4 h-4 text-black"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}
