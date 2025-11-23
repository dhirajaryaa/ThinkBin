"use client";
import {
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Grid2X2,
  LayoutList,
  MoreVertical,
  Search,
  SquarePen,
  TabletSmartphone,
  UserCircle2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Logout from "../auth/Logout";

const sidebarMenuLinks = [
  { title: "Dashboard", href: "/dashboard", icon: Grid2X2 },
  { title: "Ask", href: "/ask", icon: Search },
  { title: "Create", href: "/memories/create", icon: SquarePen },
  { title: "Memories", href: "/memories", icon: LayoutList },
];

const sidebarUserMenuLinks = [
  { title: "Profile", href: "/profile", icon: UserCircle2 },
  { title: "Devices", href: "/profile#devices", icon: TabletSmartphone },
];

//! nav links
export function SidebarNavLinks() {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenuItem className="space-y-2 px-2">
          {sidebarMenuLinks.map((link) => (
            <SidebarMenuButton
              key={link.title}
              isActive={pathname === link.href}
              className={`px-2 sm:px-4 sm:py-5 rounded-lg sm:rounded-xl data-[active=true]:bg-primary/5`}
              asChild
            >
              <Link href={link.href}>
                <div className=" flex items-center gap-2 sm:gap-3 w-[80%]">
                  {link.icon && <link.icon className="size-4 sm:size-5" />}
                  <span className="text-sm sm:text-[15px] font-medium capitalize">
                    {link.title}
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          ))}
        </SidebarMenuItem>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
//! user profile link
export function UserProfileMenu() {
  return (
    <SidebarFooter>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuButton size={"lg"} variant={"outline"}>
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage
                src={"https://avatars.githubusercontent.com/u/167156303?v=4"}
                alt={"user-avatar"}
              />
              <AvatarFallback className="rounded-lg">CN</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">Dhiraj Arya</span>
              <span className="text-muted-foreground truncate text-xs">
                dhirajarya.ptn@gmail.com
              </span>
            </div>
            <MoreVertical className="ml-auto size-4" />
          </SidebarMenuButton>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-60" align="center">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {sidebarUserMenuLinks.map((link) => (
            <DropdownMenuItem key={link.title} asChild>
              <Link href={link.href}>
                <link.icon className="mr-2 size-4" />
                {link.title}
              </Link>
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Logout className="w-full" size="sm" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarFooter>
  );
}
