"use client";
import { sidebarLinks } from "@/data/sidebarLinks";
import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarNavLinks() {
  const pathname = usePathname();
  return (
    <div>
      <SidebarMenuItem className="space-y-2 px-2">
        {sidebarLinks.map((link) => (
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
    </div>
  );
}
