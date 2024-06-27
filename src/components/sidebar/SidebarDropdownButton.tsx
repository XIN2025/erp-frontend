"use client";
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { usePathname } from "next/navigation";
import { DropDownMenu } from "@/config";
import { ScrollArea } from "../ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import clsx from "clsx";

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

  const hashref = (pathname: string) => {
    return pathname.indexOf("href") !== -1;
  };

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
      <DropdownMenu>
        <DropdownMenuTrigger>
          <span>
            <Icon />
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right" align="center" className="w-[270px]">
          <DropdownMenuItem>
            <ScrollArea
              className="max-h-[calc(100vh-10rem)] w-[270px] "
              style={{ height: `${ScrollAreaHeight}px` }}
            >
              {DropDownMenu.map((candidates) => {
                if (candidates.parent === label) {
                  return candidates.DropDownContent.map((candidate) => (
                    <div
                      key={candidate.label}
                      className=" flex p-3  items-center  w-full"
                      onClick={() => onClick(candidate.href)}
                    >
                      <span
                        className={`flex w-full text-base ml-3 items-center justify-center      ${
                          pathname === candidate.href ? "  text-blue-600 " : ""
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
