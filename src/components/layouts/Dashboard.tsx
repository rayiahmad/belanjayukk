import { GoProject } from "react-icons/go";
import prisma from "@/libs/prisma";
import Link from "next/link";
import { FaMoneyCheckAlt, FaUser } from "react-icons/fa";
import { AiFillProduct } from "react-icons/ai";
import { formatToRupiah2 } from "@/libs/utils";
import DonutChart from "../fragments/DonutChart"; // Client component for donut chart

interface SalesPerCategory {
  kategoriName: string;
  totalSales: number;
}

const Dashboard = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time to start of the day

  const products = await prisma.products.findMany();
  const users = await prisma.user.findMany();
  const orders = await prisma.order.findMany({
    include: {
      OrderItem: {
        select: {
          price: true,
          quantity: true,
          product: {
            select: {
              kategoriId: true, // Fetch the category ID for each product
            },
          },
        },
      },
    },
  });
  const kategori = await prisma.kategori.findMany(); // Fetch all categories

  const productsCount = products.length;
  const usersCount = users.length;
  const ordersCount = orders.length;

  // Calculate total sales
  const totalSales = orders.reduce((acc, order) => {
    const orderTotal = order.OrderItem.reduce(
      (itemAcc, item) => itemAcc + item.price * item.quantity,
      0
    );
    return acc + orderTotal;
  }, 0);

 // Filter orders created today
 const todayOrders = await prisma.order.findMany({
  where: {
    createdAt: {
      gte: today, // Greater than or equal to today
    },
  },
  include: {
    OrderItem: {
      select: {
        price: true,
        quantity: true,
      },
    },
  },
});

// Calculate sales for today
const todaySales = todayOrders.reduce((acc, order) => {
  const orderTotal = order.OrderItem.reduce(
    (itemAcc, item) => itemAcc + item.price * item.quantity,
    0
  );
  return acc + orderTotal;
}, 0);

// Calculate total products ordered today
const totalProductsOrderedToday = todayOrders.reduce((acc, order) => {
  const itemsCount = order.OrderItem.reduce((itemAcc, item) => itemAcc + item.quantity, 0);
  return acc + itemsCount;
}, 0);
  // Calculate sales per category
  const salesPerCategory: SalesPerCategory[] = kategori.map((cat) => {
    const categorySales = orders.reduce((acc, order) => {
      const categoryTotal = order.OrderItem.reduce((itemAcc, item) => {
        if (item.product.kategoriId === cat.id) {
          return itemAcc + item.price * item.quantity;
        }
        return itemAcc;
      }, 0);
      return acc + categoryTotal;
    }, 0);
    return { kategoriName: cat.name, totalSales: categorySales };
  });

  // Sort categories by total sales in descending order
  salesPerCategory.sort((a, b) => b.totalSales - a.totalSales);

  // Data for the donut chart
  const chartData = {
    labels: salesPerCategory.map((cat) => cat.kategoriName), // Category names
    datasets: [
      {
        data: salesPerCategory.map((cat) => cat.totalSales), // Sales amounts
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  };

  return (
    <>
      <div className="w-full">
        <h1 className="text-2xl font-semibold text-black">Dashboard</h1>
      </div>
      <div className="w-full my-3">
        <div className="flex md:flex-row flex-col justify-center gap-2">
          <Link
            href={"/admin/products"}
            className="w-full sm:w-1/2 lg:w-1/4 h-40 p-5 bg-white shadow-lg rounded-lg border border-slate-200 relative overflow-hidden transition-all hover:shadow-xl"
          >
            <div className="mt-6">
              <div className="absolute right-2 top-3 z-20 flex justify-end items-center text-7xl text-orange-500 rounded-full">
                <AiFillProduct />
              </div>
              <div className="leading-4">
                <div className="text-4xl font-semibold">{productsCount}</div>
                <div className="text-sm font-medium text-slate-500">
                  Products
                </div>
              </div>
            </div>
          </Link>
          <Link
            href={"/admin/order"}
            className="w-full sm:w-1/2 lg:w-1/4 h-40 p-5 bg-white shadow-lg rounded-lg border border-slate-200 relative overflow-hidden transition-all hover:shadow-xl"
          >
            <div className="mt-6">
              <div className="absolute right-2 top-3 z-20 flex justify-end items-center text-7xl text-orange-500 rounded-full">
                <GoProject />
              </div>
              <div className="leading-4">
                <div className="text-4xl font-semibold">{ordersCount}</div>
                <p className="text-sm font-medium text-slate-500">
                  Total Orders
                </p>
              </div>
            </div>
          </Link>
          <Link
            href={"/admin/customers"}
            className="w-full sm:w-1/2 lg:w-1/4 h-40 p-5 bg-white shadow-lg rounded-lg border border-slate-200 relative overflow-hidden transition-all hover:shadow-xl"
          >
            <div className="mt-6">
              <div className="absolute right-2 top-3 z-20 flex justify-end items-center text-7xl text-orange-500 rounded-full">
                <FaUser />
              </div>
              <div className="leading-4">
                <div className="text-4xl font-semibold">{usersCount}</div>
                <p className="text-sm font-medium text-slate-500">
                  Total Customers
                </p>
              </div>
            </div>
          </Link>
          <div
            className="w-full sm:w-1/2 lg:w-1/4 h-40 p-5 bg-white shadow-lg rounded-lg border border-slate-200 flex flex-col justify-end transition-all hover:shadow-xl"
          >
            <div className="mt-6 r">
              <div className=" text-7xl text-orange-500 rounded-full">
                <FaMoneyCheckAlt />
              </div>
              <div className="leading-4">
                <p className="text-lg font-semibold">
                  {formatToRupiah2(totalSales)}
                </p>
                <p className="text-sm font-medium text-slate-500">
                  Total Sales
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Donut chart section */}
      <div className="w-full mt-6 flex flex-wrap gap-5 md:justify-start justify-center">
        {/* Pass the data to the client component */}
        <DonutChart chartData={chartData} />
        <div className="w-full sm:w-1/2 lg:w-1/4 h-[150px] p-5 bg-white shadow-lg rounded-lg border border-slate-200 flex flex-col justify-start items-start transition-all hover:shadow-xl">
          <div className="leading-4 flex flex-col gap-2 w-full">
            <p className="text-sm font-medium text-slate-500">Today's Sales</p>
            <p className="text-3xl font-semibold">{totalProductsOrderedToday}</p>
            <hr className="broder border-slate-400 w-full" />
            <p className="text-lg font-semibold">
              {formatToRupiah2(todaySales)}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
