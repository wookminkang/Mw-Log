import { AppSidebar } from "@/components/common"
import { SkeletonMainCard } from "@/components/ui/MainSkeletonCard"
import { MainContentsCard } from "@/components/ui/MainContentsCard"
import Link from "next/link"
import supabase from "@/lib/supabaseClient"
import { Skeleton } from "@/components/ui/skeleton"
import { Suspense } from "react"

type Props = {
  category?: string
}

async function Main({ category }: Props) {
  let query = supabase
    .from("topic")
    .select("*")
    .eq("status", "publish")
    .eq("isView", true)

  if (category) {
    query = query.eq("category", category)
  }
  const { data: list, error } = await query

  return (
    <main className="w-full h-full min-h-[720px] flex flex-col lg:flex-row p-6 gap-6">
      <aside className="lg:min-w-60 lg:w-60 lg:h-full">
        <AppSidebar />
      </aside>

      {/* 콘텐츠 내용 */}
      <section className="flex-1 flex flex-col gap-12">
        <div className="w-full flex flex-col gap-6">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                새로운 콘텐츠를 확인해보세요.
              </h4>
            </div>
          </div>

          <Suspense fallback={<Skeleton className="w-full h-full" />}>
            {list?.length && list?.length > 1 ? (
              <div className="flex flex-col min-h-120 md:grid md:grid-cols-1 gap-6">
                {list?.map((item) => (
                  <Link href={`/board/${item.id}`} key={item.id}>
                    <MainContentsCard data={item} />
                  </Link>
                ))}
              </div>
            ) : (
              <div className="flex flex-col min-h-120 md:grid md:grid-cols-1 gap-6">
                <Link href="/board/1">
                  <SkeletonMainCard />
                </Link>
                <Link href="/board/2">
                  <SkeletonMainCard />
                </Link>
                <Link href="/board">
                  <SkeletonMainCard />
                </Link>
                <Link href="/board">
                  <SkeletonMainCard />
                </Link>
              </div>
            )}
          </Suspense>
        </div>
      </section>
    </main>
  )
}

export { Main }
