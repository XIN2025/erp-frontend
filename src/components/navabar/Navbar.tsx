"use client";
import Link from "next/link";
import { useState } from "react";
import UserNavbar from "./UserNavbar";

function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  return (
    <div className="   sticky sm:pl-7  mb-7 z-50 top-0 inset-x-0 h-10">
      <header className="relative  border-b p-2  border-gray-300   mr-3  ">
        <div className=" flex justify-between  ">
          <div className="flex h-10  items-center">
            <div className="  flex lg:ml-0">
              <Link href="/" className="text-blue-500">
                {!sidebarOpen && "HEC GROUP "}
              </Link>
            </div>
          </div>

          <div className="ml-auto mr-10 flex items-center">
            <UserNavbar />
          </div>
        </div>
      </header>
    </div>
  );
}

export default Navbar;
