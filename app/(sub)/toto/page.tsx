"use client"
import { useQuery } from "@tanstack/react-query"
import { getQueryKeys } from "@/api/queryAPI"

function TodoPage() {
  const {
    data,
    isLoading: _isLoading,
    isError: _isError,
  } = useQuery({
    queryKey: getQueryKeys.todo.list(),
    queryFn: async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/todos/1")
      const data = await res.json()
      return data
    },
    //refetchInterval: 5000, // 데이타 1초마다 서버로 요청
    staleTime: 10000, // 캐시 신선도 유지 시간(10초)
  })

  console.warn(`data`, data)

  return (
    <>
      <h1>Todo</h1>
      <div>{data?.title}</div>
    </>
  )
}
export default TodoPage
