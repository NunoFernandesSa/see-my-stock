"use client";

import Navbar from "@/src/components/shared/Navbar";
import { Button } from "@/src/components/ui/button";
import { ToastContainer, toast } from "react-toastify";

export default function ConnectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const notift = () => toast("Hello World!");

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
      />
      <Navbar />
      {children}
    </>
  );
}
