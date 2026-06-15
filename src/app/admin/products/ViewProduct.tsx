"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  ModalFooter,
} from "@nextui-org/react";
import { FaEye } from "react-icons/fa";
import { formatToRupiah } from "@/libs/utils";
import Image from "next/image";

type Products = {
  id: string;
  name: string;
  deskripsi: string;
  harga: string;
  image: string;
  kategoriId: string;
};

type Kategori = {
  id: string;
  name: string;
};

type EditProductProps = {
  kategori: Kategori[];
  product: Products;
};

const ViewProduct = ({ kategori, product }: EditProductProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const getKategoriName = (kategoriId: string) => {
    const category = kategori.find((k) => k.id === kategoriId);
    return category ? category.name : "Unknown Category";
  };

  return (
    <>
      <Button
        onPress={onOpen}
        className="bg-transparent text-orange-500 hover:text-blue-600 transition-colors"
      >
        <FaEye className="text-lg" />
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
                Product Details
              </ModalHeader>
              <ModalBody className="px-5 text-white">
                <div className="mb-4 flex justify-center">
                  <Image
                    src={product.image}
                    alt="Product image"
                    width={200}
                    height={200}
                    className="rounded-md shadow-lg"
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <div className="form-control">
                    <label className="label font-bold text-white">
                      Deskripsi
                    </label>
                    <p className="text-gray-300 text-start description-text">
                      {product.deskripsi}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="form-control">
                      <label className="label font-bold text-white">
                        Kategori
                      </label>
                      <p className="text-gray-300 text-start">
                        {getKategoriName(product.kategoriId)}
                      </p>
                    </div>
                    <div className="form-control">
                      <label className="label font-bold text-white">
                        Harga
                      </label>
                      <p className="text-gray-300 text-start">
                        {formatToRupiah(product.harga)}
                      </p>
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter className="flex justify-end">
                <Button
                  onPress={onClose}
                  className="bg-red-500 text-white hover:bg-red-700 transition-colors"
                >
                  {" "}
                  Tutup
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ViewProduct;
