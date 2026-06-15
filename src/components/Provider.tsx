"use client";
import { ReactNode, FC } from "react";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import ButtonWa from "./fragments/ButtonWa";
import Up from "./fragments/Up";

interface ProviderProps {
  children: ReactNode;
}

const Provider: FC<ProviderProps> = ({ children }) => {
  return (
    <SessionProvider>
       <ButtonWa />
       <Up />
      {children}
      <Toaster />
    </SessionProvider>
  );
};

export default Provider;
