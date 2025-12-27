'use client'

import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/stores"
import Link from "next/link"
import { useParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { postQueryKey } from "@/utils/QueryKeyFactory";
import { revalidatePostList } from "@/features/admin/api/serverActions"
import { useRouter } from "next/navigation";

export function PostEditButton () {
  const router = useRouter()
  const { id:postId } = useParams()
  const { id } = useAuthStore(state => state.user)
  console.log(`id`, id)
  console.log(`postId`, postId)

  const supabase = createClient()

  const handleDelete = async () => {
    const { data, error } = await supabase.from('topic').delete().eq('id', postId);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success('게시글을 삭제하였습니다.');
  }

  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: () => handleDelete(),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: postQueryKey.lists(),
      });

      await revalidatePostList();
      router.push('/')
    },
  })
  
  return (
    <>
    {
      id && (
        <div className="flex justify-end gap-3">
          <Button>
            <Link href={`/admin/post/create/${postId}`}>
              수정하기
            </Link>
          </Button>
          <Button className="bg-red-500" onClick={()=>mutate()}>
            삭제하기
          </Button>
        </div>
      )
    }
    </>
  )
}