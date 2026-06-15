"use client";

import React, { useState, useEffect } from "react";
import { useStore } from "../../../store";
import { formatToRupiah } from "@/libs/utils";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, ArrowRight } from "lucide-react";
import SekeletonProduct from "@/components/fragments/sekeleton/SekeletonProducts";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Product {
  id: string;
  name: string;
  deskripsi: string;
  harga: string;
  kategoriId: string;
  kategori: {
    id: string;
    name: string;
  };
  image: string;
  createdAt: string;
  updatedAt: string;
}

const ProductsRecomended: React.FC = () => {
  const { products, fetchRecommendedProducts, addToCart } = useStore();
  const [loading, setLoading] = useState(true);
  const [sortedProducts, setSortedProducts] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        await fetchRecommendedProducts();
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [fetchRecommendedProducts]);

  useEffect(() => {
    const sorted = [...products].sort(
      (a, b) =>
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
    setSortedProducts(sorted);
  }, [products]);

  const handleProductDetail = (product: Product) => {
    router.push(`/products/${product.id}`);
  };

  const handleAddToKeranjang = (product: Product) => {
    addToCart(product);
    toast.success(`Produk ${product.name} ditambahkan ke keranjang`);
  };

  return (
    <>
      <div className="md:px-8 md:py-6 py-4 px-0">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <h1 className="md:text-3xl text-2xl font-bold mb-4 text-orange-600">
              Products Recommended
            </h1>
            <Link
              href={"/products"}
              className="text-orange-600 font-medium hover:underline transition-all duration-200 gap-1 items-center md:flex hidden"
            >
              Lihat selengkapnya <ArrowRight size={18} />
            </Link>
          </div>
          {loading ? (
            <SekeletonProduct />
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              {sortedProducts.slice(0, 8).map((product: Product) => (
                <div
                  key={product.id}
                  onClick={() => handleProductDetail(product)}
                  className="shadow-lg cursor-pointer border hover:shadow-2xl duration-300 transition-all rounded-2xl bg-white p-4 flex flex-col justify-between"
                >
                  <div className="flex flex-col">
                    <div className="flex items-center justify-center">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={300}
                        height={200}
                        className="md:w-[300px] md:h-[200px] w-[150px] h-[150px] object-cover mb-4 rounded"
                      />
                    </div>
                    <p className="md:text-sm text-xs text-gray-500">
                      {product.kategori.name}
                    </p>
                    <h2 className="md:text-lg text-sm text-start font-semibold mb-2">
                      {product.name}
                    </h2>
                  </div>
                  <div className="flex flex-wrap gap-2 items-center justify-between mt-2">
                    <p className="md:text-base text-sm text-start text-orange-600 font-semibold">
                      {formatToRupiah(product.harga)}
                    </p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToKeranjang(product);
                      }}
                      className="bg-orange-500 p-2 rounded-full text-white"
                    >
                      <ShoppingCart />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="mt-6 flex justify-center">
            <Link
              href={"/products"}
              className="bg-orange-500 flex items-center gap-2 py-2 px-3 rounded-full text-white hover:bg-orange-600 transition-all duration-200"
            >
              Lihat semua products <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsRecomended;
