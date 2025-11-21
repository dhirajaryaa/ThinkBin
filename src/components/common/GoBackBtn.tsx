"use client";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

function GoBackBtn() {
  const router = useRouter();
  return (
    <div className="flex items-center gap-1">
      <SidebarTrigger variant={"outline"} />
      <Button size="sm" variant="secondary" onClick={() => router.back()}>
        <ArrowLeft />
        Back
      </Button>
    </div>
  );
}

export default GoBackBtn;
