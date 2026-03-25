import type { Metadata } from "next";
import { Suspense } from "react";
import { Separator } from "@/components/ui/separator";
import { SocialFooter } from "@/components/common";
import { getPosts } from "@/features/main/api/getPosts";
import { PostLists } from "@/features/main/components/PostList";
import { SkeletonPosts } from "@/app/(main)/components/SkeletonPosts";
import { buildSiteMetadata } from "@/utils/metaFactory";

export const revalidate = 60;

export const metadata: Metadata = buildSiteMetadata(
  "UI/UX",
  "UI/UX 불편한 점을 해결하고, 실험과 결과를 공유합니다."
);

async function UiuxPosts() {
  const posts = await getPosts("uiux", 0);
  return <PostLists posts={posts} />;
}

export default function UIUXPage() {
  return (
    <div className="mx-auto">
      <section className="mb-10">
        <article>
          <h1 className="text-4xl font-bold mb-4 leading-tight">UI/UX</h1>
          <p className="text-base leading-relaxed text-foreground/80">
            "UI/UX 불편한 점을 해결하고, 실험과 결과를 공유합니다."
          </p>
        </article>
      </section>

      <Separator className="mb-10" />

      <section>
        <article>
          <Suspense fallback={<SkeletonPosts />}>
            <UiuxPosts />
          </Suspense>
        </article>
      </section>

      <SocialFooter />
    </div>
  );
}
