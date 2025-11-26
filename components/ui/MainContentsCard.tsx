import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui"
import dayjs from "dayjs"
import Image from "next/image"
interface props {
  data: {
    title: string
    content: string
    created_at: string
    thumbnail: string
  }
}

type RichNode = {
  content?: Array<{ text?: string }>
}

function MainContentsCard({ data }: Partial<props>) {
  const setContent = (content: string) => {
    let resultContent = ""
    JSON.parse(content).forEach((item: RichNode) => {
      if (item.content !== undefined && Array.isArray(item.content)) {
        const firstContent = item.content[0]
        if (firstContent && "text" in firstContent) {
          resultContent += firstContent.text
        }
      }
    })
    return resultContent
  }

  return (
      <Card className="w-full h-fit p-4 gap-4 cursor-pointer hover:bg-muted/95 transition-all duration-200">
        <div className="flex flex-col md:flex-row items-start gap-4">
          <div className="flex-1 flex flex-col gap-3 w-full md:w-auto">
            {/* 썸네일과 제목 */}
            <h3 className="text-xl font-bold tracking-tight line-clamp-2">
              {data?.title}
            </h3>
            {/* 본문 */}
            <p className="line-clamp-3 text-base text-muted-foreground ">
              {setContent(data?.content || "")}
            </p>
            <p className="text-md text-muted-foreground">
              {dayjs(data?.created_at).format('YYYY. MM. DD. HH:mm')}
            </p>
          </div>

          <div className="flex-shrink-0 w-full md:w-auto">
            {data?.thumbnail ? (
              <Image
                src={data?.thumbnail}
                alt="@THUMBNAIL"
                width={240}
                height={140}
                className="w-full md:w-[240px] h-auto md:h-[150px] aspect-video md:aspect-auto rounded-lg object-cover cursor-pointer"
              />
            ) : (
              <div className="w-full md:w-[200px] h-auto md:h-[150px] aspect-video md:aspect-auto rounded-lg object-cover bg-muted cursor-pointer"></div>
            )}
          </div>
          
        </div>
        <Separator />
        <div className="w-full flex items-center justify-between">
          <p className="text-sm text-muted-foreground">글쓴이: 돌멩이</p>
        </div>
      </Card>
  )
}

export { MainContentsCard }
