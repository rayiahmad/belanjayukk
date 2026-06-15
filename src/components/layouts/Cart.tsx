"use client";
import React, { useEffect, useState } from "react";
import { useStore } from "../../store";
import { ShoppingCart } from "lucide-react";
import { formatToRupiah } from "@/libs/utils";
import { Button } from "@nextui-org/react";
import { BsCartCheckFill } from "react-icons/bs";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import ilustrasi1 from "@/assets/ilustrasi/Ecommerce campaign-rafiki.svg";
import Image from "next/image";
import Link from "next/link";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/navigation";

type Kategori = {
  id: string;
  name: string;
};

const Cart = ({ kategori }: { kategori: Kategori[] }) => {
  const router = useRouter();
  const {
    cart,
    removeFromCart,
    removeSelectedItemsFromCart,
    incrementQuantity,
    decrementQuantity,
    clearCart,
    selectedItems,
    toggleItemSelection,
    selectAllItems,
    clearSelection,
    fetchCategories,  // Ensure categories are fetched
    categories,       // Access categories from store
  } = useStore();

  const [cartItemCount, setCartItemCount] = useState<number>(0);
  const [selectAll, setSelectAll] = useState<boolean>(false);

  useEffect(() => {
    if (cart.length > 0) {
      setSelectAll(cart.every((item) => selectedItems[item.product.id]));
      setCartItemCount(cart.length);
    } else {
      setSelectAll(false);
      setCartItemCount(0);
    }
  }, [cart, selectedItems]);

  useEffect(() => {
    fetchCategories();  // Fetch categories when the component mounts
  }, []);

  const getKategoriName = (kategoriId: string) => {
    const category = kategori.find((k) => k.id === kategoriId);
    return category ? category.name : "Unknown Category";
  };

  const total = cart.reduce((sum, item) => {
    if (selectedItems[item.product.id]) {
      return sum + parseFloat(item.product.harga) * item.quantity;
    }
    return sum;
  }, 0);

  const handleCheckout = () => {
    const itemIds = Object.keys(selectedItems)
      .filter((id) => selectedItems[id])
      .join(",");
    if (itemIds) {
      router.push(`/checkout`);
    }
  };

  const handleCheckboxChange = (id?: string) => {
    if (id) {
      toggleItemSelection(id);
    } else {
      if (selectAll) {
        clearSelection();
      } else {
        selectAllItems();
      }
      setSelectAll(!selectAll);
    }
  };

  const handleClearCart = () => {
    const selectedProductIds = Object.keys(selectedItems).filter(
      (id) => selectedItems[id]
    );
    if (selectedProductIds.length > 0) {
      removeSelectedItemsFromCart(selectedProductIds);
    } else {
      clearCart();
    }
    setSelectAll(false);
  };

  return (
    <>
      <Sheet>
        <SheetTrigger asChild className="">
          <Button aria-label="Shopping cart" className="bg-transparent text-black relative">
            <ShoppingCart size={25}/>
            <span className="absolute top-0 right-3 bg-orange-500 text-white rounded-lg py-1 px-2 text-xs">
              {cartItemCount}
            </span>
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="flex flex-col md:w-[550px] w-[90%] max-w-lg bg-white p-4"
        >
          <SheetHeader className="mb-4">
            <SheetTitle className="text-lg flex items-center gap-1 font-semibold">
              Keranjang
              <BsCartCheckFill />
            </SheetTitle>
          </SheetHeader>

          <SheetDescription className="flex-grow overflow-y-auto hide-scroll-bar">
            {cart.length === 0 ? (
              <div className="flex items-center justify-center flex-col h-full">
                <Image
                  src={ilustrasi1}
                  alt="ilustrasi"
                  width={200}
                  height={200}
                />
                <p className="text-center text-md font-semibold">
                  Kamu Belum Melakukan Pembelian!!
                </p>
              </div>
            ) : (
              <div>
                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={() => handleCheckboxChange()}
                    className="mr-3 cursor-pointer"
                  />
                  <span className="text-sm font-medium">Semua</span>
                </div>
                <ul>
                  {cart.map((item) => (
                    <div
                      className="border-b border-dashed border-gray-300 py-4 flex items-start space-x-4"
                      key={item.product.id}
                    >
                      <input
                        type="checkbox"
                        checked={selectedItems[item.product.id] || false}
                        onChange={() => handleCheckboxChange(item.product.id)}
                        className="cursor-pointer"
                      />
                      <div className="w-14 h-20 flex-shrink-0">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          width={100}
                          height={100}
                          className="object-contain object-center w-full h-full"
                        />
                      </div>
                      <div className="flex-1">
                        <h6 className="relative font-bold text-sm text-gray-800 pr-8 line-clamp-2 mb-1">
                          {item.product.name}
                          <button
                            className="absolute top-0 right-0"
                            onClick={() => removeFromCart(item.product.id)}
                          >
                            <MdDelete size={20} className="text-red-500" />
                          </button>
                        </h6>
                        <p className="text-xs text-gray-400 mb-2 capitalize">
                          {getKategoriName(item.product.kategoriId)}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">
                            {formatToRupiah(item.product.harga.toString())}
                          </span>
                          <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
                            <button
                              type="button"
                              aria-label="Decrease Item Quantity"
                              className="px-3 py-1.5 leading-normal"
                              onClick={() => decrementQuantity(item.product.id)}
                            >
                              -
                            </button>
                            <span className="text-sm px-3">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              aria-label="Increase Item Quantity"
                              className="px-3 py-1.5 leading-normal"
                              onClick={() => incrementQuantity(item.product.id)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </ul>
              </div>
            )}
          </SheetDescription>

          {cart.length > 0 ? (
            <div className="mt-6 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <span className="text-lg font-bold">
                  Total: {formatToRupiah(total.toString())}
                </span>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded-lg"
                  onClick={handleClearCart}
                >
                  Clear Cart
                </button>
              </div>

              <button
                className={`bg-orange-500 text-white px-4 py-3 rounded ${
                  Object.keys(selectedItems).length === 0
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-orange-600 transition-all duration-200"
                }`}
                onClick={handleCheckout}
                disabled={Object.keys(selectedItems).length === 0}
              >
                Checkout
              </button>
            </div>
          ) : (
            <div className="mt-6">
              <Link
                href="/products"
                className="bg-orange-500 hover:bg-orange-600 transition-all duration-200 text-center text-white px-4 py-3 rounded block"
              >
                Mulai Belanja
              </Link>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Cart;
