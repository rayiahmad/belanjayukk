import { NextResponse, NextRequest } from "next/server";
import type { Products } from "@prisma/client";
import prisma from "../../../libs/prisma";

export const POST = async (req: NextRequest) => {
  try {
    const body: Products = await req.json();
    const products = await prisma.products.create({
      data: {
        name: body.name,
        deskripsi: body.deskripsi,
        harga: body.harga,
        image: body.image,
        kategoriId: body.kategoriId,
      },
    });
    return NextResponse.json(products, { status: 201 });
  } catch (error) {
    console.error("Error creating products:", error);
    return NextResponse.json(
      { error: "Failed to create products" },
      { status: 500 },
    );
  }
};

export const GET = async (req: NextRequest) => {
  try {
    const url = new URL(req.url);
    const search = url.searchParams.get("search") || "";
    const kategoriName = url.searchParams.get("kategori") || "";

    const whereCondition: any = {
      name: {
        contains: search,
      },
    };

    if (kategoriName) {
      whereCondition.kategori = {
        name: kategoriName,
      };
    }

    const products = await prisma.products.findMany({
      where: whereCondition,
      include: {
        kategori: true,
      },
    });

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 },
    );
  }
};
