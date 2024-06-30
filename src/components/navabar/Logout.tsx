"use client";

import { Button } from "../ui/button";
import { LogOut } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

function Logout() {
  const router = useRouter();

  const handleLogout = () => {
    try {
      deleteCookie("token", {
        path: "/",
        domain: window.location.hostname,
      });

      window.location.reload();
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button onClick={handleLogout} variant="ghost">
              <LogOut className="text-red-500" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Logout</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}

export default Logout;
