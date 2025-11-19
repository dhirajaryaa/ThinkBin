"use client";
import { logoutUser } from "@/actions/auth/logoutUser";
import { Button } from "@/components/ui/button";
import { Loader2, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useActionState, useState } from "react";

export default function Logout({
  className,
  variant = "default",
}: {
  className?: string;
  variant?: string;
}) {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const logoutHandler = async () => {
    setIsPending(true);
    const res = await logoutUser();
    if (!res.success) {
      toast.error(res.error);
      setIsPending(false);
    } else {
      setIsPending(false);
      toast.success("Logout successful!");
      router.push("/login");
    }
  };

  return (
    <Button
      type="button"
      onClick={logoutHandler}
      disabled={isPending}
      value={variant}
      className={className}
    >
      {isPending ? <Loader2 className="animate-spin size-6" /> : <LogOut />}
      Logout
    </Button>
  );
}
