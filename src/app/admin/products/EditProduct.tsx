"use client";

import { useState, SyntheticEvent } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  ModalFooter,
} from "@nextui-org/react";
import { SquarePen } from "lucide-react";
import { UploadButton } from "@/libs/uploadthing";
import Image from "next/image";
import toast from "react-hot-toast";
import { Kategori } from "@prisma/client";

type Products = {
  id: string;
  name: string;
  deskripsi: string;
  harga: string;
  image: string;
  kategoriId: string;
};

const EditProduct = ({
  kategori,
  product,
}: {
  kategori: Kategori[];
  product: Products;
}) => {
  const [name, setName] = useState(product.name);
  const [kategoriId, setKategoriId] = useState(product.kategoriId);
  const [deskripsi, setDeskripsi] = useState(product.deskripsi);
  const [harga, setHarga] = useState(product.harga);
  const [image, setImage] = useState(product.image);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const router = useRouter();

  const handleUpdate = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await axios.patch(`/api/products/${product.id}`, {
        name,
        deskripsi,
        harga,
        image,
        kategoriId,
      });
      toast.success("Berhasil mengubah Products🚀");
      router.refresh();
    } catch (error) {
      toast.error("Terjadi kesalahan. Silakan coba lagi.");
      console.error("Error updating product:", error);
    }
  };

  return (
    <>
      <Button onPress={onOpen} className="bg-transparent text-white">
        <SquarePen className="text-sm text-blue-600" />
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="lg"
        className="bg-gray-800"
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-white">
                Edit Product
              </ModalHeader>
              <ModalBody className="px-5">
                <form onSubmit={handleUpdate} className="space-y-4">
                  <div>
                    <label className="block text-white font-bold mb-1">
                      Nama Product
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2 rounded-md border-2 border-gray-300"
                      placeholder="Nama Mobil"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white font-bold mb-1">
                      Kategori
                    </label>
                    <select
                      value={kategoriId}
                      onChange={(e) => setKategoriId(e.target.value)}
                      className="w-full px-4 py-2 rounded-md border-2 border-gray-300"
                      required
                    >
                      <option className="font-medium" value="" disabled>
                        Pilih Kategori
                      </option>
                      {kategori.map((kat) => (
                        <option key={kat.id} value={kat.id}>
                          {kat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-white font-bold mb-1">
                      Harga
                    </label>
                    <input
                      type="number"
                      value={harga}
                      onChange={(e) => setHarga(e.target.value)}
                      className="w-full px-4 py-2 rounded-md border-2 border-gray-300"
                      placeholder="Harga"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white font-bold mb-1">
                      Deskripsi
                    </label>
                    <textarea
                      value={deskripsi}
                      onChange={(e) => setDeskripsi(e.target.value)}
                      className="w-full h-24 px-4 py-2 rounded-md border-2 border-gray-300"
                      placeholder="Deskripsi"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-white font-bold mt-3">
                      Upload Product
                    </label>
                    <div>
                      <UploadButton
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                          setImage(res[0].url);
                          toast.success("Upload Berhasil");
                        }}
                        onUploadError={(error: Error) => {
                          alert(`ERROR! ${error.message}`);
                        }}
                      />
                      <p className="text-center text-white text-[10px]">
                        jpg, png, jpeg
                      </p>
                    </div>

                    {image.length ? (
                      <div className="mt-8">
                        <Image
                          src={image}
                          alt="myimage"
                          width={200}
                          height={200}
                          className="rounded-md"
                        />
                      </div>
                    ) : null}
                  </div>
                  <ModalFooter className="flex justify-between mb-4">
                    <Button color="danger" onPress={onClose}>
                      Batal
                    </Button>
                    <Button color="primary" type="submit" onPress={onClose}>
                      Simpan
                    </Button>
                  </ModalFooter>
                </form>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditProduct;
