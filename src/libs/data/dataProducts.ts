import prisma from "@/libs/prisma";

const ITEMS_PER_PAGE = 5;

export const getProduct = async (
  query: string,
  currentPage: number,
  kategoriId?: string
) => {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    const products = await prisma.products.findMany({
      skip: offset,
      take: ITEMS_PER_PAGE,
      where: {
        OR: [
          { name: { contains: query } },
          { deskripsi: { contains: query } },
          { image: { contains: query } },
          { harga: { contains: query } },
        ],
        AND: kategoriId !== undefined ? { kategoriId } : {},
      },
      include: { kategori: true },
      orderBy: {
        createdAt: "desc", // Urutkan berdasarkan createdAt secara menurun
      },
    });
    return products.map((product) => ({
      ...product,
      kategori: product.kategori.name, // Change kategori from ID to name
    }));
  } catch (error) {
    throw new Error("gagal fetch data produk");
  }
};

export const getProductById = async (id: string) => {
  try {
    const product = await prisma.products.findUnique({
      where: { id },
      include: { kategori: true },
    });
    if (!product) return null;
    return {
      ...product,
      kategori: product.kategori.name,
    };
  } catch (error) {
    throw new Error("gagal fetch data produk");
  }
};

export const getProductPages = async (query: string, kategoriId?: string) => {
  try {
    const productsCount = await prisma.products.count({
      where: {
        OR: [
          { name: { contains: query, } },
          { deskripsi: { contains: query, } },
          { image: { contains: query, } },
          { harga: { contains: query, } },
        ],
        AND: kategoriId !== undefined ? { kategoriId } : {},
      },
    });
    const totalPages = Math.ceil(productsCount / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    throw new Error("gagal fetch data produk");
  }
};
