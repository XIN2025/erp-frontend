import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import Profile from "./Profile";

export default function SwitchAccount() {
  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="text-base text-stone-700">
          <Button variant="ghost" size="default" className="relative">
            Switch account
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Login As</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Admin</DropdownMenuItem>
          <DropdownMenuItem>Site Superviser</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
