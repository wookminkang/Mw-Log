import { PostCard } from "./PostCard"
import type { PostItem } from "@/types"

export function PostLists({ posts }: { posts: PostItem[] }) {
  return (
    <>
      {posts.map((post, index) => (
        <div key={post.id}>
          <PostCard post={post} index={index} />
          {index < posts.length - 1 && (
            <div className="border-b border-border" />
          )}
        </div>
      ))}
    </>
  )
}
