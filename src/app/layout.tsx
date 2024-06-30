import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { cookies } from "next/headers";
import MenuOptions from "@/components/navabar/MenuOptions";
import Navbar from "@/components/navabar/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = cookies().get("token");

  return (
    <html lang="en">
      <body className={`${inter.className} flex h-screen overflow-hidden`}>
        {token ? (
          <>
            <aside className="shrink-0">
              <MenuOptions />
            </aside>
            <main className="flex flex-col flex-grow overflow-hidden">
              <header className="w-full">
                <Navbar />
              </header>
              <div className="flex-grow overflow-auto">{children}</div>
            </main>
          </>
        ) : (
          <main className="w-full h-full">{children}</main>
        )}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
