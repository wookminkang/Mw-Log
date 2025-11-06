import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { CaseSensitive } from "lucide-react"
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

function MainContentsCard<T>({ data }: Partial<props>) {
  const setContent = (content: string) => {
    let resultContent = ""
    JSON.parse(content).forEach((item: any) => {
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
    <div>
      <Card className="w-full h-fit p-4 gap-4 cursor-pointer hover:bg-muted/15 transition-all duration-300">
        <div className="flex items-start gap-4">
          <div className="flex-1 flex flex-col items-start gap-4">
            {/* 썸네일과 제목 */}
            <h3 className="h-16 text-base font-semibold tracking-tight line-clamp-2">
              <CaseSensitive size={16} className="text-muted-foreground" />
              <p>{data?.title}</p>
            </h3>
            {/* 본문 */}
            <p className="line-clamp-3 text-muted-foreground">
              {setContent(data?.content || "")}
            </p>
          </div>
          {data?.thumbnail ? (
            <Image
              src={data?.thumbnail}
              alt="@THUMBNAIL"
              width={140}
              height={140}
              className="w-[140px] h-[140px] aspect-square rounded-lg object-cover cursor-pointer"
            />
          ) : (
            <div className="w-[140px] h-[140px] aspect-square rounded-lg object-cover bg-muted cursor-pointer"></div>
          )}
        </div>
        <Separator />
        <div className="w-full flex items-center justify-between">
          <p>글쓴이: 돌멩이</p>
          <p>{dayjs(data?.created_at).format("YYYY. MM. DD.")}</p>
          {/* <p>{dayjs(props.created_at).fromNow()}</p> */}
        </div>
      </Card>
    </div>
  )
}

export { MainContentsCard }
