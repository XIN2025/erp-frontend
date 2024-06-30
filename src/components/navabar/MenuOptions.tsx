"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Clock,
  Cog,
  HandCoins,
  HardHat,
  Landmark,
  Repeat,
  SlidersHorizontal,
  UserRoundCog,
  UsersRound,
  Wrench,
} from "lucide-react";
import clsx from "clsx";
import { Separator } from "@/components/ui/separator";
import { Database, GitBranch, LucideMousePointerClick } from "lucide-react";
import SidebarButton from "../sidebar/SidebarButton";

type Props = {};

const navigationLinks = [
  {
    href: "/access-control",
    label: "Access Control",
    Icon: SlidersHorizontal,
  },
  {
    href: "/#",
    label: "Common Master",
    Icon: UserRoundCog,
    hasDropdown: true,
  },
  {
    href: "/#",
    label: "Project HR Management",
    Icon: UsersRound,
    hasDropdown: true,
  },
  {
    href: "/#",
    label: "Accounting System",
    Icon: Landmark,
    hasDropdown: true,
  },
  {
    href: "/#",
    label: "Material Management",
    Icon: HardHat,
    hasDropdown: true,
  },
  {
    href: "/#",
    label: "Machine Management",
    Icon: Cog,
    hasDropdown: true,
  },
  {
    href: "/#",
    label: "Sales Accounting System",
    Icon: HandCoins,
    hasDropdown: true,
  },
  {
    href: "/#",
    label: "Execution System",
    Icon: Repeat,
    hasDropdown: true,
  },
  {
    href: "/#",
    label: "Workforce Management",
    Icon: Wrench,
    hasDropdown: true,
  },
];

const MenuOptions = (props: Props) => {
  const [selectedDropdown, setSelectedDropdown] = useState<string | null>(null);
  const pathName = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState<boolean>(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleNavigation = (href: string) => {
    if (href !== "#") {
      router.push(href);
      setSelectedDropdown(null); // Clear dropdown selection when navigating to a non-dropdown item
    } else {
      setSelectedDropdown(href); // Set the selected dropdown
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <nav className=" dark:bg-black h-screen    justify-between flex items-center flex-col z-30  gap-10 py-6 px-2">
      <div className="flex items-center justify-center flex-col gap-8">
        <Link className="flex font-bold flex-row " href="/">
          hec .
        </Link>
        <TooltipProvider>
          {navigationLinks.map((menuItem) => (
            <ul key={menuItem.label}>
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <li>
                    <SidebarButton // Assuming SidebarButton component
                      key={menuItem.href}
                      href={menuItem.href}
                      Icon={menuItem.Icon}
                      label={menuItem.label}
                      hasDropdown={menuItem.hasDropdown}
                      onClick={handleNavigation}
                      isDropdownItemSelected={
                        selectedDropdown === menuItem.href
                      }
                    />
                  </li>
                </TooltipTrigger>
                <TooltipContent
                  side="right"
                  className="bg-black/10 backdrop-blur-xl"
                >
                  <p>{menuItem.label}</p>
                </TooltipContent>
              </Tooltip>
            </ul>
          ))}
        </TooltipProvider>
        <Separator />
      </div>
      <div className="flex items-center justify-center flex-col gap-8"></div>
    </nav>
  );
};

export default MenuOptions;
