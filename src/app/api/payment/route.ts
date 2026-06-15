import { NextRequest, NextResponse } from 'next/server';
const midtransClient = require('midtrans-client');
import { getServerSession } from 'next-auth';
import { authOptions } from '@/libs/auth';
import { nanoid } from 'nanoid'


export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 })
    }

    const { transaction_details, item_details} = await req.json();

    console.log("Received transaction details:", transaction_details);
    console.log("Received item details:", item_details);

    if (!transaction_details || !item_details) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Hitung total harga item
    const totalItemPrice = item_details.reduce(
      (sum: number, item: { price: number; quantity: number }) => sum + item.price * item.quantity,
      0
    );
    // Hitung gross amount akhir
    const finalGrossAmount = totalItemPrice

    const orderId = `BYO-${nanoid(4)}-${nanoid(8)}`;

    // Buat transaksi Midtrans Snap
    const snap = new midtransClient.Snap({
      isProduction: false, // Ubah ke true untuk produksi
      serverKey: process.env.MIDTRANS_SERVER_KEY!,
      clientKey: process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY!,
    });

    // Buat transaksi
    const transaction = await snap.createTransaction({
      transaction_details: {
        order_id: orderId,
        gross_amount: finalGrossAmount,  // Sesuaikan dengan total item price setelah diskon
      },
      item_details,
      customer_details: {
        first_name: session.user.name,
        email: session.user.email,
      },
    });

    return NextResponse.json({ ...transaction, orderId });
  } catch (error) {
    console.error("Midtrans Error:", error);
    return NextResponse.json({ error: "Gagal memproses pembayaran" }, { status: 500 });
  }
}
