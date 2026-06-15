"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";

const ButtonWa = () => {
  const [showButton, setShowButton] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 200) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {showButton && (
        <Link href="/">
          <button
            className="fixed bottom-20 right-4 bg-green-500 hover:bg-green-600 rounded-full cursor-pointer p-2 z-50 transition-all duration-200"
          >
            <FaWhatsapp className="text-3xl text-white" />
          </button>
        </Link>
      )}
    </>
  );
};

export default ButtonWa;
