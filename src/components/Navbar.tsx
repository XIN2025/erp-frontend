"use client";
import Link from "next/link";
import React, { useState } from "react";
import { ChevronRight, Menu, PanelRightClose } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "./ui/scroll-area";
import SidebarContent from "./sidebar/SidebarContent";
import MaxWidthWrapper from "./MaxWidthWrapper";

function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  return (
    <div className="   sticky sm:pl-7 z-50 top-0 inset-x-0 h-10">
      <header className="relative    mr-3  ">
        <div className="border-b p-3  border-gray-200">
          <div className="flex h-10  items-center">
            <Sheet open={sidebarOpen} onOpenChange={toggleSidebar}>
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
            </Sheet>

            <div className="ml-4 pl-10 flex lg:ml-0">
              <Link href="/" className="text-blue-500">
                {!sidebarOpen && "h2c group"}
              </Link>
            </div>
            <div className="ml-4 flow-root lg:ml-6">{/* <Cart /> */}</div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Navbar;
