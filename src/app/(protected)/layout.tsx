import { Suspense } from "react";
import ProtectedRoutes from "@/components/common/ProtectedRoutes";
import Loading from "./loading";
import { SidebarProvider} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/common/AppSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="w-full min-h-svh p-4 sm:px-6">
        <Suspense fallback={<Loading />}>
          <ProtectedRoutes>{children}</ProtectedRoutes>
        </Suspense>
      </div>
    </SidebarProvider>
  );
}
