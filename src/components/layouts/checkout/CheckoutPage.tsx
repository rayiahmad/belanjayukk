"use client";

import React, { useState, useEffect } from "react";
import ProductCheckout from "./ProductCheckout";
import PaymentSection from "./PaymentSection";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useStore } from "../../../store";
import axios from "axios";
import { useSession } from "next-auth/react"; // Import useSession from next-auth
import { nanoid } from "nanoid";

declare global {
  interface Window {
    snap: any;
  }
}

interface MidtransResult {
  order_id: string;
  transaction_status: string;
  gross_amount: string;
}

interface CartItem {
  product: {
    id: string; // productId
    name: string;
    harga: string; // Harga dalam format string
    image: string;
  };
  quantity: number;
}

const loadScript = (src: string, clientKey: string) => {
  return new Promise<HTMLScriptElement>((resolve, reject) => {
    const existingScript = document.querySelector(`script[src="${src}"]`);
    if (existingScript) {
      resolve(existingScript as HTMLScriptElement);
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.setAttribute("data-client-key", clientKey);
    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.body.appendChild(script);
  });
};

const Checkout: React.FC = () => {
  const router = useRouter();
  const { data: session } = useSession(); // Use useSession to get session data
  const {
    cart,
    incrementQuantity,
    decrementQuantity,
    removeItemsFromCart,
    removeFromCart,
    selectedItems,
  } = useStore();

  const [coupon, setCoupon] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY || "";

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const selectedCartItems = cart.filter(
    (item) => selectedItems[item.product.id] && item.quantity > 0
  );

  const total = selectedCartItems.reduce(
    (sum, item) => sum + parseFloat(item.product.harga) * item.quantity,
    0
  );

  // const handleApplyCoupon = () => {
  //   if (coupon === "Bayodev" || coupon === "Merdeka79") {
  //     setDiscount(total * 0.3);
  //     toast.success("Kupon berhasil ditambahkan");
  //   } else {
  //     toast.error("Kupon tidak tersedia");
  //   }
  //   setCoupon("");
  // };

  const handlePayment = async () => {
    try {
      const items = selectedCartItems.map((item) => ({
        id: item.product.id, // Pastikan ini adalah productId yang benar
        name: item.product.name,
        price: parseFloat(item.product.harga),
        quantity: item.quantity,
      }));

      // Validasi jika id tidak ada
      items.forEach((item) => {
        if (!item.id) {
          throw new Error("Product ID is missing");
        }
      });

      const totalItemPrice = selectedCartItems.reduce(
        (sum, item) => sum + parseFloat(item.product.harga) * item.quantity,
        0
      );
      const finalGrossAmount = totalItemPrice;

      // Kirim data ke endpoint pembayaran
      const response = await axios.post("/api/payment", {
        transaction_details: {
          gross_amount: finalGrossAmount,
        },
        item_details: items,
      });

      const { token, orderId } = response.data; // Ambil orderId dari respons

      // Load Midtrans script
      if (!window.snap) {
        await loadScript(
          "https://app.sandbox.midtrans.com/snap/snap.js",
          clientKey
        );
      }

      // Proses pembayaran
      window.snap.pay(token, {
        onSuccess: async (result: MidtransResult) => {
          const userId = session?.user?.id; // Ambil userId dari sesi

          if (!userId) {
            toast.error("User ID tidak ditemukan dalam sesi");
            return;
          }

          // Simpan order history setelah pembayaran berhasil
          try {
            const saveOrderResponse = await axios.post("/api/order", {
              items,
              total: finalGrossAmount,
              userId, // Tambahkan userId ke data order
              status: "sukses",
              orderId,
            });

            console.log("Order saved successfully:", saveOrderResponse.data);

            // Redirect ke halaman terima kasih
            router.push("/thanks");
            toast.success("Pembayaran berhasil");
            removeItemsFromCart(
              selectedCartItems.map((item) => item.product.id)
            );
          } catch (error) {
            console.error("Error saving order", error);
            toast.error("Gagal menyimpan order");
          }
        },
        onPending: (result: MidtransResult) => {
          toast.success("Pembayaran pending. Silakan tunggu konfirmasi.");
        },
        onError: (result: MidtransResult) => {
          toast.error("Terjadi kesalahan saat memproses pembayaran");
        },
        onClose: () => {
          console.log("Payment popup closed");
        },
      });
    } catch (error) {
      console.error("Payment error:", error);
      toast.error("Terjadi kesalahan saat memproses pembayaran");
    }
  };

  return (
    <div className="container mx-auto py-5">
      {isLoading ? (
        <div className="flex justify-center items-center min-h-screen">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="flex flex-col min-h-screen md:flex-row">
          <ProductCheckout
            cartItems={selectedCartItems.map((item) => ({
              product: {
                id: item.product.id,
                name: item.product.name,
                harga: item.product.harga,
                image: item.product.image,
              },
              quantity: item.quantity,
            }))}
            incrementQuantity={incrementQuantity}
            decrementQuantity={decrementQuantity}
            removeFromCart={removeFromCart}
          />
          {selectedCartItems.length > 0 && (
            <PaymentSection total={total} onPay={handlePayment} />
          )}
        </div>
      )}
    </div>
  );
};

export default Checkout;
