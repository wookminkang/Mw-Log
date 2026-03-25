"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function SubError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Sub Error]", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center py-24 text-center gap-6">
      <h2 className="text-2xl font-bold">오류가 발생했습니다</h2>
      <p className="text-muted-foreground max-w-sm">
        페이지를 불러오는 중 문제가 생겼습니다. 잠시 후 다시 시도해 주세요.
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
