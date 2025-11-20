import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Logo from "./Logo";
import SidebarNavLinks from "./SidebarLinks";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="mt-4 mb-12 px-4">
        <div className="w-full flex items-center justify-between pl-4">
          <Logo href="/dashboard" variant="sm" />
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      <SidebarContent>
        {/* nav links  */}
        <SidebarNavLinks />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
