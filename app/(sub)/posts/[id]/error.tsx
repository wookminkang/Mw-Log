"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PostError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Post Detail Error]", error);
  }, [error]);

  return (
    <div className="max-w-3xl mx-auto flex flex-col items-center justify-center py-24 text-center gap-6">
      <h2 className="text-2xl font-bold">포스트를 불러오지 못했습니다</h2>
      <p className="text-muted-foreground max-w-sm">
        일시적인 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.
      </p>
      <div className="flex gap-3">
        <Button onClick={reset} variant="outline">
          다시 시도
        </Button>
        <Button asChild variant="ghost">
          <Link href="/">홈으로</Link>
        </Button>
      </div>
    </div>
  );
}
