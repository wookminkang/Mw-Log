import { Button, Separator } from "@/components/ui"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import dayjs from "dayjs"
import { AppEditor } from "@/components/common"
import type { Metadata } from "next"

import { createClient } from '@/lib/supabase/server'
import { Editor } from "@/components/common/DynamicEditor"


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

// SEO 메타데이터 생성
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("topic")
    .select("*")
    .eq("status", "publish")
    .eq("id", id)
    .eq("isView", true)
    .single()

  if (error || !data) {
    return {
      title: "게시글을 찾을 수 없습니다",
      description: "요청하신 게시글을 찾을 수 없습니다.",
    }
  }

  const title = `${data.title} | ${data.category}`
  const description = data.title
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  const imageUrl = data.thumbnail || `${siteUrl}/og-image.png`

  return {
    title,
    description,
    keywords: [data.category, data.title, "게시글", "커뮤니티"],
    authors: [{ name: "돌멩이-강민욱" }],
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: data.created_at,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: data.title,
        },
      ],
      siteName: "Next Supabase",
    },
    alternates: {
      canonical: `${siteUrl}/board/${id}`,
    },
  }
}

async function BoardDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("topic")
    .select("*")
    .eq("status", "publish")
    .eq("id", id)
    .eq("isView", true)
    .single()


  const parsedContent = data.content ? JSON.parse(data.content) : null

  return (
    <main className="relative w-full h-full min-h-[720px] flex flex-col">
      {/* 썸네일 이미지 백그라운드로 적용 */}
      <div
        className="relative w-full h-80 md:h-100 bg-cover bg-[50%_35%] bg-accent"
        style={{ backgroundImage: `url(${data?.thumbnail})` }}
      >
        {/* 어두운 오버레이 */}
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute top-6 left-6 z-10 flex items-center gap-2">
          <Link href={`/?category=${data?.category}`}>
            <Button variant="outline" size="icon" className="cursor-pointer">
              <ArrowLeft />
            </Button>
          </Link>
        </div>
        {/* 좌, 우, 하단 그라데이션 */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#000000] via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-l from-[#000a00] via-transparent to-transparent"></div>


        <section className="absolute h-full w-full flex flex-col items-center justify-center">
          <span className="mb-4 text-orange-500"># {data?.category}</span>
          <div
            className={`scroll-m-20 px-6 text-center font-extrabold tracking-tight text-xl sm:text-2xl md:text-4xl text-white`}
          >
            {data?.title}
          </div>
          <Separator className="!w-6 my-4 bg-white" />
          <span className="text-white">
            {dayjs(data?.created_at).format("YYYY. MM. DD.")}
          </span>
        </section>
      </div>

      

      <div className="mx-auto w-full max-w-6xl px-4 md:px-6 pt-12 pb-6">
        <div className="grid grid-cols-1 gap-6 md:gap-8">
          <section className="min-w-0">
            {data?.content && parsedContent && (
              <Editor
                content={parsedContent}
                readonly={true}
              />
            )}
          </section>

          {/* 우측 사이드바 (md+)
          <aside className="hidden md:block md:sticky md:top-24 space-y-4"></aside> */}

          {/* 모바일에서는 본문 아래에 위젯 표시 */}
          <aside className="md:hidden space-y-4"></aside>
        </div>
      </div>
    </main>
  )
}

export default BoardDetailPage
