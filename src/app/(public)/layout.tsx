"use client";

import PublicNavbar from "@/src/components/shared/PublicNavbar";
import { useAuth } from "@clerk/nextjs";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isLoaded, userId } = useAuth();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <PublicNavbar />
      <main>{children}</main>
    </>
  );
}
