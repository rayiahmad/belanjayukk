import { NextResponse, NextRequest } from "next/server";
import prisma from "../../../libs/prisma";

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const kategoriId = searchParams.get("kategoriId");

  try {
    const categories = await prisma.kategori.findMany({
      include: {
        Products: {
          where: {
            kategoriId: kategoriId || undefined,
          },
        },
      },
    });
    const categoriesWithCount = categories.map((category) => ({
      ...category,
      productCount: category.Products.length,
    }));

    return NextResponse.json(categoriesWithCount, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return NextResponse.json({ message: 'Failed to fetch categories' }, { status: 500 });
  }
};
