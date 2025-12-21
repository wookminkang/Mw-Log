import { HydrationBoundary, dehydrate, QueryClient} from "@tanstack/react-query"
import { PostList } from "@/features/admin/components/PostList"
import { postQueryKey } from "@/utils/QueryKeyFactory"
import { getPostsNoInfinity } from "@/features/main/api/getPosts"
export default async function AdminPostsPage () {

  const queryClient = new QueryClient()
  await queryClient.prefetchQuery({
    queryKey: postQueryKey.lists(),
    queryFn: () => getPostsNoInfinity("archive"),
  })

  const dehydratedState = dehydrate(queryClient);

  return (
    <>
      <HydrationBoundary state={dehydratedState}>
        <PostList />
      </HydrationBoundary>
    </>
  )
}