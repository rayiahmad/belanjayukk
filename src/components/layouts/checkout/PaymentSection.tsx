import { formatToRupiah } from "@/libs/utils";

const PaymentSection: React.FC<{
  total: number;
  onPay: () => void;
}> = ({ total, onPay }) => {
  const finalTotal = total;

  return (
    <div className="w-full md:w-[450px] md:h-[300px] p-4 md:p-6 rounded-lg bg-white border border-gray-200 shadow-xl md:sticky md:top-24 flex flex-col justify-between">
      <div>
        {/* <h2 className="text-md font-semibold mb-4">Punya kupon</h2>
        <div className="flex mb-4">
          <input
            type="text"
            value={coupon}
            onChange={onCouponChange}
            className="border rounded-l p-2 md:text-sm text-xs w-[60%] uppercase"
            placeholder="Tambahkan kode kupon"
          />
          <button
            onClick={onApplyCoupon}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-3 md:px-6 py-2 rounded-r"
          >
            Tambahkan
          </button>
        </div>
        {discount > 0 && (
          <p className="text-green-600 text-sm mb-3 font-medium">
            Kupon berhasil ditambahkan!
          </p>
        )} */}
        <div className="mb-4">
          <div className="flex justify-between font-bold text-sm items-center mb-4">
            <p className="">Subtotal:</p>
            <p className="">{formatToRupiah(total.toString())}</p>
          </div>
          <div className="flex justify-between font-bold text-sm items-center mb-4">
            <p className="">Ongkir:</p>
            <p className="">0</p>
          </div>
          <div className="flex justify-between font-bold text-sm items-center mb-4">
            <p className="">Diskon:</p>
            <p className="">0</p>
          </div>
        </div>
        <hr className="border-t-2 py-2" />
        <div className="flex justify-between text-orange-500 font-bold items-center mb-4">
          <p className="text-xl">Total:</p>
          <p className="text-xl">{formatToRupiah(finalTotal.toString())}</p>
        </div>
      </div>
      <button
        onClick={onPay}
        className="w-full bg-orange-500 hover:bg-orange-600 transition duration-200 text-white font-semibold py-3 rounded-lg"
      >
        Bayar Sekarang
      </button>
    </div>
  );
};

export default PaymentSection;
