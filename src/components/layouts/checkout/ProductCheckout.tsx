import Image from "next/image";
import React from "react";
import { MdDelete } from "react-icons/md";
import { formatToRupiah } from "@/libs/utils";

interface CartItem {
  product: {
    id: string; // productId
    name: string;
    harga: string; // Harga dalam format string
    image: string;
  };
  quantity: number;
}

interface ProductCheckoutProps {
  cartItems: CartItem[];
  incrementQuantity: (productId: string) => void;
  decrementQuantity: (productId: string) => void;
  removeFromCart: (productId: string) => void;
}

const ProductCheckout: React.FC<ProductCheckoutProps> = ({
  cartItems,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
}) => {
  return (
    <div className="flex-1 md:p-4 p-2 overflow-y-auto">
      <h1 className="text-3xl font-bold mb-4">Checkout</h1>
      {cartItems.length === 0 ? (
        <p className="text-center text-lg">Tidak ada produk untuk dicheckout.</p>
      ) : (
        <div className="bg-white shadow-lg border border-gray-300 rounded-xl p-4 w-full">
          <h2 className="text-xl font-bold mb-2">Orderan Kamu</h2>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.product.id} className="flex items-center border-b-2 py-4">
                <div className="flex items-center space-x-4">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    width={100}
                    height={100}
                    className="w-[100px] h-[100px] object-cover rounded mr-4"
                  />
                  <div className="flex flex-col gap-2">
                    <h3 className="md:text-lg text-md font-semibold">
                      {item.product.name}
                    </h3>
                    <p className="text-sm font-medium text-gray-600">
                      {formatToRupiah(item.product.harga)}
                    </p>
                    <div className="flex items-center space-x-5">
                      <div className="flex items-center space-x-4">
                        <button
                          onClick={() => decrementQuantity(item.product.id)} // Menggunakan item.product.id
                          className="px-2 py-1 bg-gray-200 text-gray-800 rounded"
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => incrementQuantity(item.product.id)} // Menggunakan item.product.id
                          className="px-2 py-1 bg-gray-200 text-gray-800 rounded"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)} // Menggunakan item.product.id
                        className="px-2 py-1 bg-red-500 text-white rounded"
                      >
                        <MdDelete size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCheckout;
