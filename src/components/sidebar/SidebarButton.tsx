import { ChevronDown, Clock } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import SidebarDropdownButton from "./SidebarDropdownButton";
import { ScrollArea } from "../ui/scroll-area";

interface SidebarButtonProps {
  href: string;
  label: string;
  hasDropdown: boolean | undefined;
  onClick: (href: string) => void;
  Icon?: React.ReactNode;
}

const SidebarButton = ({
  href,
  label,
  hasDropdown,
  onClick,
  Icon,
}: SidebarButtonProps) => {
  const pathname = usePathname();

  return (
    <button
      key={href}
      className={`
        p-1 flex w-full items-center gap-5   text-gray-700 text-lg hover:bg-gray-200 rounded-md
        ${pathname === href ? "bg-gray-200 text-blue-600 " : ""}
      `}
    >
      {!hasDropdown && (
        <div
          className=" flex p-3  items-center  w-full"
          onClick={() => onClick(href)}
        >
          <span className=" text-blue-600">{Icon}</span>
          <span
            className="flex w-full  justify-center"
            style={{ fontWeight: 500 }}
          >
            {label}
          </span>
        </div>
      )}

      {hasDropdown && (
        <div
          className={` flex-1 gap-2 ${
            pathname === href ? "bg-gray-200 text-blue-600 " : ""
          }`}
        >
          <SidebarDropdownButton Icon={Icon} onClick={onClick} label={label} />
        </div>
      )}
    </button>
  );
};

export default SidebarButton;
