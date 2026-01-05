import { getCurrentUser } from "@/actions/auth/getCurrentUser";
import { redirect } from "next/navigation";

export default async function ProtectedRoutes({
  children,
}: {
  children: React.ReactNode;
}) {
  // const user = await getCurrentUser();
  // if (!user) redirect("/login");

  return <>{children}</>;
}
