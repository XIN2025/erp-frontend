"use client";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { usePathname } from "next/navigation";
import { DropDownMenu } from "@/config";
import { ScrollArea } from "../ui/scroll-area";

interface SidebarDropdownButtonProps {
  Icon: React.ReactNode;
  label: string;
  onClick: (href: string) => void;
}

function SidebarDropdownButton({
  Icon,
  label,
  onClick,
}: SidebarDropdownButtonProps) {
  const pathname = usePathname();

  const getHeight = (label: string) => {
    const matchingCandidate = DropDownMenu.find(
      (candidates) => candidates.parent === label
    );
    if (matchingCandidate) {
      return matchingCandidate.DropDownContent.length;
    }
    return 0;
  };

  const elements = getHeight(label);

  const ScrollAreaHeight =
    elements && elements > 10 ? elements * 44 : elements * 45;

  return (
    <div>
      <Accordion type="multiple" className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger className="flex items-center">
            <span className="ml-3 text-blue-600">{Icon}</span>
            {label}
          </AccordionTrigger>
          <AccordionContent>
            <ScrollArea style={{ height: `${ScrollAreaHeight}px` }}>
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
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default SidebarDropdownButton;
