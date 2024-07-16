"use client";

import { useEffect, useState } from "react";
import MenuOptions from "@/components/navabar/MenuOptions";
import Navbar from "@/components/navabar/Navbar";
import { usePathname } from "next/navigation";
import LoadingDots from "@/components/Loading";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/auth/check", {
          credentials: "include",
        });
        setIsAuthenticated(response.ok);
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return <LoadingDots />;
  }

  if (!isAuthenticated || pathname === "/auth/signin") {
    return <main className="w-full h-full">{children}</main>;
  }

  return (
    <>
      <aside className="shrink-0 h-full">
        <MenuOptions />
      </aside>
      <main className="flex flex-col flex-grow overflow-hidden">
        <header className="w-full">
          <Navbar />
        </header>
        <div className="flex-grow overflow-auto">{children}</div>
      </main>
    </>
  );
}
