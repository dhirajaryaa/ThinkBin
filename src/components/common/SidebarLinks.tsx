"use client";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Grid2X2,
  LayoutList,
  Search,
  Settings,
  SquarePen,
  UserCircle2,
} from "lucide-react";

const sidebarMenuLinks = [
  { title: "Dashboard", href: "/dashboard", icon: Grid2X2 },
  { title: "Ask", href: "/ask", icon: Search },
  { title: "Create", href: "/notes/create", icon: SquarePen },
  { title: "Notes", href: "/notes", icon: LayoutList }
];
export default function SidebarNavLinks() {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenuItem className="space-y-2 px-2">
          {sidebarMenuLinks.map((link) => (
            <SidebarMenuButton
              key={link.title}
              isActive={pathname.includes(link.href)}
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
