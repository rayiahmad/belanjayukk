"use client";

import React, { useState, SyntheticEvent } from "react";
import axios from "axios";
import { Kategori } from "@prisma/client";
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
import { UploadButton } from "@/libs/uploadthing";
import Image from "next/image";
import { FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";

const AddProduct = ({ kategori }: { kategori: Kategori[] }) => {
  const [name, setName] = useState("");
  const [kategoriId, setKategoriId] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [harga, setHarga] = useState("");
  const [image, setImage] = useState("");
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const router = useRouter();

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (!image) {
      alert("Anda harus mengunggah Foto Mobil.");
      return;
    }

    try {
      await axios.post("/api/products", {
        name,
        deskripsi,
        harga,
        image,
        kategoriId,
      });

      setName("");
      setDeskripsi("");
      setHarga("");
      setImage("");
      setKategoriId("");

      toast.success("Berhasil menambahkan Products🚀");
      router.refresh();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Input tidak boleh kosong.");
    }
  };

  return (
    <>
      <Button onPress={onOpen} className="bg-orange-500 text-white">
       <FaPlus className="text-sm" /> Tambah Products
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="xl"
        className="bg-gray-800"
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex justify-center text-white">
                Product
              </ModalHeader>
              <ModalBody className="px-5">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-white font-bold mb-1">
                      Nama Product
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2 rounded-md border-2 border-gray-300"
                      placeholder="Nama Product"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-white font-bold mb-1">
                      Kategori Product
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
                      className="w-full h-20 px-4 py-2 rounded-md border-2 border-gray-300"
                      placeholder="Deskripsi"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-white font-bold mt-3">
                      Upload Products
                    </label>
                    <div>
                      <UploadButton
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                          setImage(res[0].url);
                          alert("Upload Completed");
                        }}
                        onUploadError={(error: Error) => {
                          // Do something with the error.
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
                  <ModalFooter className="flex justify- mb-4">
                    <Button color="danger" onPress={onClose}>
                      Close
                    </Button>
                    <Button color="primary" type="submit" onPress={onClose}>
                      Save
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

export default AddProduct;
