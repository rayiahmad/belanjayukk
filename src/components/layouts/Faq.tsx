import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
  
  const faq = [
    {
      id: 1,
      title: "Bagaimana cara melakukan pemesanan di BelanjaYukk?",
      desc: "Untuk melakukan pemesanan, pilih produk yang Anda inginkan, tambahkan ke keranjang, dan ikuti instruksi di halaman checkout.",
    },
    {
      id: 2,
      title: "Bagaimana cara melihat produk yang tersedia?",
      desc: "Anda dapat melihat semua produk yang tersedia dengan menjelajahi kategori di halaman utama atau menggunakan fitur pencarian.",
    },
    {
      id: 3,
      title: "Bagaimana cara melihat riwayat pembelian saya?",
      desc: "Untuk melihat riwayat pembelian Anda, masuk ke akun Anda dan pilih menu 'Riwayat Pembelian' di dashboard.",
    },
    {
      id: 4,
      title: "Bagaimana cara membatalkan pesanan?",
      desc: "Untuk membatalkan pesanan, buka riwayat pembelian Anda, pilih pesanan yang ingin dibatalkan, dan klik 'Batalkan Pesanan'.",
    },
  ];
  
  
  
  const Faq = () => {
    return (
      <div className="py-10 px-4 max-w-5xl mx-auto">
        <h1 className="lg:text-4xl md:text-3xl text-2xl text-black text-center font-bold mb-10">
          Pertanyaan Yang Sering Ditanyakan
        </h1>
        <div className="">
          <Accordion type="single" collapsible className="">
            {faq.map((data) => (
              <AccordionItem
                className="bg-white shadow-lg rounded-lg overflow-hidden mb-4 transition-all duration-200"
                value={`item-${data.id}`}
                key={data.id}
              >
                <AccordionTrigger className="lg:text-lg text-base font-medium p-4 bg-gray-200 hover:bg-gray-300 transition-colors">
                  {data.title}
                </AccordionTrigger>
                <AccordionContent className="p-4 bg-gray-50">
                  <p className="font-medium">{data.desc}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    );
  };
  
  export default Faq;
  