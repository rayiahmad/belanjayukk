import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/auth";

interface OrderItem {
  id: string; // productId
  quantity: number;
  price: number; // Harga dalam format Float
}

interface OrderRequestBody {
  items: OrderItem[];
  total: number;
  discount?: number;
  shippingFee?: number;
  status: string;
  orderId: string; // Tambahkan orderId
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id; // Ambil userId dari sesi
    const { items, total, discount = 0, shippingFee = 0, status, orderId }: OrderRequestBody = await request.json(); // Terima orderId dari request

    console.log("Received order details:", {
      userId,
      items,
      total,
      discount,
      shippingFee,
      status,
      orderId, // Tambahkan orderId di log
    });

    // Validasi productId
    const existingProducts = await prisma.products.findMany({
      where: {
        id: {
          in: items.map((item) => item.id),
        },
      },
    });

    if (existingProducts.length !== items.length) {
      return NextResponse.json({ error: "Some product IDs are invalid." }, { status: 400 });
    }

    // Simpan order ke database
    const newOrder = await prisma.order.create({
      data: {
        id: orderId, // Gunakan orderId yang diterima dari request
        userId,
        total,
        status,
        OrderItem: {
          create: items.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price, // Pastikan price adalah Float
          })),
        },
      },
      include: {
        OrderItem: true,
      },
    });

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    console.error("Error processing order:", error);
    return NextResponse.json({ error: "Failed to process order" }, { status: 500 });
  }
}
