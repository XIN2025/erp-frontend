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
import SwitchAccount from "./SwitchAccount";
import Logout from "./Logout";

function UserNavbar() {
  return (
    <div>
      <div className="flex  ">
        <SwitchAccount />
        <Profile />
        <Logout />
      </div>
    </div>
  );
}

export default UserNavbar;
