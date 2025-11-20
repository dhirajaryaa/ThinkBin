"use client";
import { logoutUser } from "@/actions/auth/logoutUser";
import { Button } from "@/components/ui/button";
import { Loader2, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";

export default function Logout({
  className,
  variant = "default",
  size = "sm",
}: {
  className?: string;
  variant?: "default" | "outline" | "ghost" | "link";
  size?: "sm" | "lg";
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
      size={size}
      onClick={logoutHandler}
      disabled={isPending}
      variant={variant}
      className={className}
    >
      {isPending ? <Loader2 className="animate-spin size-6" /> : <LogOut />}
      Logout
    </Button>
  );
}
