import type { Metadata } from "next";
import { Suspense } from "react";
import { Separator } from "@/components/ui/separator";
import { SocialFooter } from "@/components/common";
import { getPosts } from "@/features/main/api/getPosts";
import { PostCard } from "@/features/main/components/PostCard";
import { SkeletonPosts } from "./components/SkeletonPosts";
import { buildSiteMetadata } from "@/utils/metaFactory";

// ISR: 60초마다 재생성 — 새 글이 올라와도 최대 1분 내 반영
export const revalidate = 60;

export const metadata: Metadata = buildSiteMetadata(
  "돌멩이",
  "늘 새로운 것을 탐구하고 분석하며, 일상의 불편함을 해결하는 포트폴리오 블로그"
);

async function PostsSection() {
  const posts = await getPosts("archive", 0);

  return (
    <div className="space-y-0">
      {posts.map((post, index) => (
        <div key={post.id}>
          <PostCard post={post} index={index} />
          {index < posts.length - 1 && (
            <div className="border-b border-border" />
          )}
        </div>
      ))}
    </div>
  );
}

export default function MainHome() {
  return (
    <div className="mx-auto">
      <section className="mb-10">
        <article>
          <h1 className="text-4xl font-bold mb-4 leading-tight">돌멩이,</h1>
          <p className="text-base leading-relaxed text-foreground/80">
            "늘 새로운 것을 탐구하고 분석하고, 일상 속 익숙해진 불편함을
            해결하는 데 집중하면서 내 맘대로 작업물을 업로드하고 있습니다. 이
            페이지는 개인 작업과 기술 실험을 모아 둔 포트폴리오이자
            블로그입니다."
          </p>
        </article>
      </section>

      <Separator className="mb-10" />

      <section>
        <article>
          <Suspense fallback={<SkeletonPosts />}>
            <PostsSection />
          </Suspense>
        </article>
      </section>

      <SocialFooter />
    </div>
  );
}
