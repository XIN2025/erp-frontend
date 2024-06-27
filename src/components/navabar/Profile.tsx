import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { User } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function Profile() {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="text-base text-stone-700">
          <Button variant="ghost" size="default" className="relative">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <User />
                </TooltipTrigger>
                <TooltipContent className="mt-2">
                  <p>Profile</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Profile</DropdownMenuLabel>

          <DropdownMenuSeparator />
          <DropdownMenuItem className="flex gap-2">
            <p className=" font-semibold">First Name -</p>
            <p className="">Jim</p>
          </DropdownMenuItem>
          <DropdownMenuItem className="flex gap-2">
            <p className=" font-semibold">Last Name -</p>
            <p className="">Jam</p>
          </DropdownMenuItem>
          <DropdownMenuItem className=" ">
            <Button size="sm" variant="link">
              Update Password
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default Profile;
