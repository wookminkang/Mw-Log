import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Separator } from "@/components/ui/separator";
import dayjs from "dayjs";
import type { Metadata } from "next";
import type { Block } from "@blocknote/core";

import { createClient } from "@/utils/supabase/client";
import { getPostById } from "@/features/main/api/getPostById";
import { buildPostMetadata } from "@/utils/metaFactory";
import { PostDetailsBack } from "@/features/main/components/PostDetailsBack";
import { PostEditButton } from "@/features/main/components/PostEditButton";
import { Detail } from "../components/Detail";
import { SkeletonDetail } from "../components/Skeleton";

// ISR: 5분마다 재생성 — 글 내용은 자주 바뀌지 않음
export const revalidate = 300;

/**
 * 빌드 시 공개된 모든 포스트를 정적으로 프리렌더링(SSG + ISR)
 * 없는 id는 런타임에 on-demand 생성
 */
export async function generateStaticParams() {
  // 빌드 타임 실행 → request context 없음 → cookies() 불가
  // anon key만으로 동작하는 브라우저 클라이언트 사용
  const supabase = createClient();
  const { data } = await supabase
    .from("topic")
    .select("id")
    .eq("status", "publish")
    .eq("isView", true);

  return (data ?? []).map(({ id }) => ({ id: String(id) }));
}

/**
 * React.cache로 dedup → generateMetadata & 페이지 컴포넌트 모두 이 함수를 호출해도
 * 같은 요청 내에서 DB는 단 1회만 조회됩니다.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const post = await getPostById(id);
  return buildPostMetadata(post);
}

export default async function PostDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPostById(id); // 캐시 히트 — 추가 DB 호출 없음

  if (!post) notFound();

  const parsedContent = post.content
    ? (JSON.parse(post.content) as Block[])
    : null;

  return (
    <div className="max-w-3xl mx-auto">
      {/* 상단: 뒤로가기 + 수정/삭제 버튼 */}
      <div className="mb-8 flex items-center justify-between">
        <PostDetailsBack />
        <PostEditButton />
      </div>

      {/* 헤더 */}
      <header className="mb-10">
        <div className="mb-4">
          <span className="inline-block px-2.5 py-1 bg-orange-100 dark:bg-orange-900/30 text-foreground text-sm font-medium rounded-md">
            {post.category}
          </span>
        </div>

        <h1 className="text-2xl md:text-4xl font-bold tracking-tight mb-4 leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center gap-4 text-xl text-muted-foreground font-semibold">
          <time dateTime={post.created_at}>
            {dayjs(post.created_at).format("YYYY. MM. DD")}
          </time>
        </div>
      </header>

      <Separator className="mb-10" />

      {/* 본문 */}
      <article className="prose prose-lg dark:prose-invert max-w-none">
        <Suspense fallback={<SkeletonDetail />}>
          {parsedContent && <Detail content={parsedContent} />}
        </Suspense>
      </article>

      <Separator className="mt-16 mb-8" />

      <footer className="flex justify-between items-center text-sm text-muted-foreground">
        <PostDetailsBack />
      </footer>
    </div>
  );
}
