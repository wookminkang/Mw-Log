import { Button } from "@/components/ui"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import supabase from "@/lib/supabaseClient"

async function BoardDetailPage({ params }: { params: { id: string } }) {
  const { id } = params

  const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)

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
      </div>

      <section className="relative w-full flex flex-col items-center -mt-40">
        {id}
      </section>

      <div className="mx-auto w-full max-w-6xl px-4 md:px-6 pt-12 pb-6"></div>
    </main>
  )
}

export default BoardDetailPage
