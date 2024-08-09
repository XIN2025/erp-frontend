"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { DropDownMenu } from "@/config";
import { ScrollArea } from "../ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface SidebarDropdownButtonProps {
  href: string;
  Icon: React.ComponentType;
  label: string;
  onClick: (href: string) => void;
}

function SidebarDropdownButton({
  Icon,
  label,
  href,
  onClick,
}: SidebarDropdownButtonProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const getHeight = (label: string) => {
    const matchingCandidate = DropDownMenu.find(
      (candidates) => candidates.parent === label
    );
    if (matchingCandidate) {
      return matchingCandidate.DropDownContent.length;
    }
    return 0;
  };

  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const elements = getHeight(label);
  const ScrollAreaHeight =
    elements && elements > 10 ? elements * 44 : elements * 45;

  return (
    <div>
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger onClick={() => setIsOpen(!isOpen)}>
          <span>
            <Icon />
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side="right"
          align="center"
          className="w-[270px]"
          onInteractOutside={(e) => {
            // Prevent closing when interacting with the scroll bar
            if ((e.target as HTMLElement).closest(".scrollarea")) {
              e.preventDefault();
            }
          }}
        >
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <ScrollArea
              className="max-h-[calc(100vh-10rem)] w-[270px] scrollarea"
              style={{ height: `${ScrollAreaHeight}px` }}
            >
              {DropDownMenu.map((candidates) => {
                if (candidates.parent === label) {
                  return candidates.DropDownContent.map((candidate) => (
                    <div
                      key={candidate.label}
                      className="flex rounded-lg p-3 cursor-pointer hover:bg-blue-100 items-center w-full"
                      onClick={() => {
                        onClick(candidate.href);
                        setIsOpen(false);
                      }}
                    >
                      <span
                        className={`flex w-full text-base ml-3 items-center justify-center ${
                          pathname === candidate.href ? "text-blue-600" : ""
                        }`}
                      >
                        {candidate.label}
                      </span>
                    </div>
                  ));
                }
              })}
            </ScrollArea>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default SidebarDropdownButton;
