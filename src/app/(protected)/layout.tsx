"use client";

import PrivatedNavbar from "@/src/components/shared/PrivatedNavbar";
import CardLoader from "@/src/components/ui/CardLoader";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function ConnectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isLoaded, userId } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && !userId) {
      router.push("/");
    }
  }, [isLoaded, userId, router]);

  if (!isLoaded) return <CardLoader />;

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
      <PrivatedNavbar />
      <main>{children}</main>
    </>
  );
}
