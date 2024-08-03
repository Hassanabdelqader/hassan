"use client";
import React from "react";
import { signOut } from "next-auth/react";

const NavButton = () => {
  return (
    <button
    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200"

      onClick={() => {
        console.log("signout");
        signOut({
          redirect: true,
          callbackUrl: `${window.location.origin}/sign-in`,
        });
      }}
      
    >
      Sign Out
    </button>
  );
};

export default NavButton;
