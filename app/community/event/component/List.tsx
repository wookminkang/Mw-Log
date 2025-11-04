"use client"
import { useEffect, useRef } from "react"
import Image from "next/image"
import { PHOTO_TYPE } from "@/types/photo"
import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query"

type Props = {
  list: PHOTO_TYPE[]
}

function List({ list }: Props) {
  const PAGE_SIZE = 10
  const loadMoreRef = useRef<HTMLDivElement | null>(null)

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isError,
    error,
  } = useInfiniteQuery<PHOTO_TYPE[], Error>({
    queryKey: ["event-list"],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/photos?_page=${pageParam}&_limit=${PAGE_SIZE}`
      )
      return await res.json()
    },
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length < PAGE_SIZE ? undefined : allPages.length + 1,
    initialData: list?.length
      ? () => ({ pages: [list], pageParams: [1] })
      : undefined,
  })

  const items: PHOTO_TYPE[] = data?.pages.flat() ?? []

  useEffect(() => {
    const el = loadMoreRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0]
        if (first.isIntersecting) {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage()
          }
        }
      },
      { root: null, rootMargin: "200px 0px", threshold: 0 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [hasNextPage, isFetchingNextPage, fetchNextPage])

  if (isPending) return <div>Loading...</div>
  if (isError) return <div>에러: {error?.message}</div>

  return (
    <div>
      {items.map((item: PHOTO_TYPE) => (
        <div key={item.id}>
          <div>{item.id}</div>
          <h1>
            {item.title} : {item.albumId}
          </h1>
          {item.url}.jpg
        </div>
      ))}

      <div ref={loadMoreRef} style={{ height: 1 }} />
    </div>
  )
}

export { List }
