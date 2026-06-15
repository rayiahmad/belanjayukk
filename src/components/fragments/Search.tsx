"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { IoSearch } from "react-icons/io5";
import { useDebouncedCallback } from "use-debounce";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@nextui-org/react";
import { useStore } from "@/store";

const Search = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isOpen, onOpen, onOpenChange, onClose: originalOnClose } = useDisclosure();
  const { setSearchTerm } = useStore(); 
  const [inputValue, setInputValue] = useState(searchParams.get("q") || ""); 

  // Debounced search function to handle input changes
  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams as any);
    if (value) {
      params.set("q", value);
      setSearchTerm(value); // Update the search term in Zustand
    } else {
      params.delete("q");
      setSearchTerm(""); // Clear the search term in Zustand
    }
    router.push(`/products?${params.toString()}`);
  }, 300);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch.flush(); 
      setInputValue("");
      onClose(); 
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setInputValue(value);
    handleSearch(value);
  };

  const onClose = () => {
    setInputValue("");
    originalOnClose(); 
  };

  return (
    <>
      <button
        onClick={onOpen}
        className="bg-transparent md:px-3 gap-2 px-2 py-2 border border-gray-400 flex items-center text-black md:rounded-3xl rounded-full"
      >
        <IoSearch className="md:text-xl text-lg" />
        <p className="text-sm md:flex hidden">Cari Product...</p>
      </button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="lg"
        className="bg-white z-[200]"
        scrollBehavior="inside"
        backdrop="blur"
        placement="center"
      >
        <ModalContent>
          <ModalHeader className="flex justify-center text-black">
            Search
          </ModalHeader>
          <ModalBody className="px-2 py-3">
            <input
              type="text"
              placeholder="Cari Product..."
              className="w-full border border-gray-400 mb-4 py-2 px-3 text-sm outline-none rounded-full focus:border-blue-400 transition-all duration-300"
              onChange={handleChange}
              onKeyPress={handleKeyPress}
              value={inputValue} 
              autoFocus
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Search;
