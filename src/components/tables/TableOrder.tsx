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
import { formatToRupiah2, formatDateTable } from "@/libs/utils";
import Image from "next/image";
import { FaCheck } from "react-icons/fa6";

export async function TableOrder() {
  const orders = await prisma.order.findMany({
    include: {
      OrderItem: {
        select: {
          price: true,
          quantity: true,
          product: {
            select: {
              name: true,
              image: true,
            },
          },
        },
      },
      user: {
        // Include user details if needed
        select: {
          name: true, // Assuming there is a 'name' field in User
          image: true, // Assuming there is an 'image' field in User
        },
      },
    },
    orderBy: {
      createdAt: "desc", // Urutkan berdasarkan createdAt secara menurun
    },
  });

  return (
    <Card>
      <CardHeader className="flex md:flex-row flex-col justify-between">
        <div className="flex flex-col gap-2">
          <CardTitle>Orders</CardTitle>
          <CardDescription>Manage your Orders Product.</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader className="bg-gray-200">
            <TableRow>
              <TableHead className="hidden sm:table-cell">Order_id</TableHead>
              <TableHead className="">Nama</TableHead>
              <TableHead>Produk</TableHead>
              <TableHead className="">total</TableHead>
              <TableHead className="">Status</TableHead>
              <TableHead className="text-center">Tanggal</TableHead>
              <TableHead className="text-center">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="text-xs">
            {orders.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="text-center py-4 text-gray-500"
                >
                  Belum ada Orderan
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order) => (
                <TableRow key={order.id} className="">
                  <TableCell className="font-medium hidden sm:table-cell">
                    {order.id}
                  </TableCell>
                  <TableCell className="font-medium mr-2 flex items-center gap-2">
                    {order.user.image ? (
                      <Image
                        src={order.user.image ? order.user.image : ""}
                        alt={order.user.name ? order.user.name : ""}
                        width={30}
                        height={30}
                        className="rounded-full"
                      />
                    ) : null }
                    {order.user.name}
                  </TableCell>
                  <TableCell className="font-medium">
                    <ul className="list-disc">
                      {order.OrderItem.map((item, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <Image
                            src={item.product.image}
                            alt={item.product.name}
                            width={30}
                            height={30}
                          />{" "}
                          <span className="">({item.quantity} pcs)</span>
                        </li>
                      ))}
                    </ul>
                  </TableCell>
                  <TableCell className="font-medium ">
                    {formatToRupiah2(order.total)}
                  </TableCell>
                  <TableCell className="font-medium">
                    {order.status === "sukses" && (
                      <p className="px-2 py-1 flex items-center gap-1 text-xs rounded-lg text-green-600 font-semibold">
                        <FaCheck /> Paid
                      </p>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {formatDateTable(order.createdAt)}
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
