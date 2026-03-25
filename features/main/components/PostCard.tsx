import Image from "next/image"
import Link from "next/link"
import dayjs from "dayjs"
import { getCategoryLabel } from "@/constans/ConstansCategory"
import type { PostItem } from "@/types"

type PostCardProps = {
  post: PostItem
  index: number
  priority?: boolean
}

export function PostCard({ post, index, priority }: PostCardProps) {
  const shouldPrioritize = priority ?? index < 2

  return (
    <Link
      href={`/posts/${post.id}`}
      className="block py-8 hover:opacity-80 transition-opacity"
    >
      <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center">
        {/* Left: Text */}
        <div className="flex-1 min-w-0 w-full md:w-auto">
          <div className="mb-3">
            <span className="inline-block px-2.5 py-1 bg-orange-100 dark:bg-orange-900/30 text-foreground text-xs font-medium rounded-md">
              {getCategoryLabel(post.category)}
            </span>
          </div>

          <h3 className="text-2xl font-bold tracking-tight mb-3 line-clamp-2 leading-tight">
            {post.title}
          </h3>

          {post.content_preview && (
            <p className="text-base text-foreground/65 leading-relaxed mb-3 line-clamp-2">
              {post.content_preview}
            </p>
          )}

          <p className="text-sm text-muted-foreground">
            {dayjs(post.created_at).format("YYYY. MM. DD")}
          </p>
        </div>

        {/* Right: Thumbnail */}
        <div className="w-full md:w-[240px] md:h-[160px] shrink-0">
          {post.thumbnail ? (
            <div className="relative h-[190px] md:w-[240px] md:h-[160px] rounded-lg bg-muted">
              <Image
                src={post.thumbnail}
                alt={post.title || "Thumbnail"}
                fill
                className="object-cover rounded-lg"
                sizes="(max-width: 768px) 100vw, 240px"
                priority={shouldPrioritize}
                loading={shouldPrioritize ? "eager" : "lazy"}
              />
            </div>
          ) : (
            <div className="w-full md:w-[240px] md:h-[160px] rounded-lg bg-muted" />
          )}
        </div>
      </div>
    </Link>
  )
}
