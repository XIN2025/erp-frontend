import { ChevronDown, Clock } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import SidebarDropdownButton from "./SidebarDropdownButton";
import { ScrollArea } from "../ui/scroll-area";
import Link from "next/link";
import clsx from "clsx";
interface SidebarButtonProps {
  href: string;
  label: string;
  hasDropdown: boolean | undefined;
  onClick: (href: string) => void;
  Icon: React.ComponentType;
  isDropdownItemSelected?: boolean;
}
const SidebarButton = ({
  href,
  label,
  hasDropdown,
  onClick,
  Icon,
  isDropdownItemSelected,
}: SidebarButtonProps) => {
  const pathName = usePathname();

  return (
    <button
      key={href}
      className={`
        p-1 flex w-full items-center gap-5   text-gray-700 text-lg hover:bg-gray-200 rounded-md
        ${pathName === href ? "bg-gray-200 text-blue-600 " : ""}
      `}
    >
      {!hasDropdown && (
        <Link
          href={href}
          className={clsx(
            "group h-8 w-8 flex items-center justify-center  scale-[1.4] rounded-lg p-[3px]  cursor-pointer",
            {
              "dark:bg-blue-300 bg-blue-100  ": pathName === href,
            }
          )}
        >
          <Icon />
        </Link>
      )}

      {hasDropdown && (
        <div
          className={clsx(
            "group   flex items-center justify-center  scale-[1.4] rounded-lg   cursor-pointer"
          )}
        >
          <SidebarDropdownButton
            href={href}
            Icon={Icon}
            onClick={onClick}
            label={label}
          />
        </div>
      )}
    </button>
  );
};

export default SidebarButton;
