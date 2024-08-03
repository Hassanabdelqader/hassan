"use client";
import { useUser } from "@/context/UserContext";
import Image from "next/image";
import React from "react";
import img4 from "../../public/assests/man.png";

const Logo = () => {
  const { user } = useUser();
  return (
    <div className="flex gap-1">
      <h2>welcome </h2>
      <Image
        src={img4}
        width={30}
        height={20}
        alt=""
        className="text-gray-600 text-3xl mr-3"
      />
      {user?.name}{" "}
    </div>
  );
};

export default Logo;
