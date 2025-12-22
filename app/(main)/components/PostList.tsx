"use client";

import { useEffect, useRef, useMemo, useCallback } from "react";
import Image from "next/image";
import dayjs from "dayjs";
import { TOPIC_CATEGORY } from "@/constans/ConstansCategory";
import Link from "next/link";
import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import { createClient } from "@/lib/supabase/client";

type PostItem = {
  id: string;
  title: string;
  content_preview?: string;
  thumbnail?: string;
  category?: string;
  created_at: string;
};

const PAGE_SIZE = 2;

type PostListProps = {
  category?: string;
};

function PostList({ category }: PostListProps) {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
    isError,
    error,
  } = useInfiniteQuery<
    PostItem[],
    Error,
    InfiniteData<PostItem[], number>,
    readonly unknown[],
    number
  >({
    queryKey: ["posts-list", category],
    initialPageParam: 0,
    queryFn: async ({ pageParam }) => {
      const from = pageParam as number;
      const to = from + PAGE_SIZE - 1;

      let query = createClient()
        .from("topic")
        .select("*")
        .eq("status", "publish")
        .eq("isView", true);

      if (category) {
        query = query.eq("category", category);
      }

      const { data: list, error } = await query
        .order("created_at", { ascending: false })
        .range(from, to);

      if (error) {
        throw error;
      }

      return (list || []) as PostItem[];
    },
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < PAGE_SIZE) {
        return undefined;
      }
      return allPages.length * PAGE_SIZE;
    },
  });

  const posts: PostItem[] = useMemo(
    () => data?.pages.flat() ?? [],
    [data?.pages]
  );

  // IntersectionObserver 최적화
  useEffect(() => {
    const el = loadMoreRef.current;
    if (!el || !hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first?.isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { root: null, rootMargin: "200px 0px", threshold: 0 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const getCategoryLabel = useCallback(
    (category: string | null | undefined) => {
      if (!category) return "post";
      const found = TOPIC_CATEGORY.find((cat) => cat.category === category);
      return found?.label.toLowerCase() || category.toLowerCase();
    },
    []
  );

  if (isPending) {
    return (
      <div className="space-y-0">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="py-8">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center">
              <div className="flex-1 min-w-0 w-full md:w-auto space-y-3">
                <div className="h-5 w-20 bg-muted rounded-md animate-pulse" />
                <div className="h-7 w-full bg-muted rounded-md animate-pulse" />
                <div className="h-5 w-2/3 bg-muted rounded-md animate-pulse" />
                <div className="h-4 w-24 bg-muted rounded-md animate-pulse" />
              </div>
              <div className="w-full md:w-[240px] md:h-[160px] h-[190px] bg-muted rounded-lg animate-pulse" />
            </div>
            {index < 2 && <div className="border-b border-border mt-8" />}
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        에러가 발생했습니다: {error?.message}
      </div>
    );
  }

  return (
    <div className="space-y-0">
      {posts.map((item, index) => {
        const categoryLabel = getCategoryLabel(item?.category);

        return (
          <div key={item?.id}>
            <Link
              href={`/posts/${item?.id}`}
              className="block py-8 hover:opacity-80 transition-opacity"
            >
              <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center">
                {/* Left: Text Content */}
                <div className="flex-1 min-w-0 w-full md:w-auto">
                  {/* Category Tag */}
                  <div className="mb-3">
                    <span className="inline-block px-2.5 py-1 bg-orange-100 dark:bg-orange-900/30 text-foreground text-xs font-medium rounded-md">
                      {categoryLabel}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl md:text-2xl font-bold tracking-tight mb-3 line-clamp-2 leading-tight">
                    {item?.title}
                  </h3>

                  {/* Description */}
                  {item?.content_preview && (
                    <p className="text-base text-foreground/65 leading-relaxed mb-3 line-clamp-2">
                      {item?.content_preview}
                    </p>
                  )}

                  {/* Date */}
                  <p className="text-sm text-muted-foreground">
                    {dayjs(item?.created_at).format("YYYY. MM. DD")}
                  </p>
                </div>

                {/* Right: Image */}
                <div className="w-full md:w-[240px] md:h-[160px] shrink-0">
                  {item?.thumbnail ? (
                    <div className="relative h-[190px] md:w-[240px] md:h-[160px] rounded-lg bg-muted">
                      <Image
                        src={item.thumbnail}
                        alt={item.title || "Thumbnail"}
                        fill
                        className="object-cover rounded-lg"
                        sizes="(max-width: 768px) 100vw, 240px"
                        loading={index < 2 ? "eager" : "lazy"}
                        priority={index < 2}
                      />
                    </div>
                  ) : (
                    <div className="w-full md:w-[240px] md:h-[180px] rounded-lg bg-muted"></div>
                  )}
                </div>
              </div>
            </Link>

            {/* Separator */}
            {index < posts.length - 1 && (
              <div className="border-b border-border"></div>
            )}
          </div>
        );
      })}

      {/* Load More Trigger */}
      {hasNextPage && (
        <div ref={loadMoreRef} className="py-4">
          {isFetchingNextPage && (
            <div className="text-center text-sm text-muted-foreground">
              불러오는 중...
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export { PostList };
