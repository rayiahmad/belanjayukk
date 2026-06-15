"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useStore } from "@/store";
import { formatToRupiah } from "@/libs/utils";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import toast from "react-hot-toast";
import axios from "axios";
import SekeletonDetailProduct from "@/components/fragments/sekeleton/SekeletonDetailProduct";
import { IoIosShareAlt } from "react-icons/io";

interface Product {
  id: string;
  name: string;
  deskripsi: string;
  harga: string;
  kategoriId: string;
  kategori: { id: string; name: string };
  image: string;
  createdAt: string;
  updatedAt: string;
}
type Kategori = {
  id: string;
  name: string;
};

const DetailProduct = ({ kategori }: { kategori: Kategori[] }) => {
  const { id } = useParams();
  const { addToCart } = useStore();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"deskripsi" | "reviews">(
    "deskripsi"
  );

  const getKategoriName = (kategoriId: string) => {
    const category = kategori.find((k) => k.id === kategoriId);
    return category ? category.name : "Unknown Category";
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${id}`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Failed to fetch product.");
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleShare = async () => {
    if (!navigator.share || !product) {
      toast.error("Web Share API is not supported in this browser.");
      return;
    }

    try {
      const shareData = {
        title: product.name,
        text: `Temukan: ${product.name}`,
        url: window.location.href,
        // files: [
        //   new File([await fetch(product.image).then((res) => res.blob())], "product.jpg", {
        //     type: "image/jpeg",
        //   }),
        // ],
      };

      await navigator.share(shareData);
      toast.success("Link shared successfully!");
    } catch (error) {
      console.error("Error sharing link:", error);
    }
  };

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
      toast.success("Produk ditambahkan ke keranjang");
    }
  };

  if (!product) return <SekeletonDetailProduct />;

  return (
    <div className="container mx-auto p-4 md:p-8">
      <div className="flex flex-col md:flex-row items-start space-y-4 md:space-y-0 md:space-x-6">
        <div className="flex-shrink-0">
          <Image
            src={product.image}
            alt={product.name}
            width={400}
            height={400}
            className="object-cover rounded-lg shadow-lg"
          />
        </div>
        <div className="flex-grow">
          <h1 className="md:text-3xl text-xl font-bold text-gray-900 mb-2">
            {product.name}
          </h1>
          <p className="md:text-md text-base text-gray-600 mb-4">
            Kategori: {getKategoriName(product.kategoriId)}
          </p>
          <p className="text-xl font-semibold text-orange-500 mb-4">
            {formatToRupiah(product.harga)}
          </p>
          <div className="md:flex hidden items-center mb-4">
            <p className="md:text-lg text-base font-semibold text-gray-800 mr-2">
              Jumlah
            </p>
            <button
              onClick={() => setQuantity(Math.max(quantity - 1, 1))}
              className="md:px-4 md:py-2 p-2 bg-gray-200 border border-gray-300 rounded-lg hover:bg-gray-300 transition-colors duration-200"
            >
              -
            </button>
            <span className="mx-4 text-lg">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="md:px-4 md:py-2 px-2 py-1 bg-gray-200 border border-gray-300 rounded-lg hover:bg-gray-300 transition-colors duration-200"
            >
              +
            </button>
          </div>
          <div className="flex-wrap gap-3 items-center md:flex hidden">
            <Button
              onClick={handleAddToCart}
              className="bg-orange-500 md:text-[15px] text-xs text-white hover:bg-orange-600 transition-colors duration-300"
            >
              Tambahkan ke keranjang
            </Button>
            <Button
              onClick={handleShare}
              className="bg-blue-500 text-xs  text-white hover:bg-blue-700 transition-colors duration-300"
            >
              <IoIosShareAlt size={20} /> Bagikan
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="my-8">
        <div className="flex space-x-4 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("deskripsi")}
            className={`py-2 px-4 text-lg font-medium ${
              activeTab === "deskripsi"
                ? "border-b-2 border-orange-500 text-orange-500"
                : "text-gray-600"
            }`}
          >
            Deskripsi
          </button>
          <button
            onClick={() => setActiveTab("reviews")}
            className={`py-2 px-4 text-lg font-medium ${
              activeTab === "reviews"
                ? "border-b-2 border-orange-500 text-orange-500"
                : "text-gray-600"
            }`}
          >
            Reviews
          </button>
        </div>
        <div className="mt-4">
          {activeTab === "deskripsi" && (
            <div className="text-gray-700 lg:w-1/2 w-full">
              <h2 className="text-xl font-semibold mb-2">Deskripsi Produk</h2>
              <p className="text-base description-text">{product.deskripsi}</p>
            </div>
          )}
          {activeTab === "reviews" && (
            <div className="text-gray-700">
              <h2 className="text-xl font-semibold mb-2">Produk Reviews</h2>
              <p>Belum ada ulasan. Jadilah yang pertama mengulas produk ini!</p>
            </div>
          )}
        </div>
      </div>
      {/* Mobile Quantity and Add to Cart */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 md:hidden flex justify-between items-center">
        <div className="flex items-center">
          <button
            onClick={handleShare}
            className="bg-blue-500 rounded-lg text-xs p-2 mr-2 text-white hover:bg-blue-600 transition-colors duration-300"
          >
            <IoIosShareAlt size={20} />
          </button>
          <div className="border-2 rounded-lg flex items-center border-gray-200">
            <button
              onClick={() => setQuantity(Math.max(quantity - 1, 1))}
              className="px-4 py-2 transition-colors duration-200"
            >
              -
            </button>
            <span className="mx-2 text-lg">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-4 py-2 transition-colors duration-200"
            >
              +
            </button>
          </div>
        </div>
        <Button
          onClick={handleAddToCart}
          className="bg-orange-500 ml-2 px-4 text-xs text-white hover:bg-orange-600 transition-colors duration-300"
        >
          Tambahkan ke keranjang
        </Button>
      </div>
    </div>
  );
};

export default DetailProduct;
