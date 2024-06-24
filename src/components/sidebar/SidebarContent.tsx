"use client";
import Link from "next/link";
import React from "react";
import { Separator } from "../ui/separator";
import {
  Clock,
  Cog,
  HandCoins,
  Landmark,
  Repeat,
  SlidersHorizontal,
  UserRoundCog,
  UsersRound,
  Wrench,
} from "lucide-react";
import { useRouter } from "next/navigation";
import SidebarButton from "./SidebarButton";

interface SidebarContentProps {
  onClose: () => void;
}

const navigationLinks = [
  {
    href: "/access-control",
    label: "Access Control",
    Icon: <SlidersHorizontal />,
  },
  {
    href: "/#",
    label: "Common Master",
    Icon: <UserRoundCog />,
    hasDropdown: true,
  },
  {
    href: "/#",
    label: "Project HR Management",
    Icon: <UsersRound />,
    hasDropdown: true,
  },
  {
    href: "/#",
    label: "Accounting System",
    Icon: <Landmark />,
    hasDropdown: true,
  },
  {
    href: "/#",
    label: "Material Management",
    Icon: <UsersRound />,
    hasDropdown: true,
  },
  {
    href: "/#",
    label: "Machine Management",
    Icon: <Cog />,
    hasDropdown: true,
  },
  {
    href: "/#",
    label: "Sales Accounting System",
    Icon: <HandCoins />,
    hasDropdown: true,
  },
  {
    href: "/#",
    label: "Execution System",
    Icon: <Repeat />,
    hasDropdown: true,
  },
  {
    href: "/#",
    label: "Workforce Management",
    Icon: <Wrench />,
    hasDropdown: true,
  },
];

function SidebarContent({ onClose }: SidebarContentProps) {
  const router = useRouter();

  const handleNavigation = (href: string) => {
    if (href != "#") {
      onClose();
      router.push(href);
    }
  };

  return (
    <div className="mt-5 flex flex-col  gap-3 justify-center bg-white overflow-y-auto">
      {navigationLinks.map((link) => (
        <SidebarButton // Assuming SidebarButton component
          key={link.href}
          href={link.href}
          Icon={link.Icon}
          label={link.label}
          hasDropdown={link.hasDropdown}
          onClick={handleNavigation}
        />
      ))}
    </div>
  );
}

export default SidebarContent;
