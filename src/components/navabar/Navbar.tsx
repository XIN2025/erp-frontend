"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import UserNavbar from "./UserNavbar";

function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="sticky top-0 inset-x-0 z-50 mb-7 sm:pl-7">
      <header className="relative border-b border-gray-300 p-2 mr-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center h-10">
            <div className="flex lg:ml-0">
              <Link href="/" className="text-blue-500">
                {!sidebarOpen && (
                  <Image
                    src="/bluelogo.png"
                    width={80}
                    height={70}
                    alt="logo"
                  />
                )}
              </Link>
            </div>
          </div>

          <div className="ml-auto mr-10">
            <UserNavbar />
          </div>
        </div>
      </header>
    </div>
  );
}

export default Navbar;
