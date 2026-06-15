"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useStore } from "@/store";
import { formatToRupiah } from "@/libs/utils";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";
import SekeletonProduct from "@/components/fragments/sekeleton/SekeletonProducts";
import toast from "react-hot-toast";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { TbFilterPlus } from "react-icons/tb";

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

const ProductsList: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    products,
    fetchProducts,
    addToCart,
    setSearchTerm,
    setKategoriName,
    kategoriName,
    categories,
    fetchCategories,
  } = useStore();

  const [loading, setLoading] = useState(true);

  // ✅ FIX: default harus ALL
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const [categoriesLoaded, setCategoriesLoaded] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>("urutkan");
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const searchTerm = searchParams.get("q") || "";
  const [visibleProducts, setVisibleProducts] = useState(8);

  useEffect(() => {
    setSearchTerm(searchTerm);
  }, [searchTerm, setSearchTerm]);

  // 🔥 FIX CORE LOGIC FETCH
  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);

      try {
        await fetchProducts(
          searchTerm,
          selectedCategory === "all" ? "" : selectedCategory,
        );
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, [fetchProducts, searchTerm, selectedCategory]);

  useEffect(() => {
    const loadCategories = async () => {
      if (!categories.length) {
        await fetchCategories();
      }
      setCategoriesLoaded(true);
    };

    loadCategories();
  }, [categories, fetchCategories]);

  const handleProductDetail = (product: Product) => {
    router.push(`/products/${product.id}`);
  };

  const handleAddToKeranjang = (product: Product) => {
    addToCart(product);
    toast.success(`Produk ${product.name} ditambahkan ke keranjang`);
  };

  // 🔥 FIX: ALL PRODUCTS RESET
  const handleViewAllProducts = () => {
    setSelectedCategory("all");
    setKategoriName("");
    setVisibleProducts((prev) => prev + 8);
    router.push("/products");
  };

  // 🔥 FIX CATEGORY LOGIC
  const handleCategoryChange = (value: string) => {
    const newValue = value === "" ? "all" : value;

    setSelectedCategory(newValue);
    setKategoriName(newValue);
    setIsSheetOpen(false);

    if (newValue === "all") {
      router.push(`/products`);
    } else {
      router.push(`/products?kategori=${encodeURIComponent(newValue)}`);
    }
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  const countProducts = products.length;

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "urutkan") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (sortBy === "terbaru") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else if (sortBy === "terlama") {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    } else if (sortBy === "priceLowToHigh") {
      return parseFloat(a.harga) - parseFloat(b.harga);
    } else if (sortBy === "priceHighToLow") {
      return parseFloat(b.harga) - parseFloat(a.harga);
    } else if (sortBy === "nameAtoZ") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "nameZtoA") {
      return b.name.localeCompare(a.name);
    }

    return 0;
  });

  return (
    <div className="md:px-8 md:py-6 py-4 px-0 min-h-screen bg-gray-100">
      <div className="container mx-auto">
        {/* HEADER */}
        <div className="flex flex-col md:justify-start justify-center mb-6">
          <h1 className="md:text-4xl text-xl font-bold text-orange-600 mb-2">
            Produk ({countProducts})
          </h1>
          <p className="text-lg text-gray-700">
            Jelajahi semua produk berkualitas di sini
          </p>

          <div className="mt-6 flex gap-4 justify-between items-center">
            {/* FILTER */}
            <div className="flex items-center">
              <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                <SheetTrigger asChild>
                  <Button className="ml-2 bg-orange-500 text-white">
                    Filter <TbFilterPlus size={18} />
                  </Button>
                </SheetTrigger>

                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Pilih Kategori</SheetTitle>
                  </SheetHeader>

                  <div className="mt-4">
                    {/* ALL CATEGORY */}
                    <SheetClose asChild>
                      <Button
                        onClick={() => handleCategoryChange("all")}
                        className="w-full text-left"
                      >
                        Semua Kategori
                      </Button>
                    </SheetClose>

                    {categoriesLoaded ? (
                      categories.map((category) => (
                        <Button
                          key={category.id}
                          onClick={() => handleCategoryChange(category.name)}
                          className="w-full text-left mt-2"
                        >
                          {category.name}
                        </Button>
                      ))
                    ) : (
                      <p>Loading categories...</p>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* SORT */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => handleSortChange(e.target.value)}
                className="border md:w-full bg-orange-500 text-white w-[120px] rounded-lg p-2"
              >
                <option value="urutkan">Urutkan</option>
                <option value="terbaru">Produk Terbaru</option>
                <option value="terlama">Produk Terlama</option>
                <option value="priceLowToHigh">Harga: Rendah ke Tinggi</option>
                <option value="priceHighToLow">Harga: Tinggi ke Rendah</option>
              </select>
            </div>
          </div>
        </div>

        {/* BODY */}
        {loading ? (
          <SekeletonProduct />
        ) : products.length === 0 ? (
          <div className="text-center text-lg text-red-500 font-semibold">
            Produk Tidak Ditemukan
            {searchTerm && (
              <div className="mt-4">
                <Button
                  onClick={handleViewAllProducts}
                  className="bg-orange-500 text-white"
                >
                  Lihat Semua Produk
                </Button>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
              {sortedProducts
                .slice(0, visibleProducts)
                .map((product: Product) => (
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
                          className="w-[150px] h-[150px] md:w-[300px] md:h-[200px] object-cover mb-4 rounded"
                        />
                      </div>

                      <p className="text-xs md:text-sm text-gray-500">
                        {product.kategori.name}
                      </p>

                      <h2 className="text-xs md:text-lg font-semibold mb-2">
                        {product.name}
                      </h2>
                    </div>

                    <div className="flex justify-between items-center mt-2">
                      <p className="text-sm md:text-base text-orange-600 font-semibold">
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

            {visibleProducts < products.length && (
              <div className="text-center mt-8">
                <Button
                  onClick={handleViewAllProducts}
                  className="bg-orange-500 text-white hover:bg-orange-600"
                >
                  Tampilkan lebih banyak
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductsList;
