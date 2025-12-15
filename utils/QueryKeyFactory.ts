// 포스트 관련 쿼리 키 생성
export const postQueryKey = {
  lists: () => ["posts", 'list'] as const,
  list: (category: string) => [...postQueryKey.lists(), category] as const,
  detail: (id:string) => ["post", "detail", id] as const,
}



