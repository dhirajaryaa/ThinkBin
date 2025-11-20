import { Suspense } from "react";
import ProtectedRoutes from "@/components/common/ProtectedRoutes";
import Loading from "./loading";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/common/AppSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger className="md:hidden" />
        <Suspense fallback={<Loading />}>
          <ProtectedRoutes>{children}</ProtectedRoutes>
        </Suspense>
      </main>
    </SidebarProvider>
  );
}
