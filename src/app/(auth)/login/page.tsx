import { LoginForm } from "@/components/auth/LoginForm";
import Logo from "@/components/common/Logo";

export default function LoginPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Logo variant="sm" />
        <LoginForm />
      </div>
    </div>
  );
}
