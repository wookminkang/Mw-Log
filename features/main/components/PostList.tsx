"use client";

import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../api/getPosts";
import { postQueryKey } from "@/utils/QueryKeyFactory";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";



export function PostLists() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: postQueryKey.lists(),
    queryFn: () => getPosts('archive'),
    staleTime: 60 * 1000,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error?.message}</div>;

  return (
    <>
      {
        data.map((item, index) => {
          return (
            <div key={item?.id}>
              <Link href={`/posts/${item?.id}`} className="block py-8 hover:opacity-80 transition-opacity">
                <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center">
                  <div className="flex-1 min-w-0 w-full md:w-auto">
                    {/* 카테고리 */}
                    <div className="mb-3">
                      <span className="inline-block px-2.5 py-1 bg-orange-100 dark:bg-orange-900/30 text-foreground text-xs font-medium rounded-md">
                        {item?.category}
                      </span>
                    </div>

                    {/* 제목 */}
                    <h3 className="text-2xl md:text-2xl font-bold tracking-tight mb-3 line-clamp-2 leading-tight">
                      {item?.title}
                    </h3>

                    {/* 설명 */}
                    {item?.content_preview && (
                      <p className="text-base text-foreground/65 leading-relaxed mb-3 line-clamp-2">
                        {item?.content_preview}
                      </p>
                    )}

                    {/* 날짜 */}
                    <p className="text-sm text-muted-foreground">
                      {dayjs(item?.created_at).format("YYYY. MM. DD")}
                    </p>
                  </div>

                  {/* 이미지 썸네일 */}
                  <div className="w-full md:w-[240px] md:h-[160px] shrink-0">
                    {
                      item?.thumbnail ? 
                      (
                        <div className="relative h-[190px] md:w-[240px] md:h-[160px] rounded-lg bg-muted">
                          <Image
                            src={item.thumbnail}
                            alt={item.title || "Thumbnail"}
                            fill
                            className="object-cover rounded-lg"
                            sizes="(max-width: 768px) 100vw, 240px" 
                            priority={index < 4}
                          />
                        </div>
                      ) 
                      : 
                      (
                        <div className="w-full md:w-[240px] md:h-[180px] rounded-lg bg-muted"></div>
                      )
                    }
                  </div>
                </div>
              </Link>
            </div>
          )
        })
      }
    </>
  )
}
