"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[Admin Error]", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-center gap-6">
      <h2 className="text-2xl font-bold">관리자 페이지 오류</h2>
      <p className="text-muted-foreground">
        예상치 못한 오류가 발생했습니다.
      </p>
      <Button onClick={reset} variant="outline">
        다시 시도
      </Button>
    </div>
  );
}
