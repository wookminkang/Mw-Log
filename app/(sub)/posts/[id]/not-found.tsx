import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PostNotFound() {
  return (
    <div className="max-w-3xl mx-auto flex flex-col items-center justify-center py-24 text-center gap-6">
      <p className="text-6xl font-bold text-muted-foreground/30">404</p>
      <h1 className="text-2xl font-bold">포스트를 찾을 수 없습니다</h1>
      <p className="text-muted-foreground max-w-sm">
        요청하신 포스트가 존재하지 않거나 삭제되었습니다.
      </p>
      <Button asChild variant="outline">
        <Link href="/">홈으로 돌아가기</Link>
      </Button>
    </div>
  );
}
