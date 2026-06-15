import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Table,
  TableCell,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import prisma from "@/libs/prisma";
import Image from "next/image";
import EditProduct from "@/app/admin/products/EditProduct";
import { formatToRupiah } from "@/libs/utils";
import DeleteProduct from "@/app/admin/products/DeleteProduct";
import { getProduct } from "@/libs/data/dataProducts";
import AddProduct from "@/app/admin/products/AddProduct";
import ViewProduct from "@/app/admin/products/ViewProduct";
import SearchAdmin from "../fragments/SearchAdmin";

export async function TableProducts({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const dataProducts = await getProduct(query, currentPage);

  const kategori = await prisma.kategori.findMany();

  return (
    <Card>
      <CardHeader className="flex md:flex-row flex-col justify-between">
        <div className="flex flex-col gap-2">
          <CardTitle>Products</CardTitle>
          <CardDescription>
            Manage your products and view their sales performance.
          </CardDescription>
        </div>
        <SearchAdmin />
        <AddProduct kategori={kategori} />
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader className="bg-gray-200">
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                Foto
              </TableHead>
              <TableHead>Nama Produk</TableHead>
              <TableHead className="">Harga</TableHead>
              <TableHead className="text-center">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dataProducts.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center py-4 text-gray-500"
                >
                  Belum ada produk
                </TableCell>
              </TableRow>
            ) : (
              dataProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="hidden sm:table-cell">
                    <Image
                      alt="Product image"
                      className="aspect-square rounded-md object-cover"
                      height="64"
                      src={product.image}
                      width="64"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      {formatToRupiah(product.harga)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center">
                      <ViewProduct kategori={kategori} product={product} />
                      <EditProduct product={product} kategori={kategori} />
                      <DeleteProduct product={product} />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
