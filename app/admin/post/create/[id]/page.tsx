import { PostDetail } from "@/features/admin/components/PostDetail"
type POST_DETAIL_TYPE = {
  id: string;
}
export default async function PostDetailPage ({params}: {params: POST_DETAIL_TYPE}) {
  const { id } = await params
  return <PostDetail id={id} />
}