"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

function GoBackBtn() {
  const router = useRouter();
  return (
    <Button size="sm" variant="secondary" onClick={() => router.back()}>
      <ArrowLeft />
      Back
    </Button>
  );
}

export default GoBackBtn;
