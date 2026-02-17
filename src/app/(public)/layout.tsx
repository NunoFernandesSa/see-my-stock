"use client";

import PublicNavbar from "@/src/components/shared/PublicNavbar";
import LogoLoader from "@/src/components/ui/LogoLoader";
import { useAuth } from "@clerk/nextjs";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isLoaded, userId } = useAuth();

  if (!isLoaded) return <LogoLoader />;

  return (
    <>
      <PublicNavbar />
      <main>{children}</main>
    </>
  );
}
