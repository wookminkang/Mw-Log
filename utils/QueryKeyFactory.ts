// 포스트 관련 쿼리 키 생성
export const postQueryKey = {
  lists: () => ["posts", 'list'] as const,
  list: (category: string) => [...postQueryKey.lists(), category] as const,
  detail: (id:string | number) => ["post", "detail", id] as const,
}



export const adminPostQueryKey = {
  lists: () => ["AdminPosts", 'list'] as const,
  list: (category: string) => [...adminPostQueryKey.lists(), category] as const,
  detail: (id:string | number) => ["AdminPost", "detail", id] as const,
}


