"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import toast from "react-hot-toast";
import { formatToRupiah2, formatDateOrder } from "@/libs/utils";

interface OrderItem {
  id: string;
  productId: string;
  quantity: number;
  price: number;
  product: {
    name: string;
    image: string;
  };
}

interface Order {
  id: string;
  total: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  OrderItem: OrderItem[];
}

const RiwayatOrder: React.FC = () => {
  const { data: session } = useSession();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!session?.user.id) return;

      try {
        const response = await axios.get(`/api/order/${session.user.id}`);
        setOrders(response.data);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
        toast.error("Gagal mengambil riwayat order");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [session]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">
        Riwayat Pesanan
      </h1>
      {orders.length === 0 ? (
        <p className="text-center text-lg text-gray-500">
          Tidak ada riwayat pesanan ditemukan.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-lg shadow-md p-6 transition-transform transform hover:scale-105"
            >
              <h2 className="text-sm font-semibold mb-2 text-gray-700">
                Order ID: {order.id}
              </h2>
              <p className="text-sm text-gray-500">
                Status:{" "}
                <span
                  className={`font-medium uppercase ${
                    order.status === "sukses"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {order.status}
                </span>
              </p>
              <p className="text-sm text-gray-500">
                Total:{" "}
                <span className="font-medium text-gray-700">
                  {formatToRupiah2(order.total)}
                </span>
              </p>
              <p className="text-sm text-gray-500">
                Tanggal:{" "}
                <span className="font-medium">
                  {formatDateOrder(order.createdAt)}
                </span>
              </p>
              <h3 className="mt-4 text-md font-semibold text-gray-700">
                Detail Produk:
              </h3>
              <ul className="space-y-3 mt-2">
                {order.OrderItem.map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center bg-gray-50 p-3 rounded-lg shadow-sm"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-14 h-14 object-cover rounded mr-4"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">
                        {item.product.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        {item.quantity} x {formatToRupiah2(item.price)} ={" "}
                        <span className="font-medium text-gray-800">
                          {formatToRupiah2(item.quantity * item.price)}
                        </span>
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RiwayatOrder;
