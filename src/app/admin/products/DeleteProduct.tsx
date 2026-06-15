"use client";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Trash2 } from "lucide-react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  ModalFooter,
} from "@nextui-org/react";
import { toast } from "react-hot-toast";

type Products = {
  id: string;
  name: string;
};

const DeleteProduct = ({ product }: { product: Products }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const router = useRouter();

  const handleDelete = async (ProductsId: string) => {
    try {
      await axios.delete(`/api/products/${ProductsId}`);
      toast.success("Berhasil menghapus Products🚀");
      router.refresh();
    } catch (error) {
      toast.error("Terjadi kesalahan. Silakan coba lagi.");
      console.error("Error deleting product:", error);
    }
  };

  return (
    <>
      <Button onPress={onOpen} className="bg-transparent text-white">
        <Trash2 className="text-sm text-red-500" />
      </Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="md"
        className="bg-gray-800"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex justify-center">
                <h3 className="text-xl font-bold text-white">Konfirmasi Penghapusan</h3>
              </ModalHeader>
              <ModalBody className="px-5">
                <p className="text-white text-center">
                  Kamu yakin ingin menghapus <span className="font-bold">{product.name}</span>?
                </p>
              </ModalBody>
              <ModalFooter className="flex justify-center space-x-4">
                <Button
                  color="danger"
                  onPress={onClose}
                  className="rounded-md px-4 py-2"
                >
                  Batal
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    handleDelete(product.id);
                    onClose();
                  }}
                  className="rounded-md px-4 py-2"
                >
                  Hapus
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteProduct;
