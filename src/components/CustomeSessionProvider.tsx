"use client";
import { SessionProvider } from "next-auth/react";
import React, { FC, ReactNode } from "react";

interface Provider {
  children: ReactNode;
}

const CustomeSessionProvider: FC<Provider> = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default CustomeSessionProvider;
