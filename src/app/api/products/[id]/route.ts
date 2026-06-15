import { NextResponse } from "next/server";
import type { Products } from "@prisma/client";
import prisma from "@/libs/prisma";

export const PATCH = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const body: Products = await req.json();
  const products = await prisma.products.update({
    where: {
      id: params.id,
    },
    data: {
      name: body.name,
      deskripsi: body.deskripsi,
      harga: body.harga,
      image: body.image,
      kategoriId: body.kategoriId,
      updatedAt: new Date(),
    },
  });
  return NextResponse.json(products, {
    status: 200,
  });
};
export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const products = await prisma.products.delete({
    where: {
      id: params.id,
    },
  });
  return NextResponse.json(products, {
    status: 200,
  });
};
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    const product = await prisma.products.findUnique({
      where: {
        id: id,
      },
    });

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
