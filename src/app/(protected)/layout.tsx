import { Suspense } from "react";
import ProtectedRoutes from "@/components/common/ProtectedRoutes";
import Loading from "./loading";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/common/AppSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full min-h-screen max-w-6xl mx-auto">
        <Suspense fallback={<Loading />}>
          <ProtectedRoutes>{children}</ProtectedRoutes>
        </Suspense>
      </main>
    </SidebarProvider>
  );
}
