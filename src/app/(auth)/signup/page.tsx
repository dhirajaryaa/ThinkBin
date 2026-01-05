import { getCurrentUser } from "@/actions/auth/getCurrentUser";
import { SignUpForm } from "@/components/auth/SignupForm";
import Logo from "@/components/common/Logo";
import { redirect } from "next/navigation";

export default async function SignupPage() {
    const user = await getCurrentUser();
    if (user) redirect("/dashboard");
  return (
    <main className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <section className="flex w-full max-w-sm flex-col gap-6">
        <Logo variant="sm" />
        <SignUpForm />
      </section>
    </main>
  );
}
