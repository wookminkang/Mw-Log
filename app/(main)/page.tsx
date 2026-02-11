import { Separator } from "@/components/ui/separator";
import { getPosts } from "@/features/main/api/getPosts";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import dayjs from "dayjs";

const PostLists = dynamic(
  () => import("@/features/main/components/PostList").then((m) => m.PostLists),
  {
    loading: () => <div className="text-sm text-muted-foreground">목록 불러오는 중…</div>,
    ssr: true,
  }
);

async function getBlogPosts() {
  const posts = await getPosts("archive", 0);
  return posts;
}


export default async function MainHome() {
  const posts = await getBlogPosts();
  const postsForClient =
    posts?.map((p: any) => ({
      ...p,
      created_at_text: p?.created_at ? dayjs(p.created_at).format("YYYY. MM. DD") : "",
    })) ?? [];
  return (
    <div className="mx-auto">
      {/* Header Section */}
      <section className="mb-10">
        <article>
          <h1 className="text-4xl font-bold mb-4 leading-tight">돌멩이,</h1>
          <p className="text-base leading-relaxed text-foreground/80 ">
            "늘 새로운 것을 탐구하고 분석하고, 일상 속 익숙해진 불편함을
            해결하는 데 집중하면서 내 맘대로 작업물을 업로드하고 있습니다. 이
            페이지는 개인 작업과 기술 실험을 모아 둔 포트폴리오이자
            블로그입니다."
          </p>
        </article>
      </section>

      {/* Divider */}
      <Separator className="mb-10" />

      {/* Work Experience Section (초기 렌더 최적화로 비활성화) */}
      {/*
      <section className="mb-16 hidden">
        ...
      </section>
      */}

      {/* Blog Posts Section */}
      <section>
        <article>

          <Suspense fallback={<div>Loading...</div>}>
            <PostLists posts={postsForClient} />
          </Suspense>


          {/* <HydrationBoundary state={dehydratedState}>
            <PostList category="archive" />
            <PostLists />
          </HydrationBoundary> */}
        </article>
      </section>

      {/* Footer Section */}
      <footer className="mt-16 pt-8 border-t">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <p>© 2023 돌멩이.</p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/wookminkang"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/kmmmw_/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
              aria-label="Instagram"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
