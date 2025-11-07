import { Button, Separator } from "@/components/ui"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import supabase from "@/lib/supabaseClient"
import dayjs from "dayjs"

interface DATA_TYPE {
  title: string
  content: string
  created_at: string
  thumbnail: string
  status: string
  isView: boolean
  id: string
  category: string
  author: string
}

async function BoardDetailPage({ params }: { params: { id: string } }) {
  const { id } = await params

  const { data, error } = await supabase
    .from("topic")
    .select("*")
    .eq("status", "publish")
    .eq("id", id)
    .eq("isView", true)

  return (
    <main className="relative w-full h-full min-h-[720px] flex flex-col">
      {/* 썸네일 이미지 백그라운드로 적용 */}
      <div className="relative w-full h-60 md:h-100 bg-cover bg-[50%_35%] bg-accent">
        {/* 어두운 오버레이 */}
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute top-6 left-6 z-10 flex items-center gap-2">
          <Button variant="outline" size="icon" className="cursor-pointer">
            <Link href="/">
              <ArrowLeft />
            </Link>
          </Button>
        </div>
        {/* 좌, 우, 하단 그라데이션 */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-l from-[#0a0a0a] via-transparent to-transparent"></div>
      </div>

      <section className="relative w-full flex flex-col items-center -mt-40">
        <span className="mb-4 text-primary"># {data?.[0].category}</span>
        <div
          className={`scroll-m-20 text-center font-extrabold tracking-tight text-xl sm:text-2xl md:text-4xl `}
        >
          {data?.[0]?.title}
        </div>
        <Separator className="!w-6 my-6 bg-foreground" />
        <span className="text-foreground">
          {dayjs(data?.[0]?.created_at).format("YYYY. MM. DD.")}
        </span>
      </section>

      <div className="mx-auto w-full max-w-6xl px-4 md:px-6 pt-12 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-6 md:gap-8">
          <section className="min-w-0">
            {data?.[0]?.content && (
              // <AppEditor content={JSON.parse(data?.[0]?.content)} readonly={true} />
              <>{data?.[0]?.content}</>
            )}
          </section>
          {/* 우측 사이드바 (md+) */}
          <aside className="hidden md:block md:sticky md:top-24 space-y-4"></aside>

          {/* 모바일에서는 본문 아래에 위젯 표시 */}
          <aside className="md:hidden space-y-4"></aside>
        </div>
      </div>
    </main>
  )
}

export default BoardDetailPage
