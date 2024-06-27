"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PanelRightClose } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import SidebarContent from "../sidebar/SidebarContent";
import { ScrollArea } from "../ui/scroll-area";
import UserNavbar from "./UserNavbar";
import Profile from "./Profile";

function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  return (
    <div className="   sticky sm:pl-7  mb-7 z-50 top-0 inset-x-0 h-10">
      <header className="relative    mr-3  ">
        <div className="border-b p-3  flex justify-between  border-gray-300">
          <div className="flex h-10  items-center">
            {/* <Sheet open={sidebarOpen} onOpenChange={toggleSidebar}>
              <SheetTrigger>
                <PanelRightClose size={30} onClick={() => toggleSidebar()} />
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[360px]">
                <SheetHeader>
                  <SheetDescription>
                    <ScrollArea className="h-[calc(100vh-4rem)] overflow-y-auto pr-3">
                      <SidebarContent onClose={toggleSidebar} />
                    </ScrollArea>
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet> */}

            <div className="ml-4 pl-10 flex lg:ml-0">
              <Link href="/" className="text-blue-500">
                {!sidebarOpen && "hec group"}
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
