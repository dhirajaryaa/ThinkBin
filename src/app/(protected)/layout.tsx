import { Suspense } from "react";
import ProtectedRoutes from "@/components/common/ProtectedRoutes";
import Loading from "./loading";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <main className="max-h-svh overflow-hidden w-full">
      <Suspense fallback={<Loading />}>
        <ProtectedRoutes>{children}</ProtectedRoutes>
      </Suspense>
    </main>
  );
}
