"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Image from "next/image";
import kategori1 from "@/assets/icons/hp.png";
import kategori2 from "@/assets/icons/elektronik.png";
import kategori3 from "@/assets/icons/komputer.png";
import kategori4 from "@/assets/icons/fashion.png";
import SkeletonKategori from "../fragments/sekeleton/SekeletonKategori";
import { useStore } from "@/store";

interface Product {
  id: string;
  name: string;
  image: string;
  kategoriId: string;
}

interface Kategori {
  id: string;
  name: string;
  products: Product[];
  productCount: number;
}

const iconMap: { [key: string]: any } = {
  "Handphone & Aksesoris": kategori1,
  Elektronik: kategori2,
  "Komputer & Aksesoris": kategori3,
  Fashion: kategori4,
};

const Kategori: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [categories, setCategories] = useState<Kategori[]>([]);
  const router = useRouter();
  const { setKategoriName } = useStore((state) => ({
    setKategoriName: state.setKategoriName,
  }));

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get<Kategori[]>("/api/kategori");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (name: string) => {
    setKategoriName(name);
    router.push(`/products?kategori=${encodeURIComponent(name)}`);
  };

  return (
    <div className="md:px-8 md:py-6 py-4 px-0">
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <h1 className="md:text-3xl text-2xl font-bold mb-4 text-orange-600">
            Kategori
          </h1>
        </div>
        {loading ? (
          <SkeletonKategori />
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.length === 0 ? (
              <div>No categories found</div>
            ) : (
              categories.map((category) => {
                const categoryIcon = iconMap[category.name]; // Ambil gambar dari iconMap

                return (
                  <div
                    key={category.id}
                    className="border flex flex-col justify-center items-center rounded-lg p-5 shadow-md hover:shadow-xl transition-all duration-200 bg-white hover:bg-orange-400 cursor-pointer"
                    onClick={() => handleCategoryClick(category.name)}
                  >
                    {categoryIcon && ( // Hanya tampilkan jika ada gambar
                      <div className="mb-2 flex md:justify-start justify-center">
                        <Image
                          src={categoryIcon}
                          alt={category.name}
                          width={70}
                          height={70}
                          className="md:w-[70px] md:h-[70px] w-[40px] h-[40px]"
                        />
                      </div>
                    )}
                    <div className="flex flex-col md:items-start items-center">
                      <h2 className="md:text-lg text-sm text-center font-semibold mt-2">
                        {category.name}
                      </h2>
                      <p className="text-gray-500 text-sm">
                        {category.productCount} Products
                      </p>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Kategori;
