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
import { formatToRupiah2 } from "@/libs/utils";

export async function TableCustomer() {
  const users = await prisma.user.findMany({
    select: {
      name: true,
      email: true,
      image: true,
      id: true,
      isAdmin: true,
    },
  });

  return (
    <Card>
      <CardHeader className="flex md:flex-row flex-col justify-between">
        <div className="flex flex-col gap-2">
          <CardTitle>Orders</CardTitle>
          <CardDescription>
            Manage your products and view their sales performance.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader className="bg-gray-200">
            <TableRow>
              <TableHead className="hidden sm:table-cell">Nama</TableHead>
              <TableHead>Email</TableHead>
              <TableHead className="">Role</TableHead>
              <TableHead className="text-center">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} className="">
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell className="font-medium">{user.email}</TableCell>
                <TableCell>
                  <div
                    className={`font-medium text-center px-2 py-1 rounded-lg text-white ${
                      user.isAdmin ? "bg-yellow-500" : "bg-green-500"
                    }`}
                  >
                    {user.isAdmin ? "Admin" : "User"}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
