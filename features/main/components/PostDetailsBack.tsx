"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export function PostDetailsBack() {
  const router = useRouter();
  return (
    <Button variant="ghost" size="sm" className="gap-2 cursor-pointer" onClick={() => router.back()}>
      <ArrowLeft className="w-4 h-4" />
      목록으로
    </Button>
  )
}