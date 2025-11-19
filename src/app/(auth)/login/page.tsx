import { getCurrentUser } from "@/actions/auth/getCurrentUser";
import { LoginForm } from "@/components/auth/LoginForm";
import Logo from "@/components/common/Logo";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const user = await getCurrentUser();
  if (user) redirect("/dashboard");
  return (
    <main className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <section className="flex w-full max-w-sm flex-col gap-6">
        <Logo variant="sm" />
        <LoginForm />
      </section>
    </main>
  );
}
